"use client";

import { useCallback } from "react";

import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/shared/lib/consent";

interface CookieSettingsButtonProps {
  label: string;
  className?: string;
}

/**
 * Botão "Gerir cookies" no footer — dispara o evento interno para reabrir
 * o ConsentManager. Mantido como client component isolado para não converter
 * todo o SiteFooter em client component.
 */
export function CookieSettingsButton({
  label,
  className,
}: CookieSettingsButtonProps) {
  const handleClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {label}
    </button>
  );
}
