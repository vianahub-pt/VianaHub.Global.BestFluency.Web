import { notFound } from "next/navigation";

import { resolvePageRoute } from "@/shared/lib/routes";
import { LegalPage } from "@/domains/legal/components/legal-page";
import { LandingPage } from "@/domains/landing/components/landing-page";

type Params = Promise<{ locale?: string[] }>;

/** Optional catch-all: /, /en/, /privacy/, /en/privacy/, etc. */
export default async function LocalePage({ params }: { params: Params }) {
  const { locale: segments } = await params;

  const resolved = resolvePageRoute(segments);
  if (!resolved) notFound();

  if (resolved.page === "landing") {
    return <LandingPage locale={resolved.locale} />;
  }

  return <LegalPage locale={resolved.locale} type={resolved.page} />;
}
