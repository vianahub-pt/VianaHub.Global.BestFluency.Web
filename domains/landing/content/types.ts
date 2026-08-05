/**
 * Contrato de conteúdo da landing.
 *
 * Cada locale publicado implementa exatamente as mesmas chaves — o compilador
 * falha se faltar alguma chave em algum locale (sem fallback silencioso).
 *
 * Nesta fase (issue #3) existe apenas o conteúdo de fundação. As secções da
 * especificação V2 (Hero, Modalidades, Método, Best Kids, Depoimentos, etc.)
 * serão acrescentadas a este contrato nas issues subsequentes.
 */
export interface LandingContent {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    toggleTheme: string;
    languageSwitcherLabel: string;
  };
  foundation: {
    eyebrow: string;
    notice: string;
    contactsTitle: string;
  };
  cta: {
    whatsappLabel: string;
    whatsappAriaLabel: string;
    whatsappMessage: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  footer: {
    rightsReserved: string;
  };
}
