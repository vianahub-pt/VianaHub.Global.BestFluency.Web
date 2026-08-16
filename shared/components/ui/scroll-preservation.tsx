"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const SCROLL_KEY = "bf_scroll_pos";

interface ScrollSnapshot {
  x: number;
  y: number;
  anchorId: string | null;
  anchorTop: number;
}

/**
 * Guarda o enquadramento visual atual antes da troca de idioma.
 *
 * Guardar apenas scrollY não é suficiente porque traduções diferentes podem
 * alterar a altura das secções anteriores. Por isso guardamos também a secção
 * visível e a posição do topo dessa secção relativamente ao viewport.
 */
export function saveScrollPosition() {
  try {
    const header = document.querySelector<HTMLElement>("header");
    const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
    const probeY = Math.min(
      window.innerHeight - 1,
      Math.max(1, headerBottom + 8),
    );

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );
    const anchor =
      sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      }) ?? null;

    const snapshot: ScrollSnapshot = {
      x: window.scrollX,
      y: window.scrollY,
      anchorId: anchor?.id ?? null,
      anchorTop: anchor?.getBoundingClientRect().top ?? 0,
    };

    sessionStorage.setItem(SCROLL_KEY, JSON.stringify(snapshot));
  } catch {
    // sessionStorage pode estar indisponível em modos de privacidade restritos.
  }
}

/** Restaura o mesmo enquadramento visual após a navegação de locale. */
export function ScrollPreservation() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let raw: string | null = null;

    try {
      raw = sessionStorage.getItem(SCROLL_KEY);
      if (raw) sessionStorage.removeItem(SCROLL_KEY);
    } catch {
      return;
    }

    if (!raw) return;

    let snapshot: ScrollSnapshot;
    try {
      snapshot = JSON.parse(raw) as ScrollSnapshot;
    } catch {
      return;
    }

    const restore = () => {
      if (snapshot.anchorId) {
        const anchor = document.getElementById(snapshot.anchorId);
        if (anchor) {
          const delta = anchor.getBoundingClientRect().top - snapshot.anchorTop;
          if (Math.abs(delta) > 0.5) {
            window.scrollBy({ top: delta, left: 0, behavior: "auto" });
          }
          return;
        }
      }

      window.scrollTo({
        top: snapshot.y,
        left: snapshot.x,
        behavior: "auto",
      });
    };

    restore();
    requestAnimationFrame(() => requestAnimationFrame(restore));
  }, [pathname]);

  return null;
}
