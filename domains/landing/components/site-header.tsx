import Link from "next/link";
import { getLocale, type LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getLandingContent } from "@/domains/landing/content";
import { LocaleSwitcher } from "@/shared/components/locale/locale-switcher";
import { ThemeToggle } from "@/shared/components/theme/theme-toggle";
import { buttonVariants } from "@/shared/components/ui/button";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";

import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";

/**
 * Header definitivo da landing (spec §7).
 *
 * - compacto e sticky após o início do scroll;
 * - fundo sólido com leve transparência (contraste preservado);
 * - âncoras (Modalidades, Método, Best Kids, Depoimentos, FAQ);
 * - CTA "Marcar aula experimental" com mensagem contextual de WhatsApp;
 * - menu móvel acessível (MobileMenu) abaixo do breakpoint lg;
 * - mobile-first 360 px: uma linha com logótipo + tema + menu; o seletor de
 *   idiomas e o CTA concentram-se no painel móvel para evitar overflow.
 */
export function SiteHeader({ locale }: { locale: LocaleCode }) {
  const localeMeta = getLocale(locale);
  const content = getLandingContent(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[#926f34]/95 backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-x-4 px-4 py-3 md:px-8">
        <Link
          href={`${localeMeta.path}#top`}
          className="
    flex
    min-h-11
    items-center gap-3 rounded-md
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-ring"
          aria-label={site.name}
        >
          <span
            className="
          text-base
          sm:text-xl 
          md:text-xl 
          lg:text-2xl
          font-semibold
          tracking-tight"
          >
            {site.shortName}
          </span>
        </Link>

        <MainNav locale={locale} className="hidden lg:block" />

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LocaleSwitcher
              currentLocale={locale}
              label={content.a11y.languageSwitcherLabel}
            />
          </div>
          <ThemeToggle label={content.a11y.toggleTheme} />
          <div className="hidden lg:block">
            <WhatsAppLink
              message={content.nav.whatsappMessage}
              section="header"
              ctaLabel={content.nav.ctaLabel}
              ariaLabel={content.nav.ctaAriaLabel}
              className={buttonVariants({
                variant: "primary",
                size: "default",
              })}
            >
              {content.nav.ctaLabel}
            </WhatsAppLink>
          </div>
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
