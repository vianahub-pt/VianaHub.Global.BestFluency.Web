import type { Metadata } from "next";
import type { ReactNode } from "react";

import { resolveLocale, locales } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { DocumentShell } from "@/shared/components/layout/document-shell";
import { buildLocaleMetadata } from "@/shared/lib/seo";

import "../globals.css";

type Params = Promise<{ locale?: string[] }>;

/**
 * Optional catch-all: /, /en/, /es/, /fr/, /de/, /it/
 * Todos os idiomas no mesmo route group → navegação client-side sem reload.
 */
export function generateStaticParams() {
  return [
    { locale: undefined },
    ...locales.filter((l) => !l.isDefault).map((l) => ({ locale: [l.segment] })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: segments } = await params;
  const segment = segments?.[0];
  const code = resolveLocale(segment);
  return buildLocaleMetadata(code, getMessages(code).landing.meta);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale: segments } = await params;
  const segment = segments?.[0];
  const code = resolveLocale(segment);
  return <DocumentShell locale={code}>{children}</DocumentShell>;
}
