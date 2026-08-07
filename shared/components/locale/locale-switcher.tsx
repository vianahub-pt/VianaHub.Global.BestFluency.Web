"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";

import { getLocale, locales, type LocaleCode } from "@/core/config/locales";
import { buttonVariants } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

interface LocaleSwitcherProps {
  currentLocale: LocaleCode;
  label: string;
}

/**
 * Seletor de idioma — componente oficial shadcn/ui (DropdownMenu sobre
 * Radix UI), issue #29.
 *
 * - trigger com área de toque ≥ 44 px (buttonVariants) e rótulo acessível
 *   que inclui o idioma atual;
 * - cada idioma é um link real (<a> rastreável com hrefLang/lang) dentro de
 *   `DropdownMenuItem asChild`: a troca de idioma é sempre uma navegação
 *   completa para o URL próprio do idioma — nunca apenas JS;
 * - as alternativas hreflang também estão declaradas no <head> (metadata
 *   `alternates.languages`) e no sitemap, pelo que a indexação não depende
 *   da renderização do menu;
 * - teclado completo via Radix (setas, Home/End, Escape, typeahead) e foco
 *   devolvido ao trigger ao fechar;
 * - o idioma corrente é marcado com `aria-current="page"` e um check dourado.
 */
export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  const current = getLocale(currentLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${label}: ${current.label}`}
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "group gap-1.5 px-3",
        )}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span aria-hidden="true">{current.shortLabel}</span>
        <ChevronDown
          className="h-4 w-4 opacity-60 transition-transform group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {locales.map((locale) => {
          const isCurrent = locale.code === currentLocale;
          return (
            <DropdownMenuItem key={locale.code} asChild>
              <Link
                href={locale.path}
                hrefLang={locale.hreflang}
                lang={locale.hreflang}
                aria-label={locale.label}
                aria-current={isCurrent ? "page" : undefined}
                className="flex min-h-11 cursor-pointer items-center justify-between gap-3 sm:min-h-9"
              >
                <span className={cn(isCurrent && "font-semibold")}>
                  {locale.label}
                </span>
                {isCurrent ? (
                  <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                ) : null}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
