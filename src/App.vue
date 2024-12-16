<script setup>
import { computed,onMounted } from "vue";
import Header from "@/components/layout/Header.vue";
import Content from "@/components/layout/Content.vue";
import Footer from "@/components/layout/Footer.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

const isRouteErrorPage = computed(() => route.name === "notFoundPage" || route.name === "errorPage" || route.name === "authorizedPage");

onMounted(() => {
  authStore.restoreLogin();
});
</script>
<template>
  <a-layout class="tw-min-h-screen">
    <a-layout class="tw-w-full tw-overflow-auto tw-flex tw-flex-col">
      <Header v-if="authStore.user.isLoggedIn && !isRouteErrorPage" />
      <Content />
      <Footer v-if="authStore.user.isLoggedIn && !isRouteErrorPage" />
    </a-layout>
  </a-layout>
</template>

<style></style>
