<script setup>
import { ref } from "vue";
import Menu from "@/components/layout/Menu.vue";
// import Header from '@/components/layout/Header.vue'
// import Content from '@/components/layout/Content.vue'
// import Footer from '@/components/layout/Footer.vue'

const collapsed = ref(true);
const updateCollapsed = (value) => {
  collapsed.value = value;
};
</script>

<template>
  <a-layout class="tw-min-h-screen">
    <Menu v-model:collapsed="collapsed" @update:collapsed="updateCollapsed" />
  </a-layout>
</template>

<style scoped></style>
