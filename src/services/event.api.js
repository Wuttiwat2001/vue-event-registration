import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

const findAll = async (
  page,
  pageSize,
  search,
  availableSeats,
  createdAtDate,
  updatedAtDate
) => {
  return httpClient.post(`${server.EVENT_URL}/findAll`, {
    page,
    pageSize,
    search,
    availableSeats,
    createdAtDate,
    updatedAtDate,
  });
};

export default {
  findAll,
};
