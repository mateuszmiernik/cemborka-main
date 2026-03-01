// Dane produktów
const products = [
  {
    id: 'faworyta-jagoda',
    slug: 'faworyta-jagoda',
    model: 'Faworyta',
    color: 'Jagoda',
    price: 530,
    mainImage: 'images/faworyta-jagoda-main.jpg',
    galleryImages: [],
    description: 'CEMBORKA to torebki o unikalnym, wyrazistym i nieoczywistym designie. Projektowane i produkowane w Polsce. Idealne dopełnienie minimalistycznych stylizacji, w których podkreślają indywidualność, ale także świetnie sprawdzają się do minimalistycznych zestawów, stając się najmocniejszym akcentem, który definiuje całą stylizację.',
    construction: 'Sztywna konstrukcja zamykana na magnes, w środku kieszonka.',
    material: 'Tkanina z recyklingu, certyfikat GRS. Skład: 69% PES, 31% PO. Podszewka: 100% bawełna.',
    delivery: 'Wysyłka w ciągu 2-3 dni roboczych.',
    care: 'Czyścić wilgotną szmatką, nie prać w pralce.',
  },
  {
    id: 'faworyta-zlota-reneta',
    slug: 'faworyta-zlota-reneta',
    model: 'Faworyta',
    color: 'Złota Reneta',
    price: 490,
    mainImage: 'images/faworyta-zlota-reneta-main.jpg',
    galleryImages: [],
    description: 'Opis dla torebki Złota Reneta.',
    construction: 'Info o konstrukcji.',
    material: 'Info o materiale.',
    delivery: 'Info o dostawie.',
    care: 'Info o pielęgnacji.',
  },
  {
    id: 'faworyta-malwa',
    slug: 'faworyta-malwa',
    model: 'Faworyta',
    color: 'Malwa',
    price: 530,
    mainImage: 'images/faworyta-malwa-main.jpg',
    galleryImages: [],
    description: 'Opis dla torebki Malwa.',
    construction: 'Info o konstrukcji.',
    material: 'Info o materiale.',
    delivery: 'Info o dostawie.',
    care: 'Info o pielęgnacji.',
  },
  {
    id: 'faworyta-pieprz',
    slug: 'faworyta-pieprz',
    model: 'Faworyta',
    color: 'Pieprz',
    price: 530,
    mainImage: 'images/faworyta-pieprz-main.jpg',
    galleryImages: [],
    description: 'Opis dla torebki Pieprz.',
    construction: 'Info o konstrukcji.',
    material: 'Info o materiale.',
    delivery: 'Info o dostawie.',
    care: 'Info o pielęgnacji.',
  },
  {
    id: 'faworyta-mak',
    slug: 'faworyta-mak',
    model: 'Faworyta',
    color: 'Mak',
    price: 530,
    mainImage: 'images/faworyta-mak-main.jpg',
    galleryImages: [
      'images/faworyta-mak-1.jpg',
      'images/faworyta-mak-2.jpg',
      'images/faworyta-mak-3.jpg'
    ],
    description: 'FAWORYTA to torebka o unikalnym, wyrazistym i nieoczywistym designie. Projektowana i produkowana w Polsce. Idealne dopełnienie minimalistycznych stylizacji, w których podkreśla indywidualność, ale także świetnie sprawdza się do minimalistycznych zestawów, stając się najmocniejszym akcentem, który definiuje całą stylizację.',
    construction: 'Sztywna konstrukcja zamykana na magnes, w środku kieszonka.',
    material: 'Tkanina z recyklingu, certyfikat GRS. Skład: 69% PES, 31% PO. Podszewka: 100% bawełna.',
    delivery: 'Wysyłka w ciągu 2-3 dni roboczych.',
    care: 'Czyścić wilgotną szmatką, nie prać w pralce.',
  },
  {
    id: 'faworyta-sliwka',
    slug: 'faworyta-sliwka',
    model: 'Faworyta',
    color: 'Śliwka',
    price: 530,
    mainImage: 'images/faworyta-sliwka-main.jpg',
    galleryImages: [],
    description: 'Opis dla torebki Śliwka.',
    construction: 'Info o konstrukcji.',
    material: 'Info o materiale.',
    delivery: 'Info o dostawie.',
    care: 'Info o pielęgnacji.',
  },
  {
    id: 'faworytka-malwa',
    slug: 'faworytka-malwa',
    model: 'Faworytka',
    color: 'Malwa',
    price: 530,
    mainImage: 'images/faworytka-malwa-main.jpg',
    galleryImages: [],
    description: 'Opis dla torebki Faworytka Malwa.',
    construction: 'Info o konstrukcji.',
    material: 'Info o materiale.',
    delivery: 'Info o dostawie.',
    care: 'Info o pielęgnacji.',
  },
  {
    id: 'faworytka-sliwka',
    slug: 'faworytka-sliwka',
    model: 'Faworytka',
    color: 'Śliwka',
    price: 530,
    mainImage: 'images/faworytka-sliwka-main.jpg',
    galleryImages: [],
    description: 'Opis dla torebki Faworytka Śliwka.',
    construction: 'Info o konstrukcji.',
    material: 'Info o materiale.',
    delivery: 'Info o dostawie.',
    care: 'Info o pielęgnacji.',
  },
];

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
