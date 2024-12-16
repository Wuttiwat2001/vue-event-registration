<script setup>
import { onMounted } from "vue";
import Header from "@/components/layout/Header.vue";
import Content from "@/components/layout/Content.vue";
import Footer from "@/components/layout/Footer.vue";
import { useAuthStore } from "@/stores/useAuthStore";

const authStore = useAuthStore();

onMounted(() => {
  authStore.restoreLogin();
});
</script>
<template>
  <a-layout class="tw-min-h-screen">
    <a-layout class="tw-w-full tw-overflow-auto tw-flex tw-flex-col">
      <Header v-if="authStore.user.isLoggedIn" />
      <Content />
      <Footer v-if="authStore.user.isLoggedIn" />
    </a-layout>
  </a-layout>
</template>

<style></style>
