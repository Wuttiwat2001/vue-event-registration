import api from "@/services/api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = reactive({
    isLoggedIn: false,
  });
  const fetchingStatus = ref("init");

  async function login(username, password) {
    fetchingStatus.value = "loading";
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.login(username, password);
      if (response.status === 200 && response.data.success) {
        user.isLoggedIn = true;
        user = {
          ...response.data.data,
        };
        token = response.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        fetchingStatus.value = "success";
      } else {
        fetchingStatus.value = "failed";
        user = {
          isLoggedIn: false,
        };
      }
    } catch (error) {
      fetchingStatus.value = "failed";
      user = {
        isLoggedIn: false,
      };
    } finally {
      fetchingStatus.value = "success";
    }
  }

  function restoreLogin() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      user = JSON.parse(user);
    } else {
      user = {
        isLoggedIn: false,
      };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user = {
      isLoggedIn: false,
    };
  }

  return {
    user,
    fetchingStatus,
    login,
    restoreLogin,
    logout
  };
});
