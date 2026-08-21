import Script from "next/script";

import { site } from "@/core/config/site";

export function GoogleAnalytics() {
  if (!site.gaMeasurementId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${site.gaMeasurementId}');
        `}
      </Script>
    </>
  );
}
