import { localeCodeForSegment, type LocaleCode } from "@/core/config/locales";

export type PageKind = "landing" | "privacy" | "cookies";

const LEGAL_SLUGS = new Set(["privacy", "cookies"]);

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
 *   ["en","privacy"] → en-US privacy
 *   ["en","cookies"] → en-US cookies
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
    const code = localeCodeForSegment(seg);
    if (!code) return null;
    return { locale: code, page: "landing" };
  }

  if (segments.length === 2) {
    const [localeSeg, pageSeg] = segments;
    if (!LEGAL_SLUGS.has(pageSeg)) return null;
    const code = localeCodeForSegment(localeSeg);
    if (!code) return null;
    return { locale: code, page: pageSeg as PageKind };
  }

  return null;
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
