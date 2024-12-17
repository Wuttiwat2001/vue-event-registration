<script setup>
import { reactive } from "vue";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const formState = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  roles: ["USER"]
});

const onFinish = (values) => {
  values.phone = `+66${values.phone}`;
  authStore.register(values);
};

const goToLogin = () => {
  router.push("/login");
};

const validatePhone = (rule, value) => {
  if (!/^[1-9]\d{8}$/.test(value)) {
    return Promise.reject(
      "Phone number should be exactly 9 digits and not start with 0"
    );
  }
  return Promise.resolve();
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
              <h2 class="tw-text-2xl">User Registration</h2>
              <p class="tw-text-gray-500">
                Please fill in the form to create an account.
              </p>
            </div>
            <a-form :model="formState" name="register" @finish="onFinish">
              <a-form-item
                name="username"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                  {
                    min: 4,
                    message: 'Username should be at least 4 characters',
                  },
                  {
                    pattern: /^[A-Za-z0-9]+$/,
                    message:
                      'Username should contain only alphanumeric characters',
                  },
                ]"
              >
                <a-input
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                  v-model:value="formState.username"
                  placeholder="Username"
                >
                  <template #prefix>
                    <user-outlined class="site-form-item-icon" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                name="password"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 5,
                    message: 'Password should be at least 5 characters',
                  },
                ]"
              >
                <a-input-password
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                  v-model:value="formState.password"
                  placeholder="Password"
                >
                  <template #prefix>
                    <lock-outlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item
                name="confirmPassword"
                :rules="[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                ]"
              >
                <a-input-password
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                  v-model:value="formState.confirmPassword"
                  placeholder="Confirm Password"
                >
                  <template #prefix>
                    <lock-outlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item
                name="firstName"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                  {
                    pattern: /^[A-Za-z]+$/,
                    message:
                      'First name should contain only alphabetic characters',
                  },
                ]"
              >
                <a-input
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                  v-model:value="formState.firstName"
                  placeholder="First Name"
                />
              </a-form-item>

              <a-form-item
                name="lastName"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                  {
                    pattern: /^[A-Za-z]+$/,
                    message:
                      'Last name should contain only alphabetic characters',
                  },
                ]"
              >
                <a-input
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                  v-model:value="formState.lastName"
                  placeholder="Last Name"
                />
              </a-form-item>

              <a-form-item
                name="phone"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                  {
                    validator: validatePhone,
                  },
                ]"
              >
                <a-input
                  :disabled="
                    authStore.fetchingStatus === 'loading' ? true : false
                  "
                  addon-before="+66"
                  v-model:value="formState.phone"
                  placeholder="Phone Number"
                >
                  <template #prefix>
                    <phone-outlined class="site-form-item-icon" />
                  </template>
                </a-input>
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
                  Register
                </a-button>
              </a-form-item>
              Or
              <a
                @click="goToLogin"
                >login now!</a
              >
            </a-form>
          </a-col>

          <a-col class="tw-hidden md:tw-block" :span="24" :md="12">
            <div
              class="tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-[#1677ff]"
            >
              <a-typography-title class="tw-text-white" :level="3">
                Event Registration
              </a-typography-title>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped></style>
