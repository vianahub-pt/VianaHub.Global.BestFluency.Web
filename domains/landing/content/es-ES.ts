import type { LandingContent } from "./types";

/**
 * Conteúdo de fundação es-ES (publicado em "/es/").
 * NOTA: traducción funcional provisional — revisión profesional pendiente
 * antes del lanzamiento comercial (ver ADR 0001).
 */
export const esES: LandingContent = {
  meta: {
    title: "Clases de inglés en Amadora y online | Best Fluency",
    description:
      "Clases de inglés presenciales en Venda Nova, Amadora, y online para niños, jóvenes y adultos. Clases individuales y grupos de hasta 8 alumnos.",
  },
  a11y: {
    skipToContent: "Saltar al contenido principal",
    toggleTheme: "Cambiar entre tema claro y oscuro",
    languageSwitcherLabel: "Seleccionar idioma",
  },
  nav: {
    ariaLabel: "Navegación principal",
    menuAriaLabel: "Menú de navegación",
    menuLabel: "Abrir menú",
    closeMenuLabel: "Cerrar menú",
    ctaLabel: "Reservar clase de prueba",
    ctaAriaLabel:
      "Abrir una conversación de WhatsApp para reservar una clase de prueba (nueva ventana)",
    whatsappMessage:
      "¡Hola! Me gustaría reservar una clase de prueba de inglés en Best Fluency.",
    links: {
      modalities: "Modalidades",
      method: "Método",
      bestKids: "Best Kids",
      testimonials: "Testimonios",
      faq: "FAQ",
    },
  },
  foundation: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA Y ONLINE",
    notice:
      "Estamos preparando nuestro nuevo sitio web. Mientras tanto, contáctenos por WhatsApp para información sobre clases de inglés presenciales en Amadora y online.",
    contactsTitle: "Contactos",
  },
  cta: {
    whatsappLabel: "Hable con nosotros por WhatsApp",
    whatsappAriaLabel: "Abrir una conversación de WhatsApp con Best Fluency (nueva ventana)",
    whatsappMessage:
      "¡Hola! Me gustaría recibir información sobre las clases de inglés de Best Fluency.",
  },
  notFound: {
    title: "Página no encontrada",
    description: "La página que busca no existe o ha sido movida.",
    backHome: "Volver a la página principal",
  },
  footer: {
    rightsReserved: "Todos los derechos reservados.",
  },
};
