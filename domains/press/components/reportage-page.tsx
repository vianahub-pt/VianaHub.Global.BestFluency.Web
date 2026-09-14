import Link from "next/link";

import type { LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { site } from "@/core/config/site";
import { SiteFooter } from "@/domains/landing/components/site-footer";
import { SiteHeader } from "@/domains/landing/components/site-header";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { absoluteUrl } from "@/shared/lib/seo";

export function ReportagePage({
  locale,
  type = "new-amadora",
}: {
  locale: LocaleCode;
  type?: "new-amadora" | "tvi";
}) {
  const messages = getMessages(locale);
  const content = messages[type === "tvi" ? "tviReportage" : "reportage"];
  const externalUrl =
    type === "tvi" ? site.externalLinks.tviBomDiaAlegria : site.externalLinks.newInAmadora;
  const imageSrc =
    type === "tvi"
      ? "/press/tvi-bom-dia-alegria.webp"
      : "/bestfluenty-newinamadora.webp";
  const pagePath =
    type === "tvi" ? `/reportagens/tvi/` : `/reportagens/new-amadora/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.intro,
    image: [absoluteUrl(imageSrc)],
    datePublished: type === "tvi" ? "2026-09-02" : "2026-08-12",
    author: {
      "@type": "Organization",
      name: type === "tvi" ? "TVI" : "New in Amadora",
    },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: absoluteUrl(pagePath),
    keywords:
      type === "tvi"
        ? "Best Fluency, TVI, Bom Dia Alegria, Tatiana Viana, Zé Lopes, Merche Romero"
        : "Best Fluency, New in Amadora, Tatiana Viana, Amadora, Venda Nova",
    ...(type === "tvi"
      ? {
          video: {
            "@type": "VideoObject",
            name: content.title,
            description: content.intro,
            contentUrl: site.externalLinks.tviBomDiaAlegria,
            thumbnailUrl: absoluteUrl(imageSrc),
            uploadDate: "2026-09-02",
          },
        }
      : {}),
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader locale={locale} page={type} />
      <main id="main" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <article>
          <header className="border-b border-border bg-gradient-to-br from-accent/15 via-background to-muted/60">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8 md:py-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  {content.eyebrow}
                </p>
                <h1 className="mt-4 max-w-3xl font-title text-4xl font-bold tracking-tight text-accent text-balance dark:text-white sm:text-5xl lg:text-6xl">
                  {content.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {content.intro}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span>{content.byline}</span>
                  <time dateTime={type === "tvi" ? "2026-09-02" : "2026-08-12"}>
                    {content.published}
                  </time>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] bg-black shadow-xl">
                {/* Usa o thumbnail oficial do programa na versão TVI e o asset da escola na versão New Amadora. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, imagem editorial local ou oficial */}
                <img
                  src={imageSrc}
                  alt={content.imageAlt}
                  width={1000}
                  height={750}
                  className="aspect-[4/3] w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 max-w-xs text-sm font-medium leading-5 text-white sm:bottom-6 sm:left-6">
                  {content.imageCaption}
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_18rem] md:px-8 md:py-16">
            <div className="max-w-3xl">
              <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
                {content.summary}
              </p>

              <div className="mt-10 border-l-4 border-accent pl-5 sm:pl-6">
                <p className="text-base font-semibold leading-7 text-foreground sm:text-lg sm:leading-8">
                  {content.highlight}
                </p>
              </div>

              <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
                  {content.ctaIntro}
                </p>
                <Link
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "shrink-0",
                  )}
                >
                  {content.ctaLabel}
                </Link>
              </div>
            </div>

            <aside className="h-fit border-t border-border pt-5 md:border-l md:border-t-0 md:pl-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {content.sidebarLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {content.sidebarText}
              </p>
            </aside>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
