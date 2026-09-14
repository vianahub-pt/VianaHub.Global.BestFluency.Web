"use client";

import { MessageCircle, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { CommonMessages } from "@/core/i18n";
import { FaqAccordion } from "@/domains/faq/components/faq-accordion";
import {
  filterFaqsByCategory,
  filterFaqsByCourseLanguage,
  searchFaqs,
} from "@/domains/faq/lib/faq-search";
import type {
  FaqCategoryOption,
  FaqCourseLanguageOption,
  FaqCourseLanguage,
  ResolvedFaq,
} from "@/domains/faq/types";
import { buttonVariants } from "@/shared/components/ui/button";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

interface FaqExplorerProps {
  /** As 52 FAQs resolvidas no locale (estado inicial: todas visíveis). */
  faqs: ResolvedFaq[];
  categories: FaqCategoryOption[];
  courseLanguages: FaqCourseLanguageOption[];
  ui: CommonMessages["faqPage"];
}

/**
 * Explorador da base de conhecimento de FAQ: pesquisa local determinística
 * + filtros de categoria e idioma de curso.
 *
 * - Estado inicial: exatamente as 52 FAQs, accordions fechados;
 * - labels visíveis acima dos selects;
 * - filtros ativos visíveis como chips removíveis;
 * - contador contextual com nome do idioma quando filtrado;
 * - CTA WhatsApp no estado sem resultados;
 * - sem hardcode visível: todos os textos vêm do namespace `faqPage`.
 */
export function FaqExplorer({
  faqs,
  categories,
  courseLanguages,
  ui,
}: FaqExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [courseLanguage, setCourseLanguage] = useState("all");

  const filtered = useMemo(() => {
    const bySearch = searchFaqs(faqs, query);
    const byCategory = filterFaqsByCategory(bySearch, category);
    return filterFaqsByCourseLanguage(byCategory, courseLanguage);
  }, [faqs, query, category, courseLanguage]);

  // Re-resolve perguntas parametrizadas: filtro explícito tem precedência,
  // idioma inferido pela pesquisa é usado quando o filtro está em "all".
  const items = useMemo(
    () =>
      filtered.map((result) => {
        const effectiveCl: FaqCourseLanguage | undefined =
          courseLanguage !== "all"
            ? courseLanguage
            : result.matchedCourseLanguage;

        if (!effectiveCl) return result.faq;

        const variant = result.faq.questionVariants?.[effectiveCl];
        return variant ? { ...result.faq, question: variant } : result.faq;
      }),
    [filtered, courseLanguage],
  );

  const hasActiveFilters =
    query.trim() !== "" || category !== "all" || courseLanguage !== "all";

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setCourseLanguage("all");
  }

  function removeFilter(type: "query" | "category" | "courseLanguage") {
    if (type === "query") setQuery("");
    else if (type === "category") setCategory("all");
    else setCourseLanguage("all");
  }

  // Label do idioma de curso selecionado (para chips e contador contextual).
  const selectedCourseLanguageLabel =
    courseLanguage !== "all"
      ? courseLanguages.find((cl) => cl.code === courseLanguage)?.label
      : undefined;

  // Label da categoria selecionada.
  const selectedCategoryLabel =
    category !== "all"
      ? categories.find((c) => c.id === category)?.label
      : undefined;

  // Contador de resultados contextual.
  const resultsLabel =
    courseLanguage !== "all" && ui.resultsCountWithLanguage
      ? ui.resultsCountWithLanguage
          .replaceAll("{count}", String(items.length))
          .replaceAll("{language}", selectedCourseLanguageLabel ?? courseLanguage)
      : ui.resultsCount.replaceAll("{count}", String(items.length));

  return (
    <div>
      {/* Controlos: pesquisa + filtros */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <label htmlFor="faq-search" className="sr-only">
            {ui.searchLabel}
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.searchPlaceholder}
            autoComplete="off"
            className="h-11 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </div>

        <div>
          <label
            htmlFor="faq-category"
            className="mb-1.5 block text-xs font-medium text-foreground"
          >
            {ui.categoryFilterLabel}
          </label>
          <select
            id="faq-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label={ui.categoryFilterAriaLabel}
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <option value="all">{ui.allCategoriesLabel}</option>
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="faq-course-language"
            className="mb-1.5 block text-xs font-medium text-foreground"
          >
            {ui.courseLanguageFilterLabel}
          </label>
          <select
            id="faq-course-language"
            value={courseLanguage}
            onChange={(event) => setCourseLanguage(event.target.value)}
            aria-label={ui.courseLanguageFilterAriaLabel}
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <option value="all">{ui.allCourseLanguagesLabel}</option>
            {courseLanguages.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted-foreground">
            {ui.courseLanguageFilterHint}
          </p>
        </div>
      </div>

      {/* Filtros ativos */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {ui.activeFiltersLabel}:
          </span>
          {query.trim() !== "" && (
            <button
              type="button"
              onClick={() => removeFilter("query")}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              &ldquo;{query.trim()}&rdquo;
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
          {category !== "all" && selectedCategoryLabel && (
            <button
              type="button"
              onClick={() => removeFilter("category")}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {selectedCategoryLabel}
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
          {courseLanguage !== "all" && selectedCourseLanguageLabel && (
            <button
              type="button"
              onClick={() => removeFilter("courseLanguage")}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {selectedCourseLanguageLabel}
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 text-xs font-medium text-accent underline transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {ui.clearFiltersLabel}
          </button>
        </div>
      )}

      {/* Contagem de resultados (live region para leitores de ecrã) */}
      <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {resultsLabel}
      </p>

      {items.length > 0 ? (
        <FaqAccordion items={items} className="mt-4" />
      ) : (
        <div className="mt-4 rounded-lg border border-border bg-card px-4 py-10 text-center">
          <h3 className="text-base font-semibold text-foreground">
            {ui.noResultsTitle}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {ui.noResultsDescription}
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                {ui.clearFiltersLabel}
              </button>
            )}
            <WhatsAppLink
              message={ui.whatsappMessage}
              section="faq"
              ctaLabel={ui.noResultsContactTitle}
              ariaLabel={ui.noResultsContactTitle}
              className={cn(
                buttonVariants({ variant: "orange", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {ui.noResultsContactTitle}
            </WhatsAppLink>
          </div>
        </div>
      )}
    </div>
  );
}
