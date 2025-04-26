import { AstrologyHouse, AstrologyPlanet, AstrologySign, AstrologyInterpretation } from "@/types";

// Elements
export const elements = {
  fire: {
    en: "Fire: Represents force, energy, strength, vigor, power, dominion, authority, and prestige.",
    es: "Fuego: Fuerza, energía, fortaleza, vigor, poder, dominio, autoridad, prestigio."
  },
  water: {
    en: "Water: Represents fertility, emotions, productivity, aesthetics, interpersonal relationships, pleasure, happiness, nourishment, and intuition.",
    es: "Agua: Fertilidad, emociones, productividad, estética, relaciones interpersonales, placer, felicidad, nutrición, intuición."
  },
  air: {
    en: "Air: Represents mental processes, reasoning, conflicts, disputes, fights, discipline, communication, healing, and illness.",
    es: "Aire: Procesos mentales, razonamiento, conflictos, disputas, peleas, disciplina, comunicación, curación, enfermedad."
  },
  earth: {
    en: "Earth: Represents the body, physical health, the physical as a generality, the material, business, employment, and money.",
    es: "Tierra: Cuerpo, salud física, lo físico como una generalidad, lo material, los negocios, el empleo, el dinero."
  },
  spirit: {
    en: "Spirit: Represents gnosis, philosophy, religion, spirituality, and knowledge.",
    es: "Espíritu: Gnosis, filosofía, religión, lo espiritual, el conocimiento."
  }
};

// Zodiac Signs
export const zodiacSigns: AstrologySign[] = [
  {
    id: "aries",
    name: {
      en: "Aries",
      es: "Aries",
    },
    symbol: "♈",
    dates: "Mar 21 - Apr 19",
    element: "fire",
    modality: "cardinal",
    rulingPlanet: "mars",
    traits: {
      en: ["Activity", "New beginnings", "Control", "Dominance", "Struggle", "Ambition", "Spontaneity"],
      es: ["Actividad", "Nuevos comienzos", "Control", "Dominio", "Lucha", "Ambición", "Espontaneidad"],
    },
    description: {
      en: "Aries: I am. Activity, impulses, new beginnings, control, dominance, struggle, ambition, spontaneity. The first sign of the zodiac, known for its pioneering spirit and natural leadership abilities.",
      es: "Aries: Yo soy. La actividad, impulsos, nuevos comienzos, control, dominio, lucha, ambición, espontaneidad. El primer signo del zodíaco, conocido por su espíritu pionero y habilidades naturales de liderazgo.",
    },
  },
  {
    id: "taurus",
    name: {
      en: "Taurus",
      es: "Tauro",
    },
    symbol: "♉",
    dates: "Apr 20 - May 20",
    element: "earth",
    modality: "fixed",
    rulingPlanet: "venus",
    traits: {
      en: ["Practicality", "Materialism", "Inspiration", "Mercy", "Benevolence", "Teaching", "Divine wisdom"],
      es: ["Practicidad", "Materialismo", "Inspiración", "Misericordia", "Beneficencia", "Enseñanza", "Sabiduría divina"],
    },
    description: {
      en: "Taurus: I have. Practicality, materialism, inspiration, mercy, benevolence, teaching, divine and occult wisdom. Known for stability, sensuality, and a strong connection to the physical world.",
      es: "Tauro: Yo tengo. Practicidad, materialismo, inspiración, misericordia, lo benéfico, beneficencia, la enseñanza, sabiduría divina y oculta. Conocido por su estabilidad, sensualidad y fuerte conexión con el mundo físico.",
    },
  },
  {
    id: "gemini",
    name: {
      en: "Gemini",
      es: "Géminis",
    },
    symbol: "♊",
    dates: "May 21 - Jun 20",
    element: "air",
    modality: "mutable",
    rulingPlanet: "mercury",
    traits: {
      en: ["Versatility", "Mental skills", "Communication", "Adaptability", "Changes", "Diversity"],
      es: ["Versatilidad", "Habilidades mentales", "Comunicación", "Adaptabilidad", "Cambios", "Diversidad"],
    },
    description: {
      en: "Gemini: I think. Versatility, mental and communication skills, adaptability, changes, diversity, interiorization, love, harmony, attraction, impulse. Represented by the Twins, known for their dual nature and intellectual curiosity.",
      es: "Géminis: Yo pienso. Versatilidad, habilidades mentales y de comunicación, adaptabilidad, cambios, diversidad, interiorización, amor, armonía, atracción, el impulso. Representado por los Gemelos, conocido por su naturaleza dual y curiosidad intelectual.",
    },
  },
  {
    id: "cancer",
    name: {
      en: "Cancer",
      es: "Cáncer",
    },
    symbol: "♋",
    dates: "Jun 21 - Jul 22",
    element: "water",
    modality: "cardinal",
    rulingPlanet: "moon",
    traits: {
      en: ["Devotion", "Emotion", "Intuition", "Nurturing", "Health", "Mental processes"],
      es: ["Devoción", "Emoción", "Intuición", "Nutrición", "Salud", "Procesos mentales"],
    },
    description: {
      en: "Cancer: I feel. Devotion, emotion, intuition, nurturing, domestic matters, health, both physical and mental aspects, triumph. The sign of the Crab is deeply connected to home, family, and emotional security.",
      es: "Cáncer: Yo siento. Devoción, emoción, intuición, nutrición, lo doméstico, la salud, lo físico pero también lo mental, el triunfo. El signo del Cangrejo está profundamente conectado con el hogar, la familia y la seguridad emocional.",
    },
  },
  {
    id: "leo",
    name: {
      en: "Leo",
      es: "Leo",
    },
    symbol: "♌",
    dates: "Jul 23 - Aug 22",
    element: "fire",
    modality: "fixed",
    rulingPlanet: "sun",
    traits: {
      en: ["Magnetism", "Creativity", "Leadership", "Optimism", "Generosity", "Strength", "Courage"],
      es: ["Magnetismo", "Creatividad", "Liderazgo", "Optimismo", "Generosidad", "Fuerza", "Coraje"],
    },
    description: {
      en: "Leo: I can. Magnetism, creativity, leadership, optimism, generosity, strength, courage, stubbornness, extravagance, egoism, idealism. The sign of the Lion represents the royal aspects of life, with natural leadership qualities.",
      es: "Leo: Yo puedo. Magnetismo, creatividad, el liderazgo, el optimismo, la generosidad, la fuerza, el coraje, la obstinación, la extravagancia, el egoísmo, el idealismo. El signo del León representa los aspectos reales de la vida, con cualidades naturales de liderazgo.",
    },
  },
  {
    id: "virgo",
    name: {
      en: "Virgo",
      es: "Virgo",
    },
    symbol: "♍",
    dates: "Aug 23 - Sep 22",
    element: "earth",
    modality: "mutable",
    rulingPlanet: "mercury",
    traits: {
      en: ["Analysis", "Efficiency", "Discrimination", "Perfectionism", "Conservative nature", "Cleanliness"],
      es: ["Análisis", "Eficiencia", "Discriminación", "Perfeccionismo", "Conservadurismo", "Pulcritud"],
    },
    description: {
      en: "Virgo: I analyze. Analysis, efficiency, discrimination, perfectionism, efficiency, conservative nature, cleanliness, labor. The sign of the Virgin is associated with service, attention to detail, and practicality.",
      es: "Virgo: Yo analizo. Análisis, eficiencia, discriminación, perfeccionismo, eficiencia, el ser conservador, la pulcritud, la labor. El signo de la Virgen está asociado con el servicio, la atención al detalle y la practicidad.",
    },
  },
  {
    id: "libra",
    name: {
      en: "Libra",
      es: "Libra",
    },
    symbol: "♎",
    dates: "Sep 23 - Oct 22",
    element: "air",
    modality: "cardinal",
    rulingPlanet: "venus",
    traits: {
      en: ["Harmony", "Justice", "Balance", "Diplomacy", "Fairness", "Cooperation"],
      es: ["Armonía", "Justicia", "Equilibrio", "Diplomacia", "Equidad", "Cooperación"],
    },
    description: {
      en: "Libra: I balance. Harmony, justice, balance, diplomacy. The sign of the Scales represents fairness, relationships, and the pursuit of beauty and harmony in all things.",
      es: "Libra: Yo equilibro. Armonía, justicia, equilibrio, diplomacia. El signo de la Balanza representa la equidad, las relaciones y la búsqueda de la belleza y la armonía en todas las cosas.",
    },
  },
  {
    id: "scorpio",
    name: {
      en: "Scorpio",
      es: "Escorpio",
    },
    symbol: "♏",
    dates: "Oct 23 - Nov 21",
    element: "water",
    modality: "fixed",
    rulingPlanet: "pluto",
    traits: {
      en: ["Intensity", "Passion", "Secrets", "Transformation", "Death", "Regeneration"],
      es: ["Intensidad", "Pasiones", "Secretos", "Transformación", "Muerte", "Regeneración"],
    },
    description: {
      en: "Scorpio: I desire. Intensity, passions, jealousy, envy, secrets, manipulation, involuntary changes, death, transformation, destruction, regeneration, and time. The sign of the Scorpion represents depth, intensity, and transformative power.",
      es: "Escorpio: Yo deseo. Intensidad, pasiones, celos, envidia, secretos, manipulación, cambios involuntarios, muerte, transformación, destrucción, regeneración y tiempo. El signo del Escorpión representa profundidad, intensidad y poder transformador.",
    },
  },
  {
    id: "sagittarius",
    name: {
      en: "Sagittarius",
      es: "Sagitario",
    },
    symbol: "♐",
    dates: "Nov 22 - Dec 21",
    element: "fire",
    modality: "mutable",
    rulingPlanet: "jupiter",
    traits: {
      en: ["Visualization", "Understanding", "Philosophy", "Inspiration", "Direction", "Freedom"],
      es: ["Visualización", "Entendimiento", "Filosofía", "Inspiración", "Dirección", "Libertad"],
    },
    description: {
      en: "Sagittarius: I understand. Visualization, understanding, philosophy, inspiration, adaptation, direction, independence, freedom, expansion, realization, idealism, libertinism. The Archer aims for higher knowledge and greater horizons.",
      es: "Sagitario: Yo entiendo. Visualización, entendimiento, filosofía, inspiración adaptación dirección, independencia, libertad, expansión, realización, idealismo, libertinaje. El Arquero apunta hacia el conocimiento superior y horizontes más amplios.",
    },
  },
  {
    id: "capricorn",
    name: {
      en: "Capricorn",
      es: "Capricornio",
    },
    symbol: "♑",
    dates: "Dec 22 - Jan 19",
    element: "earth",
    modality: "cardinal",
    rulingPlanet: "saturn",
    traits: {
      en: ["Ambition", "Persistence", "Integrity", "Rigidity", "Materialism", "Discipline"],
      es: ["Ambición", "Persistencia", "Integridad", "Rigidez", "Materialismo", "Disciplina"],
    },
    description: {
      en: "Capricorn: I use. Ambition, persistence, integrity, rigidity, materialism, temptation, obsession. The Sea-Goat climbs steadily toward material and professional success through patience and determination.",
      es: "Capricornio: Yo uso. La ambición, persistencia, integridad, la rigidez, el materialismo, tentación, obsesión. La Cabra Marina escala constantemente hacia el éxito material y profesional a través de la paciencia y la determinación.",
    },
  },
  {
    id: "aquarius",
    name: {
      en: "Aquarius",
      es: "Acuario",
    },
    symbol: "♒",
    dates: "Jan 20 - Feb 18",
    element: "air",
    modality: "fixed",
    rulingPlanet: "uranus",
    traits: {
      en: ["Imagination", "Hope", "Faith", "Humanitarianism", "Revolution", "Dreams"],
      es: ["Imaginación", "Esperanza", "Fe", "Humanismo", "Revolución", "Sueños"],
    },
    description: {
      en: "Aquarius: I know. Imagination, hope, faith, humanitarianism, revolution, dreams, unexpected help, unfulfilled dreams, help that doesn't arrive, unconventionality, originality. The Water Bearer channels progressive ideas and humanitarian ideals.",
      es: "Acuario: Yo conozco. Imaginación, esperanza, fe, humanismo, revolución, sueños, la ayuda inesperada, sueños no cumplidos, ayuda que no llega, lo no convencional, lo original. El Portador de Agua canaliza ideas progresistas e ideales humanitarios.",
    },
  },
  {
    id: "pisces",
    name: {
      en: "Pisces",
      es: "Piscis",
    },
    symbol: "♓",
    dates: "Feb 19 - Mar 20",
    element: "water",
    modality: "mutable",
    rulingPlanet: "neptune",
    traits: {
      en: ["Understanding", "Imagination", "Voluntary change", "Sensitivity", "Compassion"],
      es: ["Entendimiento", "Imaginación", "Cambio voluntario", "Sensibilidad", "Compasión"],
    },
    description: {
      en: "Pisces: I believe. Understanding, imagination, voluntary change, sensitivity, compassion, dissatisfaction, escapism, deception, falsehood, error, deception. The Fish swim between reality and fantasy, bringing creative vision and spiritual insight.",
      es: "Piscis: Yo creo. Entendimiento, imaginación, cambio voluntario, sensibilidad, compasión, insatisfacción, escapismo, decepción, falsedad, error, engaño. Los Peces nadan entre la realidad y la fantasía, aportando visión creativa y percepción espiritual.",
    },
  },
];

// Houses
export const astroHouses: AstrologyHouse[] = [
  {
    number: 1,
    name: {
      en: "1st House (Identity)",
      es: "Casa I (Vita)",
    },
    keywords: {
      en: ["Appearance", "Identity", "Self-image", "Beginnings", "Personality", "First impressions"],
      es: ["Apariencia", "Identidad", "Autoimagen", "Comienzos", "Personalidad", "Primeras impresiones"],
    },
    description: {
      en: "Angular House, ruled by Aries and Mars. Marks beginnings and appearances. Shows disposition and personality. Represents the physical body and the first perspective of life. The Ascendant (ASC) is here.",
      es: "Casa Angular, regida por Aries y Marte. Marca comienzos y apariencias. Muestra la disposición y la personalidad. Representa el cuerpo físico y la primera perspectiva de vida. El Ascendente (ASC) está aquí.",
    },
  },
  {
    number: 2,
    name: {
      en: "2nd House (Values)",
      es: "Casa II (Lucrum)",
    },
    keywords: {
      en: ["Possessions", "Resources", "Values", "Money", "Talents", "Material security"],
      es: ["Posesiones", "Recursos", "Valores", "Dinero", "Talentos", "Seguridad material"],
    },
    description: {
      en: "Succedent House, ruled by Taurus and Venus. Refers to passions, resources, skills for earning and financial matters. Also relates to individual talents and material gains or losses. Moral and ethical values.",
      es: "Casa Sucedente, regida por Tauro y Venus. Alude a las pasiones, a los recursos, a las habilidades para ganar y asuntos financieros. También se refiere a los talentos individuales y a las ganancias o pérdidas materiales. Valores morales, éticos, etc.",
    },
  },
  {
    number: 3,
    name: {
      en: "3rd House (Communication)",
      es: "Casa III (Fratres)",
    },
    keywords: {
      en: ["Communication", "Siblings", "Short trips", "Early education", "Neighbors", "Learning"],
      es: ["Comunicación", "Hermanos", "Viajes cortos", "Educación temprana", "Vecinos", "Aprendizaje"],
    },
    description: {
      en: "Cadent House, ruled by Gemini and Mercury. Communication, rumors, short trips (less than 300 km), primary and secondary education, brothers, sisters, neighbors.",
      es: "Casa Cadente, regida por Géminis y Mercurio. Comunicación, rumores, viajes cortos (menos de 300 km), educación primaria y secundaria, hermanos, hermanas, vecinos.",
    },
  },
  {
    number: 4,
    name: {
      en: "4th House (Home)",
      es: "Casa IV (Genitor)",
    },
    keywords: {
      en: ["Home", "Family", "Roots", "Private life", "Ancestry", "Security"],
      es: ["Hogar", "Familia", "Raíces", "Vida privada", "Ancestros", "Seguridad"],
    },
    description: {
      en: "Angular House, ruled by Cancer and the Moon. Home, parents, ancestors. Often marks the endings of things and the final moments of life, called the tomb. The Imum Coeli (IC) is here.",
      es: "Casa Angular, regida por Cáncer y la Luna. Hogar, padres, ancestros. Suele marcar los finales de cosas y los últimos momentos de vida, se la llama la tumba. El Fondo del Cielo (FC) está aquí.",
    },
  },
  {
    number: 5,
    name: {
      en: "5th House (Creativity)",
      es: "Casa V (Nati)",
    },
    keywords: {
      en: ["Creativity", "Romance", "Children", "Pleasure", "Self-expression", "Joy"],
      es: ["Creatividad", "Romance", "Niños", "Placer", "Autoexpresión", "Alegría"],
    },
    description: {
      en: "Succedent House, ruled by Leo and the Sun. Romance, pleasure, entertainment, artistic abilities, love affairs, children, fertility, sexuality, parties, entertainment in general.",
      es: "Casa Sucedente, regida por Leo y el Sol. Romance, placer, entretenimientos, habilidades artísticas, creación, amoríos, hijos, fertilidad, sexualidad, fiestas, entretenimiento en general.",
    },
  },
  {
    number: 6,
    name: {
      en: "6th House (Service)",
      es: "Casa VI (Valetudo)",
    },
    keywords: {
      en: ["Work", "Health", "Service", "Daily routine", "Habits", "Pets"],
      es: ["Trabajo", "Salud", "Servicio", "Rutina diaria", "Hábitos", "Mascotas"],
    },
    description: {
      en: "Cadent House, ruled by Virgo and Mercury. Work, service, health, hygiene, clothing, personal habits, employees, pets, uncles. Practitioners of magic and occultism other than the querent. Illnesses and injuries.",
      es: "Casa Cadente, regida por Virgo y Mercurio. Trabajo, servicio, salud, higiene, vestimenta, hábitos personales, dependientes (empleados), mascotas, tíos. Practicantes de magia y ocultismo que no sean el consultante. Enfermedades y heridas.",
    },
  },
  {
    number: 7,
    name: {
      en: "7th House (Partnerships)",
      es: "Casa VII (Uxor)",
    },
    keywords: {
      en: ["Relationships", "Marriage", "Partnerships", "Open enemies", "Contracts", "Legal matters"],
      es: ["Relaciones", "Matrimonio", "Asociaciones", "Enemigos conocidos", "Contratos", "Asuntos legales"],
    },
    description: {
      en: "Angular House, ruled by Libra and Venus. Marriage, partnerships, contracts, grandparents, known enemies, thieves. Relationships with others, conflicts, contentions. In medical questions, the doctor. The Descendant (DSC) is here.",
      es: "Casa Angular, regida por Libra y Venus. Matrimonio, cónyuge, sociedades, contratos, abuelos, enemigos conocidos, ladrones. Relaciones interpersonales, conflictos, contiendas. En cuestiones médicas, el médico. El Descendente (DESC) está aquí.",
    },
  },
  {
    number: 8,
    name: {
      en: "8th House (Transformation)",
      es: "Casa VIII (Mors)",
    },
    keywords: {
      en: ["Death", "Rebirth", "Shared resources", "Occult", "Transformation", "Sexual energy"],
      es: ["Muerte", "Renacimiento", "Recursos compartidos", "Ocultismo", "Transformación", "Energía sexual"],
    },
    description: {
      en: "Succedent House, ruled by Scorpio and Mars/Pluto. Spiritual matters, physical regeneration, occult matters, sex, rebirth, degeneration and death. Shows financial and spiritual support from outside. House of inheritances. Also the house of surgeries, along with the 6th House can detect medical issues.",
      es: "Casa Sucedente, regida por Escorpio y Marte/Plutón. Cuestiones espirituales, regeneración física, cuestiones ocultas, sexo, renacimiento, degeneración y muerte. Muestra el soporte financiero y espiritual desde afuera. Casa de las herencias. También es la casa de las cirugías, junto con Casa VI (Salud) se pueden detectar cuestiones médicas.",
    },
  },
  {
    number: 9,
    name: {
      en: "9th House (Philosophy)",
      es: "Casa IX (Iter)",
    },
    keywords: {
      en: ["Higher education", "Philosophy", "Travel", "Foreign cultures", "Religion", "Expansion"],
      es: ["Educación superior", "Filosofía", "Viajes", "Culturas extranjeras", "Religión", "Expansión"],
    },
    description: {
      en: "Cadent House, ruled by Sagittarius and Jupiter. Philosophy, higher consciousness, ideals, ethics, religion, spirituality, intuition, long journeys, grandchildren, in-laws and matters abroad.",
      es: "Casa Cadente, regida por Sagitario y Júpiter. Filosofía, consciencia superior, ideales, ética, religión, espiritualidad, intuición, viajes largos, nietos, suegros y asuntos en el extranjero.",
    },
  },
  {
    number: 10,
    name: {
      en: "10th House (Career)",
      es: "Casa X (Regnum)",
    },
    keywords: {
      en: ["Career", "Public image", "Authority", "Achievement", "Status", "Reputation"],
      es: ["Carrera", "Imagen pública", "Autoridad", "Logros", "Estatus", "Reputación"],
    },
    description: {
      en: "Angular House, ruled by Capricorn and Saturn. Status, fame, profession, social status, ego, ambition, achievements, honors, promotions, influence, authority, business. The Medium Coeli (MC) is here - where you aspire/ambition, what do you achieve?",
      es: "Casa Angular, regida por Capricornio y Saturno. Estatus, fama, profesión, estado social, ego, ambición, logros, honores, promociones, influencia, autoridad, negocios. El Medio Cielo (MC) está aquí, hacia donde aspiro/ambiciono, ¿Qué logro?",
    },
  },
  {
    number: 11,
    name: {
      en: "11th House (Community)",
      es: "Casa XI (Benefacta)",
    },
    keywords: {
      en: ["Friends", "Groups", "Hopes", "Wishes", "Humanitarian interests", "Social networks"],
      es: ["Amigos", "Grupos", "Esperanzas", "Deseos", "Intereses humanitarios", "Redes sociales"],
    },
    description: {
      en: "Succedent House, ruled by Aquarius and Saturn/Uranus. Friends, relationships, groups, knowledge, desires, hopes, love received, humanistic interests, adopted children, social clubs, groups of belonging.",
      es: "Casa Sucedente, regida por Acuario, Saturno y Urano. Amigos, relaciones, grupos, conocimientos, deseos, esperanzas, amor recibido, intereses humanísticos, hijos adoptivos, clubes sociales, grupos de pertenencia.",
    },
  },
  {
    number: 12,
    name: {
      en: "12th House (Unconscious)",
      es: "Casa XII (Carcer)",
    },
    keywords: {
      en: ["Hidden matters", "Secrets", "Spirituality", "Self-undoing", "Isolation", "Unconscious mind"],
      es: ["Asuntos ocultos", "Secretos", "Espiritualidad", "Autosabotaje", "Aislamiento", "Mente inconsciente"],
    },
    description: {
      en: "Cadent House, ruled by Pisces and Jupiter/Neptune. Hidden matters, dangers, weaknesses, imitations, pains, hidden enemies, secrets, places of confinement, clandestine affairs.",
      es: "Casa Cadente, regida por Piscis, Júpiter y Neptuno. Cuestiones ocultas, peligros, debilidades, imitaciones, dolores, enemigos ocultos, secretos, lugares de confinamiento, asuntos clandestinos.",
    },
  },
];

// Planets
export const planets: AstrologyPlanet[] = [
  {
    id: "sun",
    name: {
      en: "Sun",
      es: "Sol",
    },
    symbol: "☉",
    keywords: {
      en: ["Identity", "Ego", "Vitality", "Leadership", "Purpose", "Individuality"],
      es: ["Identidad", "Ego", "Vitalidad", "Liderazgo", "Propósito", "Individualidad"],
    },
    description: {
      en: "Represents issues of power, ego, and personality. Primary masculine principle, leadership, health, vitality, energy, rank, titles, progress, identity. Its action is always energizing and stimulating. Rules Leo, exalted in Aries, in detriment in Aquarius, and in fall in Libra.",
      es: "Representa cuestiones de poder, de ego y personalidad. Principio primario masculino, liderazgo, salud, vitalidad, energía, rango, títulos, progreso, identidad. Su acción siempre es energizante y estimulante. Rige Leo, exaltado en Aries, en detrimento en Acuario, y en caída en Libra.",
    },
  },
  {
    id: "moon",
    name: {
      en: "Moon",
      es: "Luna",
    },
    symbol: "☽",
    keywords: {
      en: ["Emotions", "Instincts", "Nurturing", "Receptivity", "Cycles", "Inner child"],
      es: ["Emociones", "Instintos", "Nutrición", "Receptividad", "Ciclos", "Niño interior"],
    },
    description: {
      en: "Represents the domestic and nurturing, it speaks of emotions and basic needs. Primary feminine principle, unconscious, tides, cycles. Regulates needs, desires, personal interests, liquids, fertility, growth, marks fluctuations. Rules Cancer, exalted in Taurus, in detriment in Capricorn, and in fall in Scorpio.",
      es: "Representa lo doméstico y lo nutritivo, nos habla de las emociones y las necesidades básicas. Principio femenino primario, inconsciente, mareas, ciclos. Regular necesidades, deseos, intereses personales, líquidos, fertilidad, crecimiento, marca fluctuaciones. Rige Cáncer, exaltada en Tauro, en detrimento en Capricornio, y en caída en Escorpio.",
    },
  },
  {
    id: "mercury",
    name: {
      en: "Mercury",
      es: "Mercurio",
    },
    symbol: "☿",
    keywords: {
      en: ["Communication", "Intellect", "Analysis", "Learning", "Travel", "Skills"],
      es: ["Comunicación", "Intelecto", "Análisis", "Aprendizaje", "Viajes", "Destrezas"],
    },
    description: {
      en: "Represents the intellectual, reasoning, skills, speech, writing, communication. Family, siblings, social issues, travel, transportation. Its action is always quick and unpredictable. Rules Gemini and Virgo, exalted in Virgo and Aquarius, in detriment in Sagittarius and Pisces, and in fall in Leo.",
      es: "Representa lo intelectual, el razonamiento, las destrezas, el habla, la escritura, la comunicación. La familia, hermanos, cuestiones sociales, viajes, transportes. Acción siempre rápida e impredecible. Rige Géminis y Virgo, exaltado en Virgo y Acuario, en detrimento en Sagitario y Piscis, y en caída en Leo.",
    },
  },
  {
    id: "venus",
    name: {
      en: "Venus",
      es: "Venus",
    },
    symbol: "♀",
    keywords: {
      en: ["Love", "Beauty", "Harmony", "Attraction", "Art", "Relationships"],
      es: ["Amor", "Belleza", "Armonía", "Atracción", "Arte", "Relaciones"],
    },
    description: {
      en: "Love, sensuality, pleasure, nature, sociability, interactions, beauty, possessions, luxury items. Harmonious and calm action. Rules Taurus and Libra, exalted in Pisces, in detriment in Scorpio and Aries, and in fall in Virgo.",
      es: "Amor, sensualidad, placer, naturaleza, sociabilidad, interacciones, belleza, posesiones, cosas suntuarias. Acción armoniosa y tranquila. Rige Tauro y Libra, exaltada en Piscis, en detrimento en Escorpio y Aries, y en caída en Virgo.",
    },
  },
  {
    id: "mars",
    name: {
      en: "Mars",
      es: "Marte",
    },
    symbol: "♂",
    keywords: {
      en: ["Action", "Energy", "Passion", "Courage", "Aggression", "Desire"],
      es: ["Acción", "Energía", "Pasión", "Coraje", "Agresión", "Deseo"],
    },
    description: {
      en: "Represents impulses of action, initiative, energy, sexual force, power, competition. Weapons, wars, accidents, violence, surgeries. Rules Aries and Scorpio, exalted in Capricorn, in detriment in Libra and Taurus, and in fall in Cancer.",
      es: "Representa impulsos de acción iniciativa, energía sexual, fuerza, poder, competencia. Armas, guerras, accidentes, violencia, cirugías. Rige Aries y Escorpio, exaltado en Capricornio, en detrimento en Libra y Tauro, y en caída en Cáncer.",
    },
  },
  {
    id: "jupiter",
    name: {
      en: "Jupiter",
      es: "Júpiter",
    },
    symbol: "♃",
    keywords: {
      en: ["Expansion", "Growth", "Abundance", "Optimism", "Philosophy", "Wisdom"],
      es: ["Expansión", "Crecimiento", "Abundancia", "Optimismo", "Filosofía", "Sabiduría"],
    },
    description: {
      en: "Expansion, protection, justice, benefactor of humanity, wealth, growth, prosperity, optimism, morality, religion, higher studies, leisure, indulgences. Increase. Rules Sagittarius and Pisces, exalted in Cancer, in detriment in Gemini and Virgo, and in fall in Capricorn.",
      es: "Expansión, protección, justicia, benefactor de la humanidad, riqueza, crecimiento, prosperidad, optimismo, moral, religión, altos estudios, ocio, indulgencias. Incremento. Rige Sagitario y Piscis, exaltado en Cáncer, en detrimento en Géminis y Virgo, y en caída en Capricornio.",
    },
  },
  {
    id: "saturn",
    name: {
      en: "Saturn",
      es: "Saturno",
    },
    symbol: "♄",
    keywords: {
      en: ["Structure", "Discipline", "Limitation", "Responsibility", "Time", "Maturity"],
      es: ["Estructura", "Disciplina", "Limitación", "Responsabilidad", "Tiempo", "Madurez"],
    },
    description: {
      en: "Security, protection, master, limits, discipline, organization, structure, limitations, the conservative, restrictions, crystallizations, orthodoxies, traditional, time, patience, wisdom, aging. Its action is always slow and heavy. Rules Capricorn and Aquarius, exalted in Libra, in detriment in Cancer and Leo, and in fall in Aries.",
      es: "Seguridad, protección, maestro, límites, disciplina, organización, estructura, limitaciones, lo conservador, restricciones, cristalizaciones, ortodoxias, tradicional, tiempo, paciencia, sabiduría, envejecimiento. Su acción es siempre lenta y pesada. Rige Capricornio y Acuario, exaltado en Libra, en detrimento en Cáncer y Leo, y en caída en Aries.",
    },
  },
  {
    id: "uranus",
    name: {
      en: "Uranus",
      es: "Urano",
    },
    symbol: "♅",
    keywords: {
      en: ["Freedom", "Revolution", "Innovation", "Sudden change", "Originality", "Technology"],
      es: ["Libertad", "Revolución", "Innovación", "Cambio repentino", "Originalidad", "Tecnología"],
    },
    description: {
      en: "Impulses of freedom, awakening, science, the occult, magic, originality, psychology. The unorthodox, rebellious, utopian, unconventional. Sudden changes, natural disasters, unexpected, violent. Its force is like a higher octave of Mercury. Rules Aquarius, exalted in Scorpio, in detriment in Leo, and in fall in Taurus.",
      es: "Impulsos de libertad, despertar, la ciencia, lo oculto, la magia, la originalidad, la psicología. Lo no ortodoxo, rebelde, utópico, no convencional. Cambios repentinos, desastres naturales, imprevistas, violenta. Su fuerza es como una octava superior a Mercurio. Rige Acuario, exaltado en Escorpio, en detrimento en Leo, y en caída en Tauro.",
    },
  },
  {
    id: "neptune",
    name: {
      en: "Neptune",
      es: "Neptuno",
    },
    symbol: "♆",
    keywords: {
      en: ["Spirituality", "Dreams", "Illusion", "Inspiration", "Intuition", "Mysticism"],
      es: ["Espiritualidad", "Sueños", "Ilusión", "Inspiración", "Intuición", "Misticismo"],
    },
    description: {
      en: "Intuition, spirituality, liquids, dreams, fantasies, the psychic, mysteries, the intangible, drugs, marine activities. A higher octave of Venus. Its action is imperceptible, insidious. Rules Pisces, in detriment in Virgo.",
      es: "Intuición, espiritualidad, líquidos, sueños, fantasías, lo psíquico, los misterios, lo intangible, las drogas, actividades marinas. Una octava superior a Venus. Su acción es imperceptible, insidiosa. Rige Piscis, en detrimento en Virgo.",
    },
  },
  {
    id: "pluto",
    name: {
      en: "Pluto",
      es: "Plutón",
    },
    symbol: "♇",
    keywords: {
      en: ["Transformation", "Power", "Death", "Rebirth", "Obsession", "Control"],
      es: ["Transformación", "Poder", "Muerte", "Renacimiento", "Obsesión", "Control"],
    },
    description: {
      en: "Impulses of reform or destruction, it speaks of transformation. Birth and death. Viruses, bacteria, transfiguration, reorganization, phobias, obsessions, crimes. Slow, powerful, inescapable action. Rules Scorpio.",
      es: "Impulsos de reforma o destrucción, nos habla de transformación. Nacimiento y muerte. Virus, bacterias, transfiguración, reorganización, fobias, obsesiones, crímenes. Acción lenta, poderosa, ineludible. Rige Escorpio.",
    },
  },
];

// Planet-Sign-House Interpretations
export const interpretations: AstrologyInterpretation[] = [
  {
    planet: "sun",
    sign: "aries",
    house: 10,
    interpretation: {
      en: "The blazing Sun in assertive Aries, positioned in the career-focused 10th House, bestows a fiery, pioneering spirit toward your life's work. You are destined to lead rather than follow, with natural executive abilities and a need to make a significant mark on the world. Your professional endeavors are infused with courage, initiative, and a pioneering spirit that draws others to your vision.",
      es: "El ardiente Sol en el asertivo Aries, posicionado en la Casa 10 enfocada en la carrera, otorga un espíritu pionero y ardiente hacia tu trabajo de vida. Estás destinado a liderar en lugar de seguir, con habilidades ejecutivas naturales y la necesidad de dejar una marca significativa en el mundo. Tus esfuerzos profesionales están imbuidos de coraje, iniciativa y un espíritu pionero que atrae a otros hacia tu visión.",
    },
  },
  {
    planet: "moon",
    sign: "cancer",
    house: 4,
    interpretation: {
      en: "With the Moon in its home sign of Cancer in the 4th House of home and family, you experience a powerful emotional connection to your roots, ancestry, and domestic life. Your sense of security is deeply tied to family bonds and creating a nurturing home environment. You may be highly intuitive about the emotional needs of family members and have a natural talent for creating spaces that feel emotionally safe and comforting.",
      es: "Con la Luna en su signo hogar de Cáncer en la Casa 4 de hogar y familia, experimentas una poderosa conexión emocional con tus raíces, ancestros y vida doméstica. Tu sentido de seguridad está profundamente ligado a los lazos familiares y a crear un ambiente hogareño nutritivo. Puedes ser altamente intuitivo sobre las necesidades emocionales de los miembros de tu familia y tener un talento natural para crear espacios que se sientan emocionalmente seguros y reconfortantes.",
    },
  },
  {
    planet: "mars",
    sign: "scorpio",
    house: 8,
    interpretation: {
      en: "Mars in Scorpio in the 8th House creates an intensely powerful drive toward transformation, shared resources, and psychological exploration. You possess exceptional regenerative abilities and can rebuild from total destruction. Your energy is directed toward uncovering hidden truths, powerful intimacy, and mastering the taboo areas of life. This placement indicates a tremendous capacity for healing and transformation through confronting shadow material.",
      es: "Marte en Escorpio en la Casa 8 crea un impulso intensamente poderoso hacia la transformación, los recursos compartidos y la exploración psicológica. Posees excepcionales habilidades regenerativas y puedes reconstruir desde la destrucción total. Tu energía está dirigida a descubrir verdades ocultas, intimidad poderosa y dominar las áreas tabú de la vida. Esta posición indica una tremenda capacidad para la curación y transformación mediante la confrontación del material de sombra.",
    },
  },
  {
    planet: "venus",
    sign: "libra",
    house: 7,
    interpretation: {
      en: "Venus in Libra in the 7th House creates the quintessential relationship-oriented individual. You possess exceptional social grace, diplomatic skill, and a natural affinity for partnership. You seek balance and harmony in all one-to-one relationships and have a refined aesthetic sense. This placement supports success in fields requiring negotiation, mediation, counseling, or artistic collaboration.",
      es: "Venus en Libra en la Casa 7 crea al individuo quintaesencialmente orientado a las relaciones. Posees una gracia social excepcional, habilidad diplomática y una afinidad natural por las asociaciones. Buscas equilibrio y armonía en todas las relaciones uno a uno y tienes un refinado sentido estético. Esta posición apoya el éxito en campos que requieren negociación, mediación, asesoramiento o colaboración artística.",
    },
  },
  {
    planet: "jupiter",
    sign: "sagittarius",
    house: 9,
    interpretation: {
      en: "Jupiter in Sagittarius in the 9th House represents the ultimate placement for expansion of mind, spirit, and worldview. You possess a natural philosophical bent, love of travel and cultural exploration, and an optimistic faith in life's journey. Higher education, publishing, international relations, or religious/spiritual teaching may feature prominently in your life path. This placement brings exceptional luck and opportunity through foreign connections, academic pursuits, and matters of belief.",
      es: "Júpiter en Sagitario en la Casa 9 representa la máxima posición para la expansión de la mente, el espíritu y la visión del mundo. Posees una inclinación filosófica natural, amor por los viajes y la exploración cultural, y una fe optimista en el viaje de la vida. La educación superior, la publicación, las relaciones internacionales o la enseñanza religiosa/espiritual pueden figurar prominentemente en tu camino de vida. Esta posición trae suerte excepcional y oportunidades a través de conexiones extranjeras, búsquedas académicas y asuntos de creencia.",
    },
  },
  {
    planet: "saturn",
    sign: "capricorn",
    house: 10,
    interpretation: {
      en: "Saturn in Capricorn in the 10th House creates a formidable capacity for career achievement through disciplined, methodical effort. You possess executive ability, ambition, and the tenacity to climb to positions of authority and responsibility. While success may come later in life, it tends to be enduring and substantial. This placement supports careers involving management, government, big business, or any field requiring organization, structure, and patience.",
      es: "Saturno en Capricornio en la Casa 10 crea una formidable capacidad para el logro profesional a través del esfuerzo disciplinado y metódico. Posees capacidad ejecutiva, ambición y la tenacidad para escalar a posiciones de autoridad y responsabilidad. Aunque el éxito puede llegar más tarde en la vida, tiende a ser duradero y sustancial. Esta posición apoya carreras que involucran gestión, gobierno, grandes empresas o cualquier campo que requiera organización, estructura y paciencia.",
    },
  },
];
