<script setup>
import { ref,reactive } from "vue";

const props = defineProps({
  collapsed: Boolean,
});

const onCollapse = (_collapsed, type) => {
  console.log(_collapsed, type);
  // if (type == "responsive") {
  //   emit("update:collapsed", !props.collapsed);
  // }
};

const selectedKeys = ref(['4']);

</script>

<template>
  <a-layout-sider v-model:collapsed="props.collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <user-outlined />
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
</style>
