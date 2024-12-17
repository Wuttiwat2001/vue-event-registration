<script setup>
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleMenuClick = (e) => {
  if (e.key === "1") {
    authStore.logout();
  }
};

const goToLogin = () => {
  router.push("/login");
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <a-layout-header
    class="tw-bg-white tw-flex tw-items-center tw-justify-between"
  >
    <div>
      <a-typography-title class="tw-mb-0" :level="3">
        Test Backend Developer
      </a-typography-title>
    </div>
    <div v-if="authStore.user.isLoggedIn">
      <a-dropdown>
        <a-avatar class="tw-cursor-pointer" :size="40">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="0">
              <a-typography-text disabled>
                Username - {{ authStore.user.username }}
              </a-typography-text>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1">
              <LogoutOutlined class="tw-me-3" />
              <a-typography-text>Logout</a-typography-text>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div v-else>
      <a-button type="primary" @click="goToLogin" class="tw-me-2">Login</a-button>
      <a-button @click="goToRegister">Register</a-button>
    </div>
  </a-layout-header>
</template>

<style></style>