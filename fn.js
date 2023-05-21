import {
  heroImages,
  heroEl,
  heroContentEl,
  heroTitleEl,
  heroButtonEl,
  allImages,
  currentImage,
  totalImages,
  productsEl,
  modalEl,
  productsObj,
  userSearch,
  searchbarEl,
  categoryFilter,
  categoryChoice,
  priceFilter,
  priceChoice,
  ratingFilter,
  ratingChoice,
  cartItems,
  cartBtnEl,
  cartModalWrapperEl,
  hamburgerMenuEl,
  hamburgerMenuIconEl,
} from "./script.js";

import userData from "./credentials.js";

//////////////////// HERO ///////////////////////
export const heroImgGen = (image) => {
  const heroImageEl = document.createElement("div");
  const heroImg = document.createElement("img");

  heroImageEl.className = "heroImage";
  heroImg.src = image.src;
  heroImg.alt = image.alt;

  heroImageEl.appendChild(heroImg);
  return heroImageEl;
};

//////////////////// PRODUCTS ///////////////////////
export const createCard = (data) => {
  const cardEl = document.createElement("div");
  const cardImgEl = document.createElement("img");
  const cardContentEl = document.createElement("div");
  const cardTextEl = document.createElement("div");
  const cardTitleEl = document.createElement("p");
  const cardPriceEl = document.createElement("h3");
  const cardRatingEl = document.createElement("p");

  cardEl.className = "productCard";
  cardEl.setAttribute("id", data.id);
  cardContentEl.className = "cardContent";
  cardTextEl.className = "cardText";
  cardTitleEl.className = "cardTitle";
  cardPriceEl.className = "cardPrice";
  cardRatingEl.className = "cardRating";

  cardImgEl.src = data.thumbnail;
  cardImgEl.alt = data.title;
  cardTitleEl.textContent = data.title;
  cardRatingEl.textContent = data.rating + " ⭐";
  cardPriceEl.textContent = data.price + " €";

  cardTextEl.append(cardTitleEl, cardRatingEl, cardPriceEl);
  cardContentEl.appendChild(cardTextEl);

  cardEl.append(cardImgEl, cardContentEl);

  return cardEl;
};

//////////////////// PRODUCT MODAL ///////////////////////
export const createProductModal = (productData) => {
  const overlayEl = document.createElement("div");
  const wrapperEl = document.createElement("div");

  const galleryEl = document.createElement("div");
  const mainImgEl = document.createElement("img");

  const textEl = document.createElement("div");
  const mainTextEl = document.createElement("div");
  const mainTextTitleEl = document.createElement("h1");
  const mainTextDescEl = document.createElement("p");
  const mainTextRateEl = document.createElement("p");
  const mainTextPriceEl = document.createElement("p");

  const buyTextEl = document.createElement("div");
  const buyFirstBtnEl = document.createElement("button");
  const buySecondBtnEl = document.createElement("button");

  overlayEl.className = "modalOverlay";
  wrapperEl.className = "modalProduct";
  galleryEl.className = "modalProduct__gallery";
  mainImgEl.src = productData.thumbnail;
  mainImgEl.alt = productData.title;

  textEl.className = "modalProduct__text";
  mainTextEl.className = "modalMainText";
  mainTextPriceEl.className = "mainTextPrice";
  mainTextTitleEl.textContent = productData.title;
  mainTextDescEl.textContent = productData.description;
  mainTextRateEl.textContent = productData.rating + " ⭐";
  mainTextPriceEl.textContent = productData.price + " €";

  buyTextEl.className = "modalMainBuy";
  buyFirstBtnEl.className = "buyButton";
  buySecondBtnEl.className = "exitButton";
  buyFirstBtnEl.textContent = "Buy Now";
  buySecondBtnEl.textContent = "Back to Products";

  mainTextEl.append(
    mainTextTitleEl,
    mainTextDescEl,
    mainTextRateEl,
    mainTextPriceEl
  );
  buyTextEl.append(buyFirstBtnEl, buySecondBtnEl);
  galleryEl.append(mainImgEl);
  textEl.append(mainTextEl, buyTextEl);
  wrapperEl.append(overlayEl, galleryEl, textEl);

  buySecondBtnEl.addEventListener("click", () =>
    wrapperEl.parentElement.removeChild(wrapperEl)
  );

  overlayEl.addEventListener("click", () =>
    wrapperEl.parentElement.removeChild(wrapperEl)
  );

  buyFirstBtnEl.addEventListener("click", () => {
    confirm("Added to cart!");
    cartItems.push(productData);
    wrapperEl.parentElement.removeChild(wrapperEl);
  });

  return wrapperEl;
};

//////////////////// CART ///////////////////////
export const createCartModal = (cartItems) => {
  const cartModalEl = document.createElement("div");
  const titleEl = document.createElement("h3");
  const totalItemsEl = document.createElement("h4");
  const totalPriceEl = document.createElement("h4");
  const cartCloseBtnEl = document.createElement("button");

  cartModalEl.className = "cartWrapper__active";
  titleEl.className = "cartTitle";
  totalItemsEl.className = "cartTotalItems";
  totalPriceEl.className = "cartTotalPrice";
  cartCloseBtnEl.className = "closeCart";

  titleEl.textContent = "Your cart";
  cartCloseBtnEl.textContent = "X";

  if (cartItems.length === 1) {
    totalItemsEl.textContent = "There is 1 item in your cart";
  } else {
    totalItemsEl.textContent = `There are ${cartItems.length} items in your cart`;
  }

  totalPriceEl.textContent = `Total: ${cartItems.reduce(
    (acc, item) => acc + item.price,
    0
  )}€`;

  cartModalEl.append(cartCloseBtnEl, titleEl);

  cartItems.forEach((item) => {
    cartModalEl.append(createCard(item), totalPriceEl, totalItemsEl);
    cartModalWrapperEl.appendChild(cartModalEl);
  });

  cartCloseBtnEl.addEventListener("click", () => {
    cartModalWrapperEl.removeChild(cartModalEl);
    cartBtnEl.disabled = false;
  });

  return cartModalEl;
};

//////////////////// LOGIN ///////////////////////
export const createLogin = () => {
  const loginWrapperEl = document.createElement("form");
  const titleEl = document.createElement("h2");
  const usernameInputEl = document.createElement("input");
  const passwordInputEl = document.createElement("input");
  const submitEl = document.createElement("input");

  loginWrapperEl.className = "loginModal";
  titleEl.className = "loginTitle";
  titleEl.textContent = "Welcome back!";
  usernameInputEl.setAttribute("type", "text");
  usernameInputEl.setAttribute("placeholder", "Username");
  passwordInputEl.setAttribute("type", "password");
  passwordInputEl.setAttribute("placeholder", "Password");
  submitEl.setAttribute("type", "submit");
  submitEl.setAttribute("value", "Enter");

  document.querySelector(".header").style.display = "none";
  document.querySelector(".hero").style.display = "none";
  document.querySelector(".featured").style.display = "none";
  document.querySelector(".filters").style.display = "none";
  document.querySelector(".body").removeChild(productsEl);

  submitEl.addEventListener("click", (e) => {
    e.preventDefault();

    const credentialsMatch = !!userData.find(
      (user) =>
        user.username === loginWrapperEl[0].value &&
        user.password === loginWrapperEl[1].value
    );

    if (credentialsMatch) {
      alert("Welcome back!");
      document.querySelector(".body").removeChild(loginWrapperEl);
      document.querySelector(".header").style.display = "flex";
      document.querySelector(".hero").style.display = "flex";
      document.querySelector(".featured").style.display = "block";
      document.querySelector(".filters").style.display = "flex";
      document.querySelector(".body").append(productsEl);

      const allCards = document.querySelectorAll(".productCard");

      allCards.forEach((product) =>
        product.addEventListener("click", () =>
          fetch(`https://dummyjson.com/products/${product.id}`)
            .then((res) => res.json())
            .then((data) => productsEl.append(createProductModal(data)))
        )
      );
    } else {
      alert("Your username and/or password is incorrect");
    }
  });

  loginWrapperEl.append(titleEl, usernameInputEl, passwordInputEl, submitEl);

  return loginWrapperEl;
};
