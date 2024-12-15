<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { SaveOutlined, CloseOutlined,InboxOutlined } from "@ant-design/icons-vue";


const authStore = useAuthStore();

const form = reactive({
  title: "",
  description: "",
  startDate: null,
  endDate: null,
  location: "",
  totalSeats: 0,
  remainingSeats: 0,
});

const data = [
  {
    fullName: "",
  },
];



const handleSubmit = () => {
  // Validate and submit the form data
  if (form.endDate <= form.startDate) {
    message.error("End date must be after start date");
    return;
  }
  // Submit the form data to the server
  console.log("Form submitted:", form);
};
</script>

<template>
  <a-row>
    <a-col class="tw-mb-2" :span="24" :md="12" :lg="12">
      <a-typography-title class="tw-mb-1" :level="2"
        >Create Event</a-typography-title
      >
      <a-typography-text type="secondary">
        Please fill out the form below to create a new event.
      </a-typography-text>
    </a-col>
    <a-col
      class="tw-flex tw-items-center md:tw-justify-end"
      :span="24"
      :md="12"
      :lg="12"
    >
      <a-button class="tw-me-3"
        >CANCEL
        <close-outlined />
      </a-button>
      <a-button type="primary"
        >SAVE
        <save-outlined />
      </a-button>
    </a-col>
  </a-row>
  <a-divider />
  <a-row :gutter="[16, 16]" class="tw-mt-5">
    <a-col :span="24" :md="10">
      <a-card class="tw-rounded-none">
        <a-form
          layout="horizontal"
        >
          <a-form-item
            :rules="[{ required: true, message: 'Please input the title!' }]"
          >
            <p>Title <span class="required">*</span></p>
            <a-input v-model="form.title" placeholder="Enter event title" />
          </a-form-item>
          <a-form-item
            :rules="[
              { required: true, message: 'Please input the description!' },
            ]"
          >
            <p>Description <span class="required">*</span></p>
            <a-textarea
              v-model="form.description"
              :rows="4"
              placeholder="Enter event description"
            />
          </a-form-item>
          <a-form-item
            :rules="[
              { required: true, message: 'Please select the start date!' },
            ]"
          >
            <p>Start date : End date <span class="required">*</span></p>
            <a-range-picker class="tw-w-full" v-model:value="value1" />
          </a-form-item>
          <a-form-item
            :rules="[{ required: true, message: 'Please input the location!' }]"
          >
            <p>Location <span class="required">*</span></p>
            <a-input
              v-model="form.location"
              placeholder="Enter event location"
            />
          </a-form-item>
          <a-row :gutter="[16, 16]">
            <a-col :span="24" :md="12" :lg="12">
              <a-form-item
                :rules="[
                  { required: true, message: 'Please input the total seats!' },
                ]"
              >
                <p>Total Seats <span class="required">*</span></p>
                <a-input-number
                  class="tw-w-full"
                  v-model="form.totalSeats"
                  placeholder="Enter total seats"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" :lg="12">
              <a-form-item
                :rules="[
                  { required: true, message: 'Please input the total seats!' },
                ]"
              >
                <p>Total Seats <span class="required">*</span></p>
                <a-input-number
                  class="tw-w-full"
                  v-model="form.totalSeats"
                  placeholder="Enter total seats"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </a-col>

    <a-col :span="24" :md="14">
      <a-card class="tw-rounded-none">
        <a-form layout="horizontal">
          
          <a-list item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta
                  description="Create Event"
                >
                  <template #title>
                    <a href="https://www.antdv.com/">{{ authStore.user.firstName + " " + authStore.user.lastName }}</a>
                  </template>
                  <template #avatar>
                    <a-avatar src="https://joeschmoe.io/api/v1/random" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>

          <a-divider />
          <a-form-item>
            <p>Upload Event Images <span class="required">*</span></p>
            <a-form-item name="dragger" no-style>
              <a-upload-dragger v-model:fileList="form.dragger" name="files" action="/upload.do">
                <p class="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                <p class="ant-upload-hint">Support for a single or bulk upload.</p>
              </a-upload-dragger>
            </a-form-item>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.required {
  color: red;
}
</style>
