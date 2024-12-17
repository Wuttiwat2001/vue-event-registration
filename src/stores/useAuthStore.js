import api from "@/services/api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import router from "../router";
import { message } from "ant-design-vue";

export const useAuthStore = defineStore("auth", () => {
  const user = reactive({
    isLoggedIn: false,
  });
  const fetchingStatus = ref("init");

  async function userLogin(username, password) {
    fetchingStatus.value = "loading";
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.loginUser(username, password);
      if (response.status === 200 && response.data.success) {
        Object.assign(user, response.data.data);
        user.isLoggedIn = true;
        const token = response.data.token;

        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        fetchingStatus.value = "success";

        router.push("/event");
        message.success(`${response.data.message}`);
      } else {
        fetchingStatus.value = "failed";
        user.isLoggedIn = false;
      }
    } catch (error) {
      fetchingStatus.value = "failed";
      user.isLoggedIn = false;
    }
  }

  async function adminLogin(username, password) {
    fetchingStatus.value = "loading";
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await api.loginAdmin(username, password);
      if (response.status === 200 && response.data.success) {
        Object.assign(user, response.data.data);
        user.isLoggedIn = true;
        const token = response.data.token;

        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        fetchingStatus.value = "success";

        router.push("/admin/manage-event-registration");
        message.success(`${response.data.message}`);
      } else {
        fetchingStatus.value = "failed";
        user.isLoggedIn = false;
      }
    } catch (error) {
      fetchingStatus.value = "failed";
      user.isLoggedIn = false;
    }
  }

  function restoreLogin() {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      Object.assign(user, JSON.parse(storedUser));
      user.isLoggedIn = true;
    } else {
      user.isLoggedIn = false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user.isLoggedIn = false;
  
    if (user.roles.includes("ADMIN")) {
      router.push("/admin/login");
      message.success("Admin logout successfully");
    } else {
      router.push("/login");
      message.success("User logout successfully");
    }
  }

  return {
    user,
    fetchingStatus,
    userLogin,
    adminLogin, 
    logout,
    restoreLogin,
    logout,
  };
});
