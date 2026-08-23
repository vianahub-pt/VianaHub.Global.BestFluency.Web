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

  return params;
}

function getLegalMeta(
  locale: LocaleCode,
  page: "privacy" | "cookies",
): { title: string; description: string } {
  const msgs = getMessages(locale).legal[page];
  return { title: msgs.metaTitle, description: msgs.metaDescription };
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
