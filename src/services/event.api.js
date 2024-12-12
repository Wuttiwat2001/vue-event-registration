import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

const findAll = async () => {
  return httpClient.get(`${server.EVENT_URL}`);
};

export default {
  findAll,
};
