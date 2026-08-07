import Link from "next/link";

import { locales, type LocaleCode } from "@/core/config/locales";
import { cn } from "@/shared/lib/utils";

interface LocaleSwitcherProps {
  currentLocale: LocaleCode;
  label: string;
}

/**
 * Seletor de idioma por links reais (<a> rastreáveis), um URL por idioma.
 * A troca de idioma é sempre uma navegação completa — nunca apenas JS.
 */
export function LocaleSwitcher({ currentLocale, label }: LocaleSwitcherProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap items-center gap-1">
        {locales.map((locale) => {
          const isCurrent = locale.code === currentLocale;
          return (
            <li key={locale.code}>
              <Link
                href={locale.path}
                hrefLang={locale.hreflang}
                lang={locale.hreflang}
                aria-label={locale.label}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {locale.shortLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
