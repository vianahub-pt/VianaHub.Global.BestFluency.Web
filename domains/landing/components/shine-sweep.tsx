"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

const GLOW_INTERVAL_MS = 6_000;
const GLOW_RESET_MS = 2_200;

/**
 * Varrimento de brilho ("sol a passar") sobre um elemento visual (imagem,
 * ilustração), análogo ao efeito de texto do Hero (`.shine-overlay`), mas sem
 * `background-clip: text` — a banda ilumina a superfície do conteúdo.
 *
 * - o IntersectionObserver monitora a visibilidade e o intervalo dispara o
 *   efeito periodicamente (a cada {@link GLOW_INTERVAL_MS}) enquanto o
 *   elemento estiver no viewport;
 * - a camada decorativa é `aria-hidden` e `pointer-events-none`;
 * - a animação corre apenas com `prefers-reduced-motion: no-preference`
 *   (definido em globals.css).
 */
export function ShineSweep({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
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
    const sweep = sweepRef.current;
    if (!sweep) return;

    if (!visible) {
      sweep.classList.remove("shine-run");
      clearInterval(glowIntervalRef.current);
      clearTimeout(glowTimerRef.current);
      return;
    }

    sweep.classList.add("shine-run");

    glowIntervalRef.current = setInterval(() => {
      sweep.classList.remove("shine-run");
      glowTimerRef.current = setTimeout(() => {
        sweep.classList.add("shine-run");
      }, GLOW_RESET_MS);
    }, GLOW_INTERVAL_MS);

    return () => {
      clearInterval(glowIntervalRef.current);
      clearTimeout(glowTimerRef.current);
    };
  }, [visible]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
      <span
        ref={sweepRef}
        aria-hidden="true"
        className="shine-sweep pointer-events-none absolute inset-0"
      />
    </div>
  );
}