import { API_HOST } from "../config.js";

export const getProducts = async () => {
  const data = await fetch(`${API_HOST}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    keepalive: false,
  });
  const res = await data.json();
  return res;
};
