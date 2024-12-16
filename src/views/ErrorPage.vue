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
      <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
        <template #extra>
          <a-button @click="goHome" type="primary">Back Home</a-button>
        </template>
      </a-result>
    </a-col>
  </a-row>
</template>
