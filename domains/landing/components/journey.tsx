import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { RoutePath } from "@/shared/components/ui/route-path";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Como começar (spec §16).
 *
 * - H2 + subtítulo, quatro etapas numeradas com título e descrição reais
 *   (conteúdo semântico em <ol>/<li>, acessível e indexável);
 * - rota dourada decorativa (RoutePath, aria-hidden): vertical no telemóvel
 *   à esquerda das etapas, horizontal no desktop acima da grelha;
 *   a animação do avião é motion-safe (RoutePath já respeita reduced motion);
 * - CTA "Dar o primeiro passo" com mensagem contextual (spec §20).
 */
export function Journey({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const { journey } = content;

  return (
    <section
      id="como-comecar"
      aria-labelledby="journey-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <SectionHeading
          title={journey.h2}
          titleId="journey-title"
          intro={journey.subtitle}
        />

        <div className="relative mt-12 lg:mt-16">
          {/* Rota vertical — telemóvel (decorativa) */}
          <RoutePath
            orientation="vertical"
            className="absolute left-0 top-0 hidden h-full lg:hidden"
          />
          {/* Rota horizontal — desktop (decorativa) */}
          <RoutePath
            orientation="horizontal"
            className="absolute left-0 right-0 top-0 hidden w-full lg:flex"
          />

          <ol className="flex flex-col gap-10 pl-12 lg:grid lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-16">
            {journey.steps.map((step, index) => (
              <li key={step.title}>
                <p
                  aria-hidden="true"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-6 text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex justify-center">
          <WhatsAppLink
            message={journey.whatsappMessage}
            section="journey"
            ctaLabel={journey.ctaLabel}
            ariaLabel={journey.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {journey.ctaLabel}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
