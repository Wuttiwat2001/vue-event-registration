import axios from "axios";
import join from "url-join";
import { apiUrl } from "@/services/constants";
import { message } from "ant-design-vue";

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
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          message.error(`${response.data.message}`);
          break;
        case 401:
          localStorage.removeItem("token");
          window.location.href = "/";
          break;
        case 403:
          console.error("Forbidden:", response.data.message);
          break;
        case 404:
          message.error(`${response.data.message}`);
          break;
        case 500:
          message.error(`${response.data.message}`);
          break;
        default:
          message.error(`${response.data.message}`);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
