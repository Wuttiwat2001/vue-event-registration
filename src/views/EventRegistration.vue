<script setup>
import { ref } from "vue";
const search = ref("");
const selectMonth = ref(null);
const selectYear = ref(null);
const months = ref([
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" },
]);

const cards = ref([
      {
        alt: "example",
        imgSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "Card title 1",
        description: "This is the description 1",
        avatarSrc: "https://joeschmoe.io/api/v1/random"
      },
      {
        alt: "example",
        imgSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "Card title 2",
        description: "This is the description 2",
        avatarSrc: "https://joeschmoe.io/api/v1/random"
      },
      // Add more card objects as needed
    ]);
</script>
<template>
  <div>
    <a-typography-title class="tw-mb-1" :level="2"
      >Event Registration</a-typography-title
    >
    <a-typography-text type="secondary"
      >Below is a list of all events that are currently open for registration.
      Click on the event name to proceed.</a-typography-text
    >
    <a-row>
      <a-col class="tw-my-5 tw-p-3 tw-bg-[#f5f5f5]" :span="24">
        <a-row>
          <a-col class="tw-flex tw-my-3" :span="24" :md="12" :lg="12">
            <a-input class="tw-w-[400px]" v-model:search="search" placeholder="Search" />
            <a-button class="tw-mx-3" type="primary">GO</a-button>
          </a-col>
          <a-col class="tw-flex tw-flex-wrap md:tw-justify-end" :span="24" :md="12" :lg="12">
            <div class="tw-my-3">
              <a-select
              class="tw-w-[140px] tw-me-3"
              placeholder="Select Month"
              v-model:value="selectMonth"
            >
              <a-select-option
                v-for="month in months"
                :key="month.value"
                :value="month.value"
              >
                {{ month.name }}
              </a-select-option>
            </a-select>
            </div>
            <div class="tw-my-3">
              <a-date-picker v-model:value="selectYear" picker="year" />
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="[16,16]">
      <a-col :span="24" :lg="6" v-for="(card, index) in cards" :key="index">
        <a-card hoverable>
          <template #cover>
            <img :alt="card.alt" :src="card.imgSrc" />
          </template>
          <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
          </template>
          <a-card-meta :title="card.title" :description="card.description">
            <template #avatar>
              <a-avatar :src="card.avatarSrc" />
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style></style>
