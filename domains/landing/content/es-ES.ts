import type { LandingContent } from "./types";

/**
 * Mensajes contextuales de WhatsApp (spec §20).
 * Número: 351214744028 (core/config/site.ts). Mensajes exactos de la spec V2.
 */
const TRIAL_MESSAGE =
  "¡Hola! Me gustaría reservar una clase de prueba de inglés en Best Fluency.";
const INFO_MESSAGE =
  "¡Hola! Me gustaría recibir información sobre las clases de inglés de Best Fluency.";

/**
 * Contenido es-ES (publicado en "/es/").
 * Fuente: docs/landing-page-spec-v2.md, secciones 7 a 19.
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
    whatsappMessage: TRIAL_MESSAGE,
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
    whatsappMessage: INFO_MESSAGE,
  },
  notFound: {
    title: "Página no encontrada",
    description: "La página que busca no existe o ha sido movida.",
    backHome: "Volver a la página principal",
  },
  footer: {
    rightsReserved: "Todos los derechos reservados.",
    privacyPolicy: "Política de Privacidad",
    cookiesPolicy: "Política de Cookies",
    whatsappLabel: "WhatsApp",
  },

  header: {
    logoAlt: "Best Fluency Language School",
  },

  hero: {
    eyebrow: "BEST FLUENCY LANGUAGE SCHOOL · AMADORA Y ONLINE",
    title: "Clases de inglés en Amadora y online para comunicarte con confianza",
    text: "Clases prácticas y personalizadas para niños, jóvenes y adultos, de forma individual o en grupos reducidos con un máximo de 8 alumnos.",
    complement:
      "Desarrolla la comunicación para el trabajo, los estudios, los viajes y las situaciones del día a día.",
    ctaLabel: "Reservar clase de prueba",
    ctaAriaLabel:
      "Abrir una conversación de WhatsApp para reservar una clase de prueba (nueva ventana)",
    ctaWhatsappMessage: TRIAL_MESSAGE,
    secondaryCtaLabel: "Conocer las modalidades",
    imageAlt: "Profesora de Best Fluency durante una clase de inglés personalizada",
  },

  infoBar: {
    items: [
      "Clases individuales",
      "Grupos de hasta 8 alumnos",
      "Presencial en Amadora",
      "Clases online",
    ],
  },

  modalities: {
    h2: "Elige la modalidad más adecuada a tu trayectoria",
    intro:
      "Las clases se organizan según el nivel, los objetivos y la disponibilidad de los alumnos.",
    individual: {
      title: "Acompañamiento totalmente personalizado",
      text: "Contenidos, ritmo y práctica ajustados a las necesidades de un único alumno, con espacio para trabajar dificultades específicas y objetivos personales o profesionales.",
      note: "Presencial u online",
      ctaLabel: "Quiero saber más sobre las clases individuales",
      ctaAriaLabel:
        "Abrir una conversación de WhatsApp para recibir información sobre las clases individuales (nueva ventana)",
      whatsappMessage:
        "¡Hola! Me gustaría recibir información sobre las clases individuales de inglés de Best Fluency.",
    },
    group: {
      title: "Aprender y practicar en un grupo pequeño",
      text: "Grupos organizados por nivel, con un máximo de 8 alumnos, para permitir la participación, la interacción y un acompañamiento cercano.",
      note: "Sujeto a la formación del grupo y a la disponibilidad",
      ctaLabel: "Quiero saber más sobre los grupos",
      ctaAriaLabel:
        "Abrir una conversación de WhatsApp para recibir información sobre los grupos (nueva ventana)",
      whatsappMessage:
        "¡Hola! Me gustaría recibir información sobre los grupos de inglés de Best Fluency.",
    },
  },

  method: {
    h2: "Un recorrido de aprendizaje pensado para evolucionar",
    intro:
      "Cada alumno tiene un punto de partida, un ritmo y unos objetivos diferentes. Por eso, las clases se organizan para crear continuidad, práctica y orientación en cada etapa.",
    pillars: [
      {
        title: "Recorrido personalizado",
        text: "Los contenidos y las actividades se definen según el nivel, las necesidades y la evolución del alumno.",
      },
      {
        title: "Práctica con propósito",
        text: "El inglés se utiliza progresivamente en situaciones útiles para el trabajo, los estudios, los viajes y el día a día.",
      },
      {
        title: "Continuidad y feedback",
        text: "Cada clase da seguimiento al contenido anterior, con correcciones y orientaciones que dejan claros los siguientes pasos.",
      },
      {
        title: "Pronunciación y confianza",
        text: "El alumno recibe apoyo para construir frases, mejorar la pronunciación y comunicarse con mayor seguridad.",
      },
    ],
  },

  inPerson: {
    h2: "Clases de inglés presenciales en Venda Nova, Amadora",
    text: [
      "Las clases presenciales se imparten en el Espaço CASA, en la Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      "Un espacio cercano y acogedor para aprender inglés con acompañamiento personalizado.",
    ],
    ctaLabel: "Ver ubicación",
    ctaAriaLabel: "Abrir la ubicación de Best Fluency en Google Maps (nueva ventana)",
  },

  bestKids: {
    h2: "Clases de inglés para niños con Best Kids",
    text: [
      "En Best Kids, cada clase convierte el inglés en un nuevo descubrimiento. Con la ayuda de Faísca, nuestra curiosa zorra, los niños aprenden a través de juegos, historias, imágenes, canciones y retos adaptados a su edad.",
      "Las actividades ayudan a desarrollar vocabulario, comprensión, pronunciación y confianza para utilizar el inglés de forma natural y progresiva.",
    ],
    highlight: "Con Faísca, el inglés va con ellos a todas partes.",
    differentials: [
      {
        title: "Aprendizaje envolvente",
        text: "Juegos, historias, canciones y actividades que despiertan la curiosidad.",
      },
      {
        title: "Contenidos por edad y nivel",
        text: "Clases adaptadas al desarrollo y al ritmo de cada niño.",
      },
      {
        title: "Contacto con el inglés desde el principio",
        text: "Palabras, expresiones y situaciones del día a día presentadas de forma progresiva.",
      },
      {
        title: "Confianza para comunicarse",
        text: "Un ambiente positivo que fomenta la participación y la expresión oral.",
      },
    ],
    practicalInfo: [
      "Niños de 6 a 13 años",
      "Clases presenciales en Venda Nova, Amadora",
      "Clases online disponibles",
      "Grupos organizados por edad y nivel",
    ],
    ctaLabel: "Conocer Best Kids",
    ctaAriaLabel:
      "Abrir una conversación de WhatsApp para conocer Best Kids (nueva ventana)",
    whatsappMessage:
      "¡Hola! Me gustaría recibir más información sobre las clases Best Kids.",
    imageAlt: "Faísca, mascota de Best Kids, en las clases de inglés para niños",
  },

  testimonials: {
    h2: "Lo que dicen los alumnos de Best Fluency",
    subtitle: "Experiencias reales de quienes están aprendiendo y evolucionando con nosotros.",
    items: [
      {
        name: "Pedro António",
        source: "Reseña de Google",
        stars: 5,
        quote: "Aprendo mucho con la teacher Taty.",
      },
      {
        name: "Sandro Vite",
        source: "Reseña de Google",
        stars: 5,
        quote: "Increíble, una enseñanza muy bien aplicada y de manera simple y objetiva.",
      },
      {
        name: "Maurício Moura",
        source: "Testimonio por WhatsApp",
        stars: null,
        quote:
          "La teacher posee un vasto conocimiento de la lengua inglesa y facilidad para transmitir ese conocimiento a los alumnos, de una forma distendida.",
      },
      {
        name: "Wanda Ramos",
        source: "Testimonio por WhatsApp",
        stars: null,
        quote:
          "Todo fue muy explícito, con contenido de fácil comprensión. La profesora Taty me hizo sentir muy cómoda para resolver mis dudas sin vergüenza ni miedo a equivocarme.",
      },
    ],
    ctaLabel: "Reservar clase de prueba",
    ctaAriaLabel:
      "Abrir una conversación de WhatsApp para reservar una clase de prueba (nueva ventana)",
    whatsappMessage: TRIAL_MESSAGE,
  },

  founder: {
    h2: "Conoce a la fundadora de Best Fluency",
    text: [
      "Hola, soy Taty Viana. Soy ingeniera de formación y fundadora de Best Fluency Language School.",
      "Mi experiencia profesional en empresas multinacionales y contextos internacionales me demostró, en la práctica, cómo los idiomas pueden abrir puertas en el trabajo, los estudios, los viajes y la vida personal.",
      "Fue con ese propósito que creé Best Fluency: ayudar a cada alumno a aprender de forma cercana, práctica y orientada a sus objetivos.",
    ],
    imageAlt: "Taty Viana, fundadora de Best Fluency Language School",
  },

  journey: {
    h2: "Cómo empezar las clases de inglés en Best Fluency",
    subtitle:
      "Del primer mensaje a la primera clase, acompañamos cada paso de tu recorrido.",
    steps: [
      {
        title: "Abre la conversación",
        text: "Envíanos un mensaje por WhatsApp y cuéntanos qué buscas, tus objetivos y tu disponibilidad.",
      },
      {
        title: "Descubre tu punto de partida",
        text: "En una breve conversación, identificamos el nivel actual y las principales necesidades de aprendizaje.",
      },
      {
        title: "Traza tu ruta",
        text: "Definimos la modalidad, los contenidos y un recorrido de aprendizaje adaptado a los objetivos del alumno.",
      },
      {
        title: "Empieza a avanzar",
        text: "Inicia las clases y acompaña la evolución con práctica, orientación y feedback continuo.",
      },
    ],
    ctaLabel: "Dar el primer paso",
    ctaAriaLabel:
      "Abrir una conversación de WhatsApp para dar el primer paso (nueva ventana)",
    whatsappMessage: INFO_MESSAGE,
  },

  faq: {
    h2: "Preguntas frecuentes sobre las clases de Best Fluency",
    subtitle:
      "Encuentra respuestas rápidas sobre las clases de inglés presenciales en Amadora y online.",
    items: [
      {
        question: "¿Dónde se imparten las clases presenciales?",
        answer:
          "Las clases presenciales se imparten en el Espaço CASA, en la Avenida Chaby Pinheiro, 5, Venda Nova — Amadora.",
      },
      {
        question: "¿También hay clases online?",
        answer:
          "Sí. Best Fluency ofrece clases online para alumnos que buscan mayor flexibilidad o que no pueden desplazarse al espacio presencial.",
      },
      {
        question: "¿Existen clases individuales y en grupo?",
        answer:
          "Sí. Existen clases individuales y grupos reducidos, organizados según el nivel y la disponibilidad de los alumnos.",
      },
      {
        question: "¿Cuántos alumnos hay en cada grupo?",
        answer:
          "Los grupos tienen un máximo de 8 alumnos, lo que permite mayor participación y acompañamiento durante las clases.",
      },
      {
        question: "¿Para quién son las clases?",
        answer:
          "Hay clases para niños, jóvenes y adultos, con contenidos definidos según la edad, el nivel y los objetivos de cada alumno.",
      },
      {
        question: "¿Necesito saber inglés para empezar?",
        answer:
          "No. Las clases son adecuadas tanto para principiantes como para alumnos que ya tienen conocimientos de inglés y quieren seguir evolucionando.",
      },
      {
        question: "¿Cómo se identifica mi nivel?",
        answer:
          "Antes del inicio de las clases, realizamos una breve conversación para comprender los conocimientos actuales, las principales dificultades y los objetivos del alumno.",
      },
      {
        question: "¿Las clases son personalizadas?",
        answer:
          "Sí. Los contenidos, las actividades y el ritmo de las clases se ajustan al nivel, las necesidades y la evolución de cada alumno.",
      },
      {
        question: "¿Cuánto dura cada clase?",
        answer:
          "Cada clase tiene una duración de 50 minutos, centrada en la práctica, la participación y la evolución continua.",
      },
      {
        question: "¿Cómo funciona la clase de prueba?",
        answer:
          "La clase de prueba permite conocer el enfoque de Best Fluency, aclarar dudas y ver cómo la enseñanza puede adaptarse a los objetivos del alumno.",
      },
      {
        question: "¿Cómo puedo reservar una clase?",
        answer:
          "Basta con hacer clic en un botón de WhatsApp e indicar el tipo de clase deseado y la disponibilidad.",
      },
    ],
  },

  finalCta: {
    eyebrow: "¿LISTO PARA EMBARCAR?",
    title: "Tu próximo paso en el inglés empieza aquí",
    text: "Habla con nosotros por WhatsApp, aclara tus dudas y descubre la modalidad más adecuada a tu nivel, tus objetivos y tu rutina.",
    ctaLabel: "Reservar clase de prueba",
    ctaAriaLabel:
      "Abrir una conversación de WhatsApp para reservar una clase de prueba (nueva ventana)",
    whatsappMessage:
      "¡Hola! Me gustaría recibir información y reservar una clase de prueba de inglés en Best Fluency.",
    complement: "Clases presenciales en Amadora y online.",
  },
};
