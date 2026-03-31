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

function getOrderProductLabel(product) {
  return `${product.model} ${product.color}`.toUpperCase();
}

function getOrderSeedProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  if (!slug) return null;

  return getProductBySlug(slug);
}

function buildOrderModelOptions(selectedSlug) {
  return products.map(product => {
    const selectedAttr = product.slug === selectedSlug ? 'selected' : '';
    return `<option value="${product.slug}" ${selectedAttr}>${getOrderProductLabel(product)}</option>`;
  }).join('');
}

function buildOrderQuantityOptions(selectedQuantity) {
  const maxQuantity = 10;
  const numericQty = Number(selectedQuantity) || 1;

  return Array.from({ length: maxQuantity }, (_, index) => {
    const value = index + 1;
    const selectedAttr = value === numericQty ? 'selected' : '';
    return `<option value="${value}" ${selectedAttr}>x${value}</option>`;
  }).join('');
}

let orderCustomSelectEventsBound = false;

function closeAllOrderCustomSelects(exceptField) {
  document.querySelectorAll('.order-field-select.is-open').forEach((field) => {
    if (exceptField && field === exceptField) return;
    field.classList.remove('is-open');

    const trigger = field.querySelector('.order-custom-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

function syncOrderCustomSelectUI(selectEl) {
  const field = selectEl.closest('.order-field-select');
  if (!field) return;

  const selectedOption = selectEl.options[selectEl.selectedIndex];
  const valueNode = field.querySelector('.order-custom-value');
  if (valueNode && selectedOption) {
    valueNode.textContent = selectedOption.textContent;
  }

  field.querySelectorAll('.order-custom-option').forEach((optionButton) => {
    optionButton.classList.toggle('is-selected', optionButton.dataset.value === selectEl.value);
  });
}

function setupOrderCustomSelect(selectEl) {
  if (!selectEl || selectEl.dataset.customized === 'true') return;

  const field = selectEl.closest('.order-field-select');
  if (!field) return;

  selectEl.classList.add('order-native-select');

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'order-custom-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  const fieldLabel = field.querySelector('label');
  if (fieldLabel) {
    fieldLabel.addEventListener('click', (event) => {
      event.preventDefault();
      trigger.click();
    });
  }

  const valueNode = document.createElement('span');
  valueNode.className = 'order-custom-value';
  trigger.appendChild(valueNode);

  const menu = document.createElement('div');
  menu.className = 'order-custom-menu';
  menu.setAttribute('role', 'listbox');

  Array.from(selectEl.options).forEach((optionEl) => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'order-custom-option';
    optionButton.dataset.value = optionEl.value;
    optionButton.textContent = optionEl.textContent;
    optionButton.setAttribute('role', 'option');

    if (optionEl.selected) {
      optionButton.classList.add('is-selected');
    }

    optionButton.addEventListener('click', () => {
      selectEl.value = optionEl.value;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      closeAllOrderCustomSelects();
    });

    menu.appendChild(optionButton);
  });

  trigger.addEventListener('click', () => {
    const isOpen = field.classList.contains('is-open');
    closeAllOrderCustomSelects(field);

    if (!isOpen) {
      field.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    } else {
      field.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllOrderCustomSelects();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!field.classList.contains('is-open')) {
        closeAllOrderCustomSelects(field);
        field.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    }
  });

  selectEl.addEventListener('change', () => syncOrderCustomSelectUI(selectEl));

  field.appendChild(trigger);
  field.appendChild(menu);

  syncOrderCustomSelectUI(selectEl);
  selectEl.dataset.customized = 'true';
}

function initializeOrderCustomSelects(root) {
  const scope = root || document;
  scope.querySelectorAll('.order-field-select select').forEach((selectEl) => {
    setupOrderCustomSelect(selectEl);
  });

  if (!orderCustomSelectEventsBound) {
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.order-field-select')) {
        closeAllOrderCustomSelects();
      }
    });
    orderCustomSelectEventsBound = true;
  }
}

function createOrderItemRow(selectedSlug, quantity) {
  const row = document.createElement('div');
  row.className = 'order-item-row';

  row.innerHTML = `
    <div class="order-field order-field-select">
      <label>Model</label>
      <select class="order-model-select" name="orderModel[]" required>
        ${buildOrderModelOptions(selectedSlug)}
      </select>
      <span class="order-select-icon material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
    </div>
    <div class="order-field order-field-select order-quantity-field">
      <label>Ilość</label>
      <select class="order-quantity-select" name="orderQuantity[]" required>
        ${buildOrderQuantityOptions(quantity)}
      </select>
      <span class="order-select-icon material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
    </div>
    <button type="button" class="remove-order-row" aria-label="Usuń tę torebkę">
      <span class="order-icon material-symbols-outlined" aria-hidden="true">close</span>
    </button>
  `;

  return row;
}

function updateOrderRemoveButtonsState() {
  const rows = document.querySelectorAll('.order-item-row');
  const isSingleRow = rows.length <= 1;

  rows.forEach((row) => {
    const removeButton = row.querySelector('.remove-order-row');
    if (!removeButton) return;

    removeButton.disabled = isSingleRow;
    removeButton.classList.toggle('is-disabled', isSingleRow);
  });
}

function normalizeOrderFieldValue(field) {
  if (!field || typeof field.value !== 'string') return '';
  return field.value.trim();
}

function isValidOrderPhone(phoneValue) {
  const compact = phoneValue.replace(/[\s-]/g, '');
  return /^\d{9}$/.test(compact) || /^48\d{9}$/.test(compact) || /^\+48\d{9}$/.test(compact);
}

function isValidOrderEmail(emailValue) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue);
}

function setOrderFieldInvalidState(field, isInvalid) {
  const fieldWrapper = field.closest('.order-field');
  if (!fieldWrapper) return;

  fieldWrapper.classList.toggle('has-error', isInvalid);
  field.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
}

function clearOrderFormErrors(form) {
  form.querySelectorAll('.order-field.has-error').forEach((fieldWrapper) => {
    fieldWrapper.classList.remove('has-error');
  });

  form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
    field.setAttribute('aria-invalid', 'false');
  });

  const errorNode = form.querySelector('#orderFormError');
  if (errorNode) {
    errorNode.hidden = true;
    errorNode.textContent = '';
  }

  const consentErrorNode = form.querySelector('#orderConsentError');
  if (consentErrorNode) {
    consentErrorNode.hidden = true;
    consentErrorNode.textContent = '';
  }
}

function validateOrderForm(form) {
  const requiredFields = Array.from(form.querySelectorAll('[required]'));
  const invalidDataFields = [];
  let consentField = null;
  let isConsentInvalid = false;

  requiredFields.forEach((field) => {
    let isInvalid = false;

    if (field instanceof HTMLInputElement && field.type === 'checkbox') {
      consentField = field;
      isInvalid = !field.checked;
      isConsentInvalid = isInvalid;
    } else {
      const value = normalizeOrderFieldValue(field);
      isInvalid = value.length === 0;

      if (!isInvalid && field.id === 'customerEmail') {
        isInvalid = !isValidOrderEmail(value);
      }

      if (!isInvalid && field.id === 'customerPhone') {
        isInvalid = !isValidOrderPhone(value);
      }
    }

    setOrderFieldInvalidState(field, isInvalid);

    if (isInvalid && !(field instanceof HTMLInputElement && field.type === 'checkbox')) {
      invalidDataFields.push(field);
    }
  });

  const errorNode = form.querySelector('#orderFormError');
  const consentErrorNode = form.querySelector('#orderConsentError');

  if (errorNode) {
    if (invalidDataFields.length > 0) {
      errorNode.textContent = 'Formularz nie jest poprawnie uzupełniony. Uzupełnij wszystkie wymagane pola i sprawdź format e-maila oraz telefonu.';
      errorNode.hidden = false;
    } else {
      errorNode.hidden = true;
      errorNode.textContent = '';
    }
  }

  if (consentErrorNode) {
    consentErrorNode.hidden = true;
    consentErrorNode.textContent = '';
  }

  return {
    isValid: invalidDataFields.length === 0 && !isConsentInvalid,
    firstInvalidField: invalidDataFields[0] || (isConsentInvalid ? consentField : null)
  };
}

function setOrderSubmitState(form, isSubmitting) {
  const submitButton = form.querySelector('.order-submit-button');
  if (!submitButton) return;

  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? 'WYSYŁAM...' : 'WYŚLIJ';
}

function showOrderSubmitError(form, message) {
  const submitErrorNode = form.querySelector('#orderSubmitError');
  if (!submitErrorNode) return;

  submitErrorNode.textContent = message;
  submitErrorNode.hidden = false;
}

function clearOrderSubmitError(form) {
  const submitErrorNode = form.querySelector('#orderSubmitError');
  if (!submitErrorNode) return;

  submitErrorNode.hidden = true;
  submitErrorNode.textContent = '';
}

function buildOrderItemsPayload(form) {
  return Array.from(form.querySelectorAll('.order-item-row')).map((row, index) => {
    const modelSelect = row.querySelector('.order-model-select');
    const quantitySelect = row.querySelector('.order-quantity-select');

    const modelLabel = modelSelect?.options[modelSelect.selectedIndex]?.textContent?.trim() || '';
    const modelSlug = modelSelect?.value || '';
    const quantityValue = quantitySelect?.value || '';

    return {
      lp: index + 1,
      modelSlug,
      modelLabel,
      quantity: Number(quantityValue) || 1
    };
  });
}

function buildOrderMailPayload(form) {
  const customerName = normalizeOrderFieldValue(form.querySelector('#customerName'));
  const customerEmail = normalizeOrderFieldValue(form.querySelector('#customerEmail'));
  const customerAddress = normalizeOrderFieldValue(form.querySelector('#customerAddress'));
  const customerPhone = normalizeOrderFieldValue(form.querySelector('#customerPhone'));
  const deliverySelect = form.querySelector('#deliveryMethod');
  const deliveryMethod = deliverySelect?.value || '';
  const deliveryLabel = deliverySelect?.options[deliverySelect.selectedIndex]?.textContent?.trim() || '';
  const orderItems = buildOrderItemsPayload(form);

  // Czysty payload strukturalny – Go/backend sam formatuje maila z tych danych.
  return {
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    deliveryMethod,
    deliveryLabel,
    orderItems
  };
}

async function submitOrderFormData(form) {
  const endpoint = (typeof ORDER_FORM_CONFIG !== 'undefined' && ORDER_FORM_CONFIG.endpoint)
    ? ORDER_FORM_CONFIG.endpoint.trim()
    : '';

  if (!endpoint) {
    throw new Error('ORDER_FORM_ENDPOINT_MISSING');
  }

  const payload = buildOrderMailPayload(form);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('ORDER_FORM_SUBMIT_FAILED');
  }

  return { ok: true };
}

function renderOrderSuccessState(container) {
  if (!container) return;

  container.classList.add('is-success');
  container.innerHTML = `
    <section class="order-success-panel" aria-live="polite">
      <span class="material-symbols-outlined order-success-check" aria-hidden="true">check</span>
      <p class="order-success-thanks">Dziękujemy!</p>
      <h2 class="order-success-title">FORMULARZ<br>WYSŁANY!</h2>
      <img src="images/bag.png" alt="Ilustracja torebki" class="order-success-image">
    </section>
  `;
}

function renderOrderForm() {
  const container = document.getElementById('orderFormContainer');
  if (!container) return;

  const initialProduct = getOrderSeedProduct();
  if (!initialProduct) {
    window.location.href = 'models.html';
    return;
  }

  container.innerHTML = `
    <section class="order-hero">
      <h1 class="order-title">KUPUJĘ!</h1>
      <p class="order-subtitle">Miło nam, że chcesz kupić nasz produkt!<br>Możesz to zrobić przez poniższy formularz!</p>
    </section>

    <form id="orderForm" class="order-form" novalidate>
      <div id="orderItems" class="order-items"></div>
      <button type="button" id="addOrderRow" class="add-order-row" aria-label="Dodaj kolejną torebkę">
        <span class="order-icon material-symbols-outlined" aria-hidden="true">add</span>
      </button>

      <div class="order-field order-field-select order-delivery-field">
        <label for="deliveryMethod">Sposób dostawy</label>
        <select id="deliveryMethod" name="deliveryMethod" required>
          <option value="inpost-kurier">InPost Kurier (18zł)</option>
          <option value="paczkomat-dpd">Paczkomat DPD (15 zł)</option>
        </select>
        <span class="order-select-icon material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
      </div>

      <div class="order-field order-field-data">
        <label for="customerName">Imię i Nazwisko</label>
        <input class="order-input" type="text" id="customerName" name="customerName" autocomplete="name" required>
      </div>

      <div class="order-field order-field-data">
        <label for="customerEmail">E-mail</label>
        <input class="order-input" type="email" id="customerEmail" name="customerEmail" autocomplete="email" autocapitalize="off" spellcheck="false" required>
      </div>

      <div class="order-field order-field-data">
        <label for="customerAddress">Adres do wysyłki lub numer Paczkomatu</label>
        <input class="order-input" type="text" id="customerAddress" name="customerAddress" autocomplete="street-address" required>
      </div>

      <div class="order-field order-field-data">
        <label for="customerPhone">Telefon</label>
        <input class="order-input" type="tel" id="customerPhone" name="customerPhone" inputmode="tel" autocomplete="tel" placeholder="" pattern="^(\\+48|48)?[\\s\\-]*\\d(?:[\\s\\-]*\\d){8}$" title="Podaj numer telefonu, np. +48 123 456 789" required>
      </div>

      <div class="order-field order-consent-field">
        <label class="order-consent-label" for="orderConsent">
          <input type="checkbox" id="orderConsent" name="orderConsent" required>
          <span>Akceptuję <a href="terms.html" target="_blank" rel="noopener">Regulamin</a> i <a href="privacy.html" target="_blank" rel="noopener">Politykę Prywatności</a> sklepu CEMBORKA</span>
        </label>
      </div>

      <p id="orderFormError" class="order-form-error" role="alert" aria-live="polite" hidden></p>
      <p id="orderConsentError" class="order-form-error" role="alert" aria-live="polite" hidden></p>

      <p class="order-payment-info">Możliwy sposób płatność: Blik / przelew</p>

      <button type="submit" class="order-submit-button">WYŚLIJ</button>
      <p id="orderSubmitError" class="order-submit-error" role="alert" aria-live="polite" hidden></p>
      <p class="order-disclaimer">Po wysłaniu formularza, dostaniesz od nas informację zwrotną z finalizacją zamówienia i szczegółami płatności.</p>
    </form>
  `;

  container.classList.remove('is-success');

  const itemsContainer = document.getElementById('orderItems');
  const addRowButton = document.getElementById('addOrderRow');
  const orderForm = document.getElementById('orderForm');

  itemsContainer.appendChild(createOrderItemRow(initialProduct.slug, 1));
  initializeOrderCustomSelects(container);
  updateOrderRemoveButtonsState();

  addRowButton.addEventListener('click', () => {
    const newRow = createOrderItemRow(products[0].slug, 1);
    itemsContainer.appendChild(newRow);
    initializeOrderCustomSelects(newRow);
    updateOrderRemoveButtonsState();
  });

  itemsContainer.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove-order-row');
    if (!removeButton || removeButton.disabled) return;

    const row = removeButton.closest('.order-item-row');
    if (row) {
      row.remove();
      updateOrderRemoveButtonsState();
    }
  });

  orderForm.addEventListener('input', (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLSelectElement)) return;

    if (!field.hasAttribute('required')) return;
    if (orderForm.dataset.validationAttempted !== 'true') return;

    if (field instanceof HTMLInputElement && field.type === 'checkbox') {
      setOrderFieldInvalidState(field, !field.checked);
      return;
    }

    const value = normalizeOrderFieldValue(field);
    let isInvalid = value.length === 0;

    if (!isInvalid && field.id === 'customerEmail') {
      isInvalid = !isValidOrderEmail(value);
    }

    if (!isInvalid && field.id === 'customerPhone') {
      isInvalid = !isValidOrderPhone(value);
    }

    setOrderFieldInvalidState(field, isInvalid);
  });

  orderForm.addEventListener('change', (event) => {
    const field = event.target;
    if (!(field instanceof HTMLSelectElement) && !(field instanceof HTMLInputElement)) return;
    if (!field.hasAttribute('required')) return;
    if (orderForm.dataset.validationAttempted !== 'true') return;

    const isInvalid = field instanceof HTMLInputElement && field.type === 'checkbox'
      ? !field.checked
      : normalizeOrderFieldValue(field).length === 0;

    setOrderFieldInvalidState(field, isInvalid);

    if (field instanceof HTMLInputElement && field.type === 'checkbox') {
      const consentErrorNode = orderForm.querySelector('#orderConsentError');
      if (consentErrorNode && field.checked) {
        consentErrorNode.hidden = true;
        consentErrorNode.textContent = '';
      }
    }
  });

  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    orderForm.dataset.validationAttempted = 'true';
    clearOrderFormErrors(orderForm);
    clearOrderSubmitError(orderForm);

    const result = validateOrderForm(orderForm);
    if (!result.isValid) {
      result.firstInvalidField?.focus({ preventScroll: true });
      result.firstInvalidField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      setOrderSubmitState(orderForm, true);
      const response = await submitOrderFormData(orderForm);

      if (!response?.ok) {
        throw new Error('Submit failed');
      }

      renderOrderSuccessState(container);
    } catch (error) {
      if (error instanceof Error && error.message === 'ORDER_FORM_ENDPOINT_MISSING') {
        showOrderSubmitError(orderForm, 'Wysylka formularza nie jest jeszcze skonfigurowana. Ustaw endpoint w js/data.js (ORDER_FORM_CONFIG.endpoint).');
      } else {
        showOrderSubmitError(orderForm, 'Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.');
      }
    } finally {
      setOrderSubmitState(orderForm, false);
    }
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
  setupDesktopDescriptionExpand();
}

function buildDesktopDescriptionMarkup(descriptionText) {
  const text = (descriptionText || '').trim();
  const marker = 'długości.';
  const markerIndex = text.indexOf(marker);

  if (markerIndex === -1) {
    return `<p class="description">${text}</p>`;
  }

  const splitEnd = markerIndex + marker.length;
  const shortText = text.slice(0, splitEnd).trim();
  const longText = text.slice(splitEnd).trim();

  if (!longText) {
    return `<p class="description">${text}</p>`;
  }

  return `
    <p class="description description-collapsible">
      <span class="description-short">${shortText}</span><span class="description-more" hidden> ${longText}<button type="button" class="description-collapse-inline" aria-expanded="true" aria-label="Zwiń opis" hidden>...</button></span>
    </p>
    <button type="button" class="description-expand-button" aria-expanded="false" aria-label="Rozwiń opis">...</button>
  `;
}

function setupDesktopDescriptionExpand() {
  document.querySelectorAll('.description.description-collapsible').forEach((descriptionNode) => {
    if (descriptionNode.dataset.bound === 'true') return;

    const expandButton = descriptionNode.nextElementSibling;
    const hiddenPart = descriptionNode.querySelector('.description-more');
    const collapseButton = descriptionNode.querySelector('.description-collapse-inline');

    if (!(expandButton instanceof HTMLButtonElement)) return;
    if (!(hiddenPart instanceof HTMLElement)) return;
    if (!(collapseButton instanceof HTMLButtonElement)) return;

    expandButton.addEventListener('click', () => {
      hiddenPart.hidden = false;
      collapseButton.hidden = false;
      descriptionNode.classList.add('is-expanded');
      expandButton.hidden = true;
      expandButton.setAttribute('aria-expanded', 'true');
    });

    collapseButton.addEventListener('click', () => {
      hiddenPart.hidden = true;
      collapseButton.hidden = true;
      descriptionNode.classList.remove('is-expanded');
      expandButton.hidden = false;
      expandButton.setAttribute('aria-expanded', 'false');
    });

    descriptionNode.dataset.bound = 'true';
  });
}

function renderMobileView(container, product) {
  const firstImage = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages[0] : product.mainImage;

  const tabsList = [
    { id: 'szczegoly-mob', label: 'SZCZEGÓŁY', content: product.details },
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
          <span class="status">dostępna</span>
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
      <a href="order.html?slug=${encodeURIComponent(product.slug)}" class="buy-button">KUP</a>
    </div>
  `;
  container.appendChild(footerActions);
}

function renderDesktopView(container, product) {
  const firstImage = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages[0] : product.mainImage;

  const tabsList = [
    { id: 'szczegoly-desk', label: 'SZCZEGÓŁY', content: product.details },
    { id: 'material-desk', label: 'MATERIAŁ', content: product.material },
    { id: 'pielegnacja-desk', label: 'PIELĘGNACJA', content: product.care },
    { id: 'dostawa-desk', label: 'DOSTAWA', content: product.delivery }
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
        <span class="status">dostępna</span>
      </div>
      ${buildDesktopDescriptionMarkup(product.description)}
      <div class="purchase-section">
        <span class="price">${product.price} zł</span>
        <a href="order.html?slug=${encodeURIComponent(product.slug)}" class="buy-button">KUP</a>
      </div>
      <div class="tabs-section">
        <div class="tabs">
          ${tabsList.map((tab, index) => `<button class="tab-button" onclick="toggleDesktopTab(this, '${tab.id}')">${tab.label}</button>`).join('')}
        </div>
        <div class="tabs-content-container">
          ${tabsList.map((tab, index) => `<div id="${tab.id}" class="tabs-content">${tab.content}</div>`).join('')}
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

  images.forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', syncDesktopGalleryArrowOffsets, { once: true });
    }
  });

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

    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentDesktopImageIndex);
    });

    syncDesktopGalleryArrowOffsets();
}

  function syncDesktopGalleryArrowOffsets() {
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const galleryContainer = document.querySelector('.desktop-gallery-container');
    if (!galleryContainer) return;

    const activeImage = galleryContainer.querySelector('.gallery-image.active');
    if (!activeImage) return;

    const containerWidth = galleryContainer.clientWidth;
    const containerHeight = galleryContainer.clientHeight;
    const naturalWidth = activeImage.naturalWidth;
    const naturalHeight = activeImage.naturalHeight;

    if (!containerWidth || !containerHeight || !naturalWidth || !naturalHeight) return;

    const scale = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight);
    const renderedWidth = naturalWidth * scale;
    const sideGap = Math.max(0, (containerWidth - renderedWidth) / 2);

    galleryContainer.style.setProperty('--gallery-side-gap', `${sideGap}px`);
  }

function initializeTabs() {
    // Ta funkcja może być pusta, jeśli używamy `onclick` bezpośrednio w HTML,
    // lub można tu przenieść logikę z `toggleTab` dla lepszej praktyki.
    // Na razie zostawiamy `onclick` dla prostoty.
}

function scrollMobileProductPageToBottom(footerElement) {
  if (!footerElement) return;
  if (window.matchMedia('(min-width: 1024px)').matches) return;

  const purchaseSection = footerElement.querySelector('.purchase-section');
  if (!purchaseSection) return;

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
}

// Dedykowana funkcja dla zakładek mobilnych
function toggleMobileTab(buttonEl, tabId) {
  const footer = buttonEl.closest('.footer-actions');
  const allButtons = footer.querySelectorAll('.tab-button');
  
  const contentContainer = document.getElementById('tabsContentContainer-mob');
  const allContents = contentContainer.querySelectorAll('.tabs-content');
  const targetContent = contentContainer.querySelector(`#${tabId}`);

  const isCurrentlyActive = buttonEl.classList.contains('active');

  allContents.forEach(c => c.classList.remove('active'));
  allButtons.forEach(b => b.classList.remove('active'));
  
  if (!isCurrentlyActive) {
    if (targetContent) targetContent.classList.add('active');
    buttonEl.classList.add('active');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollMobileProductPageToBottom(footer);
      });
    });
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

  if (path.includes('order.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (slug) {
      return `product.html?slug=${encodeURIComponent(slug)}`;
    }

    return 'models.html';
  }

  if (path.includes('product.html')) {
    return 'models.html';
  }

  if (path.includes('models.html')) {
    return 'index.html';
  }

  if (path.includes('about.html')) {
    return 'index.html';
  }

  if (path.includes('contact.html')) {
    return 'index.html';
  }

  return null;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function navigateWithPageTransition(targetUrl) {
  if (!targetUrl) return;

  if (prefersReducedMotion()) {
    window.location.href = targetUrl;
    return;
  }

  document.body.classList.add('page-transition-leave');

  window.setTimeout(() => {
    window.location.href = targetUrl;
  }, 220);
}

function isAnimatableInternalLink(linkEl) {
  if (!linkEl) return false;

  const href = linkEl.getAttribute('href');
  if (!href || href.startsWith('#')) return false;

  if (linkEl.hasAttribute('download')) return false;

  const target = linkEl.getAttribute('target');
  if (target && target.toLowerCase() === '_blank') return false;

  if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;

  const destination = new URL(linkEl.href, window.location.href);
  if (destination.origin !== window.location.origin) return false;

  const currentWithoutHash = `${window.location.origin}${window.location.pathname}${window.location.search}`;
  const destinationWithoutHash = `${destination.origin}${destination.pathname}${destination.search}`;

  return currentWithoutHash !== destinationWithoutHash;
}

function setupPageTransitions() {
  if (!prefersReducedMotion()) {
    document.body.classList.add('page-transition-enter');
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!isAnimatableInternalLink(link)) return;

    event.preventDefault();
    navigateWithPageTransition(link.href);
  });
}

function setupHamburgerMenu() {
  const menuButton = document.querySelector('.menu-button');
  const header = document.querySelector('.header');
  if (!menuButton || !header) return;

  let menuOverlay = document.getElementById('mobileMenuOverlay');
  if (!menuOverlay) {
    menuOverlay = document.createElement('aside');
    menuOverlay.id = 'mobileMenuOverlay';
    menuOverlay.className = 'mobile-menu-overlay';
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuOverlay.inert = true;
    menuOverlay.innerHTML = `
      <nav class="mobile-menu-panel" aria-label="Menu główne">
        <a href="models.html" class="mobile-menu-link">DOSTĘPNE MODELE</a>
        <a href="about.html" class="mobile-menu-link">O MARCE</a>
        <a href="contact.html" class="mobile-menu-link">KONTAKT</a>
      </nav>
    `;
    document.body.appendChild(menuOverlay);
  }

  const closeMenu = () => {
    menuOverlay.classList.remove('is-open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuOverlay.inert = true;
    menuButton.classList.remove('is-active');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    header.classList.remove('is-fixed-on-menu-open');
  };

  const openMenu = () => {
    menuOverlay.classList.add('is-open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuOverlay.inert = false;
    menuButton.classList.add('is-active');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    header.classList.add('is-fixed-on-menu-open');
  };

  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'mobileMenuOverlay');

  menuButton.addEventListener('click', (event) => {
    event.preventDefault();

    const isOpen = menuOverlay.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
      closeMenu();
    }
  });

  menuOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOverlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
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
    navigateWithPageTransition(parentPageUrl);
  });
}

function markSafariBrowser() {
  const userAgent = navigator.userAgent;
  const isSafari = /Safari/i.test(userAgent)
    && !/Chrome|Chromium|Edg|OPR|CriOS|FxiOS|Firefox/i.test(userAgent);

  if (isSafari) {
    document.documentElement.classList.add('is-safari');
  }
}

// Polepsz nawigację wstecz
document.addEventListener('DOMContentLoaded', function() {
  markSafariBrowser();
  setupPageTransitions();
  setupHamburgerMenu();
  setupBackButtonNavigation();
  
  // Uruchomienie renderowania po załadowaniu DOM
  if (document.getElementById('productContainer')) {
    renderProductDetail();
  }

  if (document.getElementById('orderFormContainer')) {
    if (new URLSearchParams(window.location.search).has('debugSuccess')) {
      const c = document.getElementById('orderFormContainer');
      renderOrderSuccessState(c);
    } else {
      renderOrderForm();
    }
  }

  if (document.getElementById('modelsContainer')) {
    renderModels();
  }

  window.addEventListener('resize', syncDesktopGalleryArrowOffsets);
});
