import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export const useEventStore = defineStore("event", () => {
  const events = ref([]);
  const fetchingStatus = ref("init");

  const fetchEvents = async () => {
    fetchingStatus.value = "loading";
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.findAll();
      if (response.status === 200 && response.data.success) {
        events.value = response.data.data;
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
    fetchEvents,
  };
});
