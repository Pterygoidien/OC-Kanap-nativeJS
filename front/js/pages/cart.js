import {
  removeFromLocalStore,
  initLocalStore,
  getLocalStore,
  updateQuantity,
} from "../store/localStore.js";
import { itemLayout } from "../utils/itemLayout.js";

window.onload = async () => {
  initLocalStore().then(store => {
    displayItems(store);
    setTotal(store);
  });
};

const displayItems = items => {
  if (items.length > 0) {
    items.forEach(item => {
      itemLayout(item, { deleteItemHandler, updateQuantityHandler });
    });
  } else {
    const emptyCart = document.createElement("p");
    emptyCart.innerText = "Votre panier est vide";
    cartItemContainer.appendChild(emptyCart);
  }
};

const deleteItemHandler = event => {
  event.preventDefault();
  const itemId = event.target.closest("article").getAttribute("data-id");
  const updatedStore = removeFromLocalStore(itemId);
  const cartItem = document.querySelector(`[data-id="${itemId}"]`);
  cartItem.remove();
  setTotal(updatedStore);
};

const updateQuantityHandler = event => {
  event.preventDefault();
  const itemId = event.target.closest("article").getAttribute("data-id");
  const quantity = event.target.value;
  if (quantity > 0) {
    const updatedStore = updateQuantity(itemId, quantity);
    setTotal(updatedStore);
  } else {
    deleteItemHandler(event);
  }
};

const setTotal = cartItems => {
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
