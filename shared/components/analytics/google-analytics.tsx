"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/core/config/site";
import {
  CONSENT_CHANGED_EVENT,
  readAnalyticsConsent,
  type AnalyticsConsent,
} from "@/shared/lib/consent";

const GA_SCRIPT_ID = "bestfluency-ga4";

/**
 * Google Analytics 4 com Basic Consent Mode v2.
 *
 * Só inicializa GA4 quando o utilizador aceitou analytics.
 * Usa carregamento imperativo de script (não Next.js Script) para
 * evitar beforeInteractive dentro de client component.
 *
 * Ordem de inicialização:
 * 1. Criar window.dataLayer
 * 2. Criar window.gtag
 * 3. consent default (tudo denied)
 * 4. consent update (analytics_storage = granted, ads denied)
 * 5. gtag('js', new Date())
 * 6. gtag('config', measurementId)
 * 7. Carregar gtag.js externamente
 */
export function GoogleAnalytics() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const mountedRef = useRef(false);

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

  useEffect(() => {
    if (consent !== "accepted") return;
    if (!site.gaMeasurementId) return;

    const mid = site.gaMeasurementId;

    // Evitar inicialização múltipla.
    if (document.getElementById(GA_SCRIPT_ID)) return;

    // 1. Criar dataLayer
    window.dataLayer = window.dataLayer || [];

    // 2. Criar gtag
    if (typeof window.gtag !== "function") {
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
    }

    // 3. Consent default (tudo denied)
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    // 4. Consent update (analytics granted, ads denied)
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    // 5. gtag('js', new Date())
    window.gtag("js", new Date());

    // 6. gtag('config', measurementId)
    window.gtag("config", mid, { send_page_view: true });

    // 7. Carregar gtag.js externamente
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${mid}`;
    document.head.appendChild(script);
  }, [consent]);

  // Este componente não renderiza nada — toda a inicialização é imperativa.
  return null;
}
