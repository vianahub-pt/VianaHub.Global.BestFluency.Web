"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Alternância de tema com área de toque >= 44x44px e estado resolvido
 * apenas após a montagem (evita mismatch de hidratação).
 *
 * O guard de montagem usa useSyncExternalStore (cliente = true, servidor =
 * false) em vez de setState em efeito, evitando renders em cascata e o
 * aviso react-hooks/set-state-in-effect.
 */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )
      ) : (
        <span className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
