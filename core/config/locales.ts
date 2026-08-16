/**
 * Registo único de idiomas da landing.
 *
 * Regras do projeto (AGENTS.md / kanban-flow):
 * - pt-PT é a versão principal e vive na raiz "/".
 * - Cada idioma tem URL própria; nunca trocar idioma apenas por JavaScript.
 * - hreflang recíproco + x-default para "/"; sem variante britânica.
 * - Sem fallback silencioso que misture idiomas: todos os locales publicados
 *   têm conteúdo completo com as mesmas chaves (garantido por tipo).
 */
export const locales = [
  {
    code: "pt-PT",
    segment: null,
    path: "/",
    hreflang: "pt-PT",
    ogLocale: "pt_PT",
    label: "Português",
    shortLabel: "PT",
    isDefault: true,
  },
  {
    code: "en-US",
    segment: "en",
    path: "/en/",
    hreflang: "en-US",
    ogLocale: "en_US",
    label: "English",
    shortLabel: "EN",
    isDefault: false,
  },
  {
    code: "es-ES",
    segment: "es",
    path: "/es/",
    hreflang: "es-ES",
    ogLocale: "es_ES",
    label: "Español",
    shortLabel: "ES",
    isDefault: false,
  },
  {
    code: "fr-FR",
    segment: "fr",
    path: "/fr/",
    hreflang: "fr-FR",
    ogLocale: "fr_FR",
    label: "Français",
    shortLabel: "FR",
    isDefault: false,
  },
  {
    code: "de-DE",
    segment: "de",
    path: "/de/",
    hreflang: "de-DE",
    ogLocale: "de_DE",
    label: "Deutsch",
    shortLabel: "DE",
    isDefault: false,
  },
  {
    code: "it-IT",
    segment: "it",
    path: "/it/",
    hreflang: "it-IT",
    ogLocale: "it_IT",
    label: "Italiano",
    shortLabel: "IT",
    isDefault: false,
  },
] as const;

export type LocaleCode = (typeof locales)[number]["code"];

/** Segmentos de URL válidos para o segmento dinâmico [locale] (sem o default). */
export const nonDefaultLocales = locales.filter((l) => !l.isDefault);

export type LocaleSegment = (typeof nonDefaultLocales)[number]["segment"];

const segmentToCode = new Map<string, LocaleCode>(
  nonDefaultLocales.map((l) => [l.segment, l.code]),
);

/** Resolve o segmento de URL para o código de locale. Devolve null se inválido. */
export function localeCodeForSegment(segment: string): LocaleCode | null {
  return segmentToCode.get(segment) ?? null;
}

/**
 * Resolve o segmento do optional catch-all [[...locale]].
 * segment = undefined → pt-PT (raiz "/").
 * segment = "en" → en-US, etc.
 */
export function resolveLocale(segment?: string): LocaleCode {
  if (!segment) return "pt-PT";
  return localeCodeForSegment(segment) ?? "pt-PT";
}

export function getLocale(code: LocaleCode) {
  const locale = locales.find((l) => l.code === code);
  if (!locale) {
    throw new Error(`Locale não registado: ${code}`);
  }
  return locale;
}
