<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const route = useRoute();
const authStore = useAuthStore();

const isRouteErrorPage = computed(() => route.name === "notFoundPage" || route.name === "errorPage" || route.name === "authorizedPage");

const layoutClasses = computed(() => {
  if (isRouteErrorPage.value) {
    return "tw-bg-[#f0f2f5]";
  }
  return authStore.user.isLoggedIn ? "tw-p-6 tw-mx-6 tw-mt-4 tw-bg-white" : "";
});
</script>

<template>
  <a-layout-content :class="`tw-h-full ${layoutClasses}`">
    <router-view></router-view>
  </a-layout-content>
</template>

<style></style>