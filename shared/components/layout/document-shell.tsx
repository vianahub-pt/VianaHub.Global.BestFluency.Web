import type { ReactNode } from "react";

import { getLocale, type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { CloudflareWebAnalytics } from "@/shared/components/analytics/cloudflare-web-analytics";
import { JsonLd } from "@/shared/components/seo/json-ld";
import { ScrollPreservation } from "@/shared/components/ui/scroll-preservation";
import { ThemeProvider } from "@/shared/components/theme/theme-provider";
import { buildOrganizationJsonLd } from "@/shared/lib/seo";
import { amarante } from "@/shared/styles/fonts";

interface DocumentShellProps {
  locale: LocaleCode;
  children: ReactNode;
}

/**
 * Root layout partilhado por todos os idiomas através de app/[[...locale]].
 *
 * Garante <html lang> estático e correto por idioma no HTML exportado,
 * skip link acessível, tema claro/escuro, analytics e JSON-LD.
 */
export function DocumentShell({ locale, children }: DocumentShellProps) {
  const localeMeta = getLocale(locale);
  const content = getMessages(locale).landing;

  return (
    <html
      lang={localeMeta.hreflang}
      className={amarante.variable}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <ScrollPreservation />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
          >
            {content.a11y.skipToContent}
          </a>
          {children}
        </ThemeProvider>
        <CloudflareWebAnalytics />
        <JsonLd data={buildOrganizationJsonLd()} />
      </body>
    </html>
  );
}
