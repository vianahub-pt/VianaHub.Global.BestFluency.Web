import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { RoutePath } from "@/shared/components/ui/route-path";
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
  const content = getMessages(locale).landing;
  const { journey } = content;

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-gradient-to-b from-muted/40 to-accent/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <h2
          id="journey-title"
          className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              text-2xl
              sm:text-3xl
              md:text-3xl
              lg:text-4xl"
        >
          {journey.h2}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {journey.subtitle}
        </p>

        <div className="relative mt-10 lg:mt-14">
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

          <ol className="flex flex-col gap-8 pl-10 sm:pl-12 lg:grid lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-16">
            {journey.steps.map((step, index) => (
              <li key={step.title}>
                <p
                  aria-hidden="true"
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 text-sm font-semibold leading-5 text-foreground sm:mt-2 sm:text-base sm:leading-6">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-sm sm:leading-6">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <WhatsAppLink
            message={journey.whatsappMessage}
            section="journey"
            ctaLabel={journey.ctaLabel}
            ariaLabel={journey.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
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
