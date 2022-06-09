import { API_HOST } from "../config.js";

const fetchParams = {
  method: "POST",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  body: {},
  keepalive: false,
};

export const orderProduct = async (product, contact) => {
  const data = await fetch(`${API_HOST}/order`, {
    ...fetchParams,
    body: JSON.stringify({ product, contact }),
  });
  const res = await data;
  return res;
};
