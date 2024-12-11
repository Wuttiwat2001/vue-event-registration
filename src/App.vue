<script setup>
import { ref } from "vue";
import Menu from "@/components/layout/Menu.vue";
import Header from "@/components/layout/Header.vue";
import Content from "@/components/layout/Content.vue";
import Footer from '@/components/layout/Footer.vue';


const collapsed = ref(false);
</script>
<template>
  <a-layout class="tw-min-h-screen">
    <Menu v-model:collapsed="collapsed" />
    <a-layout class="tw-w-full tw-overflow-auto tw-flex tw-flex-col">
      <Header v-model:collapsed="collapsed" />
      <Content/>
      <Footer />
    </a-layout>
  </a-layout>
</template>

<style></style>
