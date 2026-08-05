"use client";

import type { ReactNode } from "react";

import {
  captureUtmParams,
  trackEvent,
  type AnalyticsModality,
  type AnalyticsSection,
} from "@/shared/lib/analytics";
import { buildWhatsAppUrl } from "@/shared/lib/whatsapp";

interface WhatsAppLinkProps {
  message: string;
  section: AnalyticsSection;
  ctaLabel: string;
  modality?: AnalyticsModality;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

/**
 * Link de conversão para o WhatsApp (spec §20):
 * - abre numa nova aba com rel="noopener noreferrer";
 * - aria-label contextual e área de toque adequada (via className);
 * - regista o evento whatsapp_click com section, cta_label, modality e UTM.
 */
export function WhatsAppLink({
  message,
  section,
  ctaLabel,
  modality,
  ariaLabel,
  className,
  children,
}: WhatsAppLinkProps) {
  function handleClick() {
    trackEvent({
      name: "whatsapp_click",
      params: {
        section,
        cta_label: ctaLabel,
        ...(modality ? { modality } : {}),
        ...captureUtmParams(),
      },
    });
  }

  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
