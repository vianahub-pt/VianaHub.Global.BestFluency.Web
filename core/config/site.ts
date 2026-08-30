/**
 * Configuração global do site Best Fluency.
 *
 * Apenas dados confirmados na especificação V2 (docs/landing-page-spec-v2.md).
 * Nada aqui pode ser inventado: domínio definitivo, código postal, horários,
 * e-mail, links sociais e coordenadas continuam pendentes (ver ADR 0001).
 */
export const site = {
  name: "Best Fluency Language School",
  shortName: "Best Fluency",

  /**
   * URL pública definitiva. Em produção deve vir de NEXT_PUBLIC_SITE_URL.
   * O fallback local existe apenas para desenvolvimento e scaffold.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * Enquanto o domínio definitivo e o conteúdo final não são publicados,
   * as páginas saem com noindex. Ativar com NEXT_PUBLIC_SITE_INDEXABLE=true
   * apenas no lançamento oficial.
   */
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",

  /**
   * Token do Cloudflare Web Analytics (sem cookies; vazio = desativado).
   *
   * Ativado por `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` (ver docs/analytics-kpis.md
   * e .env.example). O token real será fornecido quando o domínio definitivo
   * estiver publicado — enquanto vazio, o beacon não é injetado (spec §22).
   */
  cfAnalyticsToken: process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN ?? "",

  /**
   * Google Analytics 4 Measurement ID (G-XXXXXXXXXX).
   * Activated via NEXT_PUBLIC_GA_MEASUREMENT_ID.
   */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",

  /** Contactos confirmados (spec §12, §19 e §20). */
  phoneDisplay: "+351 214 744 028",
  phoneHref: "+351214744028",
  whatsappNumber: "351214744028",

  /** Morada confirmada (spec §12). */
  address: {
    venue: "Espaço CASA",
    street: "Avenida Chaby Pinheiro, 5",
    locality: "Venda Nova — Amadora",
    region: "Lisboa",
    country: "PT",
  },

  /** Redes sociais — canais secundários (não compete com WhatsApp CTA). */
  social: {
    instagram: "https://www.instagram.com/bestfluencyoficial",
    linkedin: "https://www.linkedin.com/company/bestfluency",
  },
} as const;
