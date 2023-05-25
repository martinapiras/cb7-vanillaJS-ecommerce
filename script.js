import {
  heroImgGen,
  createCard,
  createProductModal,
  createCartModal,
  createLogin,
} from "./fn.js";

// HERO //
const heroImages = [
  {
    id: 1,
    alt: "hero1",
    src: "https://picsum.photos/1200/800?1",
  },
  {
    id: 2,
    alt: "hero2",
    src: "https://picsum.photos/1200/800?2",
  },
  {
    id: 3,
    alt: "hero3",
    src: "https://picsum.photos/1200/800?3",
  },
  {
    id: 4,
    alt: "hero4",
    src: "https://picsum.photos/1200/800?4",
  },
];
const heroEl = document.querySelector(".hero");
const heroContentEl = document.createElement("div");
const heroTitleEl = document.createElement("h1");
const heroButtonEl = document.createElement("button");

// PRODUCTS //
export const productsEl = document.querySelector(".products");
const modalEl = document.querySelector(".modal");
let productsObj = [];

// PRODUCTS SEARCH //
let userSearch = "";
const searchbarEl = document.querySelector(".search");

// FILTERS //
// CATEGORY
const categoryFilter = document.querySelector(".category");
let categoryChoice = "";
// PRICE
const priceFilter = document.querySelector(".price");
let priceChoice = "";
// RATING
const ratingFilter = document.querySelector(".rating");
let ratingChoice = "";

// CART //
export let cartItems = [];
export const cartBtnEl = document.querySelector(".cartBtn");
const cartAfterEl = document.querySelector(".cart:after");
export const cartModalWrapperEl = document.querySelector(".cartModalWrapper");

// HAMBURGER MENU //
const hamburgerMenuIconEl = document.querySelector(".hamburgerMenu");
const hamburgerMenuEl = document.querySelector(".hamburgerMenu__contents");

//////////////////////////////////////////

heroContentEl.className = "heroContent";
heroTitleEl.className = "heroContent__title";
heroButtonEl.className = "heroContent__button";
heroTitleEl.textContent =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, corrupti?";
heroButtonEl.textContent = "Shop Now →";

//////////////////////////////////////////

heroContentEl.append(heroTitleEl, heroButtonEl);
heroEl.append(heroContentEl);
heroImages.forEach((image) => heroEl.append(heroImgGen(image)));

// HERO CAROUSEL //
export const allImages = document.querySelectorAll(".heroImage");
export let currentImage = 0;
export let totalImages = allImages.length - 1;

document.querySelector(".body").append(createLogin());

//////////////////////////////////////////

// loops through hero images
setInterval(() => {
  if (currentImage === totalImages) {
    currentImage = 0;
  } else {
    currentImage++;
  }

  allImages.forEach((image, i) => {
    image.style.transform = `translateX(${(i - currentImage) * 100}%)`;
  });
}, 3000);

/////////////////// ASYNC ///////////////////
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    productsObj = data;
    productsObj.products.forEach((product) => {
      productsEl.append(createCard(product));
    });
  });

/////////////////// EVENTS ///////////////////
// PRODUCTS SEARCH //
searchbarEl.addEventListener("input", (e) => {
  userSearch = e.target.value;
  if (userSearch.length >= 3) {
    productsEl.textContent = "";

    productsObj.products
      .filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .forEach((obj) => productsEl.append(createCard(obj)));
  } else if (userSearch.length <= 3) {
    productsEl.textContent = "";
    productsObj.products.forEach((obj) => productsEl.append(createCard(obj)));
  }

  const allCards = document.querySelectorAll(".productCard");
  allCards.forEach((product) =>
    product.addEventListener("click", () =>
      fetch(`https://dummyjson.com/products/${product.id}`)
        .then((res) => res.json())
        .then((data) => productsEl.append(createProductModal(data)))
    )
  );
});

// FILTERS //
// CATEGORY
categoryFilter.addEventListener("change", (evt) => {
  categoryChoice = evt.target.value;

  if (categoryChoice !== "category") {
    productsEl.textContent = "";
    productsObj.products
      .filter((product) => product.category === categoryChoice)
      .forEach((obj) => productsEl.append(createCard(obj)));
  } else {
    productsEl.textContent = "";
    productsObj.products.forEach((obj) => productsEl.append(createCard(obj)));
  }

  const allCards = document.querySelectorAll(".productCard");
  allCards.forEach((product) =>
    product.addEventListener("click", () =>
      fetch(`https://dummyjson.com/products/${product.id}`)
        .then((res) => res.json())
        .then((data) => productsEl.append(createProductModal(data)))
    )
  );
});
// PRICE
priceFilter.addEventListener("change", (e) => {
  priceChoice = e.target.value;

  if (priceChoice === "HtL") {
    productsEl.textContent = "";
    productsObj.products
      .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      .forEach((obj) => productsEl.append(createCard(obj)));
  } else if (priceChoice === "LtH") {
    productsEl.textContent = "";
    productsObj.products
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      .forEach((obj) => productsEl.append(createCard(obj)));
  } else {
    productsEl.textContent = "";
    productsObj.products
      .sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
      .forEach((obj) => productsEl.append(createCard(obj)));
  }

  const allCards = document.querySelectorAll(".productCard");
  allCards.forEach((product) =>
    product.addEventListener("click", () =>
      fetch(`https://dummyjson.com/products/${product.id}`)
        .then((res) => res.json())
        .then((data) => productsEl.append(createProductModal(data)))
    )
  );
});
// RATING
ratingFilter.addEventListener("change", (e) => {
  ratingChoice = e.target.value;

  if (ratingChoice === "HtL") {
    productsEl.textContent = "";
    productsObj.products
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .forEach((obj) => productsEl.append(createCard(obj)));
  } else if (ratingChoice === "LtH") {
    productsEl.textContent = "";
    productsObj.products
      .sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating))
      .forEach((obj) => productsEl.append(createCard(obj)));
  } else {
    productsEl.textContent = "";
    productsObj.products
      .sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
      .forEach((obj) => productsEl.append(createCard(obj)));
  }

  const allCards = document.querySelectorAll(".productCard");
  allCards.forEach((product) =>
    product.addEventListener("click", () =>
      fetch(`https://dummyjson.com/products/${product.id}`)
        .then((res) => res.json())
        .then((data) => productsEl.append(createProductModal(data)))
    )
  );
});

// CART //
cartBtnEl.addEventListener("click", () => {
  cartModalWrapperEl.append(createCartModal(cartItems));

  cartBtnEl.disabled = true;

  hamburgerMenuEl.classList.toggle("hamburgerMenu__visible");
});

// HAMBURGER MENU //
hamburgerMenuIconEl.addEventListener("click", () => {
  hamburgerMenuEl.classList.toggle("hamburgerMenu__visible");
});
