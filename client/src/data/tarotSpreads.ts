import { TarotSpread } from '@/types';

export const tarotSpreads: TarotSpread[] = [
  {
    id: 'three-card',
    name: {
      en: 'Three Card Spread',
      es: 'Tirada de Tres Cartas',
    },
    description: {
      en: 'A simple yet versatile spread that can reveal insights about past, present, and future or any three interrelated aspects. Each card is drawn with intention, creating a narrative arc that provides guidance on your situation.',
      es: 'Una tirada simple pero versátil que puede revelar información sobre el pasado, presente y futuro, o cualquier tres aspectos interrelacionados. Cada carta se saca con intención, creando un arco narrativo que proporciona orientación sobre tu situación.',
    },
    positions: [
      {
        id: 1,
        name: {
          en: 'Past',
          es: 'Pasado',
        },
        description: {
          en: 'Influences that have shaped the current situation. These energies might still be active or fading, but they have had a significant impact on your path.',
          es: 'Influencias que han moldeado la situación actual. Estas energías podrían seguir activas o desvaneciéndose, pero han tenido un impacto significativo en tu camino.',
        },
        element: 'water', // Water connects to memory, emotions, and the past
      },
      {
        id: 2,
        name: {
          en: 'Present',
          es: 'Presente',
        },
        description: {
          en: 'The current energies and circumstances at play right now. This card reveals the forces currently shaping your reality and immediate challenges or opportunities.',
          es: 'Las energías y circunstancias actuales en juego en este momento. Esta carta revela las fuerzas que actualmente dan forma a tu realidad y los desafíos u oportunidades inmediatos.',
        },
        element: 'fire', // Fire represents the active present moment
      },
      {
        id: 3,
        name: {
          en: 'Future',
          es: 'Futuro',
        },
        description: {
          en: 'The potential outcome or direction if current energies continue to unfold. This is not fixed destiny but rather the most likely trajectory based on present influences.',
          es: 'El resultado o dirección potencial si las energías actuales continúan desarrollándose. No es un destino fijo, sino más bien la trayectoria más probable basada en las influencias presentes.',
        },
        element: 'air', // Air represents intellect, future possibilities
      },
    ],
    layout: './assets/three-card-layout.svg', // Path to layout diagram
  },
  {
    id: 'cross-spread',
    name: {
      en: 'Cross Spread',
      es: 'Tirada en Cruz',
    },
    description: {
      en: 'A powerful elemental spread arranged in the shape of a cross, with Spirit at the center. This spread examines the influences of the four elements plus Spirit on your question or situation, providing a comprehensive reading.',
      es: 'Una poderosa tirada elemental dispuesta en forma de cruz, con el Espíritu en el centro. Esta tirada examina las influencias de los cuatro elementos más el Espíritu en tu pregunta o situación, proporcionando una lectura integral.',
    },
    positions: [
      {
        id: 1,
        name: {
          en: 'Center (Spirit)',
          es: 'Centro (Espíritu)',
        },
        description: {
          en: 'The core essence of your question or situation and the spiritual lesson to be learned. This card represents the higher purpose or meaning behind what you are experiencing.',
          es: 'La esencia central de tu pregunta o situación y la lección espiritual que se debe aprender. Esta carta representa el propósito superior o significado detrás de lo que estás experimentando.',
        },
        element: 'spirit',
      },
      {
        id: 2,
        name: {
          en: 'Above (Air)',
          es: 'Arriba (Aire)',
        },
        description: {
          en: 'The mental aspect and intellectual influences. This position reveals your thoughts, ideas, communication patterns, and how your mind is approaching the situation.',
          es: 'El aspecto mental y las influencias intelectuales. Esta posición revela tus pensamientos, ideas, patrones de comunicación y cómo tu mente está abordando la situación.',
        },
        element: 'air',
      },
      {
        id: 3,
        name: {
          en: 'Right (Fire)',
          es: 'Derecha (Fuego)',
        },
        description: {
          en: 'The energetic aspect and active influences. This card shows your passions, inspirations, actions, and how your creative drive is affecting the situation.',
          es: 'El aspecto energético y las influencias activas. Esta carta muestra tus pasiones, inspiraciones, acciones y cómo tu impulso creativo está afectando la situación.',
        },
        element: 'fire',
      },
      {
        id: 4,
        name: {
          en: 'Below (Water)',
          es: 'Abajo (Agua)',
        },
        description: {
          en: 'The emotional aspect and intuitive influences. This position reveals your feelings, dreams, intuitions, and how your emotional state is impacting the situation.',
          es: 'El aspecto emocional y las influencias intuitivas. Esta posición revela tus sentimientos, sueños, intuiciones y cómo tu estado emocional está impactando la situación.',
        },
        element: 'water',
      },
      {
        id: 5,
        name: {
          en: 'Left (Earth)',
          es: 'Izquierda (Tierra)',
        },
        description: {
          en: 'The physical aspect and material influences. This card shows practical concerns, resources, health, and how tangible realities are shaping the situation.',
          es: 'El aspecto físico y las influencias materiales. Esta carta muestra preocupaciones prácticas, recursos, salud y cómo las realidades tangibles están dando forma a la situación.',
        },
        element: 'earth',
      },
    ],
    layout: './assets/cross-spread-layout.svg', // Path to layout diagram
  },
  {
    id: 'zodiac-spread',
    name: {
      en: 'Zodiac Spread',
      es: 'Tirada del Zodíaco',
    },
    description: {
      en: 'A twelve-card spread that follows the circle of the zodiac, offering insights into all areas of life. Each position corresponds to one of the twelve houses of astrology, providing a comprehensive life reading.',
      es: 'Una tirada de doce cartas que sigue el círculo del zodíaco, ofreciendo perspectivas en todas las áreas de la vida. Cada posición corresponde a una de las doce casas de la astrología, proporcionando una lectura completa de la vida.',
    },
    positions: [
      {
        id: 1,
        name: {
          en: 'Aries - Self',
          es: 'Aries - Ser',
        },
        description: {
          en: 'Your identity, appearance, and how you present yourself to the world. This position reveals your personal outlook and approach to life.',
          es: 'Tu identidad, apariencia y cómo te presentas al mundo. Esta posición revela tu perspectiva personal y enfoque hacia la vida.',
        },
        element: 'fire',
      },
      {
        id: 2,
        name: {
          en: 'Taurus - Resources',
          es: 'Tauro - Recursos',
        },
        description: {
          en: 'Your material resources, finances, possessions, and personal values. This position reveals your relationship with what you own and value.',
          es: 'Tus recursos materiales, finanzas, posesiones y valores personales. Esta posición revela tu relación con lo que posees y valoras.',
        },
        element: 'earth',
      },
      {
        id: 3,
        name: {
          en: 'Gemini - Communication',
          es: 'Géminis - Comunicación',
        },
        description: {
          en: 'Your communication style, learning patterns, and connections with siblings or neighbors. This position reveals how you express and exchange ideas.',
          es: 'Tu estilo de comunicación, patrones de aprendizaje y conexiones con hermanos o vecinos. Esta posición revela cómo expresas e intercambias ideas.',
        },
        element: 'air',
      },
      {
        id: 4,
        name: {
          en: 'Cancer - Home',
          es: 'Cáncer - Hogar',
        },
        description: {
          en: 'Your home, family, roots, and emotional foundations. This position reveals your deepest emotional needs and sense of belonging.',
          es: 'Tu hogar, familia, raíces y fundamentos emocionales. Esta posición revela tus necesidades emocionales más profundas y sentido de pertenencia.',
        },
        element: 'water',
      },
      {
        id: 5,
        name: {
          en: 'Leo - Creativity',
          es: 'Leo - Creatividad',
        },
        description: {
          en: 'Your creative expression, romance, pleasure, and relationship with children. This position reveals how you express your authentic self and find joy.',
          es: 'Tu expresión creativa, romance, placer y relación con los niños. Esta posición revela cómo expresas tu ser auténtico y encuentras alegría.',
        },
        element: 'fire',
      },
      {
        id: 6,
        name: {
          en: 'Virgo - Service',
          es: 'Virgo - Servicio',
        },
        description: {
          en: 'Your work, daily routines, health, and service to others. This position reveals how you manage practical details and care for yourself and others.',
          es: 'Tu trabajo, rutinas diarias, salud y servicio a los demás. Esta posición revela cómo manejas detalles prácticos y cuidas de ti mismo y de los demás.',
        },
        element: 'earth',
      },
      {
        id: 7,
        name: {
          en: 'Libra - Partnerships',
          es: 'Libra - Relaciones',
        },
        description: {
          en: 'Your one-to-one relationships, partnerships, and approach to balance and harmony. This position reveals how you relate to significant others.',
          es: 'Tus relaciones de uno a uno, asociaciones y enfoque hacia el equilibrio y la armonía. Esta posición revela cómo te relacionas con personas significativas.',
        },
        element: 'air',
      },
      {
        id: 8,
        name: {
          en: 'Scorpio - Transformation',
          es: 'Escorpio - Transformación',
        },
        description: {
          en: 'Your approach to shared resources, intimacy, transformation, and the mysteries of life and death. This position reveals your relationship with power and the depths.',
          es: 'Tu enfoque hacia los recursos compartidos, intimidad, transformación y los misterios de la vida y la muerte. Esta posición revela tu relación con el poder y las profundidades.',
        },
        element: 'water',
      },
      {
        id: 9,
        name: {
          en: 'Sagittarius - Expansion',
          es: 'Sagitario - Expansión',
        },
        description: {
          en: 'Your quest for meaning, higher education, travel, and philosophy of life. This position reveals how you expand your horizons and seek truth.',
          es: 'Tu búsqueda de significado, educación superior, viajes y filosofía de vida. Esta posición revela cómo expandes tus horizontes y buscas la verdad.',
        },
        element: 'fire',
      },
      {
        id: 10,
        name: {
          en: 'Capricorn - Career',
          es: 'Capricornio - Carrera',
        },
        description: {
          en: 'Your career, public reputation, ambitions, and relationship with authority. This position reveals your life direction and sense of purpose.',
          es: 'Tu carrera, reputación pública, ambiciones y relación con la autoridad. Esta posición revela tu dirección de vida y sentido de propósito.',
        },
        element: 'earth',
      },
      {
        id: 11,
        name: {
          en: 'Aquarius - Community',
          es: 'Acuario - Comunidad',
        },
        description: {
          en: 'Your friendships, social networks, groups, and humanitarian ideals. This position reveals your role within the collective and hopes for the future.',
          es: 'Tus amistades, redes sociales, grupos e ideales humanitarios. Esta posición revela tu papel dentro del colectivo y esperanzas para el futuro.',
        },
        element: 'air',
      },
      {
        id: 12,
        name: {
          en: 'Pisces - Spirituality',
          es: 'Piscis - Espiritualidad',
        },
        description: {
          en: 'Your connection to the spiritual realm, unconscious mind, dreams, and private retreats. This position reveals your inner spiritual journey and hidden strengths.',
          es: 'Tu conexión con el reino espiritual, mente inconsciente, sueños y retiros privados. Esta posición revela tu viaje espiritual interno y fortalezas ocultas.',
        },
        element: 'water',
      },
    ],
    layout: './assets/zodiac-spread-layout.svg', // Path to layout diagram
  },
];

export default tarotSpreads;
