import { getProducts } from "../utils/fetch-products.js";
import { getCart, setCart } from "./cart.js";

export const localStore = new Array();

export const getLocalStore = () => localStore;

export const initLocalStore = async () => {
  const cart = getCart();
  const matchCartToProduct = cart.map(item => {
    return getProducts(item._id).then(data => {
      return {
        _id: item._id,
        color: item.color,
        quantity: item.quantity,
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        altTxt: data.altTxt,
      };
    });
  });
  const productData = await Promise.all(matchCartToProduct);
  const productDataFiltered = productData.filter(item => item !== undefined);
  localStore.splice(0, localStore.length, ...productDataFiltered);
  return localStore;
};

export const setLocalStore = async items => {
  localStore.splice(0, localStore.length, ...items);
  return localStore;
};

export const removeFromLocalStore = id => {
  const itemWithId = localStore.findIndex(item => item._id === id);

  if (itemWithId > -1) {
    localStore.splice(itemWithId, 1);
  }
  setCart(localStore);
  return localStore;
};

export const updateQuantity = (id, quantity) => {
  const itemWithId = localStore.findIndex(item => item._id === id);

  if (itemWithId > -1) {
    localStore[itemWithId].quantity = quantity;
  }
  setCart(localStore);
  return localStore;
};
