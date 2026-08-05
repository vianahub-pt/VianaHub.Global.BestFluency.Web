/**
 * Fundação de medição e conversões (spec §20 e §22).
 *
 * Fase 1: Cloudflare Web Analytics (visitas + Core Web Vitals, sem cookies).
 * Os eventos de conversão são enviados para um dataLayer tipado, pronto para
 * GA4 / Google Ads / Meta Pixel quando existir consentimento (ver ADR 0001).
 */

/** Secções da landing reconhecidas para atribuição de conversões (spec §20). */
export const analyticsSections = [
  "header",
  "hero",
  "individual",
  "group",
  "best_kids",
  "testimonials",
  "journey",
  "final_cta",
  "footer",
  "foundation",
] as const;

export type AnalyticsSection = (typeof analyticsSections)[number];

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
    dataLayer?: Record<string, unknown>[];
  }
}

/** Lê os parâmetros UTM do URL atual (client-side apenas). */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

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

  return utm;
}

/**
 * Regista um evento de conversão. Sem fornecedor acoplado:
 * escreve no dataLayer (futuro GA4/GTM) e faz log em desenvolvimento.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: event.name, ...event.params });

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event.params);
  }
}
