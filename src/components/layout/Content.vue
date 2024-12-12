<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

const authStore = useAuthStore();

const layoutClasses = computed(() => {
  return authStore.user.isLoggedIn ? "tw-p-6 tw-mx-6 tw-mt-4 tw-bg-white" : "";
});
</script>

<template>
  <a-layout-content :class="`tw-h-full  ${layoutClasses}`">
    <router-view></router-view>
  </a-layout-content>
</template>

<style></style>
