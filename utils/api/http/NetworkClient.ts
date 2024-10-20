import axios from "axios";
import { responseHandler } from "./ResponseHandler";

let previousRequest: string | undefined = undefined;

const api = () => {
  const axiosInstance = axios.create({
    baseURL: "https://maverick-v8d1.onrender.com/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  // axiosInstance.interceptors.request.use(
  //   async (config: InternalAxiosRequestConfig<any>) => {
  //     // const token = (await getSecureItemAsync(AsyncStorageKey.ACCESS_TOKEN)) as AxiosHeaderValue;

  //     // config.headers.Authorization = `Bearer ${token}`;
  //     // config.signal = BaseApi.controller.signal;

  //     return config;
  //   }
  // );

  axiosInstance.interceptors.response.use(
    (res) => {
      previousRequest = res.config?.url;

      return res;
    },
    (error) => responseHandler(error, axiosInstance, previousRequest)
  );

  return axiosInstance;
};

export { api };
