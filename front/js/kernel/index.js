import { getProducts } from "../utils/fetch-products.js";

const domTarget = "items";

const generateProduct = product => {
  console.log(product);
  const card = document.createElement("a");
  card.href = `./product.html?id=${product["_id"]}`;

  const article = document.createElement("article");
  const image = document.createElement("img");
  image.src = `image.png`;
  image.alt = "alternative text";

  const title = document.createElement("h3");
  title.setAttribute("class", "productName");
  title.innerHTML = "product__name";

  const desc = document.createElement("p");
  desc.setAttribute("class", "productDescription");
  desc.innerHTML = "text";

  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(desc);
  card.appendChild(article);

  return card;
};

const domModifier = () => {
  const itemsContainer = document.getElementById(domTarget);
  itemsContainer.innerHTML = "";
  return itemsContainer;
};

window.onload = async () => {
  const products = await getProducts();
  const itemsContainer = await domModifier();

  await products.forEach(async product => {
    const productArticle = generateProduct(product);
    itemsContainer.appendChild(productArticle);
  });

  /*products
    .map(generateProduct)
    .forEach(product => itemsContainer.appendChild(product));
  domInjector();*/
};

/*      <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->
 */
