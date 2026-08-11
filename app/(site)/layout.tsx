import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getLandingContent } from "@/domains/landing/i18n";
import { DocumentShell } from "@/shared/components/layout/document-shell";
import { buildLocaleMetadata } from "@/shared/lib/seo";

import "../globals.css";

export const metadata: Metadata = buildLocaleMetadata(
  "pt-PT",
  getLandingContent("pt-PT").meta,
);

/** Root layout do idioma principal (pt-PT), publicado na raiz "/". */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <DocumentShell locale="pt-PT">{children}</DocumentShell>;
}
