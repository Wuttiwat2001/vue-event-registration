<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle login logic here
  console.log("Username:", username.value);
  console.log("Password:", password.value);
};
</script>
<template>
  <a-row  type="flex" justify="center" align="middle" style="height: 100vh">
    <a-col :span="24" >
      <a-card  :bodyStyle="{ padding: '0' }" class="tw-rounded-none" >
        <a-row :gutter="[16, 16]">
          <a-col class="tw-p-6" :span="24" :md="10" :lg="10">
            <a-form @submit="handleSubmit">
              <a-form-item>
                <a-input v-model="username" placeholder="Username" />
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit" block>Login</a-button>
              </a-form-item>
            </a-form>
          </a-col>
          <a-col  class="tw-bg-red-500" :span="24" :md="14" :lg="14">
           
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>

</template>

<style scoped>
/* Add any custom styles here */
</style>
