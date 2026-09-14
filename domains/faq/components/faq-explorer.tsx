"use client";

import { Search, X } from "lucide-react";
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
  ResolvedFaq,
} from "@/domains/faq/types";

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
 * - pesquisa considera perguntas, aliases, respostas, categoria, intent e
 *   idiomas de curso (ver lib/faq-search.ts);
 * - ao filtrar por idioma de curso, as perguntas parametrizadas são
 *   re-resolvidas para esse idioma (questionVariants) — nunca sobra
 *   `{targetLanguage}` por resolver;
 * - filtros com `<select>` nativo: acessível, mobile-first e sem bugs de
 *   touch (ver nota no LocaleSwitcher sobre Radix Select);
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

  // Re-resolve perguntas parametrizadas para o idioma de curso filtrado.
  const items = useMemo(
    () =>
      courseLanguage === "all"
        ? filtered
        : filtered.map((faq) => {
            const variant = faq.questionVariants?.[courseLanguage];
            return variant ? { ...faq, question: variant } : faq;
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

  const resultsLabel = ui.resultsCount.replaceAll(
    "{count}",
    String(items.length),
  );

  return (
    <div>
      {/* Controlos: pesquisa + filtros (mobile-first: empilhados → linha) */}
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
          <label htmlFor="faq-category" className="sr-only">
            {ui.categoryFilterLabel}
          </label>
          <select
            id="faq-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label={ui.categoryFilterLabel}
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
          <label htmlFor="faq-course-language" className="sr-only">
            {ui.courseLanguageFilterLabel}
          </label>
          <select
            id="faq-course-language"
            value={courseLanguage}
            onChange={(event) => setCourseLanguage(event.target.value)}
            aria-label={ui.courseLanguageFilterLabel}
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <option value="all">{ui.allCourseLanguagesLabel}</option>
            {courseLanguages.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

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
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              {ui.clearFiltersLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
