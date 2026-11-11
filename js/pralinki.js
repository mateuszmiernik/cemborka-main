(() => {
  const products = [
    {
      id: "landrynka",
      color: "Landrynka",
      cardImage: "/images/WIZUALIZACJE/landrynka_w papilotce.webp",
      productImage: "/images/pralinki/landrynka.webp",
      productAlt: "Pralinka Landrynka — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "mieta",
      color: "Mięta w czekoladzie",
      cardImage: "/images/WIZUALIZACJE/mięta w wczekoladzie_w papilotce.webp",
      productImage: "/images/pralinki/mięta w czekoladzie.webp",
      productAlt: "Pralinka Mięta w czekoladzie — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "zurawina",
      color: "Żurawina",
      cardImage: "/images/WIZUALIZACJE/żurawina_w papilotce.webp",
      productImage: "/images/pralinki/żurawina.webp",
      productAlt: "Pralinka Żurawina — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "makowka",
      color: "Makówka",
      cardImage: "/images/WIZUALIZACJE/makówka_w papilotce.webp",
      productImage: "/images/pralinki/makówka.webp",
      productAlt: "Pralinka Makówka — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "sliwka",
      color: "Śliwka",
      cardImage: "/images/WIZUALIZACJE/śliwka_w papilotce.webp",
      productImage: "/images/pralinki/śliwka.webp",
      productAlt: "Pralinka Śliwka — zdjęcie torebki na tle tkaniny",
    },
    {
      id: "wisnia",
      color: "Wiśnia w czekoladzie",
      cardImage: "/images/WIZUALIZACJE/wiśnia w czekoladzie_w papilotce.webp",
      productImage: "/images/pralinki/wiśnia w czekoladzie.webp",
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
        src: "/images/pralinki/Pralinka_wymiarowanie1.webp",
        alt: "Wymiary Pralinki: szerokość 32 cm, wysokość torebki 24 cm i minimalna długość rączki 15 cm",
      },
      {
        src: "/images/pralinki/Pralinka_wymiarowanie2.webp",
        alt: "Wymiary Pralinki: szerokość 32 cm, wysokość torebki 24 cm i maksymalna długość rączki 50 cm",
      },
    ],
  }));

  const dialog = document.getElementById("pralinkiGallery");
  const galleryImage = document.getElementById("pralinkiGalleryImage");
  const galleryColor = document.getElementById("pralinkiGalleryColor");
  const galleryCounter = document.getElementById("pralinkiGalleryCounter");
  const thumbnailsContainer = document.getElementById("pralinkiGalleryThumbnails");
  const optionsContainer = document.getElementById("pralinkiColorOptions");
  const stage = dialog?.querySelector(".pralinki-gallery-stage");
  const closeButton = dialog?.querySelector("[data-gallery-close]");

  if (
    !dialog ||
    !galleryImage ||
    !galleryColor ||
    !galleryCounter ||
    !thumbnailsContainer ||
    !optionsContainer ||
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

  function renderColorOptions() {
    products.forEach((product) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "pralinki-color-option";
      option.dataset.pralinka = product.id;
      option.setAttribute("aria-label", `Otwórz galerię: Pralinka, ${product.color}`);
      option.setAttribute("aria-controls", "pralinkiGallery");
      option.textContent = product.color;
      optionsContainer.appendChild(option);
    });
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

  renderColorOptions();

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
