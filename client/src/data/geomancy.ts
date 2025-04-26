import { GeomancyFigure, GeomancyFigureId, Element, Planet, HouseNumber } from "@/types";

// Introduction to Geomancy
export const geomancyInfo = {
  en: `Geomancy is the art of divination through earth and elemental forces. The word "geomancy" derives from two Greek words: γῆ or γαῖα (Earth), and μαντεία (divination). The concept of geomancy in Europe primarily derives from ancient Arabic and Roman divinatory practices, combined with astrology and the Greek doctrine of the four elements. 
  
  In this system, the 16 geomantic figures (each formed by four lines of dots) represent all possible combinations of elements. Additionally, each of the seven planets is associated with two of the geomantic figures, the two remaining figures are assigned to the two lunar nodes (points where the Moon crosses the ecliptic). The zodiacal signs are also assigned to the figures according to the rulerships of the assigned planets.`,
  
  es: `La Geomancia es el arte de la adivinación a través de la tierra y las fuerzas elementales. La palabra "geomancia" deriva de dos palabras griegas: γῆ o γαῖα (Tierra), y μαντεία (adivinación). El concepto de geomancia en Europa deriva principalmente de antiguas prácticas adivinatorias arábicas y romanas, combinadas con astrología y la doctrina griega de los cuatro elementos.
  
  En este sistema, las 16 figuras geománticas (conformadas cada una por cuatro líneas de puntos), representan todas las combinaciones posibles de elementos. Adicionalmente, cada uno de los siete planetas se encuentra asociado con dos de las figuras geománticas, las dos restantes se asignan a los dos nodos lunares (puntos en donde la Luna cruza la elíptica). Los signos zodiacales también se asignan a las figuras de acuerdo a las regencias de los planetas asignados.`
};

// Elemental Reading
export const elementalReading = {
  en: `Each line of the geomantic figures represents an element in the following order:
  • Fire
  • Air
  • Water
  • Earth
  
  The odd (one point) is always active, the even (two points) is always passive. Thus, elemental lines that are odd or of one point will be active while those that are even or of two points will be passive. The passive in this case refers to the unconscious, the exterior, that which is outside of control, while the active refers to what is being deliberately processed or transited, what can be used as a tool. The point, active, is focused; the two points, passive, are dispersed.`,
  
  es: `Cada línea de las figuras geománticas representa un elemento en el siguiente orden:
  • Fuego
  • Aire
  • Agua
  • Tierra
  
  El impar, el uno, es siempre activo, el par es siempre pasivo. De esta forma, las líneas elementales que sean impares o de un punto estarán activas mientras que las pares o de dos puntos serán pasivas. Lo pasivo en este caso refiere a lo inconsciente, lo exterior, aquello que está fuera de control, mientras que lo activo hace referencia a lo que se está procesando o transitando deliberadamente, lo que se puede usar como herramienta. El punto, activo, está enfocado, los dos puntos, pasivos, están dispersos.`
};

// Figure Generation Methods
export const figureGenerationMethods = {
  en: `Methods for generating figures:
  
  1. Point and Surface: This is the oldest method, referring to the origins of the art in the Sahara, where the geomancer takes an object sharp enough to mark the surface or medium used. Various media can be used such as a staff and a plot of ground, a rod and a box of sand, a needle in wax, a pointer on a tablet, a pen and paper, etc.
  
  2. Coins: This is a minimalist method: Toss a coin four times assigning odd or even for the sides of the same. Doing this four times allows obtaining a complete figure.
  
  3. Divinatory Chain: This is a modification of the previous method in which four or more coins are connected through a chain and this is thrown to observe which side each coin falls on.
  
  4. Dice: Roll a die four times or four different dice once. If the result is odd it corresponds to one point in the figure, if it is even it corresponds to two points.`,
  
  es: `Métodos para el levantamiento de figuras:
  
  1. Punta y superficie: Este es el método más antiguo, remite a los orígenes del arte en el Sahara, en donde el geomante toma algún objeto lo suficientemente punzante como para marcar la superficie o medio que se utilice. Se puede utilizar diversos medios como un bastón y una parcela del suelo, una vara y una caja de arena, una aguja en cera, un puntero en una tablet, una lapicera y papel, etc.
  
  2. Monedas: Este es un método minimalista: Lanzar una moneda cuatro veces asignando par o impar para los lados de la misma. Realizar esto cuatro veces permite obtener una figura completa.
  
  3. Cadena adivinatoria: Se trata de una modificación del método anterior en el cual cuatro o más monedas se encuentran conectadas a través de una cadena y ésta es arrojada para observar de qué lado cae cada moneda.
  
  4. Dados: Se arroja un dado cuatro veces o cuatro dados diferentes una vez. Si el resultado es impar corresponde a un punto en la figura, si es par corresponde a dos puntos.`
};

// Geomancy figures with their patterns and meanings
export const geomancyFigures: GeomancyFigure[] = [
  {
    id: "puer",
    name: {
      en: "Puer",
      es: "Puer"
    },
    meaning: {
      en: "Boy",
      es: "Niño"
    },
    element: "fire",
    planet: "mars",
    house: 1,
    pattern: [
      [true, false],
      [true, false],
      [true, true],
      [true, false]
    ],
    description: {
      en: "Aggression, action, warlike, young masculine energy.",
      es: "Agresión, acción, guerrero, energía masculina joven."
    }
  },
  {
    id: "puella",
    name: {
      en: "Puella",
      es: "Puella"
    },
    meaning: {
      en: "Girl",
      es: "Niña"
    },
    element: "water",
    planet: "venus",
    house: 7,
    pattern: [
      [true, false],
      [true, true],
      [true, false],
      [true, true]
    ],
    description: {
      en: "Beauty, grace, harmony, young feminine energy.",
      es: "Belleza, gracia, armonía, energía femenina joven."
    }
  },
  {
    id: "fortuna-major",
    name: {
      en: "Fortuna Major",
      es: "Fortuna Mayor"
    },
    meaning: {
      en: "Greater Fortune",
      es: "Fortuna Mayor"
    },
    element: "fire",
    planet: "sun",
    house: 5,
    pattern: [
      [true, false],
      [true, true],
      [true, true],
      [true, false]
    ],
    description: {
      en: "Strong success, gain through one's own effort.",
      es: "Éxito fuerte, ganancia a través del propio esfuerzo."
    }
  },
  {
    id: "fortuna-minor",
    name: {
      en: "Fortuna Minor",
      es: "Fortuna Menor"
    },
    meaning: {
      en: "Lesser Fortune",
      es: "Fortuna Menor"
    },
    element: "fire",
    planet: "sun",
    house: 9,
    pattern: [
      [true, false],
      [true, true],
      [true, true],
      [false, true]
    ],
    description: {
      en: "Lesser success, temporary advantage or aid.",
      es: "Éxito menor, ventaja temporal o ayuda externa."
    }
  },
  {
    id: "acquisitio",
    name: {
      en: "Acquisitio",
      es: "Adquisitio"
    },
    meaning: {
      en: "Gain",
      es: "Ganancia"
    },
    element: "air",
    planet: "jupiter",
    house: 10,
    pattern: [
      [true, true],
      [true, true],
      [true, false],
      [true, false]
    ],
    description: {
      en: "Gain, acquisition, growth and prosperity.",
      es: "Ganancia, adquisición, crecimiento y prosperidad."
    }
  },
  {
    id: "amissio",
    name: {
      en: "Amissio",
      es: "Amissio"
    },
    meaning: {
      en: "Loss",
      es: "Pérdida"
    },
    element: "earth",
    planet: "venus",
    house: 2,
    pattern: [
      [true, false],
      [true, false],
      [true, true],
      [true, true]
    ],
    description: {
      en: "Loss, letting go, releasing attachments.",
      es: "Pérdida, soltar, dejar ir los apegos."
    }
  },
  {
    id: "conjunctio",
    name: {
      en: "Conjunctio",
      es: "Conjunctio"
    },
    meaning: {
      en: "Conjunction",
      es: "Conjunción"
    },
    element: "air",
    planet: "mercury",
    house: 3,
    pattern: [
      [true, true],
      [true, false],
      [true, false],
      [true, true]
    ],
    description: {
      en: "Union, coming together, meetings and communications.",
      es: "Unión, encuentro, comunicación."
    }
  },
  {
    id: "carcer",
    name: {
      en: "Carcer",
      es: "Cárcer"
    },
    meaning: {
      en: "Prison",
      es: "Prisión"
    },
    element: "earth",
    planet: "saturn",
    house: 8,
    pattern: [
      [true, false],
      [true, true],
      [true, true],
      [true, false]
    ],
    description: {
      en: "Imprisonment, restriction, obstacles.",
      es: "Prisión, restricción, obstáculos."
    }
  },
  {
    id: "albus",
    name: {
      en: "Albus",
      es: "Albus"
    },
    meaning: {
      en: "White",
      es: "Blanco"
    },
    element: "air",
    planet: "mercury",
    house: 4,
    pattern: [
      [true, true],
      [true, true],
      [true, false],
      [true, true]
    ],
    description: {
      en: "Wisdom, clarity, calm reflection.",
      es: "Sabiduría, claridad, reflexión calma."
    }
  },
  {
    id: "rubeus",
    name: {
      en: "Rubeus",
      es: "Rubeus"
    },
    meaning: {
      en: "Red",
      es: "Rojo"
    },
    element: "water",
    planet: "mars",
    house: 3,
    pattern: [
      [true, true],
      [true, false],
      [true, false],
      [true, false]
    ],
    description: {
      en: "Violence, chaos, passion, danger.",
      es: "Violencia, caos, pasión, peligro."
    }
  },
  {
    id: "laetitia",
    name: {
      en: "Laetitia",
      es: "Laetitia"
    },
    meaning: {
      en: "Joy",
      es: "Alegría"
    },
    element: "water",
    planet: "jupiter",
    house: 3,
    pattern: [
      [true, false],
      [true, false],
      [true, false],
      [true, true]
    ],
    description: {
      en: "Joy, happiness, hope and celebration.",
      es: "Alegría, felicidad, esperanza y celebración."
    }
  },
  {
    id: "tristitia",
    name: {
      en: "Tristitia",
      es: "Tristitia"
    },
    meaning: {
      en: "Sorrow",
      es: "Tristeza"
    },
    element: "earth",
    planet: "saturn",
    house: 10,
    pattern: [
      [true, true],
      [true, false],
      [true, false],
      [true, false]
    ],
    description: {
      en: "Sadness, sorrow, limitation and heaviness.",
      es: "Tristeza, dolor, limitación y pesadez."
    }
  },
  {
    id: "populus",
    name: {
      en: "Populus",
      es: "Populus"
    },
    meaning: {
      en: "The Crowd",
      es: "La Multitud"
    },
    element: "water",
    planet: "moon",
    house: 4,
    pattern: [
      [true, true],
      [true, true],
      [true, true],
      [true, true]
    ],
    description: {
      en: "The crowd, multiplicity, adaptability.",
      es: "La multitud, multiplicidad, adaptabilidad."
    }
  },
  {
    id: "via",
    name: {
      en: "Via",
      es: "Vía"
    },
    meaning: {
      en: "The Way",
      es: "El Camino"
    },
    element: "water",
    planet: "moon",
    house: 9,
    pattern: [
      [false, false],
      [false, false],
      [false, false],
      [false, true]
    ],
    description: {
      en: "The way, journey, movement, transition.",
      es: "El camino, viaje, movimiento, transición."
    }
  },
  {
    id: "cauda-draconis",
    name: {
      en: "Cauda Draconis",
      es: "Cauda Draconis"
    },
    meaning: {
      en: "Dragon's Tail",
      es: "Cola del Dragón"
    },
    element: "fire",
    planet: "mars",
    house: 12,
    pattern: [
      [false, false],
      [false, false],
      [false, true],
      [false, true]
    ],
    description: {
      en: "Endings, karma, destructive transformation.",
      es: "Finales, karma, transformación destructiva."
    }
  },
  {
    id: "caput-draconis",
    name: {
      en: "Caput Draconis",
      es: "Caput Draconis"
    },
    meaning: {
      en: "Dragon's Head",
      es: "Cabeza del Dragón"
    },
    element: "air",
    planet: "jupiter",
    house: 6,
    pattern: [
      [false, true],
      [false, true],
      [false, false],
      [false, false]
    ],
    description: {
      en: "Beginnings, potential, spiritual purpose.",
      es: "Comienzos, potencial, propósito espiritual."
    }
  }
];