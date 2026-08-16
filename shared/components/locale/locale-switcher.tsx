"use client";

import { Check, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { getLocale, locales, type LocaleCode } from "@/core/config/locales";
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

/**
 * Seletor de idioma — navegação via useRouter para evitar reload completo
 * ao transitar entre route groups diferentes ((site) ↔ [locale]).
 */
export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const current = getLocale(currentLocale);
  const router = useRouter();

  const handleLocaleChange = useCallback(
    (code: string) => {
      const locale = locales.find((l) => l.code === code);
      if (locale && locale.code !== currentLocale) {
        router.push(locale.path, { scroll: false });
      }
    },
    [currentLocale, router],
  );

  return (
    <Select defaultValue={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger
        aria-label={`${label}: ${current.label}`}
        className="w-auto min-h-11 shrink-0 border-0 bg-transparent px-3 text-sm font-medium text-foreground hover:bg-white hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Globe className="mr-1.5 h-4 w-4" aria-hidden="true" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((locale) => {
          const isCurrent = locale.code === currentLocale;
          return (
            <SelectItem
              key={locale.code}
              value={locale.code}
              className="hover:bg-accent focus:bg-accent data-[highlighted]:bg-accent"
            >
              <span className="flex min-h-9 items-center gap-2">
                <span className={isCurrent ? "font-semibold" : ""}>
                  {locale.label}
                </span>
                {isCurrent ? (
                  <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                ) : null}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
