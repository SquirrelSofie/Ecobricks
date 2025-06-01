//carousel scrolling on click and drag//
const container = document.querySelector(".carousel-container");

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  container.classList.add("dragging");
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
  isDown = false;
  container.classList.remove("dragging");
});

container.addEventListener("mouseup", () => {
  isDown = false;
  container.classList.remove("dragging");
});

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fastness
  container.scrollLeft = scrollLeft - walk;
});

//hjerte ikon skifter svg ved click//
const hearts = document.querySelectorAll(".hjerte-overlay");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    const isFavorite = heart.classList.toggle("favorited");

    // Swap the image source depending on the state
    if (isFavorite) {
      heart.src = "./svg/HEART_FILLED.svg";
      heart.alt = "Remove from favorites";
    } else {
      heart.src = "./svg/HEART.svg";
      heart.alt = "Add to favorites";
    }
  });
});

// Vi leger her!
let products = [];

async function loadProducts() {
  try {
    const res = await fetch("/products.json");
    products = await res.json();
    console.log("Loaded products:", products);
    // You can now work with `products` here or call other functions

    buildCarouselItems();
  } catch (err) {
    console.error("Failed to load products.json:", err);
  }
}

loadProducts();

// Okay. Lad os prøve at lave divs dynamisk
function buildCarouselItems() {
  const productContainer = document.querySelector(".carousel-track");
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("carousel-item");

    productDiv.innerHTML = `
    <div class="billede-wrapper">
      <img src="./svg/HEART.svg" alt="HJERTE" class="hjerte-overlay" />
      <img src="${product.image}" alt="${product.name}" class="product-image">
    </div>
    <div class="produkt-info-flex">
      <img src="./svg/fødselsdagskage_ikon.svg" alt="Alder" class="produkt-ikon" />
      <p class="produkt-p">${product.ageGroup}+</p>
      <img src="./svg/cube_ikon2.svg" alt="Klodser" class="produkt-ikon" />
      <p class="produkt-p">${product.brickAmount}</p>
      <img src="./svg/stjerne_ikon.svg" alt="Stjerner" class="produkt-ikon" />
      <p class="produkt-p">${product.stars}</p>
    </div>
    <p class="produkt-h">${product.name}</p>
    <p class="produkt-pris">${product.price} kr.</p>
    <button>
      <img src="./svg/kurv-ikon.svg" alt="kurv" class="produkt-kurv-ikon" />
      <p class="produkt-knap">FØJ TIL KURV</p>
    </button>
    `;

    productContainer.appendChild(productDiv);
  });
}
