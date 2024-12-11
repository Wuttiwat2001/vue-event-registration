<script setup>
import Header from '@/components/layout/Header.vue'
import Menu from '@/components/layout/Menu.vue'
import Content from '@/components/layout/Content.vue'
import Footer from '@/components/layout/Footer.vue'

</script>

<template>
  <div>
    <Header />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
