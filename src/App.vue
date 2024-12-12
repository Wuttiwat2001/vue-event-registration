<script setup>
import { ref,onMounted } from "vue";
import Menu from "@/components/layout/Menu.vue";
import Header from "@/components/layout/Header.vue";
import Content from "@/components/layout/Content.vue";
import Footer from '@/components/layout/Footer.vue';
import { useAuthStore } from "@/stores/useAuthStore";

const authStore = useAuthStore();




onMounted(() => {
  authStore.restoreLogin();
});



const collapsed = ref(false);
</script>
<template>
  <a-layout class="tw-min-h-screen">
    <Menu v-if="authStore.user.isLoggedIn" v-model:collapsed="collapsed" />
    <a-layout class="tw-w-full tw-overflow-auto tw-flex tw-flex-col">
      <Header v-if="authStore.user.isLoggedIn" v-model:collapsed="collapsed" />
      <Content/>
      <Footer v-if="authStore.user.isLoggedIn" />
    </a-layout>
  </a-layout>
</template>

<style></style>
