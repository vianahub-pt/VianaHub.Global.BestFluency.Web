"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";

import { TestimonialCard } from "./testimonial-card";

/**
 * Coluna do carrossel de depoimentos com controle de pausa (WCAG 2.2.2).
 *
 * - Animação CSS contínua (carousel-up / carousel-down);
 * - Botão pausa/retoma a animação via `animation-play-state`;
 * - Respeita `prefers-reduced-motion: reduce` (animação já pausada por CSS global);
 * - Botão visível only no hover/focus do container para não poluir visual.
 */
export function CarouselColumn({
  items,
  reverse,
  duration,
  className,
}: {
  items: { name: string; role: string; photo: string; quote: string }[];
  reverse?: boolean;
  duration: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={{ maxHeight: "520px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={stageRef}
        className="flex flex-col"
        style={{
          animation: `${reverse ? "carousel-up" : "carousel-down"} ${duration} linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>

      {/* Botão de pausa — aparece no hover/focus do container */}
      <button
        type="button"
        onClick={togglePause}
        aria-label={paused ? "Retomar carrossel" : "Pausar carrossel"}
        className={cn(
          "absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center",
          "rounded-full bg-background/80 text-foreground backdrop-blur-sm",
          "border border-border shadow-sm transition-opacity",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
          "focus-visible:opacity-100",
        )}
      >
        {paused ? (
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
