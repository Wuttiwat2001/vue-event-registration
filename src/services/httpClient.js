import axios from "axios";
import join from "url-join";
import { apiUrl } from "@/services/constants";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const httpClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }

  const token = localStorage.getItem("token");

  if (token) {
    const parsedToken = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsedToken}`;
  }

  config.timeout = 10000;
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);


export default httpClient;
