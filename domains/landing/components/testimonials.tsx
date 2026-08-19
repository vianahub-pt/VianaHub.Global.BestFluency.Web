import { MessageCircle, Star } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/** Iniciais para o avatar quando não existe fotografia autorizada (spec §14). */
function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Depoimentos (spec §14).
 *
 * - `<blockquote>` e `<cite>` para conteúdo e fonte;
 * - estrelas apenas nas avaliações Google (stars !== null); depoimentos via
 *   WhatsApp não exibem estrelas;
 * - avatar com iniciais (sem fotografias não autorizadas);
 * - grelha 1 por linha mobile → 2 tablet (sm) → 2×2 desktop (lg);
 * - sem carrossel;
 * - CTA "Marcar aula experimental" após a grelha (mensagem da spec §14).
 */
export function Testimonials({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { testimonials } = content;

  // Dynamic asset paths based on active locale
  const localeLower = locale.toLowerCase();
  const TestimonialsBasePath = `/assets/${locale}/kids-${localeLower}`;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-gradient-to-b from-muted/40 to-accent/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="lg:order-1">
          <h2
            id="testimonials-title"
            className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              sm:text-2xl
              md:text-3xl
              lg:text-4xl"
          >
            {testimonials.h2}
          </h2>
          <div className="mt-5">
            {testimonials.text.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-muted-foreground [&:not(:first-child)]:mt-3"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {testimonials.items.map((item) => (
            <Card key={item.name} className="h-full">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent"
                  >
                    {initialsOf(item.name)}
                  </span>
                  <div className="flex flex-col">
                    <cite className="text-sm font-semibold not-italic text-foreground">
                      {item.name}
                    </cite>
                    <span className="text-xs text-muted-foreground">
                      {item.source}
                    </span>
                  </div>
                </div>

                {item.stars !== null ? (
                  <p
                    role="img"
                    className="mt-3 flex items-center gap-1 text-accent"
                    aria-label={`${item.stars} ${testimonials.starsAriaLabel}`}
                  >
                    {Array.from({ length: item.stars }, (_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </p>
                ) : null}

                <blockquote className="mt-3 flex-1 text-base leading-7 text-foreground">
                  “{item.quote}”
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <WhatsAppLink
            message={testimonials.whatsappMessage}
            section="testimonials"
            ctaLabel={testimonials.ctaLabel}
            ariaLabel={testimonials.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {testimonials.ctaLabel}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
