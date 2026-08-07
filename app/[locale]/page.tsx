import { notFound } from "next/navigation";

import { localeCodeForSegment } from "@/core/config/locales";
import { LandingPage } from "@/domains/landing/components/landing-page";

type Params = Promise<{ locale: string }>;

/** "/en/", "/es/", "/fr/", "/de/", "/it/", "/pt-br/" — landing localizada. */
export default async function LocalePage({ params }: { params: Params }) {
  const { locale: segment } = await params;
  const code = localeCodeForSegment(segment);
  if (!code) notFound();

  return <LandingPage locale={code} />;
}
