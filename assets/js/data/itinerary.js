/**
 * The eight days of the trip.
 *
 * Weekday and month labels are derived from `date`, so a schedule change only
 * has to touch one field. `footnoteHtml` is authored markup and is injected as
 * HTML; every other string is escaped at render time.
 */

import { ACCENT, REGION } from './places.js';

/**
 * @typedef {object} Step
 * @property {string} time     Local time, `HH:MM`.
 * @property {string} placeId  Key into `PLACES`.
 * @property {string} icon     Key from the icon set.
 * @property {string} title    Short headline.
 * @property {string} detail   Why it is worth doing, and what to watch out for.
 * @property {string} price    Free-form cost note, e.g. `"R$ 121 /pp"`.
 */

/**
 * @typedef {object} Day
 * @property {string} date         ISO date, `YYYY-MM-DD`.
 * @property {string} shortLabel   Chip caption on the day rail.
 * @property {string} region       One of `REGION`; drives the map bounds.
 * @property {string} accent       One of `ACCENT`.
 * @property {boolean} [isTravelDay] Marks a day that changes city.
 * @property {string} zone         Eyebrow above the schedule.
 * @property {string} title        Schedule headline.
 * @property {string} intro        One paragraph setting up the day.
 * @property {string} footnoteHtml Closing note; may contain inline markup.
 * @property {Step[]} steps
 */

/** @type {Day[]} */
export const DAYS = [
  {
    date: '2026-08-31',
    shortLabel: 'Chegada',
    region: REGION.ISLAND,
    accent: ACCENT.SEA,
    isTravelDay: true,
    zone: 'Chegada · Canasvieiras',
    title: 'Pousar, respirar, ver o sol se pôr',
    intro: 'Vocês casam poucos dias antes e saem de casa às 02:30. Este dia é de propósito leve.',
    footnoteHtml:
      'Não tentem encaixar passeio grande hoje. Jantar em Canasvieiras e dormir cedo compra o dia de amanhã inteiro.',
    steps: [
      {
        time: '13:55',
        placeId: 'fln-aero',
        icon: 'plane',
        title: 'Pouso em Florianópolis',
        detail: 'O aeroporto fica no sul e a pousada no norte, 35 km. Aplicativo, não ônibus.',
        price: 'R$ 100 a 130',
      },
      {
        time: '15:00',
        placeId: 'pousada',
        icon: 'bed',
        title: 'Check in na Pousada Barbroch',
        detail: 'Descansem de verdade. Foram 12 horas de porta a porta.',
        price: 'pago',
      },
      {
        time: '16:30',
        placeId: 'bomjesus',
        icon: 'wave',
        title: 'Cachoeira do Bom Jesus, a pé',
        detail:
          'Fica colada em Canasvieiras, mar calmo e água quente. Dá para ir andando, sem pegar aplicativo.',
        price: 'grátis',
      },
      {
        time: '17:30',
        placeId: 'canas',
        icon: 'sun',
        title: 'Pôr do sol na Ponta das Canas',
        detail: 'Baía norte, virada para o oeste. O sol se põe sobre a água por volta das 18h.',
        price: 'grátis',
      },
    ],
  },
  {
    date: '2026-09-01',
    shortLabel: 'Norte completo',
    region: REGION.ISLAND,
    accent: ACCENT.SEA,
    zone: 'Norte · do nascer ao pôr do sol',
    title: 'O dia mais cheio da ilha',
    intro:
      'Vocês pediram ritmo intenso, e este é o dia que entrega. Nascer do sol, trilha, fortaleza e pôr do sol, tudo dentro do norte.',
    footnoteHtml:
      'Dia quase todo de graça, o gasto real é transporte e comida. <b>Se acordar às 5h for demais</b> depois do casamento, cortem o Santinho e comecem pela Fortaleza às 9h. O resto do dia continua de pé.',
    steps: [
      {
        time: '05:30',
        placeId: 'santinho',
        icon: 'sunrise',
        title: 'Nascer do sol na Praia do Santinho',
        detail:
          'A 25 minutos da pousada e o único nascer do sol da ilha que cabe na base de vocês. Mar agitado e água gelada, então é de olhar, não de entrar.',
        price: 'app R$ 40',
      },
      {
        time: '07:00',
        placeId: 'aranhas',
        icon: 'trail',
        title: 'Trilha do Morro das Aranhas',
        detail:
          'Sai da ponta do Santinho. Vista aberta do norte inteiro e inscrições rupestres no caminho. Cerca de 1h30 ida e volta.',
        price: 'grátis',
      },
      {
        time: '10:00',
        placeId: 'fortaleza',
        icon: 'fort',
        title: 'Fortaleza de São José da Ponta Grossa',
        detail:
          'Forte de 1740 no alto do costão. Uma das melhores vistas da ilha e quase nenhum turista.',
        price: 'R$ 15 /pp',
      },
      {
        time: '12:30',
        placeId: 'jurere',
        icon: 'fork',
        title: 'Almoço em Jurerê',
        detail: 'Em setembro a parte internacional fica vazia e os preços caem bastante.',
        price: '~R$ 120',
      },
      {
        time: '14:30',
        placeId: 'daniela',
        icon: 'wave',
        title: 'Praia Daniela',
        detail:
          'Mar calmo, raso e a água mais quente do norte. Boa para descansar depois da trilha da manhã.',
        price: 'grátis',
      },
      {
        time: '17:00',
        placeId: 'forte',
        icon: 'sun',
        title: 'Pôr do sol na Praia do Forte',
        detail:
          'Fica ao lado da Fortaleza e está na lista dos melhores pores do sol da ilha. Vocês fecham o dia onde começaram.',
        price: 'grátis',
      },
    ],
  },
  {
    date: '2026-09-02',
    shortLabel: 'Lagoa',
    region: REGION.ISLAND,
    accent: ACCENT.SEA,
    zone: 'Leste · o dia de sair do norte',
    title: 'Lagoa da Conceição e a Costa da Lagoa',
    intro:
      'Único deslocamento longo da ilha. Saiam por volta das 8h de aplicativo e voltem de aplicativo à noite.',
    footnoteHtml:
      '<b>O que ficou de fora:</b> Lagoinha do Leste e Ribeirão da Ilha, no sul. São o melhor da ilha, mas de Canasvieiras dão 2h30 de ônibus só de ida. Sem carro, não fecha.',
    steps: [
      {
        time: '08:00',
        placeId: 'lagoa',
        icon: 'view',
        title: 'Chegada ao centrinho da Lagoa',
        detail: 'Base do dia. É de onde saem os barcos, na Av. das Rendeiras.',
        price: 'app R$ 70 a 90',
      },
      {
        time: '10:00',
        placeId: 'costa',
        icon: 'boat',
        title: 'Barco para a Costa da Lagoa',
        detail:
          'Vila de pescadores onde não chega estrada. Almoço de frutos do mar com o pé na água.',
        price: 'R$ 30 /pp trecho',
      },
      {
        time: '15:00',
        placeId: 'mole',
        icon: 'trail',
        title: 'Praia Mole e dunas da Joaquina',
        detail:
          'Alternativa se o dia estiver bom para praia. A 15 minutos da Lagoa, com sandboard nas dunas.',
        price: 'prancha R$ 25',
      },
      {
        time: '17:30',
        placeId: 'lagoa',
        icon: 'view',
        title: 'Mirante do Morro da Lagoa',
        detail:
          'A Lagoa inteira embaixo. Depois, jantar no centrinho, que é onde a ilha tem vida noturna em setembro.',
        price: '~R$ 140',
      },
    ],
  },
  {
    date: '2026-09-03',
    shortLabel: 'Estrada',
    region: REGION.ISLAND,
    accent: ACCENT.SEA,
    isTravelDay: true,
    zone: 'Check out, Centro e embarque',
    title: 'Ostras ao meio-dia, estrada às cinco e meia',
    intro:
      'São 6h30 entre o check out e o embarque. O trajeto é uma linha reta: Canasvieiras, Santo Antônio, Centro, terminal.',
    footnoteHtml:
      'Com bagagem de mão, vocês nem precisam de guarda-volumes. Circulam leves o dia todo.',
    steps: [
      {
        time: '11:00',
        placeId: 'pousada',
        icon: 'bed',
        title: 'Check out, com café da manhã antes',
        detail: 'As malas vão junto, e como é bagagem de mão isso não pesa.',
        price: 'pago',
      },
      {
        time: '11:40',
        placeId: 'santo',
        icon: 'house',
        title: 'Santo Antônio de Lisboa',
        detail:
          'Vila açoriana do século XVIII, casario colorido virado para a baía. Almoço de ostras sem pressa.',
        price: '~R$ 140',
      },
      {
        time: '14:30',
        placeId: 'centro',
        icon: 'market',
        title: 'Mercado Público e Praça XV',
        detail: 'A 400 metros do terminal, tudo a pé, com a vista da Ponte Hercílio Luz.',
        price: 'grátis',
      },
      {
        time: '17:30',
        placeId: 'centro',
        icon: 'bus',
        title: 'Expresso Nordeste no Terminal Rita Maria',
        detail: 'Semileito, embarque direto, 14h55 de estrada. Av. Paulo Fontes 1101.',
        price: 'pago',
      },
    ],
  },
  {
    date: '2026-09-04',
    shortLabel: 'Chegada em Foz',
    region: REGION.IGUACU,
    accent: ACCENT.CLAY,
    isTravelDay: true,
    zone: 'Chegada · Foz do Iguaçu',
    title: 'Dia leve, pôr do sol na fronteira',
    intro:
      'Vocês desembarcam depois de 15 horas de ônibus. Este é o outro dia de ir devagar.',
    footnoteHtml:
      'O Marco é o passeio mais romântico de Foz, e cai perfeito num dia em que vocês vão estar acabados.',
    steps: [
      {
        time: '08:25',
        placeId: 'rodo',
        icon: 'bus',
        title: 'Chegada na Rodoviária Internacional',
        detail: 'Av. Costa e Silva 1601, a 5 km do centro.',
        price: '~R$ 35',
      },
      {
        time: '09:00',
        placeId: 'hotel',
        icon: 'coffee',
        title: 'Café da manhã, banho e descanso',
        detail: 'Peçam early check in por escrito antes da viagem, porque o padrão é 14:00.',
        price: '~R$ 60',
      },
      {
        time: '14:30',
        placeId: 'templo',
        icon: 'temple',
        title: 'Templo Budista ou Mesquita',
        detail: 'Visita curta e de graça, boa para um dia de cansaço.',
        price: 'grátis',
      },
      {
        time: '17:00',
        placeId: 'marco',
        icon: 'flag',
        title: 'Marco das Três Fronteiras',
        detail:
          'Encontro do Iguaçu com o Paraná, com três países à vista. Pôr do sol e show de luzes.',
        price: 'R$ 55 /pp',
      },
    ],
  },
  {
    date: '2026-09-05',
    shortLabel: 'Cataratas',
    region: REGION.IGUACU,
    accent: ACCENT.CLAY,
    zone: 'Lado brasileiro',
    title: 'O dia grande: quedas, barco e aves',
    intro:
      'Cheguem às 9h, na abertura. É feriadão, e entre 9h e 11h a diferença é uma hora de fila.',
    footnoteHtml:
      'Vocês vão se molhar na Garganta do Diabo e vão sair encharcados do Macuco. Levem capa de chuva, muda de roupa e proteção para o celular.',
    steps: [
      {
        time: '09:00',
        placeId: 'cataratas',
        icon: 'falls',
        title: 'Trilha das Cataratas, na abertura',
        detail: '1,2 km, de 2h a 3h com calma. É a vista panorâmica, de frente para as quedas.',
        price: 'R$ 121 /pp',
      },
      {
        time: '12:00',
        placeId: 'macuco',
        icon: 'boat',
        title: 'Macuco Safari',
        detail:
          'O barco que entra embaixo das quedas. Cerca de 2 horas, dentro do próprio parque. Reservem antes.',
        price: '~R$ 400 /pp',
      },
      {
        time: '15:00',
        placeId: 'aves',
        icon: 'bird',
        title: 'Parque das Aves',
        detail: 'Em frente ao portão do parque. 1h30 dentro de viveiros que você atravessa a pé.',
        price: '~R$ 130 /pp',
      },
      {
        time: '18:00',
        placeId: 'hotel',
        icon: 'bus',
        title: 'Volta pela linha 120',
        detail:
          'A mesma linha faz Cataratas, Macuco e Parque das Aves. Sem carro, resolve o dia inteiro.',
        price: 'R$ 6 /pp',
      },
    ],
  },
  {
    date: '2026-09-06',
    shortLabel: 'Descanso',
    region: REGION.IGUACU,
    accent: ACCENT.CLAY,
    zone: 'Dia leve',
    title: 'Dormir até tarde, spa e jantar',
    intro:
      'Sem a Argentina, este dia virou o respiro da viagem. Depois do sábado inteiro em pé, vocês vão querer.',
    footnoteHtml:
      '<b>Se a Polícia Federal liberar passaporte a tempo:</b> este é o dia da Argentina. Saída às 7h, dia inteiro no parque, volta às 18h. Aí o spa e o jantar entram no lugar do Macuco no sábado.',
    steps: [
      {
        time: '10:00',
        placeId: 'hotel',
        icon: 'coffee',
        title: 'Manhã sem despertador',
        detail: 'O único dia da viagem sem hora marcada.',
        price: 'grátis',
      },
      {
        time: '14:00',
        placeId: 'spa',
        icon: 'spa',
        title: 'Massagem ou spa',
        detail: 'Vários hotéis de Foz vendem day spa para não hóspedes. Reservem com antecedência.',
        price: '~R$ 300',
      },
      {
        time: '19:30',
        placeId: 'spa',
        icon: 'fork',
        title: 'Jantar especial',
        detail:
          'Foz tem cozinha árabe muito boa, herança da comunidade libanesa, além das churrascarias.',
        price: '~R$ 250',
      },
    ],
  },
  {
    date: '2026-09-07',
    shortLabel: 'Volta',
    region: REGION.IGUACU,
    accent: ACCENT.CLAY,
    isTravelDay: true,
    zone: 'Volta',
    title: 'Foz para Belém',
    intro: 'Dia de deslocamento, sem passeio.',
    footnoteHtml:
      'Feriado de 7 de setembro, então o aeroporto deve estar cheio. Cheguem com folga.',
    steps: [
      {
        time: '07:30',
        placeId: 'hotel',
        icon: 'bag',
        title: 'Saída da hospedagem',
        detail: 'Confirmem antes se dá para fazer check out cedo e se o café começa às 7h.',
        price: '~R$ 40',
      },
      {
        time: '10:05',
        placeId: 'igu-aero',
        icon: 'plane',
        title: 'Voo IGU para BEL',
        detail: '6h20 com conexão. Pouso em Belém às 16:25.',
        price: 'pago',
      },
    ],
  },
];
