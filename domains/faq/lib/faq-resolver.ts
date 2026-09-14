import { locales, type LocaleCode } from "@/core/config/locales";
import rawDatabase from "@/domains/faq/data/faq.json";
import type {
  FaqCategoryOption,
  FaqCourseLanguage,
  FaqCourseLanguageOption,
  FaqDatabase,
  FaqEntry,
  FaqLocalization,
  ResolvedFaq,
} from "@/domains/faq/types";

/**
 * Resolver da base de conhecimento de FAQ (fonte única:
 * domains/faq/data/faq.json).
 *
 * Responsabilidades:
 * 1. Validar a base no carregamento do módulo (gate de runtime, mesmo padrão
 *    de core/i18n): schemaVersion, 52 IDs únicos, 9 locales completos,
 *    categorias e idiomas de curso íntegros, placeholders declarados e
 *    sempre resolvíveis, presentation.homePreviewFaqIds apontando para IDs
 *    existentes. Qualquer divergência lança erro explícito no build —
 *    nunca fallback silencioso.
 * 2. Resolver FAQs por locale para componentes: pergunta sem placeholders
 *    (`{targetLanguage}` é substituído pelo idioma de curso pedido, pela
 *    `defaultQuestion` ou pelo primeiro idioma aplicável — nunca sobra
 *    placeholder no HTML), aliases expandidos e rótulos de categoria/idioma.
 *
 * Este módulo destina-se a Server Components, layouts e metadata. Client
 * Components recebem `ResolvedFaq[]` por props serializadas — a base JSON
 * não entra no bundle client.
 */

const database = rawDatabase as FaqDatabase;

const EXPECTED_SCHEMA_VERSION = "2.0";
const EXPECTED_FAQ_COUNT = 52;
const PLACEHOLDER_PATTERN = /\{([a-zA-Z][a-zA-Z0-9]*)\}/g;

/** Extrai os placeholders `{name}` de um texto. */
function extractPlaceholders(text: string): string[] {
  return [...text.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[1]);
}

/** Valida a base inteira; lança Error com a lista de problemas se inválida. */
function validateDatabase(db: FaqDatabase): void {
  const problems: string[] = [];
  const registeredLocales = locales.map((l) => l.code);

  // 1. schemaVersion
  if (db.schemaVersion !== EXPECTED_SCHEMA_VERSION) {
    problems.push(
      `schemaVersion "${db.schemaVersion}" (esperado "${EXPECTED_SCHEMA_VERSION}")`,
    );
  }

  // 2. 52 FAQs com IDs únicos
  const ids = db.faqs.map((faq) => faq.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== EXPECTED_FAQ_COUNT) {
    problems.push(
      `faqs com ${ids.length} entradas (esperado ${EXPECTED_FAQ_COUNT})`,
    );
  }
  if (uniqueIds.size !== ids.length) {
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    problems.push(`IDs duplicados: ${[...new Set(duplicates)].join(", ")}`);
  }

  // 3. supportedLocales coincide com o registo de locales do projeto
  const missingFromData = registeredLocales.filter(
    (code) => !db.supportedLocales.includes(code),
  );
  const extraInData = db.supportedLocales.filter(
    (code) => !registeredLocales.includes(code as LocaleCode),
  );
  if (missingFromData.length > 0) {
    problems.push(`supportedLocales sem: ${missingFromData.join(", ")}`);
  }
  if (extraInData.length > 0) {
    problems.push(`supportedLocales extra: ${extraInData.join(", ")}`);
  }

  // 4. Categorias: toda categoria usada existe e tem rótulos nos 9 locales
  for (const faq of db.faqs) {
    if (!db.categories[faq.category]) {
      problems.push(`${faq.id}: categoria desconhecida "${faq.category}"`);
    }
  }
  for (const [categoryId, category] of Object.entries(db.categories)) {
    for (const code of registeredLocales) {
      if (!category.labels[code]) {
        problems.push(`categoria "${categoryId}" sem rótulo em ${code}`);
      }
    }
  }

  // 5. Idiomas de curso: applicableCourseLanguages ⊆ offeredCourseLanguages
  //    e targetLanguages cobre todos os idiomas oferecidos nos 9 locales
  for (const faq of db.faqs) {
    for (const courseLanguage of faq.applicableCourseLanguages) {
      if (!db.offeredCourseLanguages.includes(courseLanguage)) {
        problems.push(
          `${faq.id}: idioma de curso desconhecido "${courseLanguage}"`,
        );
      }
    }
  }
  for (const courseLanguage of db.offeredCourseLanguages) {
    const target = db.targetLanguages[courseLanguage];
    if (!target) {
      problems.push(`targetLanguages sem "${courseLanguage}"`);
      continue;
    }
    for (const code of registeredLocales) {
      const localized = target.locales[code];
      if (!localized?.label || !localized.learningObject) {
        problems.push(
          `targetLanguages.${courseLanguage} sem label/learningObject em ${code}`,
        );
      }
    }
  }

  // 6. Localizações completas + placeholders declarados e resolvíveis
  for (const faq of db.faqs) {
    const declared = new Set(faq.parameters);
    for (const code of registeredLocales) {
      const localization = faq.localizations[code];
      if (!localization?.question || !localization.answer) {
        problems.push(`${faq.id}: sem question/answer em ${code}`);
        continue;
      }
      const texts = [
        localization.question,
        localization.answer,
        ...(localization.searchAliases ?? []),
      ];
      for (const text of texts) {
        for (const placeholder of extractPlaceholders(text)) {
          if (!declared.has(placeholder)) {
            problems.push(
              `${faq.id} (${code}): placeholder {${placeholder}} não declarado em parameters`,
            );
          }
        }
      }
      // FAQ parametrizada precisa de defaultQuestion resolvida por locale
      if (faq.parameters.length > 0 && !localization.defaultQuestion) {
        problems.push(
          `${faq.id} (${code}): defaultQuestion ausente (parameters: ${faq.parameters.join(", ")})`,
        );
      }
      if (localization.defaultQuestion?.includes("{")) {
        problems.push(
          `${faq.id} (${code}): defaultQuestion com placeholder por resolver`,
        );
      }
    }
  }

  // 7. presentation.homePreviewFaqIds: existe, sem duplicados, IDs válidos
  const previewIds = db.presentation?.homePreviewFaqIds;
  if (!Array.isArray(previewIds) || previewIds.length === 0) {
    problems.push("presentation.homePreviewFaqIds ausente ou vazio");
  } else {
    if (new Set(previewIds).size !== previewIds.length) {
      problems.push("presentation.homePreviewFaqIds com IDs duplicados");
    }
    for (const id of previewIds) {
      if (!uniqueIds.has(id)) {
        problems.push(`presentation.homePreviewFaqIds: ID desconhecido "${id}"`);
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `[faq] Base de FAQ inválida (domains/faq/data/faq.json):\n  - ${problems.join("\n  - ")}`,
    );
  }
}

// Gate de runtime: executado uma vez no carregamento do módulo. Como o site é
// exportado estaticamente, qualquer divergência falha o `next build`.
validateDatabase(database);

/** Base validada (tipada). */
export function getFaqDatabase(): FaqDatabase {
  return database;
}

/**
 * Resolve um template substituindo `{targetLanguage}` pelo learningObject do
 * idioma de curso pedido. Cadeia de fallback para o idioma de curso:
 * explícito → primeiro idioma aplicável. Nunca devolve placeholder por
 * resolver: se sobrar `{...}` é erro explícito.
 */
function resolveTemplate(
  template: string,
  faq: FaqEntry,
  locale: LocaleCode,
  courseLanguage?: FaqCourseLanguage,
): string {
  const target =
    courseLanguage ?? faq.applicableCourseLanguages[0] ?? undefined;
  const resolved = template.replace(
    PLACEHOLDER_PATTERN,
    (match, name: string) => {
      if (name === "targetLanguage" && target) {
        const learningObject =
          database.targetLanguages[target]?.locales[locale]?.learningObject;
        if (learningObject) return learningObject;
      }
      throw new Error(
        `[faq] Placeholder {${name}} não resolvível em "${faq.id}" (${locale}).`,
      );
    },
  );
  if (resolved.includes("{")) {
    throw new Error(
      `[faq] Placeholder por resolver em "${faq.id}" (${locale}): ${resolved}`,
    );
  }
  return resolved;
}

/**
 * Resolve uma FAQ para um locale. A pergunta usa, por ordem:
 * 1. template com o idioma de curso pedido (quando há placeholders);
 * 2. `defaultQuestion` (já resolvida na base);
 * 3. template com o primeiro idioma de curso aplicável.
 */
function resolveFaq(
  faq: FaqEntry,
  locale: LocaleCode,
  courseLanguage?: FaqCourseLanguage,
): ResolvedFaq {
  const localization = faq.localizations[locale] as FaqLocalization;
  const hasParameters = faq.parameters.length > 0;

  const question = hasParameters
    ? courseLanguage
      ? resolveTemplate(localization.question, faq, locale, courseLanguage)
      : (localization.defaultQuestion ??
        resolveTemplate(localization.question, faq, locale))
    : localization.question;

  // Variantes por idioma de curso (só quando o template tem placeholders) —
  // permitem ao explorador re-resolver a pergunta ao filtrar por idioma.
  const questionVariants = hasParameters
    ? Object.fromEntries(
        faq.applicableCourseLanguages.map((code) => [
          code,
          resolveTemplate(localization.question, faq, locale, code),
        ]),
      )
    : undefined;

  // Aliases totalmente expandidos: cada alias × cada idioma de curso
  // aplicável (quando há placeholders), nunca com `{...}` por resolver.
  const aliases: string[] = [];
  for (const alias of localization.searchAliases ?? []) {
    if (hasParameters) {
      for (const code of faq.applicableCourseLanguages) {
        aliases.push(resolveTemplate(alias, faq, locale, code));
      }
    } else {
      aliases.push(alias);
    }
  }

  const courseLanguageLabels = faq.applicableCourseLanguages
    .map((code) => database.targetLanguages[code]?.locales[locale])
    .filter((entry) => entry !== undefined)
    .flatMap((entry) => [entry.label, entry.learningObject, ...entry.aliases]);

  return {
    id: faq.id,
    intent: faq.intent,
    category: faq.category,
    categoryLabel: database.categories[faq.category]?.labels[locale] ?? faq.category,
    priority: faq.priority,
    searchIntent: faq.searchIntent,
    featured: faq.featured,
    applicableCourseLanguages: faq.applicableCourseLanguages,
    question,
    ...(questionVariants ? { questionVariants } : {}),
    answer: localization.answer,
    aliases,
    courseLanguageLabels,
  };
}

/** Todas as FAQs resolvidas para um locale (52, na ordem da base). */
export function getResolvedFaqs(
  locale: LocaleCode,
  courseLanguage?: FaqCourseLanguage,
): ResolvedFaq[] {
  return database.faqs.map((faq) => resolveFaq(faq, locale, courseLanguage));
}

/** As 8 FAQs de pré-visualização da home (presentation.homePreviewFaqIds). */
export function getHomePreviewFaqs(locale: LocaleCode): ResolvedFaq[] {
  const byId = new Map(
    database.faqs.map((faq) => [faq.id, resolveFaq(faq, locale)]),
  );
  return database.presentation.homePreviewFaqIds.map((id) => {
    const resolved = byId.get(id);
    if (!resolved) {
      throw new Error(`[faq] homePreviewFaqIds: ID desconhecido "${id}".`);
    }
    return resolved;
  });
}

/** Opções de filtro de categoria no locale. */
export function getFaqCategories(locale: LocaleCode): FaqCategoryOption[] {
  return Object.entries(database.categories).map(([id, category]) => ({
    id,
    label: category.labels[locale] ?? id,
  }));
}

/** Opções de filtro de idioma de curso no locale. */
export function getCourseLanguageOptions(
  locale: LocaleCode,
): FaqCourseLanguageOption[] {
  return database.offeredCourseLanguages.map((code) => ({
    code,
    label: database.targetLanguages[code]?.locales[locale]?.label ?? code,
  }));
}

/** Total de FAQs na base (52). */
export function getFaqCount(): number {
  return database.faqs.length;
}
