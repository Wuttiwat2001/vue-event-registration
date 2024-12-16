<script setup>
import router from "@/router";

const goHome = () => {
  router.push({ path: "/" });
};
</script>
<template>
  <a-row
    type="flex"
    justify="center"
    align="middle"
    style="height: 100vh"
    class="tw-bg-[#f0f2f5] tw-px-10"
  >
    <a-col :span="24">
      <a-result
        status="403"
        title="403"
        sub-title="Sorry, you are not authorized to access this page."
      >
        <template #extra>
          <a-button @click="goHome" type="primary">Back Home</a-button>
        </template>
      </a-result>
    </a-col>
  </a-row>
</template>
