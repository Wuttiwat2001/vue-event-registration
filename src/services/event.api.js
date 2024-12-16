import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import { useAuthStore } from "@/stores/useAuthStore";

const eventCreate = async (event) => {
  const authStore = useAuthStore();
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

const eventUpdate = async (id, event) => {
  const authStore = useAuthStore();
  return httpClient.put(`${server.EVENT_URL}/update/${id}`, {
    ...event,
    createdBy: authStore.user.id,
  });
};

const eventRemove = async (id) => {
  return httpClient.delete(`${server.EVENT_URL}/remove/${id}`);
};

export default {
  eventCreate,
  eventFindOne,
  eventFindAll,
  eventUpdate,
  eventRemove,
};
