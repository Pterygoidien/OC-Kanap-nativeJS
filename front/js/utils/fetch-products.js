import { API_HOST } from "../config.js";

const fetchParams = {
  method: "GET",
  headers: { "Content-Type": "text/plain;charset=UTF-8" },
  keepalive: false,
};

export const getProducts = async productId => {
  const fetchUrl = productId ? `${API_HOST}/${productId}` : API_HOST;
  const data = await fetch(fetchUrl, fetchParams);
  const res = await data.json();
  return res;
};
