#!/usr/bin/env tsx

/**
 * Testes de regressão: searchFaqs() real com aliasCourseLanguages.
 *
 * Executa a implementação real de produção (faq-resolver + faq-search)
 * para validar que a inferência de idioma de curso funciona corretamente
 * em pesquisa exata de aliases parametrizados.
 *
 * Uso: `npm run test:faq:search`
 * Exit 0: tudo OK
 * Exit 1: problemas encontrados
 */

import { getFaqDatabase, getResolvedFaqs } from "../domains/faq/lib/faq-resolver.ts";
import { searchFaqs } from "../domains/faq/lib/faq-search.ts";

const LOCALE = "pt-PT" as const;
const resolvedFaqs = getResolvedFaqs(LOCALE);

const errors: string[] = [];
function ok(msg: string) {
  console.log(`[test-faq-search] OK: ${msg}`);
}
function fail(msg: string) {
  errors.push(msg);
}

// ============================================================
// Test 11: Exact alias search infers EN
// ============================================================
{
  const faq010 = resolvedFaqs.find((f) => f.id === "faq-010");
  if (!faq010) {
    fail("Test 11: faq-010 not found in resolved FAQs");
  } else {
    // Find the first alias whose aliasCourseLanguage is "en"
    const enIndex = faq010.aliasCourseLanguages.findIndex((cl) => cl === "en");
    if (enIndex === -1) {
      fail("Test 11: no alias with courseLanguage 'en' found for faq-010");
    } else {
      const alias = faq010.aliases[enIndex];
      const results = searchFaqs(resolvedFaqs, alias);

      if (results.length === 0) {
        fail(`Test 11: searchFaqs returned no results for alias "${alias}"`);
      } else if (results[0].faq.id !== "faq-010") {
        fail(
          `Test 11: expected faq-010, got ${results[0].faq.id} for alias "${alias}"`,
        );
      } else if (results[0].score !== 95) {
        fail(
          `Test 11: expected score 95, got ${results[0].score} for alias "${alias}"`,
        );
      } else if (results[0].matchedCourseLanguage !== "en") {
        fail(
          `Test 11: expected matchedCourseLanguage "en", got "${results[0].matchedCourseLanguage}" for alias "${alias}"`,
        );
      } else {
        ok(
          `Test 11: EN alias "${alias}" => faq-010, score=95, matchedCourseLanguage="en"`,
        );
      }
    }
  }
}

// ============================================================
// Test 12: Exact alias search infers FR
// ============================================================
{
  const faq010 = resolvedFaqs.find((f) => f.id === "faq-010");
  if (!faq010) {
    fail("Test 12: faq-010 not found");
  } else {
    const frIndex = faq010.aliasCourseLanguages.findIndex((cl) => cl === "fr");
    if (frIndex === -1) {
      fail("Test 12: no alias with courseLanguage 'fr' found for faq-010");
    } else {
      const alias = faq010.aliases[frIndex];
      const results = searchFaqs(resolvedFaqs, alias);

      if (results.length === 0) {
        fail(`Test 12: searchFaqs returned no results for alias "${alias}"`);
      } else if (results[0].faq.id !== "faq-010") {
        fail(
          `Test 12: expected faq-010, got ${results[0].faq.id} for alias "${alias}"`,
        );
      } else if (results[0].score !== 95) {
        fail(
          `Test 12: expected score 95, got ${results[0].score} for alias "${alias}"`,
        );
      } else if (results[0].matchedCourseLanguage !== "fr") {
        fail(
          `Test 12: expected matchedCourseLanguage "fr", got "${results[0].matchedCourseLanguage}" for alias "${alias}"`,
        );
      } else {
        ok(
          `Test 12: FR alias "${alias}" => faq-010, score=95, matchedCourseLanguage="fr"`,
        );
      }
    }
  }
}

// ============================================================
// Test 13: Exact alias search infers ES
// ============================================================
{
  const faq010 = resolvedFaqs.find((f) => f.id === "faq-010");
  if (!faq010) {
    fail("Test 13: faq-010 not found");
  } else {
    const esIndex = faq010.aliasCourseLanguages.findIndex((cl) => cl === "es");
    if (esIndex === -1) {
      fail("Test 13: no alias with courseLanguage 'es' found for faq-010");
    } else {
      const alias = faq010.aliases[esIndex];
      const results = searchFaqs(resolvedFaqs, alias);

      if (results.length === 0) {
        fail(`Test 13: searchFaqs returned no results for alias "${alias}"`);
      } else if (results[0].faq.id !== "faq-010") {
        fail(
          `Test 13: expected faq-010, got ${results[0].faq.id} for alias "${alias}"`,
        );
      } else if (results[0].score !== 95) {
        fail(
          `Test 13: expected score 95, got ${results[0].score} for alias "${alias}"`,
        );
      } else if (results[0].matchedCourseLanguage !== "es") {
        fail(
          `Test 13: expected matchedCourseLanguage "es", got "${results[0].matchedCourseLanguage}" for alias "${alias}"`,
        );
      } else {
        ok(
          `Test 13: ES alias "${alias}" => faq-010, score=95, matchedCourseLanguage="es"`,
        );
      }
    }
  }
}

// ============================================================
// Test 14: Exact alias search infers DE
// ============================================================
{
  const faq010 = resolvedFaqs.find((f) => f.id === "faq-010");
  if (!faq010) {
    fail("Test 14: faq-010 not found");
  } else {
    const deIndex = faq010.aliasCourseLanguages.findIndex((cl) => cl === "de");
    if (deIndex === -1) {
      fail("Test 14: no alias with courseLanguage 'de' found for faq-010");
    } else {
      const alias = faq010.aliases[deIndex];
      const results = searchFaqs(resolvedFaqs, alias);

      if (results.length === 0) {
        fail(`Test 14: searchFaqs returned no results for alias "${alias}"`);
      } else if (results[0].faq.id !== "faq-010") {
        fail(
          `Test 14: expected faq-010, got ${results[0].faq.id} for alias "${alias}"`,
        );
      } else if (results[0].score !== 95) {
        fail(
          `Test 14: expected score 95, got ${results[0].score} for alias "${alias}"`,
        );
      } else if (results[0].matchedCourseLanguage !== "de") {
        fail(
          `Test 14: expected matchedCourseLanguage "de", got "${results[0].matchedCourseLanguage}" for alias "${alias}"`,
        );
      } else {
        ok(
          `Test 14: DE alias "${alias}" => faq-010, score=95, matchedCourseLanguage="de"`,
        );
      }
    }
  }
}

// ============================================================
// Test 15: aliases/aliasCourseLanguages alignment
// For every ResolvedFaq, aliases.length === aliasCourseLanguages.length
// For parametrized FAQs (parameters.length > 0), each expanded alias
// must have a defined course language belonging to applicableCourseLanguages.
// For non-parametrized FAQs, aliasCourseLanguages values must be undefined.
// ============================================================
{
  const database = getFaqDatabase();
  const parametrizedIds = new Set(
    database.faqs
      .filter((faq) => faq.parameters.length > 0)
      .map((faq) => faq.id),
  );

  let misaligned = 0;
  let paramMissingCl = 0;
  let nonParamUndefined = 0;

  for (const faq of resolvedFaqs) {
    // Check length alignment (must hold for ALL FAQs)
    if (faq.aliases.length !== faq.aliasCourseLanguages.length) {
      fail(
        `Test 15: ${faq.id} aliases.length (${faq.aliases.length}) !== aliasCourseLanguages.length (${faq.aliasCourseLanguages.length})`,
      );
      misaligned++;
      continue;
    }

    const isParametrized = parametrizedIds.has(faq.id);

    if (isParametrized) {
      // Parametrized FAQ: every expanded alias must have a defined course language
      for (let i = 0; i < faq.aliasCourseLanguages.length; i++) {
        const cl = faq.aliasCourseLanguages[i];
        if (cl === undefined) {
          fail(
            `Test 15: ${faq.id} aliasCourseLanguages[${i}] is undefined for parametrized FAQ`,
          );
          paramMissingCl++;
        } else if (!faq.applicableCourseLanguages.includes(cl)) {
          fail(
            `Test 15: ${faq.id} aliasCourseLanguages[${i}]="${cl}" not in applicableCourseLanguages`,
          );
          paramMissingCl++;
        }
      }
    } else {
      // Non-parametrized FAQ: all aliasCourseLanguages values must be undefined
      for (let i = 0; i < faq.aliasCourseLanguages.length; i++) {
        if (faq.aliasCourseLanguages[i] !== undefined) {
          fail(
            `Test 15: ${faq.id} aliasCourseLanguages[${i}]="${faq.aliasCourseLanguages[i]}" should be undefined for non-parametrized FAQ`,
          );
          nonParamUndefined++;
        }
      }
    }
  }

  if (misaligned === 0 && paramMissingCl === 0 && nonParamUndefined === 0) {
    ok(
      `Test 15: ${resolvedFaqs.length} ResolvedFaqs aligned; ${parametrizedIds.size} parametrized FAQ validated`,
    );
  }
}

// --- Relatório ---
if (errors.length > 0) {
  console.error("\n[test-faq-search] FALHOU — testes de regressão com erros:");
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  process.exit(1);
}

console.log(
  "\n[test-faq-search] OK — todos os testes de regressão de search passaram.",
);
