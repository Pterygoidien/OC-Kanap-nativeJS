import { addProductToCart } from "../store/cart.js";
import { getProducts } from "../utils/fetch-products.js";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
let productState = {
  _id: null,
  price: 0,
  quantity: 0,
  color: null,
};

window.onload = async () => {
  const productData = await getProducts(id);
  productState = {
    ...productState,
    _id: productData._id,
    price: productData.price,
  };

  generateProduct(productData);
  addToCartListener(productState);
};

const addToCartListener = product => {
  const submitButton = document.getElementById("addToCart");
  submitButton.addEventListener("click", onSubmit);
};

const generateProduct = product => {
  const { name, imageUrl, price, description, colors } = product;

  document.title = name;

  const itemImg = document.getElementsByClassName("item__img")[0];
  itemImg.innerHTML = `<img src="${imageUrl}" />`;

  const itemTitle = document.getElementById("title");
  itemTitle.innerText = name;

  const itemPrice = document.getElementById("price");
  itemPrice.innerText = price;

  const itemDescription = document.getElementById("description");
  itemDescription.innerText = description;

  const itemColors = document.getElementById("colors");
  colors.forEach(color => {
    let colorOption = document.createElement("option");
    colorOption.setAttribute("value", color);
    colorOption.innerText = color;

    itemColors.appendChild(colorOption);
  });
};

const onSubmit = () => {
  const quantity = parseInt(document.getElementById("quantity").value);
  const color = document.getElementById("colors").value;

  productState = { ...productState, quantity, color };

  if (quantity > 0 && color.trim().length > 0) addProductToCart(productState);
};

/*const generateProduct = async product => {
  const itemImgDiv = document.createElement("div");
  itemImgDiv.setAttribute("class", "item__img");

  const itemImg = document.createElement("img");
  itemImg.src = product.imageUrl;
  itemImg.alt = product.altTxt;

  itemImgDiv.append(itemImg);

  const itemContent = document.createElement("div");
  itemContent.className = "item__content";

  const itemContentTitle = document.createElement("div");
  
}; */
