import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const _get = (url: string, config = {}) => {
  return apiClient.get(url, config);
};

export const fetchProducts = async () => {
  const products = await _get("products");
  const data = await products.data;
  return data;
};

export const fetchProductInfo = async (productId: undefined | string) => {
  const response = await _get(`products/${productId}`);
  const data = await response.data;
  return data;
};

const _delete = (url: string, config = {}) => {
  return apiClient.delete(url, config);
};

const _put = (url: string, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

const _post = (url: string, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

export { _get, _delete, _put, _post };
