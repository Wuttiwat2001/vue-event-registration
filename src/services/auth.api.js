import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

const login = async (username,password) => {
  return httpClient.post(`${server.AUTH_URL}/login`, {
    username,
    password,
  });
}

export default {
  login,
}