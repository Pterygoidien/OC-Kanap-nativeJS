/**
 * @typedef {Array} Cart
 */

const initialCart = [];

/**
 * @param {Cart} cart
 */
export const setCart = async (cart = initialCart) =>
  localStorage.setItem("cart", JSON.stringify(cart));

/**
 * @returns {Cart}
 */

export const getCart = async () =>
  JSON.parse(localStorage.getItem("cart") || "[]");

/**
 * @returns {void}
 */
export const resetCart = async () => setCart([]);

/**
 * @typedef {Object} CartItem
 * @property {String} product._id
 * @property {String} product.color
 * @property {Number} product.quantity
 * @property {String} product.name
 */

/**
 * @param {CartItem} productDto
 * @returns {CartItem}
 */
export const addProductToCart = productDto => {
  const { productId, color, quantity, name } = productDto;
  const cart = getCart();

  //Verify if the item is already in the cart : if so, and the product is the same colour, simply adjust the quantity
  const isProductAlreadyInCart = cart.findIndex(
    product => product.productId === productId && product.color === color
  );
  if (isProductAlreadyInCart > -1) {
    cart[i].quantity += quantity;
  } else {
    cart.push(productDto);
  }

  setCart(cart);
  return cart;
};

/**
 * @param {string} productId
 * @returns {Cart} cart
 */
export const removeProductFromCart = productId => {
  const cart = getCart();
  const productIndexInCart = cart.findIndex(
    product => product.productId === productId
  );
  if (productIndexInCart > -1) cart.splice(i, 1);
  //else throw new Error
  setCart(cart);
  return cart;
};
