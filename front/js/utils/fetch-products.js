import { API_HOST } from "../config.js";

/**
 * @typedef {Object} Product
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} altTxt
 * @property {number} price
 * @property {string[]} colors
 */

const fetchParams = {
  method: "GET",
  headers: { "Content-Type": "text/plain;charset=UTF-8" },
  keepalive: false,
};

/**
 * @param {string || void} Product._id
 * @returns {Promise<Product> || Promise<Product[]>}
 */
export const getProducts = async productId => {
  const fetchUrl = productId ? `${API_HOST}/${productId}` : API_HOST;
  const data = await fetch(fetchUrl, fetchParams);
  const res = await data.json();
  return res;
};
/*OR : use then/catch to make an async method with a promise resolution that makes the parent function synchronous */
/*
  export const getProducts = productId => {
    const fetchURL = productId ? `${API_HOST}/${productId}` : API_HOST;
    fetch(fetchURL, fetchParams).then(data=>data.json).then(res=>res)
  }
 */
