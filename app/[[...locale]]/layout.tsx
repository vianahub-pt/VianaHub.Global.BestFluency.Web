import type { Metadata } from "next";
import type { ReactNode } from "react";

import { locales, type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { DocumentShell } from "@/shared/components/layout/document-shell";
import { resolvePageRoute } from "@/shared/lib/routes";
import { buildLocaleMetadata } from "@/shared/lib/seo";

import "../globals.css";

type Params = Promise<{ locale?: string[] }>;

/**
 * Optional catch-all: /, /en/, /privacy/, /en/privacy/, etc.
 * Generates all 27 static variants: 9 landing + 9 privacy + 9 cookies.
 */
export function generateStaticParams() {
  const localeSegments = locales
    .filter((l) => !l.isDefault)
    .map((l) => l.segment);

  const params: { locale?: string[] }[] = [];

  // Landing pages: / , /en/ , /es/ , ...
  params.push({ locale: undefined });
  for (const seg of localeSegments) {
    params.push({ locale: [seg] });
  }

  // Legal pages: /privacy/ , /cookies/ , /en/privacy/ , ...
  const legalSlugs = ["privacy", "cookies"] as const;
  for (const slug of legalSlugs) {
    params.push({ locale: [slug] });
    for (const seg of localeSegments) {
      params.push({ locale: [seg, slug] });
    }
  }

  // Reportage pages: /reportagens/new-amadora/ , /en/reportagens/new-amadora/ , ...
  params.push({ locale: ["reportagens", "new-amadora"] });
  params.push({ locale: ["reportagens", "tvi"] });
  for (const seg of localeSegments) {
    params.push({ locale: [seg, "reportagens", "new-amadora"] });
    params.push({ locale: [seg, "reportagens", "tvi"] });
  }

  return params;
}

function getLegalMeta(
  locale: LocaleCode,
  page: "privacy" | "cookies",
): { title: string; description: string } {
  const msgs = getMessages(locale).legal[page];
  return { title: msgs.metaTitle, description: msgs.metaDescription };
}

function getReportageMeta(locale: LocaleCode): { title: string; description: string } {
  const reportage = getMessages(locale).reportage;
  return { title: reportage.title, description: reportage.intro };
}

function getTviReportageMeta(locale: LocaleCode): { title: string; description: string } {
  const reportage = getMessages(locale).tviReportage;
  return { title: reportage.title, description: reportage.intro };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: segments } = await params;
  const resolved = resolvePageRoute(segments);

  if (!resolved) {
    return buildLocaleMetadata("pt-PT", {
      title: "Best Fluency",
      description: "",
    });
  }

  if (resolved.page === "landing") {
    return buildLocaleMetadata(
      resolved.locale,
      getMessages(resolved.locale).landing.meta,
    );
  }

  if (resolved.page === "new-amadora") {
    const meta = getReportageMeta(resolved.locale);
    return buildLocaleMetadata(
      resolved.locale,
      {
        title: `${meta.title} | New in Amadora | Best Fluency`,
        description: `${meta.description} Leia o resumo da reportagem sobre a escola de línguas Best Fluency em Venda Nova, Amadora.`,
      },
      {
        page: "new-amadora",
        keywords: [
          "Best Fluency",
          "New in Amadora",
          "escola de línguas na Amadora",
          "Tatiana Viana",
          "aulas de inglês na Amadora",
          "Venda Nova Amadora",
        ],
      },
    );
  }

  if (resolved.page === "tvi") {
    const meta = getTviReportageMeta(resolved.locale);
    return buildLocaleMetadata(
      resolved.locale,
      {
        title: `${meta.title} | TVI | Best Fluency`,
        description: `${meta.description} Veja o resumo da entrevista de Tatiana Viana no Bom Dia Alegria.`,
      },
      {
        page: "tvi",
        keywords: [
          "Best Fluency",
          "TVI",
          "Bom Dia Alegria",
          "Tatiana Viana",
          "Zé Lopes",
          "Merche Romero",
          "aulas de línguas",
          "Venda Nova Amadora",
        ],
      },
    );
  }

  const legalMeta = getLegalMeta(resolved.locale, resolved.page);
  return buildLocaleMetadata(resolved.locale, legalMeta, {
    page: resolved.page,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale: segments } = await params;
  const resolved = resolvePageRoute(segments);
  const locale: LocaleCode = resolved?.locale ?? "pt-PT";
  return <DocumentShell locale={locale}>{children}</DocumentShell>;
}
