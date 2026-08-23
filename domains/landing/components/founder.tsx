import { MessageCircle } from "lucide-react";
import Image from "next/image";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";
import { ShineSweep } from "./shine-sweep";

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
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <h2
          id="founder-title"
          className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              text-2xl
              sm:text-3xl
              md:text-3xl
              lg:text-4xl"
        >
          {founder.h2}
        </h2>

        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            {founder.text.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 [&:not(:first-child)]:mt-3 sm:[&:not(:first-child)]:mt-4"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ShineSweep className="bg-black mx-auto aspect-square w-48 overflow-hidden rounded-full shadow-lg sm:w-56 md:w-64 lg:order-first lg:justify-self-center lg:w-full lg:max-w-sm">
            <Image
              src="/ceo.png"
              alt={founder.imageAlt}
              width={400}
              height={400}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </ShineSweep>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
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
