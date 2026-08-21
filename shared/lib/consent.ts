/**
 * Consentimento de analytics — Basic Consent Mode v2 (Google).
 *
 * Centraliza a leitura/escrita da preferência de consentimento do
 * utilizador em localStorage. O primeiro render NÃO deve aceder ao
 * localStorage (evita hydration mismatch); a leitura acontece
 * exclusivamente em client components após a montagem.
 *
 * Fluxo:
 * 1. Sem decisão → banner visível, GA bloqueado.
 * 2. "accepted"  → GA carrega, analytics_storage = granted.
 * 3. "rejected"  → GA nunca carrega, analytics_storage = denied.
 * 4. Alteração posterior via footer ("Gerir cookies").
 */

export type AnalyticsConsent = "accepted" | "rejected";

const CONSENT_STORAGE_KEY = "bestfluency:consent:v1";

/** Evento disparado quando o utilizador altera a decisão de consentimento. */
export const CONSENT_CHANGED_EVENT = "bestfluency:consent-changed" as const;

/** Evento disparado quando o utilizador clica "Gerir cookies" no footer. */
export const OPEN_COOKIE_PREFERENCES_EVENT =
  "bestfluency:open-cookie-preferences" as const;

/**
 * Lê o consentimento persistido no localStorage.
 * SEGURANÇO: só chamar em client-side (após montagem do componente).
 */
export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
    return null;
  } catch {
    return null;
  }
}

/**
 * Persiste a decisão de consentimento e dispara evento interno.
 */
export function writeAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // localStorage indisponível: degrada sem quebrar.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: consent }));
}

/**
 * Verifica se o utilizador já tomou uma decisão.
 */
export function hasAnalyticsConsent(): boolean {
  return readAnalyticsConsent() !== null;
}
