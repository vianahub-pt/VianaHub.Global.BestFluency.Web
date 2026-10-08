import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/shared/lib/seo";

export const dynamic = "force-static";

/**
 * Áreas privadas e payload interno do Next — únicos caminhos com Disallow
 * (issue #79). `/_next/static/` NÃO é bloqueado: os assets precisam de ser
 * rastreáveis para que os motores de busca renderizem as páginas.
 */
const DISALLOWED_PATHS = ["/admin/", "/api/", "/_next/data/"] as const;

/**
 * Parâmetros de tracking (utm_*, fbclid, gclid, msclkid, ref): impede o
 * rastreamento de URLs duplicadas com query string. O padrão `/*?*<param>`
 * também cobre parâmetros combinados na mesma query string
 * (ex.: `?utm_source=x&fbclid=y`).
 */
const DISALLOWED_TRACKING_PARAMS = [
  "/*?*utm_",
  "/*?*fbclid=",
  "/*?*gclid=",
  "/*?*msclkid=",
  "/*?*ref=",
] as const;

/**
 * Páginas legais: rastreáveis (follow) mas com noindex via meta robots
 * (buildLocaleMetadata). O Allow explícito documenta a intenção e prevalece
 * por especificidade caso um dia exista Disallow de caminho-pai.
 */
const LEGAL_PATHS = ["/privacy/", "/cookies/"] as const;

/**
 * Content Signals (contentsignals.org — proposta IETF AI Preferences):
 * declara, dentro do grupo User-Agent, como o conteúdo pode ser usado após
 * o acesso. A landing quer visibilidade em pesquisa e em agentes de IA:
 * ai-train=yes, search=yes, ai-input=yes.
 */
const CONTENT_SIGNAL = "ai-train=yes, search=yes, ai-input=yes";

/**
 * Crawlers de IA e de pesquisa explicitamente autorizados (issue #79).
 * Grupo próprio com as mesmas regras do grupo geral: grupos de robots.txt
 * não herdam regras entre si, por isso o registo nominal garante Allow e
 * Content-Signal para cada um destes agentes.
 */
const AI_AND_SEARCH_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "meta-externalagent",
  "Bytespider",
  "Amazonbot",
  "CCBot",
] as const;

/**
 * robots.txt estático gerado via metadata route (decisão registada em
 * docs/adr/ADR-0002): o campo `other` do Next 16.3 emite diretivas
 * não-standard (Content-Signal) dentro do grupo User-Agent, e a URL do
 * sitemap deriva de NEXT_PUBLIC_SITE_URL — fonte única enquanto o domínio
 * definitivo está pendente (ADR-0001).
 *
 * A indexação efetiva é controlada por página via meta robots (noindex até
 * ao lançamento oficial — ver ADR 0001).
 */
export default function robots(): MetadataRoute.Robots {
  const sharedAllow = ["/", ...LEGAL_PATHS];
  const sharedDisallow = [...DISALLOWED_PATHS, ...DISALLOWED_TRACKING_PARAMS];

  return {
    rules: [
      {
        userAgent: "*",
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: { "Content-Signal": CONTENT_SIGNAL },
      },
      {
        userAgent: [...AI_AND_SEARCH_CRAWLERS],
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: { "Content-Signal": CONTENT_SIGNAL },
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
