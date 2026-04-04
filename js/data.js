function buildProductDetails(materialType) {
  const items = [
    '<strong>Regulacja:</strong> mechanizm rączki opiera się na ozdobnej kokardzie. Aby zmienić długość, wystarczy ją rozwiązać, ściągnąć lub rozciągnąć rączkę do dowolnej długości i ponownie zawiązać.',
    '<strong>Komfort:</strong> rączka torby posiada miękkie wypełnienie, co nadaje dodatkowego komfortu przy noszeniu.',
    '<strong>Wnętrze:</strong> dwie funkcjonalne kieszonki - jedna zamykana na zamek, druga otwarta na drobiazgi.',
    '<strong>Produkcja:</strong> zaprojektowana i uszyta w Polsce'
  ].filter(Boolean);

  return `
    <ul>
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

function buildDeliveryDetails(model) {
  const productName = model === 'Faworytka' ? 'FAWORYTKĘ' : 'FAWORYTĘ';
  const items = [
    'Automat DPD Pickup - 13 zł / InPost Kurier - 20 zł / Kurier DPD - 15 zł.',
    `Wysyłka zagraniczna: Napisz do nas na maila - chętnie wyślemy ${productName} w dowolne miejsce na świecie.`
  ];

  return `
    <ul>
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

function buildModelDescription(model) {
  if (model === 'Faworytka') {
    return 'FAWORYTKA to mniejsza siostra FAWORYTY. FAWORYTKA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTKA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitów, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
  }

  return 'FAWORYTA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitów, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
}

function buildMaterialDetails(materialType) {
  const whyPolyesterText = 'Chcemy tworzyć torby, które są nie tylko piękne, ale także funkcjonalne. Materiał syntetyczny, jakim jest poliester, oferuje dużą wytrzymałość, co jest kluczowe, ponieważ torba jest narażona na wiele testów codzienności. Dlatego nasz wybór to „świadomy poliester”. Nasza pierwsza kolekcja powstała z wykorzystaniem materiałów pozostałych z wcześniejszych kolekcji tkanin, co odzwierciedla nasze zaangażowanie w świadome podejście do surowców.';

  const materialIntro =
    materialType === 'morowa'
      ? 'Torba stworzona z tkaniny Moiré, unikalnego materiału o charakterystycznym, mieniącym się wzorze, który przypomina słoje drewna lub falującą wodę.'
      : 'Torba stworzona z tafty poliestrowej, która opalizuje na dwa kolory, a jej barwa zależy od kąta padania światła.';

  return `
    <p style="margin: 0 0 8px 0;"><strong>Skład:</strong> poliester* + bawełna</p>
    <p style="margin: 0 0 8px 0;">${materialIntro}</p>
    <p class="material-polyester-heading"><strong>*Dlaczego poliester?</strong></p>
    <p class="material-polyester-copy">${whyPolyesterText}</p>
  `;
}

// Dane produktów
const products = [
  {
    id: 'faworyta-jagoda',
    slug: 'faworyta-jagoda',
    model: 'Faworyta',
    color: 'Jagoda',
    materialType: 'morowa',
    price: 630,
    mainImage: '/images/faworyta/faworyta-jagoda-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-jagoda-1.webp',
      '/images/faworyta/faworyta-jagoda-2.webp',
      '/images/faworyta/faworyta-jagoda-3.webp',
      '/images/faworyta/faworyta-jagoda-main.webp',
    ],
    description: buildModelDescription('Faworyta'),
    details: buildProductDetails('morowa'),
    material: buildMaterialDetails('morowa'),
    delivery: buildDeliveryDetails('Faworyta'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworyta-zlota-reneta',
    slug: 'faworyta-zlota-reneta',
    model: 'Faworyta',
    color: 'Złota Reneta',
    materialType: 'taftowa',
    price: 570,
    mainImage: '/images/faworyta/faworyta-zlota-reneta-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-zlota-reneta-1.webp',
      '/images/faworyta/faworyta-zlota-reneta-2.webp',
      '/images/faworyta/faworyta-zlota-reneta-3.webp',
      '/images/faworyta/faworyta-zlota-reneta-main.webp',
    ],
    description: buildModelDescription('Faworyta'),
    details: buildProductDetails('taftowa'),
    material: buildMaterialDetails('taftowa'),
    delivery: buildDeliveryDetails('Faworyta'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworyta-malwa',
    slug: 'faworyta-malwa',
    model: 'Faworyta',
    color: 'Malwa',
    materialType: 'taftowa',
    price: 570,
    mainImage: '/images/faworyta/faworyta-malwa-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-malwa-1.webp',
      '/images/faworyta/faworyta-malwa-2.webp',
      '/images/faworyta/faworyta-malwa-3.webp',
      '/images/faworyta/faworyta-malwa-main.webp',
    ],
    description: buildModelDescription('Faworyta'),
    details: buildProductDetails('taftowa'),
    material: buildMaterialDetails('taftowa'),
    delivery: buildDeliveryDetails('Faworyta'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworyta-pieprz',
    slug: 'faworyta-pieprz',
    model: 'Faworyta',
    color: 'Pieprz',
    materialType: 'morowa',
    price: 630,
    mainImage: '/images/faworyta/faworyta-pieprz-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-pieprz-1.webp',
      '/images/faworyta/faworyta-pieprz-2.webp',
      '/images/faworyta/faworyta-pieprz-3.webp',
      '/images/faworyta/faworyta-pieprz-main.webp',
    ],
    description: buildModelDescription('Faworyta'),
    details: buildProductDetails('morowa'),
    material: buildMaterialDetails('morowa'),
    delivery: buildDeliveryDetails('Faworyta'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworyta-mak',
    slug: 'faworyta-mak',
    model: 'Faworyta',
    color: 'Mak',
    materialType: 'morowa',
    price: 630,
    mainImage: '/images/faworyta/faworyta-mak-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-mak-1.webp',
      '/images/faworyta/faworyta-mak-2.webp',
      '/images/faworyta/faworyta-mak-3.webp',
      '/images/faworyta/faworyta-mak-main.webp',
      '/images/faworyta/wymiary_mora_1.webp',
      '/images/faworyta/wymiary_mora_2.webp',
    ],
    description: buildModelDescription('Faworyta'),
    details: buildProductDetails('morowa'),
    material: buildMaterialDetails('morowa'),
    delivery: buildDeliveryDetails('Faworyta'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.'
  },
  {
    id: 'faworyta-sliwka',
    slug: 'faworyta-sliwka',
    model: 'Faworyta',
    color: 'Śliwka',
    materialType: 'taftowa',
    price: 570,
    mainImage: '/images/faworyta/faworyta-sliwka-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-sliwka-1.webp',
      '/images/faworyta/faworyta-sliwka-2.webp',
      '/images/faworyta/faworyta-sliwka-3.webp',
      '/images/faworyta/faworyta-sliwka-main.webp',
    ],
    description: buildModelDescription('Faworyta'),
    details: buildProductDetails('taftowa'),
    material: buildMaterialDetails('taftowa'),
    delivery: buildDeliveryDetails('Faworyta'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworytka-malwa',
    slug: 'faworytka-malwa',
    model: 'Faworytka',
    color: 'Malwa',
    materialType: 'taftowa',
    price: 450,
    mainImage: '/images/faworytka/faworytka-malwa-main.webp',
    galleryImages: [
      '/images/faworytka/faworytka-malwa-1.webp',
      '/images/faworytka/faworytka-malwa-2.webp',
      '/images/faworytka/faworytka-malwa-main.webp',
    ],
    description: buildModelDescription('Faworytka'),
    details: buildProductDetails('taftowa'),
    material: buildMaterialDetails('taftowa'),
    delivery: buildDeliveryDetails('Faworytka'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworytka-sliwka',
    slug: 'faworytka-sliwka',
    model: 'Faworytka',
    color: 'Śliwka',
    materialType: 'taftowa',
    price: 450,
    mainImage: '/images/faworytka/faworytka-sliwka-main.webp',
    galleryImages: [
      '/images/faworytka/faworytka-sliwka-main.webp',
      '/images/faworytka/faworytka-sliwka-1.webp',
    ],
    description: buildModelDescription('Faworytka'),
    details: buildProductDetails('taftowa'),
    material: buildMaterialDetails('taftowa'),
    delivery: buildDeliveryDetails('Faworytka'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
];

// Konfiguracja wysylki formularza zamowienia.
// Ustaw endpoint Cloudflare Worker (patrz backend/order-worker.js).
// Przyklad: 'https://cemborka-order.nazwauzytkownika.workers.dev'
// Po migracji na Go: podmien na URL backendu – nic innego nie trzeba zmieniac.
const ORDER_FORM_CONFIG = {
  endpoint: 'https://soft-night-a202.cemborka.workers.dev'
};

// Funkcja do pobierania produktu po slug
function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}

// Funkcja do grupowania produktów po modelu
function getProductsByModel() {
  return products.reduce((acc, product) => {
    if (!acc[product.model]) {
      acc[product.model] = [];
    }
    acc[product.model].push(product);
    return acc;
  }, {});
}
