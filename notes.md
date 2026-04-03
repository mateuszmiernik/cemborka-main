~~-> link do FB i TIK TOKa uzupelnic~~
-> paski scrollowane

~~-> na telefonie jak klikam w przyciski to sie robi taki obszar elementu widoczny po kliknieciu (ANDROID tylko)~~




glowna podstrona:
  ~~-> 100vh~~
  ~~-> przycisk ogarnac na jakis ladniejszy~~
  ~~-> usiasc ze zdjeciem ucietym albo samemu uciac~~
  ~~-> bedzie napis "statement bags"~~ przy poprawkach do II wersji
  ~~-> powiekszyc hamburgera~~
  -> zeby na safari przycisk byl wyzej na laptopie (potestowac jeszcze) i na chromie troche obnizyc!! (na dole jest co dodal)
    @media (min-width: 1024px) {
    html.is-safari .cta-container {
      bottom: clamp(11rem, 18svh, 13rem);
    }
  }
    function markSafariBrowser() {
  const userAgent = navigator.userAgent;
  const isSafari = /Safari/i.test(userAgent)
    && !/Chrome|Chromium|Edg|OPR|CriOS|FxiOS|Firefox/i.test(userAgent);

  if (isSafari) {
    document.documentElement.classList.add('is-safari');
  }
}



podstrona models
~~-> "ZŁOTAENETA" zawija sie na granicy desktop/mobile~~
~~-> na iphonie odstep zdjec od linii jest za maly / inny niz na innym telefonie~~


podstrona produktu:
  ~~-> opisy: zmienilem: 'Produkcja: wykonane ręcznie w Polsce' ; dopytac o ‘MATERIAŁ’~~
  
  -> Desktop
    podstrona produktu:
    ~~- tylko wtedy tez jak klikam na tab np. Szczegoły to da sie, zeby pod wcisnietym pojawial sie ow tekst?~~
    ~~- hover na przycisk KUP (do ustalenia) / w hamburger menu / na logo CEMBORKA / hamburger menu ikona / taby (szczegoly itd.) / na przycisk BACK i przy zdjeciach na karuzeli / przycisk wyslij w formularzu~~
  ~~-> tam gdzie bylo ile sztuk jest to jednak beda statusy: Dostepne, dostepne wkrotce, niedostepne (uwaga do DAMIANA)~~
    -> troche szersza prawa kolumna na najwiekszym ekranie.. zeby tekst sie lepiej zawijal
    -> ogarnac ogolnie te podstrone pod wzgledem zmian wielkosci zdjecia itd. 
    -> odleglosci gapy od zdjec itd.
    ~~~-> jak sie klika na zdjecie to przyblizenie (POKAZAC)~~


podstrona "O marce":


podstrona formularza:
  ~~-> autouzupelnienie sie robi tlo fieldow na bialo~~
  ~~-> iPhone pole Sposob dostawy jak sie klika na selecta troche powyzej to wyskakuje po staremu optionsy~~
  ~~-> co sie dzieje po kliknieciu WYSLIJ - (grafika na mailu) + walidacja na WYSLIJ~~
  ~~-> RODO: Jeśli zbierasz dane osobowe (imię, adres), dodaj checkbox z informacją, że użytkownik zgadza się na ich przetwarzanie w celu realizacji zamówienia. --> Pamiętaj, żeby pod samym formularzem zamówienia dodać małe okienko (checkbox) z tekstem: "Akceptuję Regulamin i Politykę Prywatności sklepu CEMBORKA". Bez tego Twoja strona nie będzie spełniać wymogów prawnych.~~
  ~~-> wykasowac placeholder na telefon~~
  -> w selectcie na dropdownach na SAFARI po najechaniu robi sie letter spacing wiekszy .. sprawdzic


podstrona order:
  (DEBUGGING) -> renderOrderSuccessState(document.querySelector('.order-container')) 

podstrona kontakt:
  -> iphone margines prawy jest cos zle, sprawdzic




RAZEM:
  ~~-> ustawic Mete - od nowa, czy tak jak jest na tej tymczasowej? - przy opisach Kamila ma dac nowe~~
  -> strona glowna
  -> podstrona produktu jak sie klika na zdjecie to przyblizenie (POKAZAC)
  -> podstrona 'kontakt' (DESKTOP)
  -> polityka i regulamin (mobile + desktop)

  ~~-> HAMBURGER MENU - sprwadzic jak ma dzialac przy scrollu -> zamrozic header, aby szedl przy scrollu~~
  ~~-> checkbox~~
  ~~-> sprawdzic .color-title .label (margines)~~

Do sprawdzenia na potem:
-> ilosc sztuk w formularzu (ile danej torby jeszcze mamy)

KAMILA
~~-> poprawione ikonki~~
~~-> menu hamburger~~
~~-> opisy zdjec~~
~~-> zdjecia MOODBOARDy (mniejszy rozmiar)~~
~~-> nazwy podstron jak jest strona wlaczona jako zakladka w przegladarce + opisy (na mailu masz)~~
~~-> FB oraz TIKTOK~~


INFO DO STYLOW:
  PASKI - border-bottom:
    -> border-bottom: .0469rem solid var(--text-color);

  -> letter-spacing: .03125rem; -> o tekstow (description itd.) - mobilne

  14 px font-size oraz letter-spacing oraz line-height
  line-height: 1.25;
  font-size: .875rem;
  letter-spacing: .0313rem;

  15px font-size: letter-spacing: .0335rem;

  16 px font-size oraz letter-spacing

  .order-subtitle {
    font-size: 1rem
    letter-spacing: 0.5723px;

  line-height: 1.35;



--> wykasowac debug w kodzie:
  Problem 1 – podgląd success na telefonie: Najprościej dodam obsługę parametru URL ?debugSuccess=1 – otworzysz 192.168.0.191:5500/order.html?debugSuccess=1 na telefonie i od razu zobaczysz success screen.

  192.168.0.191:5500/order.html?debugSuccess=1

  DEBUG:
    strona formularza - wyslanego
      renderOrderSuccessState(document.querySelector('.order-container'))





---------------------------------------------
1. Utworzenie podstron prawnych
Stworzyłbym dwa nowe pliki: privacy.html i terms.html.

privacy.html (Polityka Prywatności) - propozycja:

terms.html (Regulamin) - propozycja:

Ważne: Powyższe teksty to tylko podstawowe szablony. Warto skonsultować ich ostateczną treść z prawnikiem lub skorzystać z profesjonalnych generatorów dokumentów dla e-commerce, aby mieć pewność, że są w pełni zgodne z przepisami.

2. Dodanie meta tagów description
Do każdego z istniejących plików HTML (index.html, about.html itd.) w sekcji <head> dodałbym jedną linijkę kodu.

Przykład dla index.html:

Propozycje description dla pozostałych stron: (PRZESLAC KAMILI)

  index.html
  title: "CEMBORKA - Torebki"
  meta description: "CEMBORKA - autorskie torebki o unikalnym designie. Projektowane i produkowane w Polsce."

  about.html
  title: "O marce - CEMBORKA"
  meta description: "Poznaj historię i filozofię marki CEMBORKA. Tworzymy torebki o unikalnym designie, szyte w Polsce z dbałością o detale."

  contact.html
  title: "Kontakt - CEMBORKA"
  meta description: "Skontaktuj się z CEMBORKA. Jesteśmy dostępni pod adresem e-mail i na mediach społecznościowych."

  models.html
  title: "Modele - CEMBORKA"
  meta description: "Zobacz dostępne modele torebek CEMBORKA. Wybierz swój ulubiony kolor i fason."

  product.html
  title: "Produkt - CEMBORKA"
  meta description: "Szczegóły produktu CEMBORKA. Zobacz galerię, opis i specyfikację."

  order.html
  title: "Zamowienie - CEMBORKA"
  meta description: "Złóż zamówienie na swoją wymarzoną torebkę CEMBORKA. Szybki i bezpieczny proces zamawiania."

  privacy.html
  title: "Polityka Prywatności - CEMBORKA"
  meta description: "Polityka prywatności i przetwarzania danych osobowych w sklepie CEMBORKA."

  terms.html
  title: "Regulamin - CEMBORKA"
  meta description: "Regulamin sprzedaży i świadczenia usług w sklepie CEMBORKA."




DAMIAN:
  -> tam gdzie bylo ile sztuk jest to jednak beda statusy: Dostepne, dostepne wkrotce, niedostepne (uwaga do DAMIANA) -> podstrona produktu <span class="other-colors">Dostępne</span>
  -> zmienic, aby na dropdownie nie dalo sie wybrac niedostpnej

  -> dostepne / dostepne wkrotce







  SPRAWDZIC:
  podstrona glowna: zeby na safari przycisk byl wyzej na laptopie

  Rozumiem, dzięki za info. Zrobię to teraz pewnie i twardo: dodam klasę is-safari z JS na html tylko w Safari i pod to dam osobny bottom na desktopie, zamiast zawodnych hacków @supports.

Znalazłem przyczynę: w pliku była teraz reguła Safari z bottom: 60%, więc przycisk musiał wariować. Podmieniam to na stabilne rozwiązanie: klasa is-safari ustawiana w JS i dedykowany bottom tylko dla Safari desktop.

Zmiana wdrożona: usunąłem wadliwy 60% i przeniosłem detekcję Safari do JS, co jest dużo pewniejsze. Sprawdzam szybko błędy i gotowe.

Naprawione porządnie.

Co było nie tak:

Miałeś aktywną regułę tylko dla Safari z bottom: 60% w style.css, przez co wszystko było kompletnie rozjechane.
Co zrobiłem:

Usunąłem ten hack @supports ... bottom: 60%.
Dodałem pewną detekcję Safari w script.js:
funkcja markSafariBrowser()
dodaje klasę is-safari na html tylko w Safari
Dodałem override tylko dla Safari desktop w style.css:
html.is-safari .cta-container { bottom: clamp(5rem, 18svh, 13rem); }
działa tylko od min-width: 1024px
Efekt:

Chrome desktop zostaje na Twoim bazowym bottom: 15%
Safari desktop dostaje osobny, wyższy bottom
Mobile nie jest dotknięty
Walidacja:

style.css bez błędów
script.js bez błędów
Jeśli chcesz, mogę od razu zrobić ultra-szybki tuning:

18svh -> 16svh (trochę niżej)
18svh -> 20svh (trochę wyżej)








NEW FEATURES:
  -> powiadomienie kiedy bedzie dostepna torebka