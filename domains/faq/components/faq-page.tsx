import type { LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { FaqExplorer } from "@/domains/faq/components/faq-explorer";
import {
  getCourseLanguageOptions,
  getFaqCategories,
  getResolvedFaqs,
} from "@/domains/faq/lib/faq-resolver";
import { SiteFooter } from "@/domains/landing/components/site-footer";
import { SiteHeader } from "@/domains/landing/components/site-header";

/**
 * Página da base de conhecimento de FAQ (/faq/, /en/faq/, …).
 *
 * - Server Component: resolve as 52 FAQs, categorias e idiomas de curso no
 *   locale e entrega ao FaqExplorer (Client Component) por props
 *   serializadas — a base JSON não entra no bundle client;
 * - HTML inicial contém as 52 perguntas e respostas (accordions fechados);
 * - exatamente um H1; header/footer partilhados com a landing;
 * - mobile-first: controlos empilhados em 360 px, linha a partir de sm/lg;
 * - sem FAQPage schema (decisão explícita da issue).
 */
export function FaqPage({ locale }: { locale: LocaleCode }) {
  const ui = getMessages(locale).faqPage;
  const faqs = getResolvedFaqs(locale);
  const categories = getFaqCategories(locale);
  const courseLanguages = getCourseLanguageOptions(locale);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader locale={locale} page="faq" />
      <main id="main" className="flex-1">
        <section
          aria-labelledby="faq-page-title"
          className="border-b border-border bg-gradient-to-b from-muted/40 to-accent/40"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <h1
              id="faq-page-title"
              className="font-title text-2xl font-bold tracking-tight text-balance text-accent dark:text-white sm:text-3xl md:text-3xl lg:text-4xl"
            >
              {ui.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {ui.subtitle}
            </p>

            <div className="mt-8 sm:mt-10">
              <FaqExplorer
                faqs={faqs}
                categories={categories}
                courseLanguages={courseLanguages}
                ui={ui}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
