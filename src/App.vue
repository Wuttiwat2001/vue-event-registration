<script setup>
import { computed, onMounted } from "vue";
import Header from "@/components/layout/Header.vue";
import Content from "@/components/layout/Content.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

const isRouteErrorPage = computed(
  () =>
    route.name === "notFoundPage" ||
    route.name === "errorPage" ||
    route.name === "authorizedPage"
);
const isEventPage = computed(() => route.name === "event");

onMounted(() => {
  authStore.restoreLogin();
});
</script>
<template>
  <a-config-provider
    :theme="{
      token: {
        fontFamily: 'Kanit, sans-serif',
      },
    }"
  >
    <a-layout class="tw-min-h-screen">
      <a-layout>
        <Header
          v-if="!isRouteErrorPage && (isEventPage || authStore.user.isLoggedIn)"
        />
        <Content />
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<style></style>
