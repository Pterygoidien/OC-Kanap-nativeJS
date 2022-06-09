/**
 * @typedef {Array} Cart
 */

const initialCart = [];

/**
 * @param {Cart} cart
 */
export const setCart = async (cart = initialCart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/**
 * @returns {Cart}
 */

export const getCart = async () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

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
  const actualCart = getCart();
};
