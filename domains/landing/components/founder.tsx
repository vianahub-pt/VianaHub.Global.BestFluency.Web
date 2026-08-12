import Image from "next/image";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { SectionHeading } from "@/shared/components/ui/section-heading";

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
      id="fundadora"
      aria-labelledby="founder-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <SectionHeading title={founder.h2} titleId="founder-title" />

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
              src="/ceo.webp"
              alt={founder.imageAlt}
              width={400}
              height={400}
              loading="lazy"
              className="h-auto w-full max-w-sm rounded-2xl border border-border object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
