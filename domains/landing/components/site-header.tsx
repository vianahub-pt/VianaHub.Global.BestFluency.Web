import type { LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getMessages } from "@/core/i18n";
import { LocaleSwitcher } from "@/shared/components/locale/locale-switcher";
import { ThemeToggle } from "@/shared/components/theme/theme-toggle";

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
  const content = getMessages(locale).landing;

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-accent dark:bg-black">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-x-4 px-4 py-3 md:px-8">
        <a
          href="#home"
          className="
        flex
        min-h-9
        text-black dark:text-white
        items-center gap-2 rounded-md
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
      font-bold
      tracking-tight"
          >
            {site.shortName}
          </span>
        </a>

        <MainNav
          nav={content.nav}
          className="hidden justify-self-center lg:block"
        />

        <div className="flex items-center justify-self-end gap-2">
          <div className="hidden lg:block">
            <LocaleSwitcher
              currentLocale={locale}
              label={content.a11y.languageSwitcherLabel}
            />
          </div>
          <ThemeToggle label={content.a11y.toggleTheme} />

          <MobileMenu
            locale={locale}
            nav={content.nav}
            languageSwitcherLabel={content.a11y.languageSwitcherLabel}
          />
        </div>
      </div>
    </header>
  );
}
