import type { FaqCourseLanguage, ResolvedFaq } from "@/domains/faq/types";

/**
 * Pesquisa local determinística sobre FAQs resolvidas.
 *
 * - Normalização: case, espaços, pontuação e diacríticos latinos — sem
 *   destruir japonês, chinês ou russo. Os diacríticos só são removidos de
 *   caracteres base latinos (a-z + extensões pré-compostas), pelo que
 *   dakuten japoneses (が), hanzi/kanji (語) e cirílico (й, ё) ficam
 *   intactos.
 * - Considera: pergunta (e variantes por idioma de curso), aliases
 *   expandidos, resposta, categoria, intent e rótulos dos idiomas de curso.
 * - Determinística: pontuação fixa por campo e desempate estável por ID —
 *   a mesma query devolve sempre a mesma ordem.
 * - Inferência de course language: quando a query corresponde a uma
 *   questionVariant ou alias parametrizado, devolve o matchedCourseLanguage.
 *
 * Módulo puro (sem imports de dados): seguro para Client Components — opera
 * sobre `ResolvedFaq[]` recebido por props.
 */

/**
 * Normaliza texto para comparação de pesquisa:
 * 1. NFD e remoção de diacríticos APENAS após base latina (preserva
 *    japonês/chinês/russo);
 * 2. NFC (recompõe CJK), case fold;
 * 3. pontuação → espaço (inclui apóstrofos tipográficos e pontuação CJK);
 * 4. colapso de espaços.
 */
export function normalizeFaqText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[A-Za-zÀ-ÖØ-öø-ÿ]\p{Mark}+/gu, (match) => match[0])
    .normalize("NFC")
    .toLowerCase()
    .replace(/\p{Punctuation}+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tokens normalizados de uma query. */
function tokenize(normalized: string): string[] {
  return normalized.split(" ").filter(Boolean);
}

/** Resultado de pesquisa com score e idioma inferido. */
export interface FaqSearchResult {
  faq: ResolvedFaq;
  score: number;
  /** Idioma de curso inferido da correspondência (quando aplicável). */
  matchedCourseLanguage?: FaqCourseLanguage;
}

/**
 * Pontuação determinística por campo (maior = melhor):
 * - 100: query normalizada igual à pergunta (ou variante);
 * - 95:  query igual a um alias;
 * - 80:  pergunta começa com a query;
 * - 70:  pergunta contém a query;
 * - 65:  alias contém a query;
 * - 50+: todos os tokens presentes em pergunta+aliases (+1 por token);
 * - 30+: todos os tokens presentes no texto completo (pergunta, aliases,
 *        resposta, categoria, intent, idiomas de curso);
 * - 1..: correspondência parcial de tokens no texto completo.
 */
function scoreFaq(
  faq: ResolvedFaq,
  normalizedQuery: string,
): { score: number; matchedCourseLanguage?: FaqCourseLanguage } {
  const questionTexts = [
    faq.question,
    ...Object.values(faq.questionVariants ?? {}),
  ]
    .filter((text): text is string => text !== undefined)
    .map(normalizeFaqText);
  const aliasTexts = faq.aliases.map(normalizeFaqText);

  // Exact match on question (default or variant)
  if (faq.question && normalizeFaqText(faq.question) === normalizedQuery) {
    return { score: 100 };
  }

  // Exact match on a question variant — infer course language
  for (const [cl, variant] of Object.entries(faq.questionVariants ?? {})) {
    if (variant && normalizeFaqText(variant) === normalizedQuery) {
      return { score: 100, matchedCourseLanguage: cl };
    }
  }

  // Exact match on alias — infer course language from aliasCourseLanguages
  for (let i = 0; i < faq.aliases.length; i++) {
    if (normalizeFaqText(faq.aliases[i]) === normalizedQuery) {
      const matchedCl = faq.aliasCourseLanguages[i];
      return { score: 95, matchedCourseLanguage: matchedCl };
    }
  }

  // Starts with
  if (questionTexts.some((text) => text.startsWith(normalizedQuery))) return { score: 80 };

  // Contains in question
  if (questionTexts.some((text) => text.includes(normalizedQuery))) return { score: 70 };

  // Contains in alias
  if (aliasTexts.some((text) => text.includes(normalizedQuery))) {
    const matchedCl = inferCourseLanguageFromQuery(faq, normalizedQuery);
    return { score: 65, matchedCourseLanguage: matchedCl };
  }

  const tokens = tokenize(normalizedQuery);
  if (tokens.length === 0) return { score: 0 };

  const questionAndAliases = [...questionTexts, ...aliasTexts].join(" ");
  const fullText = normalizeFaqText(
    [
      faq.question,
      ...Object.values(faq.questionVariants ?? {}),
      ...faq.aliases,
      faq.answer,
      faq.categoryLabel,
      faq.intent,
      ...faq.courseLanguageLabels,
    ].join(" "),
  );

  const tokensInQuestions = tokens.filter((token) =>
    questionAndAliases.includes(token),
  ).length;
  if (tokensInQuestions === tokens.length) {
    const matchedCl = inferCourseLanguageFromQuery(faq, normalizedQuery);
    return { score: 50 + tokens.length, matchedCourseLanguage: matchedCl };
  }

  const tokensInFull = tokens.filter((token) => fullText.includes(token));
  if (tokensInFull.length === tokens.length) return { score: 30 + tokens.length };
  if (tokensInFull.length > 0) return { score: tokensInFull.length };

  return { score: 0 };
}

/**
 * Tenta inferir o course language a partir de uma query que contém tokens
 * dos nomes/aliases dos idiomas de curso.
 */
function inferCourseLanguageFromQuery(
  faq: ResolvedFaq,
  normalizedQuery: string,
): FaqCourseLanguage | undefined {
  // Procurar nos courseLanguageLabels (que incluem label, learningObject e aliases)
  for (const label of faq.courseLanguageLabels) {
    if (normalizedQuery.includes(normalizeFaqText(label))) {
      // Encontrar o course language code correspondente
      for (const [cl, variant] of Object.entries(faq.questionVariants ?? {})) {
        if (variant && normalizeFaqText(variant).includes(normalizeFaqText(label))) {
          return cl;
        }
      }
    }
  }
  return undefined;
}

/**
 * Pesquisa FAQs por texto livre. Query vazia devolve todas as FAQs na ordem
 * original. Ordenação: pontuação desc, desempate estável por ID.
 */
export function searchFaqs(
  faqs: ResolvedFaq[],
  query: string,
): FaqSearchResult[] {
  const normalizedQuery = normalizeFaqText(query);
  if (!normalizedQuery) return faqs.map((faq) => ({ faq, score: 0 }));

  const scored: FaqSearchResult[] = faqs
    .map((faq) => {
      const { score, matchedCourseLanguage } = scoreFaq(faq, normalizedQuery);
      return { faq, score, matchedCourseLanguage };
    })
    .filter((entry) => entry.score > 0);

  scored.sort((a, b) => b.score - a.score || a.faq.id.localeCompare(b.faq.id));
  return scored;
}

/** Filtra por categoria ("all" = sem filtro). */
export function filterFaqsByCategory(
  faqs: FaqSearchResult[],
  category: string,
): FaqSearchResult[] {
  if (category === "all") return faqs;
  return faqs.filter((result) => result.faq.category === category);
}

/** Filtra por idioma de curso ("all" = sem filtro). */
export function filterFaqsByCourseLanguage(
  faqs: FaqSearchResult[],
  courseLanguage: string,
): FaqSearchResult[] {
  if (courseLanguage === "all") return faqs;
  return faqs.filter((result) =>
    result.faq.applicableCourseLanguages.includes(courseLanguage),
  );
}
