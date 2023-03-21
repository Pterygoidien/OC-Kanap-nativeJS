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
    const product = new Array();
    const cartItems = getCart();
    products.forEach(product => {
        console.log(product._id)
    })
    const data = { contact, products }

}
