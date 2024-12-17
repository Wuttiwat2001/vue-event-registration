import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

const loginAdmin = async (username,password) => {
  return httpClient.post(`${server.AUTH_URL}/users/login`, {
    username,
    password,
  });
}

const loginUser = async (username,password) => {
  return httpClient.post(`${server.AUTH_URL}/admins/login`, {
    username,
    password,
  });
}

export default {
  loginAdmin,
  loginUser,
}