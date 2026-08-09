"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { cn } from "@/shared/lib/utils";

/**
 * FAQ em accordion acessível (spec §17).
 *
 * Comportamento:
 * - todas as respostas fechadas inicialmente;
 * - apenas uma resposta aberta de cada vez (accordion "exclusive");
 * - botão real por pergunta, com `aria-expanded` e `aria-controls`;
 * - painel com `role="region"` e `aria-labelledby` para o respetivo botão;
 * - foco visível (herdado do design system) e área de toque ≥ 44 px;
 * - ícone `+` fechado e `−` aberto;
 * - animação curta apenas com `motion-safe` (grid-template-rows 0fr→1fr);
 * - sem scroll automático — a expansão empilha naturalmente, sem
 *   deslocamento inesperado da página.
 *
 * Conteúdo em HTML renderizado (não apenas JavaScript): as respostas vivem
 * no DOM desde o primeiro render (collapsed), cumprindo a spec §17.
 */
export function Faq({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 md:px-8 md:py-20">
        <SectionHeading
          title={faq.h2}
          titleId="faq-title"
          intro={faq.subtitle}
          align="center"
        />

        <div className="mt-10 flex flex-col gap-3">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={item.question}
                className="rounded-lg border border-border bg-card shadow-sm"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex min-h-12 w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left text-sm font-semibold leading-6 text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-5"
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-200 motion-safe:ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-5 text-sm leading-6 text-muted-foreground sm:px-5">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
