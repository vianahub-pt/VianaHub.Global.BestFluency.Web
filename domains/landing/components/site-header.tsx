import Image from "next/image";
import Link from "next/link";

import { getLocale, type LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getLandingContent } from "@/domains/landing/content";
import { LocaleSwitcher } from "@/shared/components/locale/locale-switcher";
import { ThemeToggle } from "@/shared/components/theme/theme-toggle";

/**
 * Header da fase de fundação. O header definitivo da landing (sticky,
 * âncoras, CTA "Marcar aula experimental" e menu móvel) é entregue na
 * issue de implementação das secções, conforme spec §7.
 */
export function SiteHeader({ locale }: { locale: LocaleCode }) {
  const localeMeta = getLocale(locale);
  const content = getLandingContent(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 md:px-8">
        <Link
          href={localeMeta.path}
          className="flex min-h-11 items-center gap-3 rounded-md"
          aria-label={site.name}
        >
          <Image
            src="/logo.jpeg"
            alt=""
            width={777}
            height={779}
            priority
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-base font-semibold tracking-tight">
            {site.shortName}
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <LocaleSwitcher
            currentLocale={locale}
            label={content.a11y.languageSwitcherLabel}
          />
          <ThemeToggle label={content.a11y.toggleTheme} />
        </div>
      </div>
    </header>
  );
}
