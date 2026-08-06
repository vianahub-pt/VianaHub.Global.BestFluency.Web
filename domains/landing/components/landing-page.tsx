import { type LocaleCode } from "@/core/config/locales";

import { BestKids } from "./best-kids";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { Founder } from "./founder";
import { Hero } from "./hero";
import { InfoBar } from "./info-bar";
import { InPerson } from "./in-person";
import { Journey } from "./journey";
import { Method } from "./method";
import { Modalities } from "./modalities";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Testimonials } from "./testimonials";

/**
 * Página da landing (EPIC #1).
 *
 * Estrutura completa (spec §5): Header (§7) + Hero (§8) + Faixa de
 * informações (§9) + Modalidades (§10) + Método (§11) + Aulas presenciais
 * (§12) + Best Kids (§13) + Depoimentos (§14) + Fundadora (§15) + Como
 * começar (§16) + FAQ (§17) + CTA final (§18) + Footer (§19).
 *
 * - `<main id="main">` é o alvo do skip link do DocumentShell e o único
 *   landmark de conteúdo;
 * - exatamente um H1 (no Hero); todas as secções seguintes usam H2/H3;
 * - âncoras do header/main-nav: #modalidades, #metodo, #best-kids,
 *   #depoimentos, #faq (as secções respetivas declaram os ids);
 * - mobile-first: começa em 360 px e expande por min-width (§24).
 */
export function LandingPage({ locale }: { locale: LocaleCode }) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="flex-1">
        <Hero locale={locale} />
        <InfoBar locale={locale} />
        <Modalities locale={locale} />
        <Method locale={locale} />
        <InPerson locale={locale} />
        <BestKids locale={locale} />
        <Testimonials locale={locale} />
        <Founder locale={locale} />
        <Journey locale={locale} />
        <Faq locale={locale} />
        <FinalCta locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
