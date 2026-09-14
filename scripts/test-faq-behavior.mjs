#!/usr/bin/env node

/**
 * Testes comportamentais da base de FAQ.
 *
 * Valida cenários específicos de pesquisa, resolução de locale e
 * course language inference. Executa como check estático (sem framework
 * de testes) — exit 0 (ok) ou exit 1 (falha).
 *
 * Uso: `node scripts/test-faq-behavior.mjs`
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

// --- Load FAQ data ---
const faqPath = join(rootDir, "domains", "faq", "data", "faq.json");
const database = JSON.parse(readFileSync(faqPath, "utf8"));

const errors = [];
const ok = (msg) => console.log(`[test-faq] OK: ${msg}`);
const fail = (msg) => errors.push(msg);

// --- Helpers ---
const PLACEHOLDER = /\{([a-zA-Z][a-zA-Z0-9]*)\}/g;

function resolveTemplate(template, targetLanguageLearningObject) {
  return template.replace(PLACEHOLDER, (match, name) => {
    if (name === "targetLanguage" && targetLanguageLearningObject) {
      return targetLanguageLearningObject;
    }
    return match;
  });
}

function getLearningObject(courseLanguage, locale) {
  return database.targetLanguages[courseLanguage]?.locales[locale]?.learningObject;
}

function getDefaultQuestion(faqId, locale) {
  const faq = database.faqs.find((f) => f.id === faqId);
  return faq?.localizations[locale]?.defaultQuestion;
}

function getAnswer(faqId, locale) {
  const faq = database.faqs.find((f) => f.id === faqId);
  return faq?.localizations[locale]?.answer;
}

// ============================================================
// Test 1: fr-FR, search "Combien de temps me faudrait-il pour apprendre l'allemand ?"
// Expected: faq-010, matchedCourseLanguage=de, question with "l'allemand"
// ============================================================
{
  const faq = database.faqs.find((f) => f.id === "faq-010");
  if (!faq) {
    fail("Test 1: faq-010 not found");
  } else {
    const frQuestion = faq.localizations["fr-FR"]?.question;
    const deLearningObj = getLearningObject("de", "fr-FR");
    const resolvedQuestion = resolveTemplate(frQuestion, deLearningObj);

    const expected = "Combien de temps faut-il pour apprendre l'allemand ?";
    if (resolvedQuestion !== expected) {
      fail(`Test 1: resolved question mismatch: "${resolvedQuestion}" !== "${expected}"`);
    } else {
      ok('Test 1: fr-FR + de resolved question = "Combien de temps faut-il pour apprendre l\'allemand ?"');
    }

    // Verify answer is in French
    const frAnswer = getAnswer("faq-010", "fr-FR");
    if (!frAnswer) {
      fail("Test 1: faq-010 has no French answer");
    } else {
      ok("Test 1: faq-010 has French answer");
    }

    // Verify faq-010 applies to de
    if (!faq.applicableCourseLanguages.includes("de")) {
      fail("Test 1: faq-010 does not apply to course language 'de'");
    } else {
      ok("Test 1: faq-010 applies to course language 'de'");
    }
  }
}

// ============================================================
// Test 2: pt-PT + filtro de alemão → "Quanto tempo demora a aprender alemão?"
// ============================================================
{
  const faq = database.faqs.find((f) => f.id === "faq-010");
  if (!faq) {
    fail("Test 2: faq-010 not found");
  } else {
    const ptQuestion = faq.localizations["pt-PT"]?.question;
    const deLearningObj = getLearningObject("de", "pt-PT");
    const resolvedQuestion = resolveTemplate(ptQuestion, deLearningObj);

    const expected = "Quanto tempo demora a aprender alemão?";
    if (resolvedQuestion !== expected) {
      fail(`Test 2: resolved question mismatch: "${resolvedQuestion}" !== "${expected}"`);
    } else {
      ok('Test 2: pt-PT + de = "Quanto tempo demora a aprender alemão?"');
    }
  }
}

// ============================================================
// Test 3: es-ES + filtro de inglês → pergunta em espanhol sobre aprender inglês
// ============================================================
{
  const faq = database.faqs.find((f) => f.id === "faq-010");
  if (!faq) {
    fail("Test 3: faq-010 not found");
  } else {
    const esQuestion = faq.localizations["es-ES"]?.question;
    const enLearningObj = getLearningObject("en", "es-ES");
    const resolvedQuestion = resolveTemplate(esQuestion, enLearningObj);

    if (!resolvedQuestion.includes("inglés") && !resolvedQuestion.includes(" inglés")) {
      fail(`Test 3: resolved question does not mention English: "${resolvedQuestion}"`);
    } else {
      ok(`Test 3: es-ES + en resolved question = "${resolvedQuestion}"`);
    }
  }
}

// ============================================================
// Test 4: de-DE sem filtro → defaultQuestion genérica, nunca {targetLanguage}
// ============================================================
{
  const defaultQ = getDefaultQuestion("faq-010", "de-DE");
  if (!defaultQ) {
    fail("Test 4: faq-010 has no defaultQuestion for de-DE");
  } else if (defaultQ.includes("{")) {
    fail(`Test 4: faq-010 defaultQuestion contains placeholder: "${defaultQ}"`);
  } else {
    ok(`Test 4: de-DE defaultQuestion = "${defaultQ}"`);
  }
}

// ============================================================
// Test 5: Home preview IDs exist and are 8
// ============================================================
{
  const previewIds = database.presentation?.homePreviewFaqIds;
  if (!Array.isArray(previewIds) || previewIds.length !== 8) {
    fail(`Test 5: expected 8 homePreviewFaqIds, got ${previewIds?.length ?? 0}`);
  } else {
    const allExist = previewIds.every((id) => database.faqs.some((f) => f.id === id));
    if (!allExist) {
      fail("Test 5: not all homePreviewFaqIds exist in faqs");
    } else {
      ok(`Test 5: 8 homePreviewFaqIds all valid: ${previewIds.join(", ")}`);
    }
  }
}

// ============================================================
// Test 6: All 52 FAQs have no unresolved placeholders in defaultQuestion
// ============================================================
{
  let unresolvedCount = 0;
  for (const faq of database.faqs) {
    for (const [locale, loc] of Object.entries(faq.localizations)) {
      if (loc.defaultQuestion && loc.defaultQuestion.includes("{")) {
        fail(`Test 6: ${faq.id} (${locale}) defaultQuestion has unresolved placeholder: "${loc.defaultQuestion}"`);
        unresolvedCount++;
      }
    }
  }
  if (unresolvedCount === 0) {
    ok("Test 6: All defaultQuestions have no unresolved placeholders");
  }
}

// ============================================================
// Test 7: All 52 FAQs have localizations for all 9 locales
// ============================================================
{
  const expectedLocales = ["pt-PT","en-US","es-ES","fr-FR","de-DE","it-IT","ja-JP","ru-RU","zh-CN"];
  let missingCount = 0;
  for (const faq of database.faqs) {
    for (const locale of expectedLocales) {
      if (!faq.localizations[locale]?.question || !faq.localizations[locale]?.answer) {
        fail(`Test 7: ${faq.id} missing localization for ${locale}`);
        missingCount++;
      }
    }
  }
  if (missingCount === 0) {
    ok("Test 7: All 52 FAQs have all 9 locale localizations");
  }
}

// --- Relatório ---
if (errors.length > 0) {
  console.error("\n[test-faq] FALHOU — testes comportamentais com erros:");
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  process.exit(1);
}

console.log("\n[test-faq] OK — todos os testes comportamentais passaram.");
