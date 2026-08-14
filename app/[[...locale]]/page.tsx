import { resolveLocale } from "@/core/config/locales";
import { LandingPage } from "@/domains/landing/components/landing-page";

type Params = Promise<{ locale?: string[] }>;

/** Optional catch-all: /, /en/, /es/, /fr/, /de/, /it/ */
export default async function LocalePage({ params }: { params: Params }) {
  const { locale: segments } = await params;
  const segment = segments?.[0];
  const code = resolveLocale(segment);
  return <LandingPage locale={code} />;
}
