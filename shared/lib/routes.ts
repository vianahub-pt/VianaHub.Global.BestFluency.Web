import { localeCodeForSegment, type LocaleCode } from "@/core/config/locales";

export type PageKind =
  | "landing"
  | "privacy"
  | "cookies"
  | "new-amadora"
  | "tvi"
  | "faq";

const LEGAL_SLUGS = new Set(["privacy", "cookies"]);
const REPORTAGE_SLUG = "new-amadora";
const TVI_REPORTAGE_SLUG = "tvi";
const FAQ_SLUG = "faq";

export interface ResolvedPageRoute {
  locale: LocaleCode;
  page: PageKind;
}

/**
 * Resolve the optional catch-all [[...locale]] segments into a locale + page kind.
 *
 * Valid combinations:
 *   []            → pt-PT landing
 *   ["en"]        → en-US landing
 *   ["privacy"]   → pt-PT privacy
 *   ["cookies"]   → pt-PT cookies
 *   ["faq"]       → pt-PT faq
 *   ["en","privacy"] → en-US privacy
 *   ["en","cookies"] → en-US cookies
 *   ["en","faq"]     → en-US faq
 *   etc.
 *
 * Returns null for invalid combinations (triggers notFound).
 */
export function resolvePageRoute(
  segments: string[] | undefined,
): ResolvedPageRoute | null {
  if (!segments || segments.length === 0) {
    return { locale: "pt-PT", page: "landing" };
  }

  if (segments.length === 1) {
    const seg = segments[0];
    if (LEGAL_SLUGS.has(seg)) {
      return { locale: "pt-PT", page: seg as PageKind };
    }
    if (seg === FAQ_SLUG) {
      return { locale: "pt-PT", page: "faq" };
    }
    const code = localeCodeForSegment(seg);
    if (!code) return null;
    return { locale: code, page: "landing" };
  }

  if (segments.length === 2) {
    const [localeSeg, pageSeg] = segments;
    if (localeSeg === "reportagens" && pageSeg === REPORTAGE_SLUG) {
      return { locale: "pt-PT", page: "new-amadora" };
    }
    if (localeSeg === "reportagens" && pageSeg === TVI_REPORTAGE_SLUG) {
      return { locale: "pt-PT", page: "tvi" };
    }
    if (pageSeg === FAQ_SLUG) {
      const code = localeCodeForSegment(localeSeg);
      if (!code) return null;
      return { locale: code, page: "faq" };
    }
    if (!LEGAL_SLUGS.has(pageSeg)) return null;
    const code = localeCodeForSegment(localeSeg);
    if (!code) return null;
    return { locale: code, page: pageSeg as PageKind };
  }

  if (segments.length === 3) {
    const [localeSeg, sectionSeg, pageSeg] = segments;
    if (sectionSeg !== "reportagens") return null;
    if (pageSeg !== REPORTAGE_SLUG && pageSeg !== TVI_REPORTAGE_SLUG) return null;
    const code = localeCodeForSegment(localeSeg);
    if (!code) return null;
    return { locale: code, page: pageSeg === REPORTAGE_SLUG ? "new-amadora" : "tvi" };
  }

  return null;
}

/** Build the URL path for the New Amadora reportage page. */
export function buildReportagePath(locale: LocaleCode): string {
  const localeSegment =
    locale === "pt-PT" ? "" : `${locale.toLowerCase().split("-")[0]}/`;
  return `/${localeSegment}reportagens/${REPORTAGE_SLUG}/`;
}

/** Build the URL path for the TVI reportage page. */
export function buildTviReportagePath(locale: LocaleCode): string {
  const localeSegment =
    locale === "pt-PT" ? "" : `${locale.toLowerCase().split("-")[0]}/`;
  return `/${localeSegment}reportagens/${TVI_REPORTAGE_SLUG}/`;
}

/** Build the URL path for the FAQ knowledge base page. */
export function buildFaqPath(locale: LocaleCode): string {
  const localeSegment =
    locale === "pt-PT" ? "" : `${locale.toLowerCase().split("-")[0]}/`;
  return `/${localeSegment}${FAQ_SLUG}/`;
}

/** Build the URL path for a given locale + page kind. */
export function buildLegalPath(
  locale: LocaleCode,
  page: "privacy" | "cookies",
): string {
  const localeSegment =
    locale === "pt-PT" ? "" : locale.toLowerCase().split("-")[0] + "/";
  return `/${localeSegment}${page}/`;
}

/** Build the home URL path for a given locale. */
export function buildHomePath(locale: LocaleCode): string {
  if (locale === "pt-PT") return "/";
  const segment = locale.toLowerCase().split("-")[0];
  return `/${segment}/`;
}

/**
 * Build the URL path for any page kind in a given locale.
 * Used by the LocaleSwitcher to preserve the current page when switching
 * languages (FAQ → FAQ, reportage → reportage, nunca regressar à home).
 */
export function buildPagePath(locale: LocaleCode, page: PageKind): string {
  switch (page) {
    case "landing":
      return buildHomePath(locale);
    case "privacy":
    case "cookies":
      return buildLegalPath(locale, page);
    case "new-amadora":
      return buildReportagePath(locale);
    case "tvi":
      return buildTviReportagePath(locale);
    case "faq":
      return buildFaqPath(locale);
  }
}
