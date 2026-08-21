"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { site } from "@/core/config/site";
import {
  CONSENT_CHANGED_EVENT,
  readAnalyticsConsent,
  type AnalyticsConsent,
} from "@/shared/lib/consent";

/**
 * Google Analytics 4 com Basic Consent Mode v2.
 *
 * Só carrega o script externo do GA4 quando o utilizador aceitou
 * analytics. Inicializa dataLayer + gtag com consent defaults (tudo
 * denied), depois atualiza para analytics_storage = granted antes de
 * configurar o GA4.
 *
 * Reage a alterações de consentimento (ex.: revogação via footer).
 */
export function GoogleAnalytics() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const mountedRef = useRef(false);

  // Lê consentimento após montagem. Usa microtask para evitar
  // setState síncrono dentro do efeito.
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    queueMicrotask(() => {
      setConsent(readAnalyticsConsent());
    });

    function handleConsentChanged(e: Event) {
      const detail = (e as CustomEvent<AnalyticsConsent>).detail;
      setConsent(detail);
    }

    window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
    };
  }, []);

  if (!site.gaMeasurementId) return null;
  if (consent !== "accepted") return null;

  const mid = site.gaMeasurementId;

  return (
    <>
      <Script id="gtag-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `}
      </Script>
      <Script id="gtag-consent-update" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `}
      </Script>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${mid}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${mid}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
