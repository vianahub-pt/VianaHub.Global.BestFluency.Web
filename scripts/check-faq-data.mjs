#!/usr/bin/env node

/**
 * Validação estrutural da base de FAQ (domains/faq/data/faq.json).
 *
 * Verifica: schemaVersion, 52 IDs únicos, 9 locales completos, categorias,
 * idiomas de curso, placeholders declarados e resolvíveis, presentation,
 * defaultQuestion para FAQs parametrizadas e ausência de placeholders na
 * saída do resolver.
 *
 * Uso: `node scripts/check-faq-data.mjs` — exit 0 (ok) ou exit 1 (falha).
 *
 * NOTA: a validação de runtime (gate de build) está em
 * domains/faq/lib/faq-resolver.ts. Este script é uma camada adicional de
 * validação estática, executada como prebuild/check.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const faqPath = join(rootDir, "domains", "faq", "data", "faq.json");

const errors = [];
const warnings = [];

const ok = (msg) => console.log(`[check-faq] ${msg}`);
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// --- Load and parse ---
let database;
try {
  const raw = readFileSync(faqPath, "utf8");
  database = JSON.parse(raw);
} catch (cause) {
  console.error(`[check-faq] Falha ao ler ou parsear ${faqPath}: ${cause.message}`);
  process.exit(1);
}

// --- 1. schemaVersion ---
if (database.schemaVersion !== "2.0") {
  fail(`schemaVersion "${database.schemaVersion}" (esperado "2.0")`);
}

// --- 2. 52 FAQs com IDs únicos ---
const ids = database.faqs.map((faq) => faq.id);
const uniqueIds = new Set(ids);

if (ids.length !== 52) {
  fail(`faqs com ${ids.length} entradas (esperado 52)`);
}
if (uniqueIds.size !== ids.length) {
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  fail(`IDs duplicados: ${[...new Set(dupes)].join(", ")}`);
}

// --- 3. Intents únicos ---
const intents = database.faqs.map((faq) => faq.intent);
const uniqueIntents = new Set(intents);
if (uniqueIntents.size !== intents.length) {
  const dupes = intents.filter((intent, i) => intents.indexOf(intent) !== i);
  fail(`Intents duplicados: ${[...new Set(dupes)].join(", ")}`);
}

// --- 4. supportedLocales ---
const expectedLocales = [
  "pt-PT", "en-US", "es-ES", "fr-FR", "de-DE", "it-IT", "ja-JP", "ru-RU", "zh-CN",
];
const dataLocales = database.supportedLocales;
const missingLocales = expectedLocales.filter((l) => !dataLocales.includes(l));
const extraLocales = dataLocales.filter((l) => !expectedLocales.includes(l));

if (missingLocales.length > 0) {
  fail(`supportedLocales sem: ${missingLocales.join(", ")}`);
}
if (extraLocales.length > 0) {
  fail(`supportedLocales extra: ${extraLocales.join(", ")}`);
}

// --- 5. offeredCourseLanguages ---
const expectedCourseLanguages = ["en", "fr", "es", "de"];
const dataCourseLanguages = database.offeredCourseLanguages;
const missingCL = expectedCourseLanguages.filter((cl) => !dataCourseLanguages.includes(cl));
const extraCL = dataCourseLanguages.filter((cl) => !expectedCourseLanguages.includes(cl));

if (missingCL.length > 0) {
  fail(`offeredCourseLanguages sem: ${missingCL.join(", ")}`);
}
if (extraCL.length > 0) {
  fail(`offeredCourseLanguages extra: ${extraCL.join(", ")}`);
}

// --- 6. Categorias: existem, têm labels nos 9 locales ---
for (const faq of database.faqs) {
  if (!database.categories[faq.category]) {
    fail(`${faq.id}: categoria desconhecida "${faq.category}"`);
  }
}
for (const [catId, category] of Object.entries(database.categories)) {
  for (const locale of expectedLocales) {
    if (!category.labels[locale]) {
      fail(`categoria "${catId}" sem rótulo em ${locale}`);
    }
  }
}

// --- 7. targetLanguages: cobre todos os idiomas de curso nos 9 locales ---
for (const cl of dataCourseLanguages) {
  const target = database.targetLanguages[cl];
  if (!target) {
    fail(`targetLanguages sem "${cl}"`);
    continue;
  }
  for (const locale of expectedLocales) {
    const loc = target.locales[locale];
    if (!loc?.label || !loc.learningObject) {
      fail(`targetLanguages.${cl} sem label/learningObject em ${locale}`);
    }
  }
}

// --- 8. Localizações completas + placeholders ---
const PLACEHOLDER = /\{([a-zA-Z][a-zA-Z0-9]*)\}/g;

function extractPlaceholders(text) {
  return [...text.matchAll(PLACEHOLDER)].map((m) => m[1]);
}

for (const faq of database.faqs) {
  const declared = new Set(faq.parameters);
  for (const locale of expectedLocales) {
    const loc = faq.localizations[locale];
    if (!loc?.question || !loc.answer) {
      fail(`${faq.id}: sem question/answer em ${locale}`);
      continue;
    }
    const texts = [
      loc.question,
      loc.answer,
      ...(loc.searchAliases ?? []),
    ];
    for (const text of texts) {
      for (const ph of extractPlaceholders(text)) {
        if (!declared.has(ph)) {
          fail(`${faq.id} (${locale}): placeholder {${ph}} não declarado em parameters`);
        }
      }
    }
    // FAQ parametrizada precisa de defaultQuestion
    if (faq.parameters.length > 0 && !loc.defaultQuestion) {
      fail(`${faq.id} (${locale}): defaultQuestion ausente (parameters: ${faq.parameters.join(", ")})`);
    }
    if (loc.defaultQuestion?.includes("{")) {
      fail(`${faq.id} (${locale}): defaultQuestion com placeholder por resolver`);
    }
  }
}

// --- 9. applicableCourseLanguages válido ---
for (const faq of database.faqs) {
  for (const cl of faq.applicableCourseLanguages) {
    if (!dataCourseLanguages.includes(cl)) {
      fail(`${faq.id}: idioma de curso desconhecido "${cl}" em applicableCourseLanguages`);
    }
  }
}

// --- 10. presentation.homePreviewFaqIds ---
const previewIds = database.presentation?.homePreviewFaqIds;
if (!Array.isArray(previewIds) || previewIds.length === 0) {
  fail("presentation.homePreviewFaqIds ausente ou vazio");
} else {
  if (new Set(previewIds).size !== previewIds.length) {
    fail("presentation.homePreviewFaqIds com IDs duplicados");
  }
  if (previewIds.length !== 8) {
    warn(`presentation.homePreviewFaqIds tem ${previewIds.length} IDs (esperado 8)`);
  }
  for (const id of previewIds) {
    if (!uniqueIds.has(id)) {
      fail(`presentation.homePreviewFaqIds: ID desconhecido "${id}"`);
    }
  }
}

// --- 11. Prioridades válidas ---
const validPriorities = ["high", "medium"];
for (const faq of database.faqs) {
  if (!validPriorities.includes(faq.priority)) {
    fail(`${faq.id}: prioridade inválida "${faq.priority}"`);
  }
}

// --- 12. searchIntent válido ---
const validSearchIntents = ["commercial", "informational"];
for (const faq of database.faqs) {
  if (!validSearchIntents.includes(faq.searchIntent)) {
    fail(`${faq.id}: searchIntent inválido "${faq.searchIntent}"`);
  }
}

// --- Relatório ---
if (errors.length > 0) {
  console.error("[check-faq] FALHOU — a base de FAQ tem inconsistências:");
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  process.exit(1);
}

if (warnings.length > 0) {
  for (const w of warnings) {
    console.warn(`[check-faq] AVISO: ${w}`);
  }
}

ok(
  `OK — ${ids.length} FAQs, ${dataLocales.length} locales, ${dataCourseLanguages.length} idiomas de curso, ${Object.keys(database.categories).length} categorias, ${previewIds?.length ?? 0} home previews.`,
);
