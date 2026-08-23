import Link from "next/link";

import type { LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getMessages } from "@/core/i18n";
import { SiteFooter } from "@/domains/landing/components/site-footer";
import { formatLegalDate } from "@/domains/legal/config";
import { buildHomePath } from "@/shared/lib/routes";

interface LegalPageProps {
  locale: LocaleCode;
  type: "privacy" | "cookies";
}

export function LegalPage({ locale, type }: LegalPageProps) {
  const messages = getMessages(locale);
  const content = messages.legal;
  const pageContent = content[type];
  const homePath = buildHomePath(locale);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link
            href={homePath}
            className="flex min-h-9 items-center gap-2 rounded-md text-base font-bold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {site.shortName}
          </Link>
          <Link
            href={homePath}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {content.common.backHome}
          </Link>
        </div>
      </header>

      <main id="main" className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {pageContent.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {content.common.lastUpdated}: {formatLegalDate(locale)}
          </p>

          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            {pageContent.sections.map((section, i) => (
              <section key={i} className="mb-8">
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mb-3 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {"items" in section && section.items && (
                  <ul className="my-3 list-inside list-disc space-y-1 text-muted-foreground">
                    {section.items.map((item: string, k: number) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                )}
                {"subsections" in section && section.subsections && section.subsections.map((sub, l) => {
                  const s = sub as Record<string, unknown>;
                  return (
                    <div key={l} className="mt-4">
                      {typeof s.title === "string" && s.title && (
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {s.title}
                        </h3>
                      )}
                      {Array.isArray(s.paragraphs) && s.paragraphs.map((p: string, m: number) => (
                        <p key={m} className="mb-3 leading-relaxed text-muted-foreground">
                          {p}
                        </p>
                      ))}
                      {Array.isArray(s.items) && s.items.length > 0 && (
                        <ul className="my-3 list-inside list-disc space-y-1 text-muted-foreground">
                          {s.items.map((item: string, n: number) => (
                            <li key={n}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </article>
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
