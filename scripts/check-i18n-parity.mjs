#!/usr/bin/env node

/**
 * Validação de paridade de i18n (issue #7).
 *
 * Regra do projeto: o build deve FALHAR se qualquer chave estiver ausente em
 * qualquer um dos 7 idiomas publicados — nunca há fallback silencioso que
 * misture idiomas (AGENTS.md / kanban-flow).
 *
 * O que este script verifica:
 * 1. Os diretórios em `locales/` coincidem exatamente com os códigos de
 *    locale registados em `core/config/locales.ts` (fonte única de verdade).
 * 2. Cada `locales/{code}/common.json` é JSON válido.
 * 3. Todos os locales partilham exatamente as mesmas chaves (recursivo),
 *    usando `pt-PT` (locale padrão da raiz "/") como referência.
 * 4. (issue #32) O namespace `landing.*` existe em todos os locales e todos
 *    os arrays têm exatamente o mesmo comprimento nos 7 idiomas — o conteúdo
 *    da landing vive exclusivamente nestes ficheiros e é consumido pelo
 *    accessor tipado `domains/landing/i18n`, sem fallback silencioso.
 *
 * Uso: `node scripts/check-i18n-parity.mjs` — exit 0 (ok) ou exit 1 (falha).
 * É executado automaticamente antes de `next build` via hook `prebuild`.
 *
 * NOTA: os códigos são extraídos de `core/config/locales.ts` por padrão
 * estável do ficheiro (objetos `{ code: "xx-XX", ... }` dentro do array
 * `locales`). Mantém o registo de idiomas como fonte única de verdade, sem
 * importar TypeScript em runtime.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const localesDir = join(rootDir, "locales");
const localesTsPath = join(rootDir, "core", "config", "locales.ts");

const errors = [];

const ok = (message) => console.log(`[i18n-parity] ${message}`);
const fail = (message) => errors.push(message);

/** Achatamento recursivo das chaves de um objeto JSON (estrutural, sem split por ponto). */
function flattenKeys(value, prefix = "") {
  const out = new Set();
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const isNestedObject =
      child !== null &&
      typeof child === "object" &&
      !Array.isArray(child) &&
      Object.keys(child).length > 0;
    if (isNestedObject) {
      for (const sub of flattenKeys(child, path)) out.add(sub);
    } else {
      out.add(path);
    }
  }
  return out;
}

// --- 1. Códigos registados em core/config/locales.ts (fonte única de verdade) ---
const localesTs = readFileSync(localesTsPath, "utf8");
const registeredCodes = [
  ...new Set(
    [...localesTs.matchAll(/code:\s*"([^"]+)"/g)].map((match) => match[1]),
  ),
];

if (registeredCodes.length === 0) {
  console.error(
    "[i18n-parity] Nao foi possivel ler os codigos de locale de core/config/locales.ts.",
  );
  process.exit(1);
}

// --- 2. Carregar locales/{code}/common.json ---
const localeDirs = readdirSync(localesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const contents = new Map();
for (const dir of localeDirs) {
  const filePath = join(localesDir, dir, "common.json");
  if (!existsSync(filePath)) {
    fail(`locales/${dir}/ nao contem common.json.`);
    continue;
  }
  try {
    contents.set(dir, JSON.parse(readFileSync(filePath, "utf8")));
  } catch (cause) {
    fail(`locales/${dir}/common.json contem JSON invalido: ${cause.message}`);
  }
}

// --- 3. Os diretórios em locales/ devem coincidir com os códigos registados ---
const sortedExpected = [...registeredCodes].sort();
const sortedFound = [...contents.keys()].sort();

const missingDirs = sortedExpected.filter((code) => !contents.has(code));
const unexpectedDirs = sortedFound.filter((code) => !registeredCodes.includes(code));

if (missingDirs.length > 0) {
  fail(
    `Faltam diretorios de locale registados em core/config/locales.ts: ${missingDirs.join(", ")}.`,
  );
}
if (unexpectedDirs.length > 0) {
  fail(
    `Diretorios de locale sem registo em core/config/locales.ts: ${unexpectedDirs.join(", ")}.`,
  );
}

// --- 4. Paridade de chaves vs locale padrão (pt-PT) ---
const REFERENCE_CODE = "pt-PT";
if (contents.has(REFERENCE_CODE)) {
  const referenceKeys = flattenKeys(contents.get(REFERENCE_CODE));

  for (const code of sortedExpected) {
    if (code === REFERENCE_CODE) continue;
    const current = contents.get(code);
    if (!current) continue;

    const currentKeys = flattenKeys(current);
    const missingKeys = [...referenceKeys].filter((key) => !currentKeys.has(key));
    const extraKeys = [...currentKeys].filter((key) => !referenceKeys.has(key));

    if (missingKeys.length > 0) {
      fail(
        `[${code}] chaves em falta (vs ${REFERENCE_CODE}): ${missingKeys.join(", ")}.`,
      );
    }
    if (extraKeys.length > 0) {
      fail(
        `[${code}] chaves extra (vs ${REFERENCE_CODE}): ${extraKeys.join(", ")}.`,
      );
    }
  }
}

// --- 5. Namespace landing.* (issue #32): presença obrigatória + paridade de arrays ---
// O conteúdo da landing vive exclusivamente em locales/{code}/common.json sob
// `landing` e é consumido pelo accessor tipado domains/landing/i18n. A
// paridade de chaves landing.* já é coberta pela verificação 4 (o namespace
// faz parte do ficheiro); aqui garantimos que o namespace existe em todos os
// locales e que todos os arrays (infoBar.items, method.pillars, faq.items,
// ...) têm o mesmo comprimento nos 7 idiomas — arrays são folhas opacas para
// a comparação de chaves.

/** Recolhe recursivamente os arrays de um objeto: Map<caminho, comprimento>. */
function collectArrays(value, prefix = "", out = new Map()) {
  if (Array.isArray(value)) {
    out.set(prefix, value.length);
    value.forEach((item, index) => collectArrays(item, `${prefix}[${index}]`, out));
    return out;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      collectArrays(child, prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

for (const code of sortedExpected) {
  const current = contents.get(code);
  if (!current) continue;
  if (!isPlainObject(current.landing)) {
    fail(`[${code}] namespace landing.* ausente ou invalido em locales/${code}/common.json.`);
  }
}

if (contents.has(REFERENCE_CODE) && isPlainObject(contents.get(REFERENCE_CODE).landing)) {
  const referenceArrays = collectArrays(contents.get(REFERENCE_CODE).landing, "landing");

  for (const code of sortedExpected) {
    if (code === REFERENCE_CODE) continue;
    const current = contents.get(code);
    if (!current || !isPlainObject(current.landing)) continue;

    const currentArrays = collectArrays(current.landing, "landing");
    const missingArrays = [...referenceArrays.keys()].filter((path) => !currentArrays.has(path));
    const extraArrays = [...currentArrays.keys()].filter((path) => !referenceArrays.has(path));
    const lengthMismatch = [...referenceArrays.keys()].filter(
      (path) => currentArrays.has(path) && currentArrays.get(path) !== referenceArrays.get(path),
    );

    if (missingArrays.length > 0) {
      fail(`[${code}] arrays em falta (vs ${REFERENCE_CODE}): ${missingArrays.join(", ")}.`);
    }
    if (extraArrays.length > 0) {
      fail(`[${code}] arrays extra (vs ${REFERENCE_CODE}): ${extraArrays.join(", ")}.`);
    }
    if (lengthMismatch.length > 0) {
      const details = lengthMismatch.map(
        (path) => `${path} (${currentArrays.get(path)} vs ${referenceArrays.get(path)})`,
      );
      fail(`[${code}] arrays com comprimento divergente (vs ${REFERENCE_CODE}): ${details.join(", ")}.`);
    }
  }
}

// --- 6. Relatório final ---
if (errors.length > 0) {
  console.error("[i18n-parity] FALHOU — a paridade de i18n nao esta garantida:");
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  console.error(
    "[i18n-parity] Corrija os ficheiros em locales/ e volte a executar o build.",
  );
  process.exit(1);
}

const keyCount = flattenKeys(contents.get(REFERENCE_CODE)).size;
ok(
  `OK — ${registeredCodes.length} locales × ${keyCount} chaves em common.json, com namespace landing.* e paridade de arrays nos ${sortedExpected.length} locales.`,
);
