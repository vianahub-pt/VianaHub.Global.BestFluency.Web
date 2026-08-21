"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Varrimento de brilho ("sol a passar") sobre um elemento visual (imagem,
 * ilustração), análogo ao efeito de texto do Hero (`.shine-overlay`), mas sem
 * `background-clip: text` — a banda ilumina a superfície do conteúdo.
 *
 * - o IntersectionObserver liga/desliga `.shine-run` conforme `isIntersecting`
 *   (threshold 0.4), repetindo o efeito a cada entrada na área de visão;
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
    <div ref={ref} className={cn("relative", className)}>
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "shine-sweep pointer-events-none absolute inset-0",
          visible && "shine-run",
        )}
      />
    </div>
  );
}