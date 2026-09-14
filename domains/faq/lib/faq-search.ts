import type { ResolvedFaq } from "@/domains/faq/types";

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

interface ScoredFaq {
  faq: ResolvedFaq;
  score: number;
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
function scoreFaq(faq: ResolvedFaq, normalizedQuery: string): number {
  const questionTexts = [
    faq.question,
    ...Object.values(faq.questionVariants ?? {}),
  ]
    .filter((text): text is string => text !== undefined)
    .map(normalizeFaqText);
  const aliasTexts = faq.aliases.map(normalizeFaqText);

  if (questionTexts.some((text) => text === normalizedQuery)) return 100;
  if (aliasTexts.some((text) => text === normalizedQuery)) return 95;
  if (questionTexts.some((text) => text.startsWith(normalizedQuery))) return 80;
  if (questionTexts.some((text) => text.includes(normalizedQuery))) return 70;
  if (aliasTexts.some((text) => text.includes(normalizedQuery))) return 65;

  const tokens = tokenize(normalizedQuery);
  if (tokens.length === 0) return 0;

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
  if (tokensInQuestions === tokens.length) return 50 + tokens.length;

  const tokensInFull = tokens.filter((token) => fullText.includes(token));
  if (tokensInFull.length === tokens.length) return 30 + tokens.length;
  if (tokensInFull.length > 0) return tokensInFull.length;

  return 0;
}

/**
 * Pesquisa FAQs por texto livre. Query vazia devolve todas as FAQs na ordem
 * original. Ordenação: pontuação desc, desempate estável por ID.
 */
export function searchFaqs(
  faqs: ResolvedFaq[],
  query: string,
): ResolvedFaq[] {
  const normalizedQuery = normalizeFaqText(query);
  if (!normalizedQuery) return faqs;

  const scored: ScoredFaq[] = faqs
    .map((faq) => ({ faq, score: scoreFaq(faq, normalizedQuery) }))
    .filter((entry) => entry.score > 0);

  scored.sort((a, b) => b.score - a.score || a.faq.id.localeCompare(b.faq.id));
  return scored.map((entry) => entry.faq);
}

/** Filtra por categoria ("all" = sem filtro). */
export function filterFaqsByCategory(
  faqs: ResolvedFaq[],
  category: string,
): ResolvedFaq[] {
  if (category === "all") return faqs;
  return faqs.filter((faq) => faq.category === category);
}

/** Filtra por idioma de curso ("all" = sem filtro). */
export function filterFaqsByCourseLanguage(
  faqs: ResolvedFaq[],
  courseLanguage: string,
): ResolvedFaq[] {
  if (courseLanguage === "all") return faqs;
  return faqs.filter((faq) =>
    faq.applicableCourseLanguages.includes(courseLanguage),
  );
}
