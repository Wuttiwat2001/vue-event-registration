<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  collapsed: Boolean,
});

const emit = defineEmits("update:collapsed");

const toggleCollapsed = () => {
  emit("update:collapsed", !props.collapsed);
};
</script>
<template>
  <a-layout-header class="tw-bg-white">
    <a-button
      v-if="props.collapsed"
      @click="toggleCollapsed"
      class="tw-border-none tw-shadow-none"
      shape="circle"
      size="large"
    >
      <template #icon>
        <menu-unfold-outlined />
      </template>
    </a-button>

    <a-button
      v-else
      @click="toggleCollapsed"
      class="tw-border-none tw-shadow-none"
      shape="circle"
      size="large"
    >
      <template #icon>
        <menu-fold-outlined />
      </template>
    </a-button>
  </a-layout-header>
</template>
<style></style>
