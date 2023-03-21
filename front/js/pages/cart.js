import { getCart, removeProductFromCart } from "../store/cart.js";
import {
  setLocalStore,
  removeFromLocalStore,
  getLocalStore,
  initLocalStore,
} from "../store/localStore.js";

const cartItemContainer = document.getElementById("cart__items");

window.onload = async () => {
  initLocalStore().then(store => {
    displayItems(store);
  });
};

const deleteItemHandler = event => {
  event.preventDefault();
  const itemId = event.target.closest("article").getAttribute("data-id");
  removeProductFromCart(itemId);
  removeFromLocalStore(itemId);
  const cartItem = document.querySelector(`[data-id="${itemId}"]`);
  cartItem.remove();
  setTotal(localStore);
};

const displayItems = items => {
  if (items.length > 0) {
    items.forEach(item => {
      itemLayout(item);
    });
  } else {
    const emptyCart = document.createElement("p");
    emptyCart.innerText = "Votre panier est vide";
    cartItemContainer.appendChild(emptyCart);
  }
};

const itemLayout = async item => {
  //create abstract functions to manipulate the DOM with setAttribute and a list for each element to create, iterate, then return result
  const { _id, color, quantity, imageUrl, altTxt, price } = item;

  const cartItem = document.createElement("article");
  cartItem.className = "cart__item";
  cartItem.setAttribute("data-id", _id);
  cartItem.setAttribute("data-color", color);

  const cartItemImgContainer = document.createElement("div");
  cartItemImgContainer.className = "cart__item__img";
  const cartItemImage = document.createElement("img");
  cartItemImage.src = imageUrl;
  cartItemImage.alt = altTxt;

  const cartItemContent = document.createElement("div");
  cartItemContent.className = "cart__item__content";

  const cartItemContentDesc = document.createElement("div");
  cartItemContentDesc.className = "cart__item__content__titlePrice";

  const productName = document.createElement("h2");
  productName.innerText = name;

  const productColor = document.createElement("p");
  productColor.innerText = color;
  const productPrice = document.createElement("p");
  productPrice.innerText = price + " €";
  const cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.className = "cart__item__content__settings";

  const cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.className =
    "cart__item__content__settings__quantity";

  const quantityParagraph = document.createElement("p");
  quantityParagraph.innerText = "Qté :";

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.className = "itemQuantity";
  quantityInput.name = "itemQuantity";
  quantityInput.value = quantity;
  quantityInput.setAttribute("min", 1);
  quantityInput.setAttribute("max", 100);

  const cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.className =
    "cart__item__content__settings__delete";

  const deleteItem = document.createElement("p");
  deleteItem.className = "deleteItem";
  deleteItem.innerText = "Supprimer";
  deleteItem.addEventListener("click", deleteItemHandler);

  cartItemContainer.appendChild(cartItem);

  cartItem.appendChild(cartItemImgContainer);
  cartItemImgContainer.appendChild(cartItemImage);

  cartItem.appendChild(cartItemContent);
  cartItemContent.appendChild(cartItemContentDesc);
  cartItemContentDesc.appendChild(productName);
  cartItemContentDesc.appendChild(productColor);
  cartItemContentDesc.appendChild(productPrice);

  cartItemContent.appendChild(cartItemContentSettings);
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
  cartItemContentSettingsQuantity.appendChild(quantityParagraph);
  cartItemContentSettingsQuantity.appendChild(quantityInput);

  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
  cartItemContentSettingsDelete.appendChild(deleteItem);
};

const setTotal = cartItems => {
  console.log(cartItems);
  let totalPrice = 0;
  let totalQty = 0;

  cartItems.forEach(item => {
    totalPrice += item.price * item.quantity;
    totalQty += item.quantity;
  });

  const priceElement = document.getElementById("totalPrice");
  const qtyElement = document.getElementById("totalQuantity");
  priceElement.innerText = totalPrice;
  qtyElement.innerText = totalQty;
};
