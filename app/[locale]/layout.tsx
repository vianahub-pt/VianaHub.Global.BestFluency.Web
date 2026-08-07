import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import {
  localeCodeForSegment,
  nonDefaultLocales,
} from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";
import { DocumentShell } from "@/shared/components/layout/document-shell";
import { buildLocaleMetadata } from "@/shared/lib/seo";

import "../globals.css";

type Params = Promise<{ locale: string }>;

/** Apenas os 6 idiomas não-default são gerados estaticamente. */
export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale: locale.segment }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: segment } = await params;
  const code = localeCodeForSegment(segment);
  if (!code) return {};

  return buildLocaleMetadata(code, getLandingContent(code).meta);
}

/** Root layout por idioma: garante <html lang> estático e correto. */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale: segment } = await params;
  const code = localeCodeForSegment(segment);
  if (!code) notFound();

  return <DocumentShell locale={code}>{children}</DocumentShell>;
}
