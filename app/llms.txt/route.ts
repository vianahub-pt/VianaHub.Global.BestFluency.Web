import { getMessages } from "@/core/i18n";
import { locales } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { absoluteUrl } from "@/shared/lib/seo";
import {
  buildFaqPath,
  buildHomePath,
  buildReportagePath,
  buildTviReportagePath,
} from "@/shared/lib/routes";

export const dynamic = "force-static";

/**
 * llms.txt (convenção llmstxt.org): índice em Markdown para agentes de IA
 * descobrirem as 9 variantes de idioma e as páginas públicas da landing
 * (issue #79 — home, FAQ e as reportagens New in Amadora e TVI).
 *
 * Gerado como route handler estático (mesma decisão do robots — ADR-0002):
 * as URLs derivam de NEXT_PUBLIC_SITE_URL e os textos de core/i18n, sem
 * duplicar conteúdo nem hardcodar o domínio (pendente — ADR-0001).
 * As páginas legais (/privacy/, /cookies/) ficam de fora por serem noindex.
 */

function entry(title: string, url: string, description: string): string {
  return `- [${title}](${url}): ${description}`;
}

function buildLlmsTxt(): string {
  const home: string[] = [];
  const faq: string[] = [];
  const newAmadora: string[] = [];
  const tvi: string[] = [];

  for (const locale of locales) {
    const messages = getMessages(locale.code);
    const variant = `${locale.label} (${locale.hreflang})`;

    home.push(
      entry(
        `${messages.landing.meta.title} — ${variant}`,
        absoluteUrl(buildHomePath(locale.code)),
        messages.landing.meta.description,
      ),
    );
    faq.push(
      entry(
        `${messages.faqPage.metaTitle} — ${variant}`,
        absoluteUrl(buildFaqPath(locale.code)),
        messages.faqPage.metaDescription,
      ),
    );
    newAmadora.push(
      entry(
        `${messages.reportage.title} — ${variant}`,
        absoluteUrl(buildReportagePath(locale.code)),
        messages.reportage.intro,
      ),
    );
    tvi.push(
      entry(
        `${messages.tviReportage.title} — ${variant}`,
        absoluteUrl(buildTviReportagePath(locale.code)),
        messages.tviReportage.intro,
      ),
    );
  }

  return [
    `# ${site.name}`,
    "",
    `> Escola de idiomas na ${site.address.locality} (${site.address.region}, Portugal), com aulas presenciais e online. Website estático multilingue: a versão principal é Português (pt-PT) na raiz "/" e cada uma das ${locales.length} variantes de idioma tem URL própria com hreflang recíproco e x-default para "/".`,
    "",
    `Contactos: ${site.phoneDisplay} · ${site.address.street}, ${site.address.locality}.`,
    "",
    "## Home",
    "",
    ...home,
    "",
    "## FAQ",
    "",
    ...faq,
    "",
    "## Reportagem — New in Amadora",
    "",
    ...newAmadora,
    "",
    "## Reportagem — TVI · Bom Dia Alegria",
    "",
    ...tvi,
    "",
  ].join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
