import { MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

const languageVisuals = {
  EN: {
    image: "/assets/english.jpg",
    colors: "from-blue-950/95 via-blue-900/30 to-red-700/50",
  },
  FR: {
    image: "/assets/francais.jpg",
    colors: "from-blue-950/95 via-white/10 to-red-700/70",
  },
  ES: {
    image: "/assets/spañol.jpg",
    colors: "from-red-950/95 via-red-700/30 to-yellow-500/70",
  },
  DE: {
    image: "/assets/deutsch.jpg",
    colors: "from-black/95 via-red-700/30 to-yellow-500/70",
  },
} as const;

/**
 * Idiomas disponíveis: apresentação visual dos quatro idiomas principais,
 * com imagens reais e destaque para as turmas reduzidas presenciais.
 */
export function Languages({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { languages } = content;

  return (
    <section
      id="languages"
      aria-labelledby="languages-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <ScrollReveal animation="fade-up" delay={0.05}>
          <h2
            id="languages-title"
            className="max-w-3xl font-title text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
          >
            {languages.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {languages.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-x-6">
          {languages.items.map((language, index) => {
            const visual =
              languageVisuals[language.code as keyof typeof languageVisuals];

            return (
              <ScrollReveal
                key={language.name}
                animation="fade-up"
                delay={0.1 + index * 0.08}
              >
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted">
                    <Image
                      src={visual.image}
                      alt={language.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t",
                        visual.colors,
                      )}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                        {language.code}
                      </p>
                      <h3 className="mt-1 font-title text-2xl font-bold tracking-tight sm:text-3xl">
                        {language.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground sm:text-base">
                    {language.text}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal
          animation="fade-up"
          delay={0.3}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <WhatsAppLink
            message={languages.whatsappMessage}
            section="languages"
            ctaLabel={languages.ctaLabel}
            ariaLabel={languages.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {languages.ctaLabel}
          </WhatsAppLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
