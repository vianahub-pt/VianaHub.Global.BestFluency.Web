import Script from "next/script";

import { site } from "@/core/config/site";

/**
 * Cloudflare Web Analytics (spec §22): métricas básicas e Core Web Vitals
 * reais sem cookies nem consentimento. Só é injetado quando existe token.
 * GA4 / Google Ads / Meta Pixel ficam para depois do mecanismo de
 * consentimento (ver ADR 0001).
 */
export function CloudflareWebAnalytics() {
  if (!site.cfAnalyticsToken) return null;

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: site.cfAnalyticsToken })}
      strategy="afterInteractive"
    />
  );
}
