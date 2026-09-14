import type { LocaleCode } from "@/core/config/locales";

/**
 * Contrato tipado da base de conhecimento de FAQ (domains/faq/data/faq.json).
 *
 * A base é a fonte única de verdade para as 52 perguntas frequentes,
 * localizada nos 9 idiomas publicados e anotada com os 4 idiomas de curso
 * (en, fr, es, de). O resolver (lib/faq-resolver.ts) valida estes invariantes
 * no carregamento do módulo — qualquer divergência falha o build, nunca um
 * fallback silencioso.
 */

/** Localização de uma FAQ num idioma. */
export interface FaqLocalization {
  /** Pergunta (pode conter placeholders declarados em `parameters`). */
  question: string;
  /** Resposta completa no idioma. */
  answer: string;
  /**
   * Pergunta padrão com placeholders já resolvidos (obrigatória quando
   * `parameters` não é vazio) — garante que o HTML inicial nunca expõe
   * `{targetLanguage}` ou outro placeholder por resolver.
   */
  defaultQuestion?: string;
  /** Aliases de pesquisa (podem conter os mesmos placeholders). */
  searchAliases?: string[];
}

/** Idioma de website suportado pela base (9 locales). */
export type FaqSupportedLocale = LocaleCode;

/** Idioma de curso oferecido (en, fr, es, de). */
export type FaqCourseLanguage = string;

/** Categoria temática de FAQ com rótulos localizados. */
export interface FaqCategory {
  labels: Partial<Record<FaqSupportedLocale, string>>;
}

/** Rótulos de um idioma de curso num locale de website. */
export interface FaqTargetLanguageLocale {
  /** Nome do idioma de curso (ex.: "Alemão"). */
  label: string;
  /** Forma usada como objeto de aprendizagem (ex.: "alemão", "l'allemand"). */
  learningObject: string;
  /** Formas alternativas usadas em pesquisa. */
  aliases: string[];
}

/** Idioma de curso com localizações por locale de website. */
export interface FaqTargetLanguage {
  locales: Partial<Record<FaqSupportedLocale, FaqTargetLanguageLocale>>;
}

/** Entrada individual da base de FAQ. */
export interface FaqEntry {
  /** Identificador estável (faq-NNN). */
  id: string;
  /** Intenção semântica única (ex.: "learning-duration"). */
  intent: string;
  /** Categoria (chave de `categories`). */
  category: string;
  /** Prioridade editorial. */
  priority: "high" | "medium";
  /** Intenção de pesquisa (SEO). */
  searchIntent: "commercial" | "informational";
  /** Destaque editorial. */
  featured: boolean;
  /** Idiomas de curso a que a pergunta se aplica. */
  applicableCourseLanguages: FaqCourseLanguage[];
  /** Placeholders usados nos textos (ex.: ["targetLanguage"]). */
  parameters: string[];
  /** Keywords de origem (pt-PT) usadas na geração da base. */
  sourceKeywordsPtPT?: string[];
  /** Conteúdo por locale de website (9 locales, sem fallback). */
  localizations: Partial<Record<FaqSupportedLocale, FaqLocalization>>;
}

/** Configuração de apresentação (o que vai para onde). */
export interface FaqPresentation {
  /** IDs das 8 FAQs em pré-visualização na secção #faq da home. */
  homePreviewFaqIds: string[];
}

/** Base de dados completa. */
export interface FaqDatabase {
  schemaVersion: string;
  metadata: {
    project: string;
    contentType: string;
    defaultLocale: string;
    totalFaqIntents: number;
    supportedLocaleCount: number;
    offeredCourseLanguageCount: number;
    notes: string;
  };
  supportedLocales: FaqSupportedLocale[];
  offeredCourseLanguages: FaqCourseLanguage[];
  categories: Record<string, FaqCategory>;
  targetLanguages: Record<FaqCourseLanguage, FaqTargetLanguage>;
  presentation: FaqPresentation;
  faqs: FaqEntry[];
}

/**
 * FAQ resolvida para um locale — view model serializável entregue aos
 * componentes (Server → Client). Nunca contém placeholders por resolver.
 */
export interface ResolvedFaq {
  id: string;
  intent: string;
  category: string;
  categoryLabel: string;
  priority: "high" | "medium";
  searchIntent: "commercial" | "informational";
  featured: boolean;
  applicableCourseLanguages: FaqCourseLanguage[];
  /** Pergunta resolvida (sem placeholders). */
  question: string;
  /**
   * Variantes da pergunta por idioma de curso — apenas quando o template
   * original contém placeholders (ex.: faq-010 por idioma de curso).
   */
  questionVariants?: Partial<Record<FaqCourseLanguage, string>>;
  /** Resposta no locale. */
  answer: string;
  /** Aliases de pesquisa totalmente expandidos (sem placeholders). */
  aliases: string[];
  /**
   * Idioma de curso associado a cada alias (mesma ordem de `aliases`).
   * Para FAQs sem placeholders, todos os valores são `undefined`.
   * Para FAQs parametrizadas, cada alias expandido tem o course language
   * correspondente, permitindo inferência na pesquisa.
   */
  aliasCourseLanguages: (FaqCourseLanguage | undefined)[];
  /** Rótulos dos idiomas de curso aplicáveis no locale (para pesquisa). */
  courseLanguageLabels: string[];
}

/** Opção de filtro de categoria. */
export interface FaqCategoryOption {
  id: string;
  label: string;
}

/** Opção de filtro de idioma de curso. */
export interface FaqCourseLanguageOption {
  code: FaqCourseLanguage;
  label: string;
}
