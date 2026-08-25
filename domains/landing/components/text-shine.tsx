"use client";

import { useEffect, useRef, useState } from "react";

const GLOW_INTERVAL_MS = 6_000;
const GLOW_RESET_MS = 2_200;

/**
 * Camada de brilho ("sol a passar nas letras") sobre os títulos do Hero.
 *
 * Dispara o efeito periodicamente (a cada {@link GLOW_INTERVAL_MS}) enquanto
 * o conteúdo permanecer na área visível. Ao sair do viewport o intervalo é
 * limpo e a classe `.shine-run` removida; ao reentrar, o ciclo recomeça.
 *
 * - a base mantém as cores normais dos títulos; a camada `aria-hidden` é um
 *   clone com `background-clip: text` + `color: transparent`, por cima, que
 *   revela a faixa luminosa só dentro dos glifos enquanto passa;
 * - a animação corre apenas com `prefers-reduced-motion: no-preference`
 *   (definido em globals.css);
 * - o Observer permanece ativo (sem disconnect) para repetir o ciclo em cada
 *   nova entrada na área de visão.
 *
 * Client Component: recebe o H1 como `children` (renderizados no servidor e
 * passados como slot) — os dicionários de i18n não entram no bundle client.
 */
export function TextShine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const glowTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const glowIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (!visible) {
      overlay.classList.remove("shine-run");
      clearInterval(glowIntervalRef.current);
      clearTimeout(glowTimerRef.current);
      return;
    }

    overlay.classList.add("shine-run");

    glowIntervalRef.current = setInterval(() => {
      overlay.classList.remove("shine-run");
      glowTimerRef.current = setTimeout(() => {
        overlay.classList.add("shine-run");
      }, GLOW_RESET_MS);
    }, GLOW_INTERVAL_MS);

    return () => {
      clearInterval(glowIntervalRef.current);
      clearTimeout(glowTimerRef.current);
    };
  }, [visible]);

  return (
    <div ref={ref} className="relative">
      {children}

      <span
        ref={overlayRef}
        aria-hidden="true"
        className="shine-overlay pointer-events-none absolute inset-0 select-none"
      >
        {children}
      </span>
    </div>
  );
}