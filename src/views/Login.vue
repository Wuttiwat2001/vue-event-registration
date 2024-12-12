<script setup>
import { reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/useAuthStore";
const authStore = useAuthStore();

const formState = reactive({
  username: "",
  password: "",
});
const onFinish = (values) => {
  authStore.login(values.username, values.password);
};
</script>
<template>
  <a-row
    type="flex"
    justify="center"
    align="middle"
    style="height: 100vh; background-color: #f0f2f5"
  >
    <a-col :span="24" style="max-width: 900px">
      <a-card :bodyStyle="{ padding: '0' }">
        <a-row :gutter="[16, 16]">
          <a-col class="tw-px-10 tw-py-10 tw-bg-white" :span="24" :md="12">
            <div class="tw-text-center tw-mb-6">
              <h2 class="tw-text-2xl">Welcome to Event Registration</h2>
              <p class="tw-text-gray-500">
                Please login to register for the event.
              </p>
            </div>
            <a-form :model="formState" name="normal_login" @finish="onFinish">
              <a-form-item
                name="username"
                :rules="[
                  { required: true, message: 'Please input your username!' },
                ]"
              >
                <a-input v-model:value="formState.username" placeholder="Username">
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
                <a-input-password v-model:value="formState.password" placeholder="Password">
                  <template #prefix>
                    <lock-outlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item>
                <a-button :loading="authStore.fetchingStatus === 'loading' ? true : false" type="primary" html-type="submit" block>
                  Login
                </a-button>
              </a-form-item>
            </a-form>
            <div class="tw-text-center tw-mt-4">
              <a href="/register" class="tw-text-blue-500"
                >New here? Register now</a
              >
            </div>
          </a-col>

          <a-col class="tw-hidden md:tw-block" :span="24" :md="12">
            <div class="tw-h-full tw-flex tw-items-center tw-justify-center">
              <img
                src="@/assets/images/appointment-agenda-reminder-personal-organizer-calendar-concept.jpg"
                alt="Event Registration"
                class="tw-max-w-full tw-h-full"
              />
            </div>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped></style>
