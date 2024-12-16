import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import { useAuthStore } from "@/stores/useAuthStore";

const eventCreate = async (event) => {
  const authStore = useAuthStore();
  console.log(authStore.user);
  return httpClient.post(`${server.EVENT_URL}`, {
    ...event,
    createdBy: authStore.user.id,
  });
};

const eventFindOne = async (id) => {
  return httpClient.get(`${server.EVENT_URL}/${id}`);
};

const eventFindAll = async (
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
  eventCreate,
  eventFindOne,
  eventFindAll,
};
