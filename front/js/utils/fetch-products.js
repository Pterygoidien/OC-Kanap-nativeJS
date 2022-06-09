import { API_HOST } from "../config.js";

const fetchParams = {
  method: "GET",
  headers: { "Content-Type": "text/plain;charset=UTF-8" },
  keepalive: false,
};

export const getProducts = async () => {
  const data = await fetch(`${API_HOST}`, fetchParams);
  const res = await data.json();
  return res;
};

export const getProductById = async productId => {
  const data = await fetch(`${API_HOST}/${productId}`, fetchParams);
  const res = await data.json();
  return res;
};
