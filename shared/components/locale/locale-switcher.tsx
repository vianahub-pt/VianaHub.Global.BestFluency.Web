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
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { getLocale, locales, type LocaleCode } from "@/core/config/locales";
import { saveScrollPosition } from "@/shared/components/ui/scroll-preservation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

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
 * Seletor de idioma — todos os idiomas usam o mesmo optional catch-all root.
 * A posição visual é guardada antes da navegação e restaurada no novo locale.
 */
export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const current = getLocale(currentLocale);
  const CurrentFlag = flagByLocale[currentLocale];
  const router = useRouter();

  const handleLocaleChange = useCallback(
    (code: string) => {
      const locale = locales.find((l) => l.code === code);
      if (locale && locale.code !== currentLocale) {
        saveScrollPosition();
        router.replace(locale.path, { scroll: false });
      }
    },
    [currentLocale, router],
  );

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger
        aria-label={`${label}: ${current.label}`}
        className="min-h-11 w-40 shrink-0 border-0 bg-white/20 px-3 text-sm font-medium text-foreground hover:bg-white hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <CurrentFlag
          className="mr-1.5 h-4 w-6 rounded-[2px] object-cover"
          aria-hidden="true"
        />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((locale) => {
          const isCurrent = locale.code === currentLocale;
          const Flag = flagByLocale[locale.code];
          return (
            <SelectItem
              key={locale.code}
              value={locale.code}
              className="py-2.5 hover:bg-accent focus:bg-accent data-[highlighted]:bg-accent"
            >
              <span className="flex items-center gap-2">
                <span className={isCurrent ? "font-semibold" : ""}>
                  {locale.label}
                </span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
