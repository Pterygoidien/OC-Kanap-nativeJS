import { getProducts } from "../utils/fetch-products.js";

const domTarget = "items";

const generateProduct = product => {
  const card = document.createElement("a");
  card.href = `./product.html?id=${product["_id"]}`;

  const article = document.createElement("article");

  const image = document.createElement("img");
  image.src = `${product["imageUrl"]}`;
  image.alt = product.altTxt;

  const title = document.createElement("h3");
  title.setAttribute("class", "productName");
  title.innerHTML = product.name;

  const desc = document.createElement("p");
  desc.setAttribute("class", "productDescription");
  desc.innerHTML = product.description;

  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(desc);
  card.appendChild(article);

  return card;
};

window.onload = async () => {
  const products = await getProducts();
  const itemsContainer = document.getElementById(domTarget);
  products
    .map(generateProduct)
    .forEach(product => itemsContainer.appendChild(product));
};
