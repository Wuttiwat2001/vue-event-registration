import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";
import { message } from "ant-design-vue";

export const useEventStore = defineStore("event", () => {
  const events = ref([]);
  const fetchingStatus = ref("init");
  const totalEvents = ref(0);

  const createEvent = async (event) => {
    try {
      fetchingStatus.value = "loading";
      const response = await api.eventCreate(event);
      if (response.status === 201 && response.data.success) {
        fetchingStatus.value = "success";
        message.success(`${response.data.message}`);
      } else {
        fetchingStatus.value = "failed";
      }
    } catch (error) {
      fetchingStatus.value = "failed";
    }
  };

  const fetchEvent = async (id) => {
    try {
      fetchingStatus.value = "loading";
      const response = await api.eventFindOne(id);
      if (response.status === 200 && response.data.success) {
        fetchingStatus.value = "success";
        return response.data.data;
      } else {
        fetchingStatus.value = "failed";
        return null;
      }
    } catch (error) {
      fetchingStatus.value = "failed";
      return null;
    }
  }

  const fetchEvents = async (
    page,
    pageSize,
    search,
    availableSeats,
    createdAtDate,
    updatedAtDate
  ) => {
    try {
      fetchingStatus.value = "loading";
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.eventFindAll(
        page,
        pageSize,
        search,
        availableSeats,
        createdAtDate,
        updatedAtDate
      );
      if (response.status === 200 && response.data.success) {
        events.value = response.data.data;
        totalEvents.value = response.data.pagination.total;
      } else {
        fetchingStatus.value = "failed";
        events.value = [];
      }
    } catch (error) {
      fetchingStatus.value = "failed";
      events.value = [];
    } finally {
      fetchingStatus.value = "success";
    }
  };

  const updateEvent = async (id, event) => {
    try {
      fetchingStatus.value = "loading";
      const response = await api.eventUpdate(id, event);
      if (response.status === 200 && response.data.success) {
        fetchingStatus.value = "success";
        message.success(`${response.data.message}`);
      } else {
        fetchingStatus.value = "failed";
      }
    } catch (error) {
      fetchingStatus.value = "failed";
    }
  }

  return {
    events,
    fetchingStatus,
    totalEvents,
    fetchEvent,
    fetchEvents,
    createEvent,
    updateEvent
  };
});
