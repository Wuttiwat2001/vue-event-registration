import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

const findAll = async (page,pageSize,search,startDate,endDate) => {
  return httpClient.get(`${server.EVENT_URL}?page=${page}&pageSize=${pageSize}&search=${search}?startDate=${startDate}?endDate=${endDate}`);
};

export default {
  findAll,
};
