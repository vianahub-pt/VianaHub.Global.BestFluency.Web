import { MessageCircle } from "lucide-react";
import Image from "next/image";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Fundadora (spec §15).
 *
 * - H2 + três parágrafos no contrato de conteúdo;
 * - fotografia autorizada public/ceo.jpeg (400×400, otimizada para
 *   public/ceo.webp) com dimensões explícitas e lazy loading (abaixo da dobra);
 * - desktop: texto e fotografia lado a lado; mobile: texto antes da imagem
 *   (teste de leitura da spec);
 * - sem afirmações profissionais que não constem no contrato.
 */
export function Founder({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { founder } = content;

  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-gradient-to-b from-muted/40 to-accent/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2
          id="founder-title"
          className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              sm:text-2xl
              md:text-3xl
              lg:text-4xl"
        >
          {founder.h2}
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            {founder.text.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-muted-foreground [&:not(:first-child)]:mt-4"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:order-first lg:justify-self-center">
            <Image
              src="/ceo.png"
              alt={founder.imageAlt}
              width={400}
              height={400}
              loading="lazy"
              className="h-auto w-full max-w-sm object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <WhatsAppLink
            message={founder.whatsappMessage}
            section="founder"
            ctaLabel={founder.ctaLabel}
            ariaLabel={founder.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {founder.ctaLabel}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
