import type { LocaleCode } from "@/core/config/locales";

import deDE from "@/locales/de-DE/common.json";
import enUS from "@/locales/en-US/common.json";
import esES from "@/locales/es-ES/common.json";
import frFR from "@/locales/fr-FR/common.json";
import itIT from "@/locales/it-IT/common.json";
import ptPT from "@/locales/pt-PT/common.json";

/**
 * Utilitário central de localização (issue #36) — equivalente frontend do
 * padrão do backend VianaHub.Global.Gerit (`ILocalizationService.GetMessage`).
 *
 * Correspondência com o backend (análise completa na issue #36):
 * - backend: `locales/{culture}/common.json` desserializado em
 *   `Dictionary<string, string>` com cache estático thread-safe, carregado
 *   uma única vez por cultura (`LocalizationService.GetMessages`);
 * - frontend: import estático dos 7 `locales/{code}/common.json` — o módulo
 *   é singleton e o site é exportado estaticamente, logo cada dicionário é
 *   carregado exatamente uma vez, sem IO em runtime;
 * - backend: cultura resolvida por request via `Accept-Language`
 *   (`RequestLocalizationMiddleware` → `HttpContext.Items["RequestCulture"]`);
 * - frontend: locale resolvido pela rota estática (`/` → pt-PT, `/en/` →
 *   en-US, …) via `core/config/locales.ts` (`localeCodeForSegment`) — cada
 *   idioma tem URL própria, nunca troca por JavaScript em runtime;
 * - backend: chave ausente faz fallback para pt-PT e, em último caso,
 *   devolve a própria chave (tolerância com log);
 * - frontend: PROIBIDO fallback silencioso (AGENTS.md — SEO internacional
 *   não pode misturar idiomas). Chave ausente é erro explícito; divergência
 *   entre locales falha o build. Divergência consciente e mais estrita.
 *
 * Fonte única de verdade: `locales/{code}/common.json`. O tipo
 * `CommonMessages` é derivado do JSON de referência (pt-PT) — não existe
 * contrato manual paralelo que possa divergir da fonte.
 *
 * Garantias em camadas (todas falham de forma explícita, nunca silenciosa):
 * 1. Compile time — `satisfies Record<LocaleCode, CommonMessages>`: o
 *    typecheck falha se faltar qualquer chave em qualquer locale;
 * 2. Build time (prebuild) — `scripts/check-i18n-parity.mjs` valida
 *    paridade exata de chaves e comprimento de arrays nos 7 common.json;
 * 3. Runtime (init deste módulo, executado durante o export estático) —
 *    comparação estrutural contra a referência pt-PT com erro indicando
 *    locale e chave em falta.
 *
 * Dois modos de acesso:
 * - `getMessage(code, key)` — mensagem por chave pontilhada, equivalente a
 *   `_localization.GetMessage(key)`. Aceita placeholders `{0}`, `{1}`, …
 *   (equivalente ao overload `GetMessage(key, args)` com `string.Format`).
 * - `getMessages(code)` — dicionário completo e tipado do locale, para
 *   componentes que consomem namespaces inteiros (objetos e arrays).
 *
 * Nota de bundle: este módulo destina-se a Server Components, layouts e
 * metadata (executados no build). Client Components recebem o conteúdo por
 * props serializadas — nunca importam este módulo — para que os dicionários
 * não entrem no bundle client (mobile-first, performance).
 */

/** Dicionário de mensagens de um locale, derivado do JSON de referência. */
export type CommonMessages = typeof ptPT;

/** Namespace tipado da landing (`landing.*` em common.json). */
export type LandingContent = CommonMessages["landing"];

/**
 * União de todas as chaves pontilhadas que resolvem para uma folha string
 * em common.json — tanto as chaves planas com pontos no próprio nome
 * (ex.: "auth.login.title", estilo dicionário do backend) como os caminhos
 * de namespaces aninhados (ex.: "landing.hero.title1"). Arrays e valores
 * não-string não são endereçáveis por `getMessage` (use `getMessages`).
 */
export type MessageKey = StringLeafKey<CommonMessages>;

type StringLeafKey<Value, Prefix extends string = ""> = Value extends string
  ? Prefix
  : Value extends readonly unknown[]
    ? never
    : Value extends object
      ? {
          [Key in keyof Value & string]: StringLeafKey<
            Value[Key],
            Prefix extends "" ? Key : `${Prefix}.${Key}`
          >;
        }[keyof Value & string]
      : never;

const messages = {
  "pt-PT": ptPT,
  "en-US": enUS,
  "es-ES": esES,
  "fr-FR": frFR,
  "de-DE": deDE,
  "it-IT": itIT,
} satisfies Record<LocaleCode, CommonMessages>;

const REFERENCE_CODE: LocaleCode = "pt-PT";

function describeValue(value: unknown): string {
  if (Array.isArray(value)) return `array(${value.length})`;
  if (value !== null && typeof value === "object") return "objeto";
  return typeof value;
}

/**
 * Compara recursivamente a estrutura de `candidate` com a `reference`,
 * registando chaves em falta/extra, tipos divergentes e arrays com
 * comprimentos diferentes. `path` identifica a chave no formato pontilhado.
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
      collectParityProblems(
        item,
        candidate[index],
        `${path}[${index}]`,
        problems,
      ),
    );
    return;
  }

  if (reference !== null && typeof reference === "object") {
    if (
      candidate === null ||
      typeof candidate !== "object" ||
      Array.isArray(candidate)
    ) {
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
      collectParityProblems(
        referenceRecord[key],
        candidateRecord[key],
        childPath,
        problems,
      );
    }
    for (const key of Object.keys(candidateRecord)) {
      if (!(key in referenceRecord)) {
        problems.push(
          `${path}.${key} — chave extra (não existe em ${REFERENCE_CODE})`,
        );
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
for (const [code, content] of Object.entries(messages) as [
  LocaleCode,
  unknown,
][]) {
  if (
    content === null ||
    typeof content !== "object" ||
    Array.isArray(content)
  ) {
    throw new Error(
      `[i18n] Locale "${code}": common.json ausente ou inválido em locales/${code}/common.json.`,
    );
  }
  if (code === REFERENCE_CODE) continue;
  const problems: string[] = [];
  collectParityProblems(messages[REFERENCE_CODE], content, "common", problems);
  if (problems.length > 0) {
    throw new Error(
      `[i18n] Locale "${code}" sem paridade com "${REFERENCE_CODE}":\n  - ${problems.join("\n  - ")}`,
    );
  }
}

/**
 * Resolve uma chave pontilhada contra o dicionário do locale.
 * Primeiro tenta a correspondência literal da chave (chaves planas com
 * pontos no próprio nome, como no dicionário do backend); se não existir,
 * desce o caminho pontilhado pelos namespaces aninhados.
 */
function resolveKey(dictionary: CommonMessages, key: string): unknown {
  const record = dictionary as Record<string, unknown>;
  if (Object.prototype.hasOwnProperty.call(record, key)) {
    return record[key];
  }
  let current: unknown = dictionary;
  for (const segment of key.split(".")) {
    if (
      current === null ||
      typeof current !== "object" ||
      Array.isArray(current)
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

/**
 * Substitui placeholders posicionais `{0}`, `{1}`, … pelos argumentos —
 * equivalente ao `string.Format` do overload `GetMessage(key, args)` do
 * backend. Placeholder sem argumento correspondente permanece intacto.
 */
function formatMessage(template: string, args: readonly unknown[]): string {
  return template.replace(/\{(\d+)\}/g, (match, index: string) => {
    const value = args[Number(index)];
    return value === undefined || value === null ? match : String(value);
  });
}

/**
 * Mensagem localizada por chave e locale — equivalente a
 * `_localization.GetMessage(key)` do backend Gerit.
 *
 * Sem fallback silencioso: chave ausente (ou que não resolve para string)
 * lança erro explícito indicando locale e chave. Diferente do backend, que
 * tolera com fallback para pt-PT/log, aqui a falha é imediata — regra do
 * projeto para nunca misturar idiomas no HTML publicado.
 */
export function getMessage(
  code: LocaleCode,
  key: MessageKey,
  ...args: readonly unknown[]
): string {
  const value = resolveKey(messages[code], key);
  if (typeof value !== "string") {
    throw new Error(
      `[i18n] Mensagem indisponível para a chave "${key}" no locale "${code}".`,
    );
  }
  return args.length > 0 ? formatMessage(value, args) : value;
}

/**
 * Dicionário completo e tipado do locale — para componentes que consomem
 * namespaces inteiros com objetos e arrays (ex.: `getMessages(code).landing`).
 * O acesso por `code: LocaleCode` é total (o `satisfies` garante todos os
 * locales em compile time); não existe fallback para outro idioma.
 */
export function getMessages(code: LocaleCode): CommonMessages {
  return messages[code];
}
