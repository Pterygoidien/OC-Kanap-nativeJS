import { API_HOST } from "../config.js";

export const getProducts = async () => {
  const data = await fetch(`${API_HOST}`);
  const res = await data.json();
  return res;
};
