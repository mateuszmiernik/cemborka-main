(() => {
  const products = [
    {
      id: "landrynka",
      color: "Landrynka",
      cardImage: "/images/WIZUALIZACJE/landrynka_w papilotce.webp",
      productImage: "/images/pralinki/pralinka-landrynka-main.webp",
      productAlt: "Pralinka Landrynka — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "mieta",
      color: "Mięta w czekoladzie",
      cardImage: "/images/WIZUALIZACJE/mięta w wczekoladzie_w papilotce.webp",
      productImage: "/images/pralinki/pralinka-mieta-main.webp",
      productAlt: "Pralinka Mięta w czekoladzie — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "zurawina",
      color: "Żurawina",
      cardImage: "/images/WIZUALIZACJE/żurawina_w papilotce.webp",
      productImage: "/images/pralinki/pralinka-zurawina-main.webp",
      productAlt: "Pralinka Żurawina — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "makowka",
      color: "Makówka",
      cardImage: "/images/WIZUALIZACJE/makówka_w papilotce.webp",
      productImage: "/images/pralinki/pralinka-makowka-main.webp",
      productAlt: "Pralinka Makówka — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "sliwka",
      color: "Śliwka",
      cardImage: "/images/WIZUALIZACJE/śliwka_w papilotce.webp",
      productImage: "/images/pralinki/pralinka-sliwka-main.webp",
      productAlt: "Pralinka Śliwka — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "wisnia",
      color: "Wiśnia w czekoladzie",
      cardImage: "/images/WIZUALIZACJE/wiśnia w czekoladzie_w papilotce.webp",
      productImage: "/images/pralinki/pralinka-wisnia-main.webp",
      productAlt: "Pralinka Wiśnia w czekoladzie — zdjęcie torebki na tle tkaniny",
    },
  ].map((product) => ({
    ...product,
    gallery: [
      {
        src: product.cardImage,
        alt: `Pralinka ${product.color} w papilotce`,
      },
      {
        src: product.productImage,
        alt: product.productAlt,
      },
      {
        src: "/images/pralinki/wymiarowanie_pralinka_1.webp",
        alt: "Wymiary Pralinki: szerokość 32 cm, wysokość torebki 24 cm i minimalna długość rączki 15 cm",
      },
      {
        src: "/images/pralinki/wymiarowanie_pralinka_2.webp",
        alt: "Wymiary Pralinki: szerokość 32 cm, wysokość torebki 24 cm i maksymalna długość rączki 50 cm",
      },
    ],
  }));

  const dialog = document.getElementById("pralinkiGallery");
  const galleryImage = document.getElementById("pralinkiGalleryImage");
  const galleryColor = document.getElementById("pralinkiGalleryColor");
  const galleryCounter = document.getElementById("pralinkiGalleryCounter");
  const thumbnailsContainer = document.getElementById("pralinkiGalleryThumbnails");
  const stage = dialog?.querySelector(".pralinki-gallery-stage");
  const closeButton = dialog?.querySelector("[data-gallery-close]");
  const artwork = document.querySelector(".pralinki-artwork");
  const artworkImage = document.querySelector(".pralinki-artwork-image");
  const hotspotsLayer = document.querySelector(".pralinki-hotspots");

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

  if (
    !dialog ||
    !galleryImage ||
    !galleryColor ||
    !galleryCounter ||
    !thumbnailsContainer ||
    !stage ||
    !closeButton
  ) {
    return;
  }

  let activeProduct = null;
  let activeSlideIndex = 0;
  let lastTrigger = null;
  let touchStartX = null;

  function getAssetUrl(path) {
    return typeof resolveAssetPath === "function"
      ? resolveAssetPath(path)
      : path.replace(/^\//, "");
  }

  function renderThumbnails() {
    thumbnailsContainer.replaceChildren();

    activeProduct.gallery.forEach((slide, index) => {
      const thumbnail = document.createElement("button");
      thumbnail.type = "button";
      thumbnail.className = "pralinki-gallery-thumbnail";
      thumbnail.setAttribute("aria-label", `Pokaż zdjęcie ${index + 1}: ${slide.alt}`);
      thumbnail.setAttribute("aria-pressed", String(index === activeSlideIndex));

      if (index === activeSlideIndex) {
        thumbnail.classList.add("is-active");
      }

      const thumbnailImage = document.createElement("img");
      thumbnailImage.src = getAssetUrl(slide.src);
      thumbnailImage.alt = "";
      thumbnailImage.loading = "lazy";
      thumbnailImage.decoding = "async";
      thumbnail.appendChild(thumbnailImage);
      thumbnail.addEventListener("click", () => showSlide(index));
      thumbnailsContainer.appendChild(thumbnail);
    });
  }

  function showSlide(index) {
    if (!activeProduct) return;

    activeSlideIndex = (index + activeProduct.gallery.length) % activeProduct.gallery.length;
    const slide = activeProduct.gallery[activeSlideIndex];

    galleryImage.src = getAssetUrl(slide.src);
    galleryImage.alt = slide.alt;
    galleryColor.textContent = activeProduct.color;
    galleryCounter.textContent = `ZDJĘCIE ${String(activeSlideIndex + 1).padStart(2, "0")} / ${String(activeProduct.gallery.length).padStart(2, "0")}`;

    renderThumbnails();
  }

  function moveSlide(direction) {
    if (!activeProduct) return;
    showSlide(activeSlideIndex + direction);
  }

  function openGallery(productId, trigger) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    activeProduct = product;
    activeSlideIndex = 0;
    lastTrigger = trigger instanceof HTMLElement ? trigger : null;
    showSlide(activeSlideIndex);

    if (!dialog.open) {
      dialog.showModal();
      document.body.classList.add("pralinki-gallery-open");
    }

    closeButton.focus();
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-pralinka]");
    if (!trigger) return;

    event.preventDefault();
    openGallery(trigger.dataset.pralinka, trigger);
  });

  dialog.querySelector("[data-gallery-previous]")?.addEventListener("click", () => moveSlide(-1));
  dialog.querySelector("[data-gallery-next]")?.addEventListener("click", () => moveSlide(1));
  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("pralinki-gallery-open");
    if (lastTrigger?.isConnected) lastTrigger.focus();
    lastTrigger = null;
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSlide(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSlide(1);
    }
  });

  stage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  stage.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const swipeDistance = touchEndX - touchStartX;
    touchStartX = null;

    if (Math.abs(swipeDistance) < 45) return;
    moveSlide(swipeDistance < 0 ? 1 : -1);
  }, { passive: true });
})();
