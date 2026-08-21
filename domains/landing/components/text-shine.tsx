"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Camada de brilho ("sol a passar nas letras") sobre os títulos do Hero.
 *
 * Arranca o efeito sempre que o conteúdo entra na área visível (viewport) e
 * religa a cada reentrada:
 * - o Observer liga/desliga `.shine-run` conforme `isIntersecting` (threshold
 *   0.4): ao sair remove a classe (a animação recomeça do zero na próxima
 *   entrada), ao voltar adiciona e o varrimento repete;
 * - a base mantém as cores normais dos títulos; a camada `aria-hidden` é um
 *   clone com `background-clip: text` + `color: transparent`, por cima, que
 *   revela a faixa luminosa só dentro dos glifos enquanto passa;
 * - a animação corre apenas com `prefers-reduced-motion: no-preference`
 *   (definido em globals.css);
 * - o Observer permanece ativo (sem disconnect) para repetir o efeito em cada
 *   nova entrada na área de visão.
 *
 * Client Component: recebe o H1 como `children` (renderizados no servidor e
 * passados como slot) — os dicionários de i18n não entram no bundle client.
 */
export function TextShine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {children}

      <span
        aria-hidden="true"
        className={cn(
          "shine-overlay pointer-events-none absolute inset-0 select-none",
          visible && "shine-run",
        )}
      >
        {children}
      </span>
    </div>
  );
}