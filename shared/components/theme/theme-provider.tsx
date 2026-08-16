"use client";

import { ThemeProvider as NextThemesProvider } from "@teispace/next-themes";
import type { ReactNode } from "react";

/**
 * Tema claro/escuro via classe `.dark` no <html>.
 * `disableTransitionOnChange` evita flashes de transição na troca de tema
 * e respeita utilizadores com preferência de movimento reduzido.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
