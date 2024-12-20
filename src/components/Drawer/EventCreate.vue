<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useEventStore } from "@/stores/useEventStore";

const eventStore = useEventStore();
const emit = defineEmits(["createEvent"]);

const form = reactive({
  title: "",
  location: "",
  totalSeats: null,
  remainingSeats: null,
  description: "",
});

const resetForm = () => {
  form.title = "";
  form.location = "";
  form.totalSeats = null;
  form.remainingSeats = null;
  form.description = "";
};

const validateTotalSeats = (rule, value) => {
  if (value <= 0) {
    return Promise.reject("Total seats must be greater than 0");
  }
  return Promise.resolve();
};

const validateRemainingSeats = (rule, value) => {
  if (value <= 0) {
    return Promise.reject("Remaining seats must be greater than 0");
  }
  if (value > form.totalSeats) {
    return Promise.reject("Remaining seats must not exceed total seats");
  }
  return Promise.resolve();
};

const rules = {
  title: [
    {
      required: true,
      message: "Please input the title!",
    },
  ],
  location: [
    {
      required: true,
      message: "Please input the location!",
    },
  ],
  totalSeats: [
    {
      required: true,
      message: "Please input the total seats!",
    },
    { validator: validateTotalSeats },
  ],
  remainingSeats: [
    {
      required: true,
      message: "Please input the remaining seats!",
    },
    { validator: validateRemainingSeats },
  ],
  description: [
    {
      required: true,
      message: "Please input the description!",
    },
  ],
};

const open = ref(false);
const showDrawer = () => {
  resetForm();
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

const handleSubmit = (formRef) => {
  formRef
    .validate()
    .then(() => {
      try {
        eventStore.createEvent(form).then(() => {
          emit("createEvent");
          onClose();
        });
      } catch (error) {
        message.error(error);
        onClose();
      }
    })
    .catch((error) => {
      message.error(error.errorFields[0].errors);
    });
};
</script>

<template>
  <a-button type="primary" @click="showDrawer">
    <template #icon><PlusOutlined /></template>
    Create Event
  </a-button>
  <a-drawer
    title="Create a new event"
    :width="1000"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical" ref="formRef">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Title" name="title">
            <a-input
              :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
              v-model:value="form.title"
              placeholder="Enter event title"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Location" name="location">
            <a-input
              :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
              v-model:value="form.location"
              placeholder="Enter event location"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Total Seats" name="totalSeats">
            <a-input-number
              :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
              :min="0"
              class="tw-w-full"
              v-model:value="form.totalSeats"
              placeholder="Enter total seats"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Remaining Seats" name="remainingSeats">
            <a-input-number
              :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
              :min="0"
              class="tw-w-full"
              v-model:value="form.remainingSeats"
              placeholder="Enter remaining seats"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
              v-model:value="form.description"
              :rows="4"
              placeholder="Enter event description"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button
          :loading="eventStore.fetchingStatus === 'loading' ? true : false"
          @click="onClose"
          >Cancel</a-button
        >

        <a-popconfirm
          title="Are you sure create this event?"
          placement="bottomRight"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleSubmit($refs.formRef)"
        >
          <a-button
            :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
            type="primary"
            >Create</a-button
          >
        </a-popconfirm>
      </a-space>
    </template>
  </a-drawer>
</template>
