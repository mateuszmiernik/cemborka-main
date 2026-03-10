-> HAMBURGER MENU
-> zdjecia rozmiary
-> ikonki social mediow do podstrony 'O marce'
-> formularz
-> flavicon

-> przycisk back - rozmiary


podstrona models
-> "ZŁOTAENETA" zawija sie na granicy desktop/mobile
-> na iphonie odstep zdjec od linii jest za maly / inny niz na innym telefonie 



-> letter-spacing: .03125rem; -> o tekstow (description itd.) - mobilne

~~-> purchase-section - ma byc przyklejone (fixed) ~~

~~-> linia przy purchase section ma byc jedna~~


podstrona produktu:


podstrona "O marce":
-> .about-container {
  padding: 3.4375rem clamp(2.8125rem, 6vw, 3.75rem) 2.8125rem;
}

podstrona formularza:
-> autouzupelnienie sie robi tlo fieldow na bialo
-> iPhone pole Sposob dostawy jak sie klika na selecta troche powyzej to wyskakuje po staremu optionsy
-> co sie dzieje po kliknieciu WYSLIJ - (grafika na mailu) + walidacja na WYSLIJ
-> RODO: Jeśli zbierasz dane osobowe (imię, adres), dodaj checkbox z informacją, że użytkownik zgadza się na ich przetwarzanie w celu realizacji zamówienia.


podstrona order:
  renderOrderSuccessState(document.querySelector('.order-container'))




link do FB i TIK TOKa uzupelnic
-> <a href="#" class="about-social-placeholder" aria-label="Facebook">


RAZEM:
-> strona glowna
-> .product-info .color-name - letter spacing i font-size
-> podstrona 'kontakt'


Do sprawdzenia na potem:
-> ilosc sztuk w formularzu (ile danej torby jeszcze mamy)

KAMILA
~~-> poprawione ikonki~~ -> zrobic
~~-> menu hamburger~~
-> opisy zdjec







14 px font-size oraz letter-spacing oraz line-height
line-height: 1.25;
font-size: .875rem;
letter-spacing: .0313rem;


16 px font-size oraz letter-spacing

.order-subtitle {
  font-size: 1rem
  letter-spacing: 0.5723px;

line-height: 1.35;


PASKI - border-bottom:
  border-bottom: .0469rem solid var(--text-color);