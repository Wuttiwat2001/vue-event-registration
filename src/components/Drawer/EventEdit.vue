<script setup>
import { FormOutlined } from "@ant-design/icons-vue";
import { reactive, ref, computed } from "vue";
import { message } from "ant-design-vue";
import { useEventStore } from "@/stores/useEventStore";
import filters from "@/helpers/filters";

const search = ref("");

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    width: "25%",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    width: "25%",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: "25%",
  },
  {
    title: "Join Date",
    dataIndex: "joinDate",
    key: "joinDate",
    width: "25%",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
];

const eventStore = useEventStore();
const props = defineProps({
  id: String,
});
const emit = defineEmits(["editEvent"]);
const loading = ref(false);

const form = reactive({
  title: "",
  location: "",
  totalSeats: null,
  remainingSeats: null,
  description: "",
});

const registerUsers = ref([]);
const totalRegisteredUsers = ref(0);

const validateTotalSeats = (rule, value) => {
  if (value <= 0) {
    return Promise.reject("Total seats must be greater than 0");
  }
  if (value < totalRegisteredUsers.value) {
    return Promise.reject(
      "Total seats must be greater than or equal to the number of registered users"
    );
  }
  return Promise.resolve();
};

const validateRemainingSeats = (rule, value) => {
  if (value > form.totalSeats) {
    return Promise.reject("Remaining seats must not exceed total seats");
  }
  if (value > form.totalSeats - totalRegisteredUsers.value) {
    return Promise.reject(
      "Remaining seats must not be more than the available seats after accounting for registered users"
    );
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
const showDrawer = async () => {
  loading.value = true;
  const event = await eventStore.fetchEvent(props.id);
  const data = await eventStore.fetchRegisteredUsers({
    id: props.id,
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    search: search.value,
  });
  registerUsers.value = data.data;
  totalRegisteredUsers.value = data.pagination.total;

  form.title = event.title;
  form.location = event.location;
  form.totalSeats = event.totalSeats;
  form.remainingSeats = event.remainingSeats;
  form.description = event.description;

  open.value = true;
  loading.value = false;
};
const onClose = () => {
  open.value = false;
};

const handleSubmit = (formRef) => {
  formRef
    .validate()
    .then(() => {
      try {
        eventStore.updateEvent(props.id, form).then(() => {
          emit("editEvent");
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


const currentPage = ref(1);
const pageSize = ref(10);
const pageSizeOptions = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

const searchTable = async () => {
  loading.value = true;
  const data = await eventStore.fetchRegisteredUsers({
    id: props.id,
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    search: search.value,
  });
  registerUsers.value = data.data;
  totalRegisteredUsers.value = data.pagination.total;
  loading.value = false;
};


const handleTableChange = async (paginationOrPageSize, type) => {
  loading.value = true;
  if (type === "pagination") {
    currentPage.value = Math.max(paginationOrPageSize, 1);

    const data = await eventStore.fetchRegisteredUsers({
      id: props.id,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      search: search.value,
    });


    registerUsers.value = data.data;
    totalRegisteredUsers.value = data.pagination.total;
  } else if (type === "pageSize") {
    currentPage.value = 1;
    pageSize.value = Math.max(paginationOrPageSize, 1);

    const data = await eventStore.fetchRegisteredUsers({
      id: props.id,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      search: search.value,
    });
    registerUsers.value = data.data;
    totalRegisteredUsers.value = data.pagination.total;
  }
  loading.value = false;
};

const startItem = computed(() => {
  return (currentPage.value - 1) * pageSize.value + 1;
});

const endItem = computed(() => {
  return Math.min(
    currentPage.value * pageSize.value,
    totalRegisteredUsers.value
  );
});
</script>

<template>
  <form-outlined class="trigger_icon" @click="showDrawer" />
  <a-drawer
    title="Edit event"
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

      <a-row>
        <a-col :span="24">
          <a-typography-title class="tw-mb-1" :level="4">
            Registered Users
          </a-typography-title>
          <a-typography-text type="secondary">
            Below is a list of all registered users for this event.
          </a-typography-text>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="tw-my-5 tw-p-3 tw-bg-[#f5f5f5]" :span="24">
          <a-row>
            <a-col class="tw-flex tw-my-3" :span="24" :md="14" :lg="14">
              <a-input
                @keyup.enter="searchTable"
                v-model:value="search"
                placeholder="Search"
              />
              <a-button @click="searchTable" class="tw-mx-3" type="primary"
                >GO</a-button
              >
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-card class="tw-rounded-none" :bodyStyle="{ padding: '0' }">
            <a-row>
              <a-col :span="24" class="tw-p-4">
                <a-row>
                  <a-col :span="24" class="tw-my-2 tw-flex tw-justify-end">
                    <a-select
                      class="tw-mx-3 tw-w-[100px]"
                      v-model:value="pageSize"
                      :options="pageSizeOptions"
                      @change="(value) => handleTableChange(value, 'pageSize')"
                    ></a-select>
                  </a-col>
                </a-row>
              </a-col>
              <a-divider class="tw-m-0" />
              <a-col :span="24">
                <a-table
                  :loading="loading"
                  :columns="columns"
                  :data-source="registerUsers"
                  :row-key="(record) => record.id"
                  :pagination="false"
                  :scroll="{
                    x: 'max-content',
                    y: '50vh',
                  }"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'joinDate'">
                      <a-typography-text type="secondary">{{
                        filters.formatDate(record.joinDate)
                      }}</a-typography-text>
                    </template>
                  </template>
                </a-table>
              </a-col>
              <a-col
                :span="24"
                class="tw-p-4 tw-flex tw-justify-between tw-items-center"
              >
                <a-typography-text type="secondary" strong>
                  Showing items {{ startItem }} to {{ endItem }}
                </a-typography-text>
                <a-pagination
                  v-model:current="currentPage"
                  :total="totalRegisteredUsers"
                  :show-size-changer="false"
                  :pageSize="pageSize"
                  @change="(value) => handleTableChange(value, 'pagination')"
                />
              </a-col>
            </a-row>
          </a-card>
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
          title="Are you sure join this event?"
          placement="topRight"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleSubmit($refs.formRef)"
        >
          <a-button
            :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
            type="primary"
            >Edit</a-button
          >
        </a-popconfirm>
      </a-space>
    </template>
  </a-drawer>
</template>
<style scoped>
.trigger_icon {
  transition: color 0.3s;
}
.trigger_icon:hover {
  color: #1890ff !important;
}
</style>
