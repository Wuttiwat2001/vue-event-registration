import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

const loginAdmin = async (username, password) => {
  return httpClient.post(`${server.AUTH_URL}/loginAdmin`, {
    username,
    password,
  });
};

const loginUser = async (username, password) => {
  return httpClient.post(`${server.AUTH_URL}/login`, {
    username,
    password,
  });
};

const registerUser = async (payload) => {
  return httpClient.post(`${server.AUTH_URL}/register`, {
    ...payload,
  });
};

export default {
  loginAdmin,
  loginUser,
  registerUser,
};
