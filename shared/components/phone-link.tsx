"use client";

import type { ReactNode } from "react";

import {
  captureUtmParams,
  trackEvent,
  type AnalyticsSection,
} from "@/shared/lib/analytics";

interface PhoneLinkProps {
  href: string;
  section: AnalyticsSection;
  className?: string;
  children: ReactNode;
}

/**
 * Link clicável para o telefone (spec §19 e §20).
 *
 * - `href="tel:+..."` com a morada/telefone visíveis no HTML;
 * - regista o evento `phone_click` com a secção de origem;
 * - área de toque ≥ 44 px garantida via className (min-h-11).
 */
export function PhoneLink({
  href,
  section,
  className,
  children,
}: PhoneLinkProps) {
  function handleClick() {
    trackEvent({
      name: "phone_click",
      params: { section, ...captureUtmParams() },
    });
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
