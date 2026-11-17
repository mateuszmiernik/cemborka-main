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
  const productName = model === 'Faworytka'
    ? 'FAWORYTKĘ'
    : model === 'Pralinka'
      ? 'PRALINKĘ'
      : 'FAWORYTĘ';
  const items = [
    'Automat DPD - 13 zł / Kurier InPost - 22 zł / Kurier DPD - 24 zł / Paczkomat InPost - 19 zł',
    `Wysyłka zagraniczna: Napisz do nas na maila - chętnie wyślemy ${productName} w dowolne miejsce na świecie.`
  ];

  return `
    <ul>
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

// OLD
  // function buildModelDescription(model, materialType) {
  //   if (model === 'Faworytka') {
  //     return 'FAWORYTKA to mniejsza siostra FAWORYTY. To ten sam silny charakter, ale w bardziej kompaktowym rozmiarze. Posiada miękką, plastyczną konstrukcję, dzięki której materiał swobodnie pracuje i opalizuje, zmieniając kolor zależnie od kąta padania światła.<span class="model-desc-break"></span>FAWORYTKA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTKA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitach, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
  //   }

  //   if (materialType === 'morowa') {
  //     return 'Duża, wyrazista torba typu statement, która pomieści wszystkie Twoje historie. Posiada miękkie a zarazem usztywniające wypełnienie, które podkreśla architektoniczną, trapezową formę dołu torby.<span class="model-desc-break"></span>FAWORYTA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitach, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
  //   }

  //   return 'Duża, wyrazista torba typu statement, która pomieści wszystkie Twoje historie. Posiada miękką, plastyczną konstrukcję, dzięki której materiał swobodnie pracuje i opalizuje, zmieniając kolor zależnie od kąta padania światła.<span class="model-desc-break"></span>FAWORYTA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitach, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
  // }

function buildModelDescription(model, materialType) {
  // 1. Warunek dla modeli 'Faworytka' wykonanych z materiału 'morowa' (Pieprz i Laskowa)
  if (model === 'Faworytka' && materialType === 'morowa') {
    return 'FAWORYTKA to mniejsza siostra FAWORYTY. To ten sam silny charakter, ale w bardziej kompaktowym rozmiarze. Posiada miękkie a zarazem usztywniające wypełnienie, które podkreśla architektoniczną, trapezową formę dołu torby.<span class="model-desc-break"></span>FAWORYTKA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTKA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitach, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
  }

  // 2. Warunek dla pozostałych modeli 'Faworytka' (np. taftowa Malwa, Śliwka, Kobaltowa)
  if (model === 'Faworytka') {
    return 'FAWORYTKA to mniejsza siostra FAWORYTY. To ten sam silny charakter, ale w bardziej kompaktowym rozmiarze. Posiada miękką, plastyczną konstrukcję, dzięki której materiał swobodnie pracuje i opalizuje, zmieniając kolor zależnie od kąta padania światła.<span class="model-desc-break"></span>FAWORYTKA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTKA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitach, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
  }

  // 3. Warunek dla modeli 'Faworyta' wykonanych z materiału 'morowa' (np. Mak)
  if (materialType === 'morowa') {
    return 'Duża, wyrazista torba typu statement, która pomieści wszystkie Twoje historie. Posiada miękkie a zarazem usztywniające wypełnienie, które podkreśla architektoniczną, trapezową formę dołu torby.<span class="model-desc-break"></span>FAWORYTA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitach, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
  }

  // 4. Domyślny opis dla dużych modeli 'Faworyta' z materiału 'taftowa' (np. Śliwka)
  return 'Duża, wyrazista torba typu statement, która pomieści wszystkie Twoje historie. Posiada miękką, plastyczną konstrukcję, dzięki której materiał swobodnie pracuje i opalizuje, zmieniając kolor zależnie od kąta padania światła.<span class="model-desc-break"></span>FAWORYTA to model, w którym świat geometrii spotyka się z organiczną miękkością. O nieoczywistym charakterze torby decyduje autorska rączka. Ten dekoracyjny detal łączy ozdobną formę z funkcjonalnością, skrywając wewnątrz mechanizm regulacji jej długości. FAWORYTA naturalnie dopasuje się do odważnych stylizacji, ale również świetnie sprawdzi się w minimalistycznych outfitach, stając się najmocniejszym akcentem, który zdefiniuje cały Twój look. Zaprojektowana i uszyta w Polsce.';
}
// OLD
  // function buildMaterialDetails(materialType) {
  //   const whyPolyesterText = 'Chcemy tworzyć torby, które są nie tylko piękne, ale także funkcjonalne. Materiał syntetyczny, jakim jest poliester, oferuje dużą wytrzymałość, co jest kluczowe, ponieważ torba jest narażona na wiele testów codzienności. Dlatego nasz wybór to „świadomy poliester”. Nasza pierwsza kolekcja powstała z wykorzystaniem materiałów pozostałych z wcześniejszych kolekcji tkanin, co odzwierciedla nasze zaangażowanie w świadome podejście do surowców.';

  //   const materialIntro =
  //     materialType === 'morowa'
  //       ? 'Torba stworzona z tkaniny Moiré, unikalnego materiału o charakterystycznym, mieniącym się wzorze, który przypomina słoje drewna lub falującą wodę.'
  //       : 'Torba stworzona z tafty poliestrowej, która opalizuje na dwa kolory, a jej barwa zależy od kąta padania światła.';

  //   return `
  //     <p style="margin: 0 0 8px 0;"><strong>Skład:</strong> poliester* + bawełna</p>
  //     <p style="margin: 0 0 8px 0;">${materialIntro}</p>
  //     <p class="material-polyester-heading"><strong>*Dlaczego poliester?</strong></p>
  //     <p class="material-polyester-copy">${whyPolyesterText}</p>
  //   `;
  // }

  function buildMaterialDetails(materialType) {
  const whyPolyesterText = 'Szyjemy z końcówek kolekcji tkanin oraz tzw. deadstocków. To właśnie dlatego nasze torby powstają w krótkich seriach. Świadomie dajemy drugie życie materiałom, które już wyprodukowano. Dzięki temu działamy w zrównoważony sposób. Wykorzystujemy tkaniny pochodzące z UE.';

  // Dynamiczny skład w zależności od typu materiału
  const composition = materialType === 'morowa-mix' 
    ? 'wiskoza + poliester + bawełna' 
    : 'poliester + bawełna';

  // 'morowa' oraz 'morowa-mix'
  const materialIntro =
    materialType === 'morowa' || materialType === 'morowa-mix'
      ? 'Torba stworzona z tkaniny Moiré, unikalnego materiału o charakterystycznym, mieniącym się wzorze, który przypomina słoje drewna lub falującą wodę.'
      : 'Torba stworzona z tafty poliestrowej, która opalizuje na kilka odcieni - jej barwa zależy od kąta padania światła.';

  return `
    <p style="margin: 0 0 8px 0;"><strong>Skład:</strong> ${composition}</p>
    <p style="margin: 0 0 8px 0;">${materialIntro}</p>
    <p class="material-polyester-copy">${whyPolyesterText}</p>
  `;
}


const pralinkaContent = {
  description: `PRALINKA to najmniejsza i najsłodsza spośród naszych modeli – stworzona z aksamitnie miękkiej, przyjemnej w dotyku tkaniny, co sprawia, że jeszcze trudniej jej się oprzeć.<span class="model-desc-break"></span>Niech jednak nie zwiedzie Cię jej deserowa delikatność – ten szlachetny welur jest wyjątkowo odporny na zabrudzenia, płyny i ścieranie, a ewentualne plamy usuwają się z niego z łatwością, dzięki czemu bez szwanku przetrwa każdą codzienną przygodę. Całość dopełnia dekoracyjna rączka, która łączy biżuteryjną formę z funkcjonalnością, dyskretnie skrywając wewnątrz mechanizm regulacji długości paska. Zaprojektowana i uszyta w Polsce.`,
  details: `
    <ul>
      <li><strong>Regulacja:</strong> mechanizm rączki opiera się na ozdobnej kokardzie. Aby zmienić długość, wystarczy ją rozwiązać, ściągnąć lub rozciągnąć rączkę do dowolnej długości i ponownie zawiązać.</li>
      <li><strong>Komfort:</strong> rączka torby posiada miękkie wypełnienie, co nadaje dodatkowego komfortu przy noszeniu.</li>
      <li><strong>Wnętrze:</strong> torebka posiada kieszonkę otwartą na drobiazgi.</li>
      <li><strong>Produkcja:</strong> zaprojektowana i uszyta w Polsce</li>
    </ul>
  `,
  material: `
    <p style="margin: 0 0 8px 0;"><strong>Skład:</strong> poliester + bawełna</p>
    <p style="margin: 0 0 8px 0;">W kolekcji PRALINKA celowo postawiliśmy na tę konkretną tkaninę. Zależało nam na połączeniu szlachetnej, aksamitnej miękkości z maksymalną trwałością. Ten welur posiada certyfikat OEKO-TEX Standard 100 oraz powłokę hydrofobową, jest wyjątkowo łatwy w czyszczeniu i odporny na codzienne ścieranie. Dzięki temu torebka nie tylko zachwyca wyglądem, ale zachowuje nieskazitelną formę przez długi czas.</p>
  `,
  care: `Dzięki powłoce hydrofobowej ewentualne zabrudzenia usuniesz z łatwością. Rozlane płyny wystarczy natychmiast odsączyć ręcznikiem papierowym, unikając mocnego pocierania. Miejscowe plamy przetrzyj miękką ściereczką zwilżoną letnią wodą z dodatkiem delikatnego mydła – pamiętaj, aby zawsze czyścić tkaninę delikatnie i zgodnie z kierunkiem układania się włosa. Pozostaw torebkę do całkowitego wyschnięcia w temperaturze pokojowej, a na koniec przeczesz czyszczone miejsce miękką szczoteczką (np. do ubrań), aby rozdzielić włoski i przywrócić im pierwotną puszystość. Nie prać w pralce, nie stosować wybielaczy ani nie suszyć na źródłach ciepła (np. na kaloryferze czy suszarką).`,
};

// Dane produktów
const products = [
  {
    id: 'faworyta-jagoda',
    slug: 'faworyta-jagoda',
    model: 'Faworyta',
    color: 'Jagoda',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: true,
    materialType: 'morowa',
    price: 689,
    mainImage: '/images/faworyta/faworyta-jagoda-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-jagoda-1.webp',
      '/images/faworyta/faworyta-jagoda-2.webp',
      '/images/faworyta/faworyta-jagoda-3.webp',
      '/images/faworyta/faworyta-jagoda-main.webp',
      '/images/faworyta/wymiary_mora_1.webp',
      '/images/faworyta/wymiary_mora_2.webp',
    ],
    description: buildModelDescription('Faworyta', 'morowa'),
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
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'taftowa',
    price: 589,
    mainImage: '/images/faworyta/faworyta-zlota-reneta-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-zlota-reneta-1.webp',
      '/images/faworyta/faworyta-zlota-reneta-2.webp',
      '/images/faworyta/faworyta-zlota-reneta-3.webp',
      '/images/faworyta/faworyta-zlota-reneta-main.webp',
      '/images/faworyta/wymiary_tafta_1.webp',
      '/images/faworyta/wymiary_tafta_2.webp',
    ],
    description: buildModelDescription('Faworyta', 'taftowa'),
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
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'taftowa',
    price: 589,
    mainImage: '/images/faworyta/faworyta-malwa-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-malwa-1.webp',
      '/images/faworyta/faworyta-malwa-2.webp',
      '/images/faworyta/faworyta-malwa-3.webp',
      '/images/faworyta/faworyta-malwa-main.webp',
      '/images/faworyta/wymiary_tafta_1.webp',
      '/images/faworyta/wymiary_tafta_2.webp',
    ],
    description: buildModelDescription('Faworyta', 'taftowa'),
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
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'morowa',
    price: 689,
    mainImage: '/images/faworyta/faworyta-pieprz-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-pieprz-1.webp',
      '/images/faworyta/faworyta-pieprz-2.webp',
      '/images/faworyta/faworyta-pieprz-3.webp',
      '/images/faworyta/faworyta-pieprz-main.webp',
      '/images/faworyta/wymiary_mora_1.webp',
      '/images/faworyta/wymiary_mora_2.webp',
    ],
    description: buildModelDescription('Faworyta', 'morowa'),
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
    isAvailable: false,
    isPermanentlyUnavailable: true, // <-- NOWA FLAGA: zmienia tekst na "NIEDOSTĘPNA"
    isLastItems: true,
    materialType: 'morowa',
    price: 689,
    mainImage: '/images/faworyta/faworyta-mak-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-mak-1.webp',
      '/images/faworyta/faworyta-mak-2.webp',
      '/images/faworyta/faworyta-mak-3.webp',
      '/images/faworyta/faworyta-mak-main.webp',
      '/images/faworyta/wymiary_mora_1.webp',
      '/images/faworyta/wymiary_mora_2.webp',
    ],
    description: buildModelDescription('Faworyta', 'morowa'),
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
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'taftowa',
    price: 589,
    mainImage: '/images/faworyta/faworyta-sliwka-main.webp',
    galleryImages: [
      '/images/faworyta/faworyta-sliwka-1.webp',
      '/images/faworyta/faworyta-sliwka-2.webp',
      '/images/faworyta/faworyta-sliwka-3.webp',
      '/images/faworyta/faworyta-sliwka-main.webp',
      '/images/faworyta/wymiary_tafta_1.webp',
      '/images/faworyta/wymiary_tafta_2.webp',
    ],
    description: buildModelDescription('Faworyta', 'taftowa'),
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
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'taftowa',
    price: 499,
    mainImage: '/images/faworytka/faworytka-malwa-main.webp',
    galleryImages: [
      '/images/faworytka/faworytka-malwa-1.webp',
      '/images/faworytka/faworytka-malwa-main.webp',
      '/images/faworytka/faworytka-malwa-2.webp',
      '/images/faworytka/wymiarowanie_faworytka_1.webp',
      '/images/faworytka/wymiarowanie_faworytka_2.webp',
    ],
    description: buildModelDescription('Faworytka', 'taftowa'),
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
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'taftowa',
    price: 499,
    mainImage: '/images/faworytka/faworytka-sliwka-main.webp',
    galleryImages: [
      '/images/faworytka/faworytka-sliwka-main.webp',
      '/images/faworytka/faworytka-sliwka-1.webp',
      '/images/faworytka/wymiarowanie_faworytka_1.webp',
      '/images/faworytka/wymiarowanie_faworytka_2.webp',
    ],
    description: buildModelDescription('Faworytka', 'taftowa'),
    details: buildProductDetails('taftowa'),
    material: buildMaterialDetails('taftowa'),
    delivery: buildDeliveryDetails('Faworytka'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
   {
    id: 'faworytka-pieprz',
    slug: 'faworytka-pieprz',
    model: 'Faworytka',
    color: 'Pieprz',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'morowa',
    price: 529,
    mainImage: '/images/faworytka/faworytka-pieprz-main.webp',
    galleryImages: [
      '/images/faworytka/faworytka-pieprz-main.webp',
      '/images/faworytka/faworytka-pieprz-1.webp',
      '/images/faworytka/faworytka-pieprz-2.webp',
      '/images/faworytka/faworytka-pieprz-3.webp',
      '/images/faworytka/faworytka-pieprz-4.webp',
      '/images/faworytka/wymiarowanie_faworytka_3.webp',
      '/images/faworytka/wymiarowanie_faworytka_4.webp',
    ],
    description: buildModelDescription('Faworytka', 'morowa'),
    details: buildProductDetails('morowa'),
    material: buildMaterialDetails('morowa-mix'),
    delivery: buildDeliveryDetails('Faworytka'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworytka-szafirka',
    slug: 'faworytka-szafirka',
    model: 'Faworytka',
    color: 'Szafirka',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'taftowa',
    price: 499,
    mainImage: '/images/faworytka/faworytka-kobaltowa-main.webp',
    galleryImages: [
      '/images/faworytka/faworytka-kobaltowa-main.webp',
      '/images/faworytka/faworytka-kobaltowa-1.webp',
      '/images/faworytka/faworytka-kobaltowa-2.webp',
      '/images/faworytka/faworytka-kobaltowa-3.webp',
      '/images/faworytka/faworytka-kobaltowa-4.webp',
      '/images/faworytka/faworytka-kobaltowa-5.webp',
      '/images/faworytka/wymiarowanie_faworytka_1.webp',
      '/images/faworytka/wymiarowanie_faworytka_2.webp',
    ],
    description: buildModelDescription('Faworytka', 'taftowa'),
    details: buildProductDetails('taftowa'),
    material: buildMaterialDetails('taftowa'),
    delivery: buildDeliveryDetails('Faworytka'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  {
    id: 'faworytka-laskowa',
    slug: 'faworytka-laskowa',
    model: 'Faworytka',
    color: 'Laskowa',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: 'morowa',
    price: 529,
    mainImage: '/images/faworytka/faworytka-laskowa-main.webp',
    galleryImages: [
      '/images/faworytka/faworytka-laskowa-main.webp',
      '/images/faworytka/faworytka-laskowa-1.webp',
      '/images/faworytka/faworytka-laskowa-2.webp',
      '/images/faworytka/faworytka-laskowa-3.webp',
      '/images/faworytka/faworytka-laskowa-4.webp',
      '/images/faworytka/wymiarowanie_faworytka_3.webp',
      '/images/faworytka/wymiarowanie_faworytka_4.webp',
    ],
    description: buildModelDescription('Faworytka', 'morowa'),
    details: buildProductDetails('morowa'),
    material: buildMaterialDetails('morowa-mix'),
    delivery: buildDeliveryDetails('Faworytka'),
    care: 'W przypadku zabrudzenia czyścić na sucho (rolką lub szczotką). Miejscowe plamy usuń lekko wilgotną ściereczką i łagodnym mydłem. Nie pierz w pralce. W razie zamoczenia susz równomiernie.',
  },
  // Dla Pralinek `price` to cena promocyjna, a `regularPrice` to cena regularna.
  {
    id: 'pralinka-zurawina',
    slug: 'pralinka-zurawina',
    model: 'Pralinka',
    color: 'Żurawina',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: '',
    price: 455,
    regularPrice: 479,
    mainImage: '/images/pralinki/pralinka-zurawina-main.webp',
    galleryImages: [
      '/images/pralinki/pralinka-zurawina-1.webp',
      '/images/pralinki/pralinka-zurawina-main.webp',
      '/images/pralinki/wymiarowanie_pralinka_1.webp',
      '/images/pralinki/wymiarowanie_pralinka_2.webp',
    ],
    description: pralinkaContent.description,
    details: pralinkaContent.details,
    material: pralinkaContent.material,
    delivery: buildDeliveryDetails('Pralinka'),
    care: pralinkaContent.care,
  },
  {
    id: 'pralinka-wisnia-w-czekoladzie',
    slug: 'pralinka-wisnia-w-czekoladzie',
    model: 'Pralinka',
    color: 'Wiśnia w czekoladzie',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: '',
    price: 455,
    regularPrice: 479,
    mainImage: '/images/pralinki/pralinka-wisnia-main.webp',
    galleryImages: [
      '/images/pralinki/pralinka-wisnia-main.webp',
      '/images/pralinki/wymiarowanie_pralinka_1.webp',
      '/images/pralinki/wymiarowanie_pralinka_2.webp',
    ],
    description: pralinkaContent.description,
    details: pralinkaContent.details,
    material: pralinkaContent.material,
    delivery: buildDeliveryDetails('Pralinka'),
    care: pralinkaContent.care,
  },
  {
    id: 'pralinka-makowka',
    slug: 'pralinka-makowka',
    model: 'Pralinka',
    color: 'Makówka',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: '',
    price: 455,
    regularPrice: 479,
    mainImage: '/images/pralinki/pralinka-makowka-main.webp',
    galleryImages: [
      '/images/pralinki/pralinka-makowka-main.webp',
      '/images/pralinki/wymiarowanie_pralinka_1.webp',
      '/images/pralinki/wymiarowanie_pralinka_2.webp',
    ],
    description: pralinkaContent.description,
    details: pralinkaContent.details,
    material: pralinkaContent.material,
    delivery: buildDeliveryDetails('Pralinka'),
    care: pralinkaContent.care,
  },
  {
    id: 'pralinka-mieta-w-czekoladzie',
    slug: 'pralinka-mieta-w-czekoladzie',
    model: 'Pralinka',
    color: 'Mięta w czekoladzie',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: '',
    price: 455,
    regularPrice: 479,
    mainImage: '/images/pralinki/pralinka-mieta-main.webp',
    galleryImages: [
      '/images/pralinki/pralinka-mieta-main.webp',
      '/images/pralinki/wymiarowanie_pralinka_1.webp',
      '/images/pralinki/wymiarowanie_pralinka_2.webp',
    ],
    description: pralinkaContent.description,
    details: pralinkaContent.details,
    material: pralinkaContent.material,
    delivery: buildDeliveryDetails('Pralinka'),
    care: pralinkaContent.care,
  },
  {
    id: 'pralinka-landrynka',
    slug: 'pralinka-landrynka',
    model: 'Pralinka',
    color: 'Landrynka',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: '',
    price: 455,
    regularPrice: 479,
    mainImage: '/images/pralinki/pralinka-landrynka-main.webp',
    galleryImages: [
      '/images/pralinki/pralinka-landrynka-main.webp',
      '/images/pralinki/wymiarowanie_pralinka_1.webp',
      '/images/pralinki/wymiarowanie_pralinka_2.webp',
    ],
    description: pralinkaContent.description,
    details: pralinkaContent.details,
    material: pralinkaContent.material,
    delivery: buildDeliveryDetails('Pralinka'),
    care: pralinkaContent.care,
  },
  {
    id: 'pralinka-sliwka',
    slug: 'pralinka-sliwka',
    model: 'Pralinka',
    color: 'Śliwka',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: '',
    price: 410,
    regularPrice: 439,
    mainImage: '/images/pralinki/pralinka-sliwka-main.webp',
    galleryImages: [
      '/images/pralinki/pralinka-sliwka-main.webp',
      '/images/pralinki/wymiarowanie_pralinka_1.webp',
      '/images/pralinki/wymiarowanie_pralinka_2.webp',
    ],
    description: pralinkaContent.description,
    details: pralinkaContent.details,
    material: pralinkaContent.material,
    delivery: buildDeliveryDetails('Pralinka'),
    care: pralinkaContent.care,
  },
  {
    id: 'pralinka-malwa',
    slug: 'pralinka-malwa',
    model: 'Pralinka',
    color: 'Malwa',
    isAvailable: true,
    isPermanentlyUnavailable: false,
    isLastItems: false,
    materialType: '',
    price: 410,
    regularPrice: 439,
    mainImage: '', // brak zdjęcia Malwy w images/pralinki — do uzupełnienia
    galleryImages: [],
    description: pralinkaContent.description,
    details: pralinkaContent.details,
    material: pralinkaContent.material,
    delivery: buildDeliveryDetails('Pralinka'),
    care: pralinkaContent.care,
  }
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
