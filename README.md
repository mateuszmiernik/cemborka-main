# CEMBORKA - Wersja HTML/CSS/JS

Czysty HTML, CSS i JavaScript - gotowy do przerobienia na Golanga.

## Struktura plików

```
cemborka-html/
├── index.html          # Strona główna
├── models.html         # Lista modeli
├── product.html        # Szczegóły produktu
├── css/
│   └── style.css       # Wszystkie style CSS
├── js/
│   ├── data.js         # Dane produktów (baza danych)
│   └── script.js       # Logika JavaScript
├── fonts/              # Czcionki Degular
└── images/             # Obrazki produktów
```

## Uruchomienie

1. Skopiuj pliki czcionek (Degular-Light, Degular-Regular) do folderu `fonts/`
2. Skopiuj obrazki produktów do folderu `images/`
3. Otwórz `index.html` w przeglądarce

## Nawigacja

- `index.html` → Strona główna z przyciskiem "ZOBACZ DOSTĘPNE MODELE"
- `models.html` → Lista wszystkich modeli i produktów w siatce 2x2
- `product.html?slug=faworyta-jagoda` → Szczegóły konkretnego produktu

## Dane produktów

Wszystkie dane są w pliku `js/data.js` w tablicy `products`. Każdy produkt zawiera:

```javascript
{
  id: 'unique-id',
  slug: 'unique-slug',           // używane w URL
  model: 'Faworyta',              // nazwa modelu
  color: 'Jagoda',               // kolor
  price: 530,                     // cena
  mainImage: 'images/...',       // główne zdjęcie
  galleryImages: [...],          // tablica galerii
  description: '...',            // opis
  construction: '...',           // zakładka Konstrukcja
  material: '...',              // zakładka Materiał
  delivery: '...',              // zakładka Dostawa
  care: '...'                   // zakładka Pielęgnacja
}
```

## Cechy

- ✅ Responsive design (mobile-first)
- ✅ Wszystkie style w rem (skalowalne)
- ✅ Czcionka Degular (Light 300, Regular 400)
- ✅ Dynamicznie generowana lista produktów
- ✅ Przełączane zakładki na stronie produktu
- ✅ Header ze strzałką wstecz
- ✅ Brak frameworków - czysty HTML/CSS/JS

## Przystosowanie do Golanga

Aby przerobić na Golanga:

1. **Zastąp statyczne HTML szablonami** (np. Go `html/template`)
2. **Przenieś dane z `data.js`** na backend (baza danych)
3. **Wygeneruj dynamiczne URL-e** na backendzie
4. **Skopiuj CSS i strukturę HTML** - mogą pozostać bez zmian

Struktura JavaScript jest prosta - łatwo się konwertuje.

## Kolory

- Tło: #321B0B
- Tekst: #FBDFCB
- Akcent (cena): #FE6E76

## Rozmiary czcionek

- Tag: 10px (0.625rem)
- Tytuł modelu: 28px (1.75rem)
- Nazwa modelu: 44px (2.75rem)
- Nazwa koloru: 34px (2.125rem)
- Opis: 15px (0.9375rem)
- Cena: 44px (2.75rem)
