import { getLocalStore } from "../store/localStore.js";

console.log('hello');

const urlParams = new URLSearchParams(window.location.search);

const contact = {
    firstName: urlParams.get("firstName"),
    lastName: urlParams.get("lastName"),
    address: urlParams.get("address"),
    city: urlParams.get("city"),
    email: urlParams.get("email")
}
const products = getLocalStore();
console.log(contact)

