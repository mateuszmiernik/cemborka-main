# CEMBORKA - Wersja HTML/CSS/JS

Czysty HTML, CSS i JavaScript - gotowy do przerobienia na Golanga.

## Struktura plików

```
cemborka-html/
├── index.html                  # Strona główna
├── modele/index.html           # Lista modeli
├── produkt/index.html          # Szczegóły produktu
├── o-marce/index.html          # O marce
├── kontakt/index.html          # Kontakt
├── zamowienie/index.html       # Formularz zamówienia
├── polityka-prywatnosci/index.html   # Polityka prywatności
├── regulamin/index.html              # Regulamin
├── css/
│   ├── style.css                # Bazowe style mobile-first
│   └── desktop.css              # Nadpisania i layout desktopowy
├── favicon/                     # Favicony i manifest PWA
├── js/
│   ├── data.js                  # Dane produktów i konfiguracja endpointu
│   └── script.js                # Renderowanie widoków i interakcje
├── fonts/                       # Czcionki Degular
├── images/                      # Obrazki produktów i assety UI
├── robots.txt                   # Instrukcje dla crawlerów
└── sitemap.xml                  # Mapa strony do indeksacji
```

## Uruchomienie

1. Skopiuj pliki czcionek (Degular-Light, Degular-Regular) do folderu `fonts/`
2. Skopiuj obrazki produktów do folderu `images/`
3. Otwórz `index.html` w przeglądarce

## Nawigacja

- `/` → Strona główna z przyciskiem "ZOBACZ DOSTĘPNE MODELE"
- `/modele/` → Lista wszystkich modeli i produktów w siatce 2x2
- `/produkt/?slug=faworyta-jagoda` → Szczegóły konkretnego produktu
- `/o-marce/`, `/kontakt/`, `/zamowienie/`, `/polityka-prywatnosci/`, `/regulamin/` → pozostałe podstrony

## Style

Projekt jest utrzymany w układzie mobile-first:

- `css/style.css` zawiera bazowe style dla mobile oraz wspólne komponenty.
- `css/desktop.css` zawiera desktopowe nadpisania i układy aktywowane przez `media="(min-width: 1024px)"`.

Ta separacja jest celowa. Jeśli wszystko działa poprawnie, nie warto jej teraz porządkować agresywnie, bo łatwo naruszyć zależności między widokiem mobilnym i desktopowym.

## Dane produktów

Wszystkie dane są w pliku `js/data.js` w tablicy `products`. Każdy produkt zawiera:

```javascript
{
  id: 'unique-id',
  slug: 'unique-slug',           // używane w URL
  model: 'Faworyta',              // nazwa modelu
  color: 'Jagoda',               // kolor
  price: 530,                     // cena
  mainImage: '/images/...',      // główne zdjęcie
  galleryImages: [...],          // tablica galerii
  description: '...',            // opis
  details: '...',           // zakładka Konstrukcja
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

## Wysylka formularza zamowienia na maila (Cloudflare Worker + Resend)

Formularz wysyla dane zamowienia przez Cloudflare Worker (darmowy) do Resend, ktory wysyla maila.
Po migracji na Go wystarczy zmienic jeden URL – frontend nie wymaga zadnych zmian.

### Konfiguracja (jednorazowo, ~5 minut)

1. Zaloz konto na https://workers.cloudflare.com (darmowe, bez karty).
2. Stworz nowy Worker, wklej caly plik `backend/order-worker.js` i kliknij "Deploy".
3. W zakladce Worker → Settings → Variables dodaj dwie zmienne:
   - `RESEND_API_KEY`  →  klucz API z resend.com
   - `MAIL_TO`         →  Twoj adres email (tu beda przychodzic zamowienia)
4. Skopiuj URL Workera i wklej do `js/data.js`:

```javascript
const ORDER_FORM_CONFIG = {
  endpoint: 'https://cemborka-order.nazwauzytkownika.workers.dev'
};
```

5. W Resend zweryfikuj domene nadawcy lub na poczatek uzyj `onboarding@resend.dev`.

### Dane przesylane w zamowieniu
- dane klienta: imie i nazwisko, email, telefon, adres/paczkomat
- sposob dostawy
- lista torebek (model + ilosc)

### Limity (darmowe plany)
- Cloudflare Workers: 100 000 zadan dziennie
- Resend: 3 000 maili miesiecznie

### Migracja na Go
Zmien tylko `ORDER_FORM_CONFIG.endpoint` w `js/data.js` na URL backendu Go.
Struktura JSON payloadu jest opisana w `backend/order_handler.go`.

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
