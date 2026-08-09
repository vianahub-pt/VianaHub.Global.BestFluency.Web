"use client";

import { Check, Globe } from "lucide-react";
import Link from "next/link";

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
 * Seletor de idioma — componente shadcn/ui Select (Radix UI), issue #29.
 *
 * - trigger com área de toque ≥ 44 px e rótulo acessível;
 * - cada idioma é um link real (<Link> Next.js) com href, hrefLang, lang;
 * - troca de idioma é navegação completa para o URL próprio do idioma;
 * - teclado completo via Radix (setas, Home/End, Escape, typeahead);
 * - idioma corrente marcado com aria-current="page".
 */
export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const current = getLocale(currentLocale);

  return (
    <Select defaultValue={currentLocale}>
      <SelectTrigger
        aria-label={`${label}: ${current.label}`}
        className="w-auto min-w-[7rem]"
      >
        <Globe className="mr-1.5 h-4 w-4" aria-hidden="true" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((locale) => {
          const isCurrent = locale.code === currentLocale;
          return (
            <SelectItem key={locale.code} value={locale.code}>
              <Link
                href={locale.path}
                hrefLang={locale.hreflang}
                lang={locale.hreflang}
                aria-label={locale.label}
                aria-current={isCurrent ? "page" : undefined}
                className="flex min-h-9 cursor-pointer items-center gap-2"
                tabIndex={-1}
              >
                <span className={isCurrent ? "font-semibold" : ""}>
                  {locale.label}
                </span>
                {isCurrent ? (
                  <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                ) : null}
              </Link>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
