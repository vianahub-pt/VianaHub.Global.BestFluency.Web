"use client";

import CN from "country-flag-icons/react/3x2/CN";
import DE from "country-flag-icons/react/3x2/DE";
import ES from "country-flag-icons/react/3x2/ES";
import FR from "country-flag-icons/react/3x2/FR";
import IT from "country-flag-icons/react/3x2/IT";
import JP from "country-flag-icons/react/3x2/JP";
import PT from "country-flag-icons/react/3x2/PT";
import RU from "country-flag-icons/react/3x2/RU";
import US from "country-flag-icons/react/3x2/US";
import type { FlagComponent } from "country-flag-icons/react/3x2";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { getLocale, locales, type LocaleCode } from "@/core/config/locales";
import { saveScrollPosition } from "@/shared/components/ui/scroll-preservation";

interface LocaleSwitcherProps {
  currentLocale: LocaleCode;
  label: string;
}

/** Bandeira (SVG 3:2) do país que representa cada idioma do registo. */
const flagByLocale: Record<LocaleCode, FlagComponent> = {
  "pt-PT": PT,
  "en-US": US,
  "es-ES": ES,
  "fr-FR": FR,
  "de-DE": DE,
  "it-IT": IT,
  "ja-JP": JP,
  "ru-RU": RU,
  "zh-CN": CN,
};

/**
 * Seletor de idioma com dropdown customizado.
 * Substitui o Radix UI Select que tinha bugs de touch no mobile.
 */
export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const current = getLocale(currentLocale);
  const CurrentFlag = flagByLocale[currentLocale];
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = useCallback(
    (code: string) => {
      const locale = locales.find((l) => l.code === code);
      if (locale && locale.code !== currentLocale) {
        saveScrollPosition();
        router.replace(locale.path, { scroll: false });
      }
      setIsOpen(false);
    },
    [currentLocale, router],
  );

  // Fecha ao clicar fora
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: PointerEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={`${label}: ${current.label}`}
        aria-expanded={isOpen}
        className="inline-flex min-h-11 w-40 shrink-0 items-center gap-1.5 rounded-md border-0 bg-white/20 px-3 text-sm font-medium text-foreground hover:bg-white hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <CurrentFlag
          className="h-4 w-6 shrink-0 rounded-[2px] object-cover"
          aria-hidden="true"
        />
        <span className="flex-1 text-left">{current.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-full z-50 mt-1 max-h-72 w-full min-w-[10rem] overflow-auto rounded-md border border-border bg-popover py-1 shadow-md"
        >
          {locales.map((locale) => {
            const isCurrent = locale.code === currentLocale;
            const Flag = flagByLocale[locale.code];
            return (
              <li
                key={locale.code}
                role="option"
                aria-selected={isCurrent}
                onClick={() => handleLocaleChange(locale.code)}
                className="flex min-h-11 cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-accent focus:bg-accent"
              >
                <Flag
                  className="h-4 w-6 shrink-0 rounded-[2px] object-cover"
                  aria-hidden="true"
                />
                <span className="flex-1">{locale.label}</span>
                {isCurrent && (
                  <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
