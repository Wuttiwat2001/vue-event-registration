<script setup>
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/useAuthStore";
const authStore = useAuthStore();

const handleMenuClick = (e) => {
  if (e.key === "1") {
    authStore.logout();
  }
};
</script>
<template>
  <a-layout-header
    class="tw-bg-white tw-flex tw-items-center tw-justify-between"
  >
    <div>
      <a-typography-title class="tw-mb-0" :level="3"
        >Test Backend Developer</a-typography-title
      >
    </div>
    <div  v-if="authStore.user.isLoggedIn">
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
  </a-layout-header>
</template>
<style></style>
