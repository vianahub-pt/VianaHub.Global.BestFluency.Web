import type { LocaleCode } from "@/core/config/locales";

import { deDE } from "./de-DE";
import { enUS } from "./en-US";
import { esES } from "./es-ES";
import { frFR } from "./fr-FR";
import { itIT } from "./it-IT";
import { ptBR } from "./pt-BR";
import { ptPT } from "./pt-PT";
import type { LandingContent } from "./types";

/**
 * Registo completo de conteúdo por locale.
 *
 * O Record exaustivo garante paridade de locales em tempo de compilação:
 * remover ou esquecer um locale quebra o build — nunca há fallback silencioso.
 */
const contents: Record<LocaleCode, LandingContent> = {
  "pt-PT": ptPT,
  "en-US": enUS,
  "es-ES": esES,
  "fr-FR": frFR,
  "de-DE": deDE,
  "it-IT": itIT,
  "pt-BR": ptBR,
};

export function getLandingContent(code: LocaleCode): LandingContent {
  return contents[code];
}
