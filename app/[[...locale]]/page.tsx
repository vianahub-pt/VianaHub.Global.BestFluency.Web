import { notFound } from "next/navigation";

import { localeCodeForSegment } from "@/core/config/locales";
import { LandingPage } from "@/domains/landing/components/landing-page";

type Params = Promise<{ locale?: string[] }>;

/** Optional catch-all: /, /en/, /es/, /fr/, /de/, /it/ */
export default async function LocalePage({ params }: { params: Params }) {
  const { locale: segments } = await params;

  if (!segments?.length) {
    return <LandingPage locale="pt-PT" />;
  }

  if (segments.length !== 1) notFound();

  const code = localeCodeForSegment(segments[0]);
  if (!code) notFound();

  return <LandingPage locale={code} />;
}
