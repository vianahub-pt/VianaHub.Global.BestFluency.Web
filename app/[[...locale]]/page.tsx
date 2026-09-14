import { notFound } from "next/navigation";

import { resolvePageRoute } from "@/shared/lib/routes";
import { FaqPage } from "@/domains/faq/components/faq-page";
import { LegalPage } from "@/domains/legal/components/legal-page";
import { LandingPage } from "@/domains/landing/components/landing-page";
import { ReportagePage } from "@/domains/press/components/reportage-page";

type Params = Promise<{ locale?: string[] }>;

/** Optional catch-all: /, /en/, /privacy/, /faq/, /en/faq/, etc. */
export default async function LocalePage({ params }: { params: Params }) {
  const { locale: segments } = await params;

  const resolved = resolvePageRoute(segments);
  if (!resolved) notFound();

  if (resolved.page === "landing") {
    return <LandingPage locale={resolved.locale} />;
  }

  if (resolved.page === "faq") {
    return <FaqPage locale={resolved.locale} />;
  }

  if (resolved.page === "new-amadora") {
    return <ReportagePage locale={resolved.locale} />;
  }

  if (resolved.page === "tvi") {
    return <ReportagePage locale={resolved.locale} type="tvi" />;
  }

  return <LegalPage locale={resolved.locale} type={resolved.page} />;
}
