"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import type { ResolvedFaq } from "@/domains/faq/types";
import { cn } from "@/shared/lib/utils";

/**
 * Accordion acessível de FAQs (mesmo padrão da secção #faq da landing):
 *
 * - todas as respostas fechadas inicialmente;
 * - apenas uma resposta aberta de cada vez (accordion "exclusive");
 * - botão real por pergunta, com `aria-expanded` e `aria-controls`;
 * - painel com `role="region"` e `aria-labelledby` para o respetivo botão;
 * - id estável baseado no FAQ ID (ex.: `faq-010`) com scroll-margin para
 *   o header sticky;
 * - ao carregar URL com hash correspondente a uma FAQ, abre esse item
 *   automaticamente (sem scroll extra por JS);
 * - foco visível e área de toque ≥ 44 px;
 * - ícone `+` fechado e `−` aberto;
 * - animação curta apenas com `motion-safe` (grid-template-rows 0fr→1fr);
 * - sem scroll automático.
 *
 * Conteúdo em HTML renderizado (não apenas JavaScript): as respostas vivem
 * no DOM desde o primeiro render (collapsed) — SEO e acessibilidade.
 *
 * Client Component: recebe `ResolvedFaq[]` por props (serializado pelo
 * Server Component pai) — a base JSON não entra no bundle client.
 */
export function FaqAccordion({
  items,
  className,
}: {
  items: ResolvedFaq[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Após hidratação, ler hash do URL e abrir a FAQ correspondente.
  // Usa queueMicrotask para evitar setState síncrono no corpo do efeito.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && items.some((item) => item.id === hash)) {
      queueMicrotask(() => setOpenId(hash));
    }
  }, [items]);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className={cn("grid gap-2.5 sm:gap-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${item.id}-trigger`;
        const panelId = `${item.id}-panel`;

        return (
          <div
            key={item.id}
            id={item.id}
            className="h-fit scroll-mt-24 rounded-lg border border-border bg-card shadow-sm"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-left text-xs font-semibold leading-5 text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-12 sm:gap-4 sm:px-4 sm:py-3 sm:text-sm sm:leading-6"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent sm:h-8 sm:w-8"
                >
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  ) : (
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
              {...(!isOpen && { "aria-hidden": true })}
            >
              <div className="overflow-hidden">
                <p className="px-3.5 pb-4 text-xs leading-5 text-muted-foreground sm:px-4 sm:pb-5 sm:text-sm sm:leading-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
