import { getCart } from "../store/cart.js";
import { getProducts } from "../utils/fetch-products.js";
import { getLocalStore, setLocalStore } from "../store/localStore.js";

const cartItemContainer = document.getElementById("cart__items");


const initStore = async () => {
  const cart = getCart();
  const localStore = await setLocalStore(cart);
  displayItems(localStore);

}
initStore();

const deleteItemHandler = event => {
  itemId = event.target.getAttribute("data-id");
};

const displayItems = items => {
  items.forEach(item => {
    itemLayout(item);
  });
}

const itemLayout = async item => {
  //create abstract functions to manipulate the DOM with setAttribute and a list for each element to create, iterate, then return result
  const { _id, color, quantity } = item;
  getProducts(_id).then(data => {
    const cartItem = document.createElement("article");
    cartItem.className = "cart__item";
    cartItem.setAttribute("data-id", _id);
    cartItem.setAttribute("data-color", color);

    const cartItemImgContainer = document.createElement("div");
    cartItemImgContainer.className = "cart__item__img";
    const cartItemImage = document.createElement("img");
    cartItemImage.src = data.imageUrl;
    cartItemImage.alt = data.altTxt;

    const cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";

    const cartItemContentDesc = document.createElement("div");
    cartItemContentDesc.className = "cart__item__content__titlePrice";

    const productName = document.createElement("h2");
    productName.innerText = data.name;

    const productColor = document.createElement("p");
    productColor.innerText = color;
    const productPrice = document.createElement("p");
    productPrice.innerText = data.price + " €";
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
    deleteItem.setAttribute("data-id", _id);
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

    setTotal(data.price, quantity);
  });
};

const setTotal = (price, quantity) => {
  const priceElement = document.getElementById("totalPrice");
  const qtyElement = document.getElementById("totalQuantity");

  let priceInt = parseInt(priceElement.innerText);
  let qtyInt = parseInt(qtyElement.innerText);

  priceInt += quantity * price;
  qtyInt += quantity;
  priceElement.innerText = priceInt;
  qtyElement.innerText = qtyInt;
};
