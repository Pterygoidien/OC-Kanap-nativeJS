import { getProducts } from "../utils/fetch-products.js";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

const domTarget = "item";

window.onload = async () => {
  const product = await getProducts(id);
  console.log(product);

  document.title = product.name;

  const itemImg = document.getElementsByClassName("item__img")[0];
  itemImg.innerHTML = `<img src="${product.imageUrl}" />`;

  const itemTitle = document.getElementById("title");
  itemTitle.innerText = product.name;

  const itemPrice = document.getElementById("price");
  itemPrice.innerText = product.price;

  const itemDescription = document.getElementById("description");
  itemDescription.innerText = product.description;

  const itemColors = document.getElementById("colors");
  product.colors.forEach(color => {
    let colorOption = document.createElement("option");
    colorOption.setAttribute("value", color);
    colorOption.innerText = color;

    itemColors.appendChild(colorOption);
  });
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
