import { getProducts } from "../utils/fetch-products.js";

const domTarget = "items";

const generateProduct = product => {
  const card = document.createElement("a");
  card.href = `#`;
};

const domInjector = async () => {
  const itemsContainer = document.getElementById(domTarget);

  console.log(itemsContainer);
};

window.onload = async () => {
  const products = await getProducts();
  domInjector();
};

/*      <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->
 */
