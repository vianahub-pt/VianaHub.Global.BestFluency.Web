"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import {
  OPEN_COOKIE_PREFERENCES_EVENT,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsent,
} from "@/shared/lib/consent";

interface ConsentManagerProps {
  locale: LocaleCode;
}

/**
 * Gestor de consentimento de analytics (Basic Consent Mode v2).
 *
 * - Sem decisão → mostra banner.
 * - "accepted" → GA pode carregar.
 * - "rejected" → GA nunca carrega.
 * - Reage ao evento "Gerir cookies" (footer) para reabrir o banner.
 * - Não usa aria-modal (evita necessidade de focus trap complexo).
 */
export function ConsentManager({ locale }: ConsentManagerProps) {
  const content = getMessages(locale).landing.cookieConsent;
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const rejectButtonRef = useRef<HTMLButtonElement>(null);

  // Lê consentimento após montagem (evita hydration mismatch).
  // Usa microtask para evitar setState síncrono dentro do efeito.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    queueMicrotask(() => {
      const stored = readAnalyticsConsent();
      setConsent(stored);
      if (stored === null) {
        setShowBanner(true);
      }
    });
  }, []);

  // Reage ao evento "Gerir cookies" do footer.
  useEffect(() => {
    function handleOpenPreferences() {
      setShowBanner(true);
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    };
  }, []);

  // Foco no botão "Recusar" quando o banner aparece.
  useEffect(() => {
    if (showBanner && rejectButtonRef.current) {
      rejectButtonRef.current.focus();
    }
  }, [showBanner]);

  const handleAccept = useCallback(() => {
    writeAnalyticsConsent("accepted");
    setConsent("accepted");
    setShowBanner(false);
  }, []);

  const handleReject = useCallback(() => {
    writeAnalyticsConsent("rejected");
    setConsent("rejected");
    setShowBanner(false);
  }, []);

  if (!showBanner || consent !== null) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      aria-label={content.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8">
        <div className="flex-1">
          <h2
            id="cookie-consent-title"
            className="text-base font-semibold text-foreground"
          >
            {content.title}
          </h2>
          <p
            id="cookie-consent-desc"
            className="mt-1 text-sm leading-relaxed text-muted-foreground"
          >
            {content.description}
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            ref={rejectButtonRef}
            type="button"
            onClick={handleReject}
            className="inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {content.reject}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {content.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
