import axios from "axios";
import join from "url-join";
import { apiUrl } from "@/services/constants";
import { message } from "ant-design-vue";
import router from "@/router";

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
          message.error(`${response.data.error}`);
          break;
        case 401:
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          router.push("/login");
          break;
        case 403:
          message.error(`${response.data.error}`);
          router.push("/403");
          break;
        case 404:
          message.error(`${response.data.error}`);
          router.push("/404");
          break;
        case 500:
          message.error(`${response.data.error}`);
          router.push("/500");
          break;
        default:
          message.error(`${response.data.message}`);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
