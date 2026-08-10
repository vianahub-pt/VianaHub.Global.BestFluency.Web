import type { LocaleCode } from "@/core/config/locales";

import { landing as deDE } from "@/locales/de-DE/common.json";
import { landing as enUS } from "@/locales/en-US/common.json";
import { landing as esES } from "@/locales/es-ES/common.json";
import { landing as frFR } from "@/locales/fr-FR/common.json";
import { landing as itIT } from "@/locales/it-IT/common.json";
import { landing as ptBR } from "@/locales/pt-BR/common.json";
import { landing as ptPT } from "@/locales/pt-PT/common.json";
import type { LandingContent } from "./types";

/**
 * Accessor tipado do conteúdo da landing (issue #32).
 *
 * Fonte única de verdade: `locales/{code}/common.json`, namespace `landing.*`.
 * Os componentes consomem exclusivamente estes ficheiros de locale através
 * deste módulo — nunca há fallback silencioso que misture idiomas.
 *
 * Garantias em camadas:
 * 1. Compile time — `satisfies Record<LocaleCode, LandingContent>`: o
 *    typecheck falha se faltar qualquer chave do contrato em qualquer locale.
 * 2. Build time — `scripts/check-i18n-parity.mjs` (prebuild) valida paridade
 *    exata de chaves e de comprimento de arrays nos 7 common.json.
 * 3. Runtime (init deste módulo, executado durante o export estático) —
 *    comparação estrutural contra a referência pt-PT com erro explícito
 *    indicando locale e chave em falta.
 *
 * Os imports nomeados (`{ landing }`) permitem ao bundler excluir as restantes
 * chaves de common.json dos bundles client (faq.tsx, mobile-menu.tsx).
 */
const contents = {
  "pt-PT": ptPT,
  "en-US": enUS,
  "es-ES": esES,
  "fr-FR": frFR,
  "de-DE": deDE,
  "it-IT": itIT,
  "pt-BR": ptBR,
} satisfies Record<LocaleCode, LandingContent>;

const REFERENCE_CODE: LocaleCode = "pt-PT";

function describeValue(value: unknown): string {
  if (Array.isArray(value)) return `array(${value.length})`;
  if (value !== null && typeof value === "object") return "objeto";
  return typeof value;
}

/**
 * Compara recursivamente a estrutura de `candidate` com a `reference`,
 * registando chaves em falta/extra, tipos divergentes e arrays com
 * comprimentos diferentes. `path` identifica a chave no formato landing.*.
 */
function collectParityProblems(
  reference: unknown,
  candidate: unknown,
  path: string,
  problems: string[],
): void {
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      problems.push(
        `${path} — esperado ${describeValue(reference)}, recebido ${describeValue(candidate)}`,
      );
      return;
    }
    if (reference.length !== candidate.length) {
      problems.push(
        `${path} — array com ${candidate.length} itens (referência: ${reference.length})`,
      );
      return;
    }
    reference.forEach((item, index) =>
      collectParityProblems(item, candidate[index], `${path}[${index}]`, problems),
    );
    return;
  }

  if (reference !== null && typeof reference === "object") {
    if (candidate === null || typeof candidate !== "object" || Array.isArray(candidate)) {
      problems.push(
        `${path} — esperado objeto, recebido ${describeValue(candidate)}`,
      );
      return;
    }
    const referenceRecord = reference as Record<string, unknown>;
    const candidateRecord = candidate as Record<string, unknown>;
    for (const key of Object.keys(referenceRecord)) {
      const childPath = `${path}.${key}`;
      if (!(key in candidateRecord)) {
        problems.push(`${childPath} — chave ausente`);
        continue;
      }
      collectParityProblems(referenceRecord[key], candidateRecord[key], childPath, problems);
    }
    for (const key of Object.keys(candidateRecord)) {
      if (!(key in referenceRecord)) {
        problems.push(`${path}.${key} — chave extra (não existe em ${REFERENCE_CODE})`);
      }
    }
    return;
  }

  if (typeof candidate !== typeof reference) {
    problems.push(
      `${path} — esperado ${describeValue(reference)}, recebido ${describeValue(candidate)}`,
    );
  }
}

// Gate de runtime: executado uma vez no carregamento do módulo. Como o site é
// exportado estaticamente, qualquer divergência falha o `next build` com
// mensagem explícita (locale + chave) — nunca um fallback silencioso.
for (const [code, content] of Object.entries(contents) as [LocaleCode, unknown][]) {
  if (content === null || typeof content !== "object" || Array.isArray(content)) {
    throw new Error(
      `[landing-i18n] Locale "${code}": namespace landing.* ausente ou inválido em locales/${code}/common.json.`,
    );
  }
  if (code === REFERENCE_CODE) continue;
  const problems: string[] = [];
  collectParityProblems(contents[REFERENCE_CODE], content, "landing", problems);
  if (problems.length > 0) {
    throw new Error(
      `[landing-i18n] Locale "${code}" sem paridade com "${REFERENCE_CODE}":\n  - ${problems.join("\n  - ")}`,
    );
  }
}

export function getLandingContent(code: LocaleCode): LandingContent {
  const content = contents[code];
  if (!content) {
    throw new Error(
      `[landing-i18n] Conteúdo landing.* indisponível para o locale "${code}".`,
    );
  }
  return content;
}
