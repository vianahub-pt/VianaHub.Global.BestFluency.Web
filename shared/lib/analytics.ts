/**
 * Fundação de medição e conversões (spec §20 e §22).
 *
 * Fase 2 (consentimento): GA4 disponível após aceite do utilizador.
 * Cloudflare Web Analytics continua sem cookies e sem consentimento.
 *
 * Eventos de conversão são instrumentados num dataLayer tipado. Só são
 * enviados ao GA4 (via window.gtag) quando:
 *   - consent === "accepted"
 *   - window.gtag está disponível (script GA4 carregado)
 *
 * Eventos disparados ANTES do consentimento NÃO são enviados
 * retroativamente ao GA4.
 */

import { readAnalyticsConsent } from "@/shared/lib/consent";

/** Secções da landing reconhecidas para atribuição de conversões (spec §20). */
export const analyticsSections = [
  "header",
  "hero",
  "individual",
  "group",
  "in_person",
  "best_kids",
  "method",
  "testimonials",
  "founder",
  "journey",
  "faq",
  "final_cta",
  "footer",
] as const;

export type AnalyticsSection = (typeof analyticsSections)[number];

/** Modalidades elegíveis para atribuição nos CTAs de conversão. */
export type AnalyticsModality = "individual" | "group" | "best_kids";

/** Parâmetros UTM da sessão, quando disponíveis. */
export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export type AnalyticsEvent =
  | {
      name: "whatsapp_click";
      params: {
        section: AnalyticsSection;
        cta_label: string;
        modality?: AnalyticsModality;
      } & UtmParams;
    }
  | { name: "phone_click"; params: { section: AnalyticsSection } & UtmParams }
  | { name: "location_click"; params: { section: AnalyticsSection } & UtmParams }
  | { name: "faq_open"; params: { question: string } & UtmParams };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Chave do `sessionStorage` onde os parâmetros UTM da sessão são persistidos.
 *
 * O `sessionStorage` é usado porque a navegação SPA do Next.js App Router cria
 * novas instâncias do módulo por chunk/segmento de rota: uma cache apenas em
 * memória (`sessionUtmParams`) é reiniciada ao navegar entre rotas de idioma
 * (ex.: `/` → `/en/`), perdendo os UTM capturados na entrada da sessão. O
 * `sessionStorage` sobrevive à navegação SPA e à recarga dentro da mesma aba.
 */
const UTM_SESSION_STORAGE_KEY = "best-fluency:utm:session";

/**
 * Cache de memória dos parâmetros UTM (primeira leitura rápida).
 *
 * Serve apenas como cache da instância do módulo: a fonte de verdade da sessão
 * é o `sessionStorage`. É inicializada a partir do storage e mantém os UTM
 * durante a vida da instância do módulo.
 */
let sessionUtmParams: UtmParams | null = null;

/**
 * Lê os parâmetros UTM persistidos no `sessionStorage` da sessão.
 *
 * @returns os UTM já capturados nesta sessão (pode ser `{}` quando a sessão foi
 *          capturada sem UTM) ou `null` quando ainda nada foi capturado
 *          (primeira visita) ou o storage está indisponível.
 */
function readStoredUtmParams(): UtmParams | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(UTM_SESSION_STORAGE_KEY);
    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;

    const utm: UtmParams = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ] as const) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string" && value) utm[key] = value;
    }
    return utm;
  } catch {
    // sessionStorage indisponível (modo privado/restrições) ou conteúdo
    // corrompido: trata como não capturado sem quebrar a medição.
    return null;
  }
}

/**
 * Persiste os parâmetros UTM no `sessionStorage` da sessão.
 *
 * Grava sempre o objeto capturado (mesmo vazio) para que navegações seguintes
 * sem UTM não sobrescrevam nem reintroduzam parâmetros da URL atual.
 */
function storeUtmParams(utm: UtmParams): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(UTM_SESSION_STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // sessionStorage indisponível: a sessão segue a usar apenas a cache em
    // memória desta instância do módulo (degrada sem quebrar a medição).
  }
}

/**
 * Lê os parâmetros UTM da sessão (client-side apenas).
 *
 * A leitura de `window.location.search` acontece UMA única vez por sessão, na
 * primeira chamada. Nas chamadas seguintes reutiliza os UTM persistidos no
 * `sessionStorage` (sobrevivendo à navegação SPA entre rotas de idioma) e a
 * cache em memória da instância do módulo. Assim, uma visita originada por
 * campanha mantém a atribuição mesmo que o utilizador navegue para `/en/`,
 * `/es/` etc. (URLs sem UTM) ou recarregue a página.
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  if (sessionUtmParams) return sessionUtmParams;

  const stored = readStoredUtmParams();
  if (stored !== null) {
    sessionUtmParams = stored;
    return stored;
  }

  // Primeira visita da sessão: captura os UTM da URL de entrada apenas.
  const search = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};

  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ] as const) {
    const value = search.get(key);
    if (value) utm[key] = value;
  }

  // Persiste mesmo quando vazio: marca a sessão como "já capturada" para que a
  // navegação seguinte (ex.: /en/ sem UTM) não recapture da nova URL.
  storeUtmParams(utm);

  sessionUtmParams = utm;
  return sessionUtmParams;
}

/**
 * Regista um evento de conversão.
 *
 * - Sem consentimento: apenas console.debug em dev. NENHUM push ao dataLayer.
 * - Com consentimento: envia para GA4 via window.gtag (que usa dataLayer internamente).
 * - Sem duplicação: gtag já utiliza dataLayer, não fazemos push separado.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event.params);
  }

  // Só enviar ao GA quando consentido E gtag disponível.
  if (
    readAnalyticsConsent() === "accepted" &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", event.name, event.params);
  }
}

/**
 * Helper central do evento de conversão `whatsapp_click` (spec §20).
 *
 * Deve ser o ÚNICO ponto de emissão para CTAs de WhatsApp: garante os
 * parâmetros obrigatórios (`section`, `cta_label`), o `modality` quando
 * aplicável e os UTM da sessão quando disponíveis.
 *
 * @param section  Secção da landing onde o CTA está (ex.: "hero", "footer").
 * @param ctaLabel Rótulo visível do CTA (ex.: "Marcar aula experimental").
 * @param modality Modalidade quando o CTA pertence a uma modalidade
 *                 (individual, group ou best_kids).
 */
export function trackWhatsAppClick(
  section: AnalyticsSection,
  ctaLabel: string,
  modality?: AnalyticsModality,
): void {
  trackEvent({
    name: "whatsapp_click",
    params: {
      section,
      cta_label: ctaLabel,
      ...(modality ? { modality } : {}),
      ...captureUtmParams(),
    },
  });
}
