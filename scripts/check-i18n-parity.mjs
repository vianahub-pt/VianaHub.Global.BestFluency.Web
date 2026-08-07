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

// --- 5. Paridade do contrato de conteúdo da landing (issue #8) ---
// O contrato TS (domains/landing/content/{code}.ts) é tipado: o typecheck
// garante que todos os locales implementam exatamente as mesmas chaves de
// LandingContent. Esta verificação adicional protege o build contra ficheiros
// de conteúdo em falta ou sem a tipagem do contrato (rede de segurança extra
// sobre o gate de common.json, sem alterar o comportamento existente).
const contentDir = join(rootDir, "domains", "landing", "content");
const contentTypesPath = join(contentDir, "types.ts");

if (!existsSync(contentTypesPath)) {
  fail("domains/landing/content/types.ts em falta (contrato LandingContent).");
} else {
  const typesSrc = readFileSync(contentTypesPath, "utf8");
  if (!/export interface LandingContent\b/.test(typesSrc)) {
    fail("domains/landing/content/types.ts nao declara o contrato LandingContent.");
  }

  for (const code of sortedExpected) {
    const contentFile = join(contentDir, `${code}.ts`);
    if (!existsSync(contentFile)) {
      fail(`domains/landing/content/${code}.ts em falta (contrato de conteúdo).`);
      continue;
    }
    const contentSrc = readFileSync(contentFile, "utf8");
    if (!contentSrc.includes(": LandingContent")) {
      fail(
        `domains/landing/content/${code}.ts nao implementa o contrato LandingContent.`,
      );
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
    "[i18n-parity] Corrija os ficheiros em locales/ ou domains/landing/content/ e volte a executar o build.",
  );
  process.exit(1);
}

const keyCount = flattenKeys(contents.get(REFERENCE_CODE)).size;
ok(
  `OK — ${registeredCodes.length} locales × ${keyCount} chaves em common.json e contrato de conteúdo presentes nos ${sortedExpected.length} locales.`,
);
