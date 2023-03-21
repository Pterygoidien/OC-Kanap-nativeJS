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
  formListener();

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

const formListener = () => {
  const form = document.querySelector(".cart__order__form");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg"); //error message for the first name
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg"); //error message for the last name
  const addressErrorMsg = document.getElementById("addressErrorMsg"); //error message for the address
  const cityErrorMsg = document.getElementById("cityErrorMsg"); //error message for the city
  const emailErrorMsg = document.getElementById("emailErrorMsg"); //error message for the email

  const button = document.getElementById("order");
  button.setAttribute('disabled', true)

  //add event listener for the form
  form.addEventListener("input", (event) => {
    event.preventDefault();
    //check if the form is valid
    if (validateForm()) {
      button.removeAttribute('disabled')
    }
  });

  form.addEventListener("submit", sendFormHandler);
}

const sendFormHandler = event => {
  event.preventDefault();
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
  }
  const products = new Array();
  const cartItems = getLocalStore();
  cartItems.forEach(item => {
    products.push(item._id);
  });
  const data = { contact, products }
  sendDataToServer(data)
    .then(order => {
      if (order.orderId !== undefined) {
        window.location.replace('./confirmation.html?orderId=' + order.orderId);
      }

    })


}
const sendDataToServer = async (data) => {
  const response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const order = await response.json();
  return order;
}

const validateForm = () => {
  if (firstName.value.length < 2) {
    firstNameErrorMsg.innerText = "Le prénom doit contenir au moins 2 caractères";
    return false;
  } else {
    firstNameErrorMsg.innerText = "";
  }
  if (lastName.value.length < 2) {
    lastNameErrorMsg.innerText = "Le nom doit contenir au moins 2 caractères";
    return false;
  } else {
    lastNameErrorMsg.innerText = "";
  }
  if (!address.value.match(/^[a-zA-Z0-9\s,.'-]{10,}$/)) {
    addressErrorMsg.innerText = "L'adresse doit contenir au moins 10 caractères";
    return false;

  } else {
    addressErrorMsg.innerText = "";
  }
  if (city.value.length < 2) {
    cityErrorMsg.innerText = "La ville doit contenir au moins 2 caractères";
    return false;
  } else {
    cityErrorMsg.innerText = "";
  }
  if (!email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    emailErrorMsg.innerText = "L'adresse email n'est pas valide";
    return false;
  } else {
    emailErrorMsg.innerText = "";
  }
  return true;
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
