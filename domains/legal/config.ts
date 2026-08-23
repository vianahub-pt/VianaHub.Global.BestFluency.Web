import type { LocaleCode } from "@/core/config/locales";

/**
 * Data de publicação/versão das políticas legais.
 * Única fonte de verdade — alterações futuras devem atualizar apenas esta constante.
 * Armazenada como componentes UTC para evitar problemas de timezone.
 */
export const LEGAL_LAST_UPDATED = { year: 2026, month: 7, day: 23 } as const;

/**
 * Mapeamento de LocaleCode para BCP 47 language tag used by Intl.DateTimeFormat.
 */
const LOCALE_DATE_LOCALE: Record<LocaleCode, string> = {
  "pt-PT": "pt-PT",
  "en-US": "en-US",
  "es-ES": "es-ES",
  "fr-FR": "fr-FR",
  "de-DE": "de-DE",
  "it-IT": "it-IT",
  "ja-JP": "ja-JP",
  "ru-RU": "ru-RU",
  "zh-CN": "zh-CN",
};

/**
 * Formata a data da política no idioma correto usando Intl.DateTimeFormat.
 *
 * Exemplos:
 *   pt-PT → "23 de agosto de 2026"
 *   en-US → "August 23, 2026"
 *   ja-JP → "2026年8月23日"
 */
export function formatLegalDate(locale: LocaleCode): string {
  const { year, month, day } = LEGAL_LAST_UPDATED;
  const date = new Date(Date.UTC(year, month, day));
  return new Intl.DateTimeFormat(LOCALE_DATE_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
