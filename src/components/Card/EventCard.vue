<script setup>
import { defineProps } from "vue";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  alt: String,
  imgSrc: String,
  title: String,
  description: String,
  avatarSrc: String,
});
</script>

<template>
  <a-card class="tw-rounded-none" hoverable>
    <template #cover>
      <img :alt="alt" :src="imgSrc" class="tw-rounded-none" />
    </template>
    <template #actions>
      <setting-outlined key="setting" />
      <edit-outlined key="edit" />
      <ellipsis-outlined key="ellipsis" />
    </template>
    <a-card-meta :title="title" :description="description">
      <template #avatar>
        <a-avatar :src="avatarSrc" />
      </template>
    </a-card-meta>
  </a-card>
</template>

<style scoped></style>
