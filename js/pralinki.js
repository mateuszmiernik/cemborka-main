(() => {
  // Kolejność karuzeli odtwarza widok referencyjny: Śliwka, Żurawina, Mięta.
  const products = [
    {
      id: "sliwka",
      slug: "pralinka-sliwka",
      color: "Śliwka",
      cardImage: "/images/pralinki/pralinka-sliwka-papilotka.png",
    },
    {
      id: "zurawina",
      slug: "pralinka-zurawina",
      color: "Żurawina",
      cardImage: "/images/pralinki/pralinka-zurawina-papilotka.png",
    },
    {
      id: "mieta",
      slug: "pralinka-mieta-w-czekoladzie",
      color: "Mięta w czekoladzie",
      cardImage: "/images/pralinki/pralinka-mieta-papilotka.png",
    },
    {
      id: "landrynka",
      slug: "pralinka-landrynka",
      color: "Landrynka",
      cardImage: "/images/pralinki/pralinka-landrynka-papilotka.png",
    },
    {
      id: "makowka",
      slug: "pralinka-makowka",
      color: "Makówka",
      cardImage: "/images/pralinki/pralinka-makowka-papilotka.png",
    },
    {
      id: "wisnia",
      slug: "pralinka-wisnia-w-czekoladzie",
      color: "Wiśnia w czekoladzie",
      cardImage: "/images/pralinki/pralinka-wisnia-papilotka.png",
    },
  ];

  const mainView = document.getElementById("pralinkiMainView");
  const collectionView = document.getElementById("pralinkiCollectionView");
  const selectionScreen = document.getElementById("pralinkiSelectionScreen");
  const selectionTitle = document.getElementById("pralinkiSelectionTitle");
  const carouselTrack = document.getElementById("pralinkiCarouselTrack");
  const carouselStatus = document.getElementById("pralinkiCarouselStatus");
  const previousButton = document.getElementById("pralinkiCarouselPrevious");
  const nextButton = document.getElementById("pralinkiCarouselNext");
  const backButton = document.querySelector(".back-button");
  const artwork = document.querySelector(".pralinki-artwork");
  const artworkImage = document.querySelector(".pralinki-artwork-image");
  const hotspotsLayer = document.querySelector(".pralinki-hotspots");

  if (
    !mainView ||
    !collectionView ||
    !selectionScreen ||
    !selectionTitle ||
    !carouselTrack ||
    !carouselStatus ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  const wordmarkPath = "/images/logo-pralinki.png";
  let activeIndex = 0;
  let lastTrigger = null;
  let touchStartX = null;
  let isSelectionOpen = false;

  function getAssetUrl(path) {
    return typeof resolveAssetPath === "function"
      ? resolveAssetPath(path)
      : path.replace(/^\//, "");
  }

  function getProductData(product) {
    return typeof getProductBySlug === "function"
      ? getProductBySlug(product.slug)
      : null;
  }

  function getProductDetailsUrl(product) {
    const productPath = typeof toSitePath === "function"
      ? toSitePath("produkt/")
      : "../produkt/";
    return `${productPath}?slug=${encodeURIComponent(product.slug)}`;
  }

  function formatPrice(amount) {
    return `${new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(amount)} zł`;
  }

  function createPriceMarkup(product) {
    const productData = getProductData(product);
    const price = Number.isFinite(productData?.price) ? productData.price : null;
    const regularPrice = Number.isFinite(productData?.regularPrice)
      ? productData.regularPrice
      : null;
    const hasDiscount = price !== null && regularPrice !== null && regularPrice > price;
    const priceNode = document.createElement("div");
    priceNode.className = "pralinki-card-price";

    if (hasDiscount) {
      priceNode.innerHTML = `
        <div class="pralinki-card-price-values">
          <del><span class="visually-hidden">Cena regularna: </span>${formatPrice(regularPrice)}</del>
          <strong><span class="visually-hidden">Cena: </span>${formatPrice(price)}</strong>
        </div>
        <span class="pralinki-card-price-note">CENA PREORDER<br>TYLKO PRZEZ TEN<br>TYDZIEŃ</span>
      `;
    } else if (price !== null) {
      priceNode.innerHTML = `
        <div class="pralinki-card-price-values">
          <strong>${formatPrice(price)}</strong>
        </div>
      `;
    } else {
      priceNode.innerHTML = `
        <div class="pralinki-card-price-values">
          <span class="pralinki-card-price-unavailable">Zapytaj o cenę</span>
        </div>
      `;
    }

    return priceNode;
  }

  function createProductCard(product, position) {
    const card = document.createElement("article");
    const isActive = position === 0;
    const productIndex = products.indexOf(product);
    const productData = getProductData(product);
    card.className = `pralinki-product-card${isActive ? " is-active" : ""}`;
    card.dataset.position = isActive ? "center" : position < 0 ? "previous" : "next";
    card.setAttribute("aria-current", isActive ? "true" : "false");

    const selector = document.createElement("button");
    selector.type = "button";
    selector.className = "pralinki-product-card-select";
    selector.dataset.carouselSelect = product.id;
    selector.setAttribute("aria-pressed", String(isActive));
    selector.setAttribute(
      "aria-label",
      isActive
        ? `Wybrana torebka: Pralinka ${product.color}`
        : `Pokaż pośrodku: Pralinka ${product.color}`,
    );

    const modelLabel = document.createElement("span");
    modelLabel.className = "pralinki-card-model-label";
    modelLabel.textContent = "model";

    const wordmark = document.createElement("img");
    wordmark.className = "pralinki-card-wordmark";
    wordmark.src = getAssetUrl(wordmarkPath);
    wordmark.alt = "";
    wordmark.width = 2635;
    wordmark.height = 752;
    wordmark.decoding = "async";

    const colorLabel = document.createElement("span");
    colorLabel.className = "pralinki-card-color-label";
    colorLabel.textContent = "kolor";

    const colorName = document.createElement("span");
    colorName.className = "pralinki-card-color-name";
    colorName.textContent = product.color;

    const imageFrame = document.createElement("a");
    imageFrame.className = "pralinki-card-image-frame";
    imageFrame.href = getProductDetailsUrl(product);

    const productImage = document.createElement("img");
    productImage.className = "pralinki-card-image";
    productImage.src = getAssetUrl(product.cardImage);
    productImage.alt = `Pralinka ${product.color}`;
    productImage.loading = isActive ? "eager" : "lazy";
    productImage.decoding = "async";
    productImage.draggable = false;
    imageFrame.appendChild(productImage);

    selector.append(modelLabel, wordmark, colorLabel, colorName);

    const footer = document.createElement("div");
    footer.className = "pralinki-product-card-footer";
    footer.appendChild(createPriceMarkup(product));

    const detailsLink = document.createElement("a");
    detailsLink.className = "pralinki-card-details-link";
    detailsLink.href = getProductDetailsUrl(product);
    detailsLink.textContent = "DOWIEDZ SIĘ WIĘCEJ...";
    detailsLink.setAttribute("aria-label", `Dowiedz się więcej o torebce Pralinka ${product.color}`);
    footer.appendChild(detailsLink);

    card.append(imageFrame, selector, footer);
    card.dataset.productIndex = String(productIndex);
    card.dataset.productSlug = productData?.slug || product.slug;
    return card;
  }

  function getWrappedIndex(index) {
    return (index + products.length) % products.length;
  }

  function renderCarousel() {
    const fragment = document.createDocumentFragment();

    [-1, 0, 1].forEach((position) => {
      const product = products[getWrappedIndex(activeIndex + position)];
      fragment.appendChild(createProductCard(product, position));
    });

    carouselTrack.replaceChildren(fragment);
    selectionTitle.textContent = `Pralinka — ${products[activeIndex].color}`;
    carouselStatus.textContent = `Wybrana torebka: Pralinka ${products[activeIndex].color}. ${activeIndex + 1} z ${products.length}.`;
  }

  function setActiveProduct(productId) {
    const nextIndex = products.findIndex((product) => product.id === productId);
    if (nextIndex < 0 || nextIndex === activeIndex) return;

    activeIndex = nextIndex;
    renderCarousel();
    focusActiveCard();
  }

  function moveCarousel(direction) {
    activeIndex = getWrappedIndex(activeIndex + direction);
    renderCarousel();
  }

  function focusActiveCard() {
    const activeProductId = products[activeIndex]?.id;
    const activeCardButton = activeProductId
      ? carouselTrack.querySelector(`[data-carousel-select="${activeProductId}"]`)
      : null;
    (activeCardButton || selectionTitle).focus({ preventScroll: true });
  }

  function openSelection(productId, trigger) {
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex < 0) return;

    activeIndex = productIndex;
    lastTrigger = trigger instanceof HTMLElement ? trigger : null;
    isSelectionOpen = true;
    renderCarousel();

    mainView.hidden = true;
    mainView.inert = true;
    selectionScreen.hidden = false;
    selectionScreen.setAttribute("aria-hidden", "false");
    document.body.classList.add("pralinki-selection-open");

    if (backButton) {
      backButton.setAttribute("aria-label", "Wróć do kolekcji Pralinki");
    }

    window.requestAnimationFrame(focusActiveCard);
  }

  function closeSelection({ restoreFocus = true } = {}) {
    if (!isSelectionOpen) return;

    isSelectionOpen = false;
    selectionScreen.hidden = true;
    selectionScreen.setAttribute("aria-hidden", "true");
    mainView.hidden = false;
    mainView.inert = false;
    document.body.classList.remove("pralinki-selection-open");

    if (backButton) {
      backButton.setAttribute("aria-label", "Wróć na stronę główną");
    }

    const triggerToRestore = lastTrigger;
    lastTrigger = null;
    if (restoreFocus && triggerToRestore?.isConnected) {
      triggerToRestore.focus({ preventScroll: true });
    }
  }

  function syncHotspotsWithArtwork() {
    if (!artwork || !artworkImage || !hotspotsLayer) return;

    const artworkBounds = artwork.getBoundingClientRect();
    const imageWidth = artworkImage.naturalWidth;
    const imageHeight = artworkImage.naturalHeight;

    if (!artworkBounds.width || !artworkBounds.height || !imageWidth || !imageHeight) {
      return;
    }

    const coverScale = Math.max(
      artworkBounds.width / imageWidth,
      artworkBounds.height / imageHeight,
    );
    const renderedWidth = imageWidth * coverScale;
    const renderedHeight = imageHeight * coverScale;

    hotspotsLayer.style.width = `${renderedWidth}px`;
    hotspotsLayer.style.height = `${renderedHeight}px`;
    hotspotsLayer.style.left = `${(artworkBounds.width - renderedWidth) / 2}px`;
    hotspotsLayer.style.top = `${(artworkBounds.height - renderedHeight) / 2}px`;
  }

  if (artwork && artworkImage && hotspotsLayer) {
    artworkImage.addEventListener("load", syncHotspotsWithArtwork);
    window.addEventListener("resize", syncHotspotsWithArtwork, { passive: true });

    if (typeof ResizeObserver === "function") {
      const artworkResizeObserver = new ResizeObserver(syncHotspotsWithArtwork);
      artworkResizeObserver.observe(artwork);
    }

    syncHotspotsWithArtwork();
  }

  document.addEventListener("click", (event) => {
    const hotspot = event.target.closest("[data-pralinka]");
    if (!hotspot) return;

    event.preventDefault();
    openSelection(hotspot.dataset.pralinka, hotspot);
  });

  carouselTrack.addEventListener("click", (event) => {
    const selector = event.target.closest("[data-carousel-select]");
    if (!selector) return;
    setActiveProduct(selector.dataset.carouselSelect);
  });

  previousButton.addEventListener("click", () => moveCarousel(-1));
  nextButton.addEventListener("click", () => moveCarousel(1));

  carouselTrack.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  carouselTrack.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const swipeDistance = touchEndX - touchStartX;
    touchStartX = null;

    if (Math.abs(swipeDistance) < 45) return;
    moveCarousel(swipeDistance < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (!isSelectionOpen || document.body.classList.contains("menu-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeSelection();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCarousel(-1);
      focusActiveCard();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(1);
      focusActiveCard();
    }
  });

  if (backButton) {
    backButton.addEventListener("click", (event) => {
      if (!isSelectionOpen) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      closeSelection();
    }, { capture: true });
  }
})();
