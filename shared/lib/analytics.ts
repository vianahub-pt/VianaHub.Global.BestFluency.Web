/**
 * Fundação de medição e conversões (spec §20 e §22).
 *
 * Fase 1 (issue #12): Cloudflare Web Analytics para visitas/páginas/origens/
 * dispositivos/países/CWV reais — sem cookies e sem consentimento. Os eventos
 * de conversão ficam instrumentados num dataLayer tipado, prontos para GA4 /
 * Google Ads / Meta Pixel APENAS quando existir plano de medição aprovado,
 * consentimento para tecnologias não essenciais, política de privacidade e
 * cookies atualizada e mecanismo para aceitar/recusar/alterar preferências
 * (spec §22 e §29; ADR-0001).
 *
 * Nesta fase NENHUM script de GA4/Google Ads/Meta Pixel é carregado e nenhum
 * cookie não essencial é gravado.
 */

/** Secções da landing reconhecidas para atribuição de conversões (spec §20). */
export const analyticsSections = [
  "header",
  "hero",
  "individual",
  "group",
  "in_person",
  "best_kids",
  "testimonials",
  "journey",
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
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Cache de sessão dos parâmetros UTM.
 *
 * Os UTM são lidos de `window.location.search` UMA única vez por sessão (na
 * primeira chamada, client-side) e reutilizados em todos os eventos seguintes.
 * Assim, uma visita originada por campanha mantém a atribuição mesmo que o
 * utilizador navegue entre rotas de idioma da landing (que mudam a URL sem
 * UTM) ou recarregue a página.
 *
 * O módulo é partilhado entre cliente e servidor durante o build estático;
 * por isso a leitura é guardada com `typeof window === "undefined"`.
 */
let sessionUtmParams: UtmParams | null = null;

/** Lê os parâmetros UTM do URL de entrada da sessão (client-side apenas). */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  if (sessionUtmParams) return sessionUtmParams;

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

  sessionUtmParams = utm;
  return sessionUtmParams;
}

/**
 * Regista um evento de conversão. Sem fornecedor acoplado:
 * escreve no dataLayer (futuro GA4/GTM, com consentimento) e faz log em
 * desenvolvimento para validação manual em devtools (aceite #12).
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: event.name, ...event.params });

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event.params);
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
