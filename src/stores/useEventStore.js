import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export const useEventStore = defineStore("event", () => {
  const events = ref([]);

  const fetchEvents = async () => {
    try {
      const response = await api.findAll();
      if (response.status === 200 && response.data.success) {
        events.value = response.data.data;
      } else {
        events.value = [];
      }
    } catch (error) {
      events.value = [];
    }
  };

  return {
    events,
    fetchEvents,
  };
});
