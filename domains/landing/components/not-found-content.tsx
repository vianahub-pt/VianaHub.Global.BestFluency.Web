import Link from "next/link";

import { getLandingContent } from "@/domains/landing/i18n";

/**
 * Conteúdo 404 da fase de fundação (em pt-PT, idioma principal).
 * As versões localizadas de 404 acompanham as secções definitivas.
 */
export function NotFoundContent() {
  const content = getLandingContent("pt-PT");

  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-4 py-24 md:px-8"
    >
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        {content.notFound.title}
      </h1>
      <p className="mt-4 text-muted-foreground">{content.notFound.description}</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {content.notFound.backHome}
      </Link>
    </main>
  );
}
