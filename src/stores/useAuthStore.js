import api from "@/services/api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = reactive({});
  const fetchingStatus = ref("init");

  async function login(username, password) {
    fetchingStatus.value = "loading";
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.login(username, password);
      if (response.status === 200 && response.data.success) {
        user = response.data.data;
        token = response.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        fetchingStatus.value = "success";
      } else {
        fetchingStatus.value = "failed";
        user = {};
      }
    } catch (error) {
      fetchingStatus.value = "failed";
      user = {};
    } finally {
      fetchingStatus.value = "success";
    }
  }

  return {
    user,
    fetchingStatus,
    login,
  };
});
