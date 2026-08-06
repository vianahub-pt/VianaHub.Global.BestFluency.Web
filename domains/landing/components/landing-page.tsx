import { type LocaleCode } from "@/core/config/locales";

import { Hero } from "./hero";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Página da landing (EPIC #1).
 *
 * Estrutura atual (issue #9): Header (spec §7) + Hero (spec §8) + Footer
 * (spec §19). As restantes secções (faixa de informações a CTA final) são
 * entregues na issue #10.
 *
 * - `<main id="main">` é o alvo do skip link do DocumentShell e o único
 *   landmark de conteúdo;
 * - exatamente um H1 (no Hero); todas as secções seguintes usam H2/H3;
 * - mobile-first: começa em 360 px e expande por min-width (§24).
 */
export function LandingPage({ locale }: { locale: LocaleCode }) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="flex-1">
        <Hero locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
