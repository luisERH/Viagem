/**
 * Every point the itinerary can put on the map.
 *
 * Coordinates are real latitude/longitude pairs; the map fits its bounds to
 * whichever subset the selected day uses.
 */

/** Geographic clusters. A day never mixes two of them. */
export const REGION = {
  BRAZIL: 'br',
  ISLAND: 'fln',
  IGUACU: 'igu',
};

/** Caption shown above the map for each cluster. */
export const REGION_LABEL = {
  [REGION.BRAZIL]: 'Brasil',
  [REGION.ISLAND]: 'Ilha de Santa Catarina',
  [REGION.IGUACU]: 'Tríplice fronteira',
};

/** Accent a place is drawn with. Foz do Iguaçu runs warm, the island runs cool. */
export const ACCENT = {
  SEA: 'sea',
  CLAY: 'clay',
};

/**
 * @typedef {object} Place
 * @property {string} region       One of `REGION`.
 * @property {[number, number]} coords Latitude and longitude.
 * @property {string} icon         Key from the icon set.
 * @property {string} name         Label on the marker popup.
 * @property {string} accent       One of `ACCENT`.
 * @property {boolean} [isAnchor]  Overnight stop or boarding point; drawn filled.
 */

/** @type {Record<string, Place>} */
export const PLACES = {
  // Country-level anchors
  'bel': { region: REGION.BRAZIL, coords: [-1.4558, -48.4902], icon: 'plane', name: 'Belém', accent: ACCENT.SEA, isAnchor: true },
  'fln-city': { region: REGION.BRAZIL, coords: [-27.5954, -48.548], icon: 'wave', name: 'Florianópolis', accent: ACCENT.SEA, isAnchor: true },
  'foz-city': { region: REGION.BRAZIL, coords: [-25.5163, -54.5854], icon: 'falls', name: 'Foz do Iguaçu', accent: ACCENT.CLAY, isAnchor: true },

  // Ilha de Santa Catarina
  'fln-aero': { region: REGION.ISLAND, coords: [-27.6705, -48.5525], icon: 'plane', name: 'Aeroporto Hercílio Luz', accent: ACCENT.SEA },
  'pousada': { region: REGION.ISLAND, coords: [-27.429, -48.464], icon: 'bed', name: 'Pousada Barbroch', accent: ACCENT.SEA, isAnchor: true },
  'bomjesus': { region: REGION.ISLAND, coords: [-27.418, -48.452], icon: 'wave', name: 'Cachoeira do Bom Jesus', accent: ACCENT.SEA },
  'canas': { region: REGION.ISLAND, coords: [-27.3949, -48.4361], icon: 'sun', name: 'Ponta das Canas', accent: ACCENT.SEA },
  'santinho': { region: REGION.ISLAND, coords: [-27.446, -48.382], icon: 'sunrise', name: 'Praia do Santinho', accent: ACCENT.SEA },
  'aranhas': { region: REGION.ISLAND, coords: [-27.438, -48.383], icon: 'trail', name: 'Morro das Aranhas', accent: ACCENT.SEA },
  'fortaleza': { region: REGION.ISLAND, coords: [-27.4308, -48.5147], icon: 'fort', name: 'Fortaleza de São José', accent: ACCENT.SEA },
  'forte': { region: REGION.ISLAND, coords: [-27.4362, -48.5083], icon: 'sun', name: 'Praia do Forte', accent: ACCENT.SEA },
  'jurere': { region: REGION.ISLAND, coords: [-27.4383, -48.4917], icon: 'fork', name: 'Jurerê', accent: ACCENT.SEA },
  'daniela': { region: REGION.ISLAND, coords: [-27.4467, -48.522], icon: 'wave', name: 'Praia Daniela', accent: ACCENT.SEA },
  'santo': { region: REGION.ISLAND, coords: [-27.5083, -48.5164], icon: 'house', name: 'Santo Antônio de Lisboa', accent: ACCENT.SEA },
  'costa': { region: REGION.ISLAND, coords: [-27.5628, -48.4599], icon: 'boat', name: 'Costa da Lagoa', accent: ACCENT.SEA },
  'lagoa': { region: REGION.ISLAND, coords: [-27.6027, -48.4665], icon: 'view', name: 'Lagoa da Conceição', accent: ACCENT.SEA },
  'mole': { region: REGION.ISLAND, coords: [-27.6017, -48.434], icon: 'trail', name: 'Praia Mole e Joaquina', accent: ACCENT.SEA },
  'centro': { region: REGION.ISLAND, coords: [-27.5943, -48.554], icon: 'market', name: 'Centro e Terminal Rita Maria', accent: ACCENT.SEA, isAnchor: true },

  // Foz do Iguaçu
  'rodo': { region: REGION.IGUACU, coords: [-25.509, -54.561], icon: 'bus', name: 'Rodoviária Internacional', accent: ACCENT.CLAY, isAnchor: true },
  'hotel': { region: REGION.IGUACU, coords: [-25.5478, -54.5882], icon: 'bed', name: 'Hospedagem, centro de Foz', accent: ACCENT.CLAY, isAnchor: true },
  'templo': { region: REGION.IGUACU, coords: [-25.5108, -54.5372], icon: 'temple', name: 'Templo Budista', accent: ACCENT.CLAY },
  'marco': { region: REGION.IGUACU, coords: [-25.5943, -54.5893], icon: 'flag', name: 'Marco das Três Fronteiras', accent: ACCENT.CLAY },
  'aves': { region: REGION.IGUACU, coords: [-25.6318, -54.4776], icon: 'bird', name: 'Parque das Aves', accent: ACCENT.CLAY },
  'cataratas': { region: REGION.IGUACU, coords: [-25.6953, -54.4367], icon: 'falls', name: 'Trilha das Cataratas', accent: ACCENT.CLAY },
  'macuco': { region: REGION.IGUACU, coords: [-25.679, -54.445], icon: 'boat', name: 'Macuco Safari', accent: ACCENT.CLAY },
  'spa': { region: REGION.IGUACU, coords: [-25.545, -54.585], icon: 'spa', name: 'Spa e jantar, centro', accent: ACCENT.CLAY },
  'igu-aero': { region: REGION.IGUACU, coords: [-25.5975, -54.4872], icon: 'plane', name: 'Aeroporto de Foz', accent: ACCENT.CLAY, isAnchor: true },
};
