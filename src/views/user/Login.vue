<script setup>
import { reactive } from "vue";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStore";
const authStore = useAuthStore();

const formState = reactive({
  username: "",
  password: "",
});
const onFinish = (values) => {
  authStore.userLogin(values.username, values.password);
};
const goToRegister = () => {
  router.push("/register");
};
</script>
<template>
  <a-row
    type="flex"
    justify="center"
    align="middle"
    style="height: 100vh"
    class="tw-bg-[#f0f2f5] tw-px-[80px]"
  >
    <a-col :span="24" style="max-width: 900px">
      <a-card :bodyStyle="{ padding: '0' }">
        <a-row :gutter="[16, 16]">
          <a-col class="tw-px-[60px] tw-py-10 tw-bg-white" :span="24" :md="12">
            <div class="tw-text-center tw-mb-6">
              <h2 class="tw-text-2xl">User Login</h2>
              <p class="tw-text-gray-500">
                Please login to access your account.
              </p>
            </div>
            <a-form :model="formState" name="normal_login" @finish="onFinish">
              <a-form-item
                name="username"
                :rules="[
                  { required: true, message: 'Please input your username!' },
                ]"
              >
                <a-input
                  v-model:value="formState.username"
                  placeholder="Username"
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                >
                  <template #prefix>
                    <user-outlined class="site-form-item-icon" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                name="password"
                :rules="[
                  { required: true, message: 'Please input your password!' },
                ]"
              >
                <a-input-password
                  v-model:value="formState.password"
                  placeholder="Password"
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                >
                  <template #prefix>
                    <lock-outlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item>
                <a-button
                  :loading="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                  type="primary"
                  html-type="submit"
                  block
                >
                  <LoginOutlined />

                  Login
                </a-button>
              </a-form-item>
              Or
              <a
                @click="goToRegister"
                >register now!</a
              >
            </a-form>
          </a-col>

          <a-col class="tw-hidden md:tw-block" :span="24" :md="12">
            <div
              class="tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-[#1677ff]"
            >
              <a-typography-title class="tw-text-white" :level="3"
                >Event Registration</a-typography-title
              >
            </div>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped></style>
