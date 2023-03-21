import { getCart } from "../store/cart.js";
import { getLocalStore, initLocalStore } from "../store/localStore.js";

const initContact = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        firstName: urlParams.get("firstName"),
        lastName: urlParams.get("lastName"),
        address: urlParams.get("address"),
        city: urlParams.get("city"),
        email: urlParams.get("email")
    }
}

window.onload = async () => {
    const contact = initContact();
    const products = new Array();
    const cartItems = getCart();
    cartItems.forEach(item => {
        products.push(item._id);
    });
    const data = { contact, products }

    sendDataToServer(data)
        .then(order => {
            if (order.orderId !== undefined) {
                spanOrderId = document.getElementById("orderId");
            }
        })
        .catch(error => {
            console.log(error);
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