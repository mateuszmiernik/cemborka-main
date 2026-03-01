// Renderowanie listy modeli
function renderModels() {
  const container = document.getElementById('modelsContainer');
  const productsByModel = getProductsByModel();
  
  container.innerHTML = '';
  
  Object.entries(productsByModel).forEach(([model, items]) => {
    // Tworzymy sekcję modelu
    const section = document.createElement('section');
    section.className = 'model-section';
    
    // Tytuł modelu
    const title = document.createElement('div');
    title.className = 'model-title';
    title.innerHTML = `<span class="label">model</span><span class="name">${model}</span>`;
    section.appendChild(title);
    
    // Siatka produktów
    const grid = document.createElement('div');
    grid.className = 'products-grid';
    
    items.forEach(product => {
      const productCard = document.createElement('a');
      productCard.className = 'product-card';
      productCard.href = `product.html?slug=${product.slug}`;
      
      productCard.innerHTML = `
        <div class="image-wrapper">
          <img src="${product.mainImage}" alt="${product.model} ${product.color}">
        </div>
        <div class="product-info">
          <span class="color-label">kolor</span>
          <span class="color-name">${product.color}</span>
          <span class="price">${product.price} zł</span>
        </div>
      `;
      
      grid.appendChild(productCard);
    });
    
    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Renderowanie szczegółów produktu
function renderProductDetail() {
  // Pobieramy slug z URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  if (!slug) {
    window.location.href = 'models.html';
    return;
  }
  
  const product = getProductBySlug(slug);
  
  if (!product) {
    window.location.href = 'models.html';
    return;
  }
  
  const container = document.getElementById('productContainer');
  container.innerHTML = ''; // Zawsze czyść kontener

  // --- Struktura dla wersji mobilnej (pozostaje bez zmian) ---
  renderMobileView(container, product);

  // --- Nowa, dodatkowa struktura TYLKO dla wersji desktopowej ---
  renderDesktopView(container, product);

  // Po dodaniu obu widoków do DOM, inicjalizujemy galerię i zakładki
  setupDesktopGallery();
  initializeTabs();
}

function renderMobileView(container, product) {
  const allModelProducts = getProductsByModel()[product.model] || [];
  const otherColorsCount = allModelProducts.length - 1;
  const otherColorsText = otherColorsCount > 0 ? `Dostępna w ${otherColorsCount} ${otherColorsCount === 1 ? 'innym kolorze' : 'innych kolorach'}` : '';
  const firstImage = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages[0] : product.mainImage;

  const tabsList = [
    { id: 'szczegoly-mob', label: 'SZCZEGÓŁY', content: product.construction },
    { id: 'material-mob', label: 'MATERIAŁ', content: product.material },
    { id: 'pielegnacja-mob', label: 'PIELĘGNACJA', content: product.care },
    { id: 'dostawa-mob', label: 'DOSTAWA', content: product.delivery }
  ];

  // Kontener dla widoku mobilnego
  const mobileWrapper = document.createElement('div');
  mobileWrapper.className = 'product-wrapper'; // Ten kontener będzie ukryty na desktopie
  
  mobileWrapper.innerHTML = `
    <div class="main-info">
      <div class="product-title">
        <span class="label">model</span>
        <span class="name">${product.model}</span>
      </div>
      <div class="product-content">
        <img src="${firstImage}" alt="${product.model}" class="main-image">
        <div class="color-title">
          <span class="label">kolor</span>
          <span class="name">${product.color}</span>
          ${otherColorsText ? `<span class="other-colors">${otherColorsText}</span>` : ''}
        </div>
        <p class="description">${product.description}</p>
      </div>
    </div>
    ${(product.galleryImages && product.galleryImages.length > 1) ? `
      <div class="gallery">
        ${product.galleryImages.slice(1).map(imgSrc => `<img src="${imgSrc}" alt="Galeria ${product.model}" class="gallery-image">`).join('')}
      </div>
    ` : ''}
  `;
  container.appendChild(mobileWrapper);

  const footerActions = document.createElement('div');
  footerActions.className = 'footer-actions'; // Ten kontener też będzie ukryty na desktopie
  footerActions.innerHTML = `
    <div class="tabs">
      ${tabsList.map((tab) => `<button class="tab-button" onclick="toggleMobileTab(this, '${tab.id}')">${tab.label}</button>`).join('')}
      <div id="tabsContentContainer-mob">
        ${tabsList.map(tab => `<div class="tabs-content" id="${tab.id}">${tab.content}</div>`).join('')}
      </div>
    </div>
    <div class="purchase-section">
      <span class="price">${product.price} zł</span>
      <a href="mailto:cemborka@example.com?subject=Zapytanie o torebkę ${product.model} ${product.color}" class="buy-button">KUP</a>
    </div>
  `;
  container.appendChild(footerActions);
}

function renderDesktopView(container, product) {
  const allModelProducts = getProductsByModel()[product.model] || [];
  const otherColorsCount = allModelProducts.length - 1;
  const otherColorsText = otherColorsCount > 0 ? `Dostępna w ${otherColorsCount} ${otherColorsCount === 1 ? 'innym kolorze' : 'innych kolorach'}` : '';
  const firstImage = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages[0] : product.mainImage;

  const tabsList = [
    { id: 'szczegoly-desk', label: 'SZCZEGÓŁY', content: product.construction },
    { id: 'material-desk', label: 'MATERIAŁ', content: product.material },
    { id: 'pielegnacja-desk', label: 'PIELĘGNACJA', content: product.care },
    { id: 'dostawa-desk', label: 'PŁATNOŚĆ I DOSTAWA', content: product.delivery }
  ];

  const desktopLayout = document.createElement('div');
  desktopLayout.className = 'product-layout-grid'; // Ten layout jest widoczny tylko na desktopie
  
  desktopLayout.innerHTML = `
    <div class="product-image-column">
      <div class="desktop-gallery-container">
        ${product.galleryImages.map((imgSrc, index) => `
          <img src="${imgSrc}" alt="${product.model} - zdjęcie ${index + 1}" class="gallery-image ${index === 0 ? 'active' : ''}" data-index="${index}">
        `).join('')}
        ${product.galleryImages.length > 1 ? `
          <button class="gallery-arrow prev" onclick="changeDesktopImage(-1)"><img src="images/back-icon.png" alt="Wstecz" class="back-icon"></button>
          <button class="gallery-arrow next" onclick="changeDesktopImage(1)"><img src="images/back-icon.png" alt="Dalej" class="back-icon back-icon-next"></button>
          <div class="gallery-counter">1 / ${product.galleryImages.length}</div>
        ` : ''}
      </div>
    </div>
    <div class="product-details-column">
      <div class="product-title">
        <span class="label">model</span>
        <span class="name">${product.model}</span>
      </div>
      <div class="color-title">
        <span class="label">kolor</span>
        <span class="name">${product.color}</span>
        ${otherColorsText ? `<span class="other-colors">${otherColorsText}</span>` : ''}
      </div>
      <p class="description">${product.description}</p>
      <div class="purchase-section">
        <span class="price">${product.price} zł</span>
        <a href="mailto:cemborka@example.com?subject=Zapytanie o torebkę ${product.model} ${product.color}" class="buy-button">KUP</a>
      </div>
      <div class="tabs-section">
        <div class="tabs">
          ${tabsList.map((tab, index) => `<button class="tab-button" onclick="toggleDesktopTab(this, '${tab.id}')">${tab.label}</button>`).join('')}
        </div>
        <div class="tabs-content-container">
          ${tabsList.map((tab, index) => `<div id="${tab.id}" class="tabs-content"><p>${tab.content}</p></div>`).join('')}
        </div>
      </div>
    </div>
  `;
  container.appendChild(desktopLayout);
  
  // Po dodaniu elementu do DOM, inicjalizujemy galerię
  setupDesktopGallery();
}

let currentDesktopImageIndex = 0;
let totalDesktopImages = 0;

function setupDesktopGallery() {
    const galleryContainer = document.querySelector('.desktop-gallery-container');
    if (!galleryContainer) return;

    const images = galleryContainer.querySelectorAll('.gallery-image');
    totalDesktopImages = images.length;
    currentDesktopImageIndex = 0;

    updateDesktopGallery();
}

function changeDesktopImage(direction) {
    currentDesktopImageIndex += direction;

    if (currentDesktopImageIndex < 0) {
        currentDesktopImageIndex = totalDesktopImages - 1;
    } else if (currentDesktopImageIndex >= totalDesktopImages) {
        currentDesktopImageIndex = 0;
    }

    updateDesktopGallery();
}

function updateDesktopGallery() {
    const galleryContainer = document.querySelector('.desktop-gallery-container');
    if (!galleryContainer) return;

    const images = galleryContainer.querySelectorAll('.gallery-image');
    const counter = galleryContainer.querySelector('.gallery-counter');

    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentDesktopImageIndex);
    });

    if (counter) {
        counter.textContent = `${currentDesktopImageIndex + 1} / ${totalDesktopImages}`;
    }
}

function initializeTabs() {
    // Ta funkcja może być pusta, jeśli używamy `onclick` bezpośrednio w HTML,
    // lub można tu przenieść logikę z `toggleTab` dla lepszej praktyki.
    // Na razie zostawiamy `onclick` dla prostoty.
}

// Dedykowana funkcja dla zakładek mobilnych
function toggleMobileTab(buttonEl, tabId) {
  const footer = buttonEl.closest('.footer-actions');
  const allButtons = footer.querySelectorAll('.tab-button');
  
  const contentContainer = document.getElementById('tabsContentContainer-mob');
  const allContents = contentContainer.querySelectorAll('.tabs-content');
  const targetContent = contentContainer.querySelector(`#${tabId}`);

  const isCurrentlyActive = buttonEl.classList.contains('active');

  // Ukryj wszystko
  allContents.forEach(c => c.classList.remove('active'));
  allButtons.forEach(b => b.classList.remove('active'));
  
  // Jeśli nie była aktywna, pokaż ją
  if (!isCurrentlyActive) {
    if (targetContent) targetContent.classList.add('active');
    buttonEl.classList.add('active');
  }
}

// Dedykowana funkcja dla zakładek na desktopie
function toggleDesktopTab(buttonEl, tabId) {
  const section = buttonEl.closest('.tabs-section');
  const allButtons = section.querySelectorAll('.tab-button');
  const contentContainer = section.querySelector('.tabs-content-container');
  const allContents = contentContainer.querySelectorAll('.tabs-content');
  const targetContent = contentContainer.querySelector(`#${tabId}`);

  const isCurrentlyActive = buttonEl.classList.contains('active');

  // Ukryj wszystko
  allContents.forEach(c => c.classList.remove('active'));
  allButtons.forEach(b => b.classList.remove('active'));
  
  // Jeśli nie była aktywna, pokaż ją
  if (!isCurrentlyActive) {
    if (targetContent) targetContent.classList.add('active');
    buttonEl.classList.add('active');
  }
}

function getParentPageUrl() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes('product.html')) {
    return 'models.html';
  }

  if (path.includes('models.html')) {
    return 'index.html';
  }

  if (path.includes('about.html')) {
    return 'index.html';
  }

  return null;
}

function setupBackButtonNavigation() {
  const backButton = document.querySelector('.back-button');
  if (!backButton) {
    return;
  }

  const parentPageUrl = getParentPageUrl();
  if (!parentPageUrl) {
    backButton.classList.add('hidden');
    return;
  }

  backButton.classList.remove('hidden');
  backButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = parentPageUrl;
  });
}


// Polepsz nawigację wstecz
document.addEventListener('DOMContentLoaded', function() {
  setupBackButtonNavigation();
  
  // Uruchomienie renderowania po załadowaniu DOM
  if (document.getElementById('productContainer')) {
    renderProductDetail();
  }
  if (document.getElementById('modelsContainer')) {
    renderModels();
  }
});
