import { getProducts } from "../utils/fetch-products.js";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

window.onload = async () => {
  const product = await getProducts(id);
  generateProduct(product);
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

const submitButton = document.getElementById("addToCart");

const onSubmit = () => {
  console.log("a");
};
submitButton.addEventListener("click", onSubmit);

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
