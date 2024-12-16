import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export const useEventStore = defineStore("event", () => {
  const events = ref([]);
  const fetchingStatus = ref("init");
  const totalEvents = ref(0);

  const fetchEvents = async (
    page,
    pageSize,
    search,
    availableSeats,
    createdAtDate,
    updatedAtDate,
  ) => {
    fetchingStatus.value = "loading";
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.findAll(
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

  return {
    events,
    fetchingStatus,
    totalEvents,
    fetchEvents,
  };
});
