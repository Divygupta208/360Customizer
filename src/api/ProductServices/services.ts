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

// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// const BASE_URL = "https://fakestoreapi.com";

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Generic GET
// const _get = <T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
//   return apiClient.get<T>(url, config);
// };

// // Generic DELETE
// const _delete = <T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
//   return apiClient.delete<T>(url, config);
// };

// // Generic PUT
// const _put = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
//   return apiClient.put<T>(url, data, config);
// };

// // Generic POST
// const _post = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
//   return apiClient.post<T>(url, data, config);
// };

// export { _get, _delete, _put, _post };
