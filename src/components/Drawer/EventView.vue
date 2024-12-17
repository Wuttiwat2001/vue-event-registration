<script setup>
import { reactive, ref, computed } from "vue";
import { message } from "ant-design-vue";
import { useEventStore } from "@/stores/useEventStore";
import { useAuthStore } from "@/stores/useAuthStore";
import router from "@/router";
import filters from "@/helpers/filters";

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
const authStore = useAuthStore();

const props = defineProps({
  id: String,
});
const emit = defineEmits(["joinEvent"]);
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

const joinEvent = () => {
  if (form.remainingSeats === 0) {
    message.error("Event is full");
    onClose();
    return;
  } else if (authStore.user.isLoggedIn === false) {
    message.error("Please login first");
    router.push("/login");
    onClose();
    return;
  } else {
    eventStore.eventJoin(props.id).then(() => {
      try {
        emit("joinEvent");
        onClose();
      } catch (error) {
        message.error(error);
        onClose();
      }
    });
  }
};

const search = ref("");
const joinDate = ref([]);

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

const selectJoinDate = () => {
  // if (!createdAtDate.value) {
  //   createdAtDate.value = [];
  //   eventStore.fetchEvents(
  //     currentPage.value,
  //     pageSize.value,
  //     search.value,
  //     availableSeats.value,
  //     createdAtDate.value,
  //     updatedAtDate.value
  //   );
  // } else {
  //   eventStore.fetchEvents(
  //     currentPage.value,
  //     pageSize.value,
  //     search.value,
  //     availableSeats.value,
  //     createdAtDate.value,
  //     updatedAtDate.value
  //   );
  // }
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
  <a-button @click="showDrawer" type="primary">{{
    form.remainingSeats === 0 ? "View" : "Join"
  }}</a-button>
  <a-drawer
    title="Detail event"
    :width="1000"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" layout="vertical" ref="formRef">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Title" name="title">
            <a-input
              disabled
              v-model:value="form.title"
              placeholder="Enter event title"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Location" name="location">
            <a-input
              disabled
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
              disabled
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
              disabled
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
              disabled
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
          <a-row :gutter="[16, 0]">
            <a-col class="tw-my-3" :span="24" :md="14" :lg="14">
              <p>Join Date</p>
              <a-range-picker
                @change="selectJoinDate"
                v-model:value="joinDate"
                class="tw-w-full"
              />
            </a-col>
          </a-row>
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
                  :row-key="(record) => record.user?._id"
                  :pagination="false"
                  :scroll="{
                    x: 'max-content',
                    y: '50vh',
                  }"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'firstName'">
                      <a-typography-text>{{
                        record.user?.firstName
                      }}</a-typography-text>
                    </template>

                    <template v-else-if="column.dataIndex === 'lastName'">
                      <a-typography-text>{{
                        record.user?.lastName
                      }}</a-typography-text>
                    </template>

                    <template v-else-if="column.dataIndex === 'phone'">
                      <a-typography-text>{{
                        record.user?.phone
                      }}</a-typography-text>
                    </template>

                    <template v-else-if="column.dataIndex === 'joinDate'">
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
          @confirm="joinEvent"
        >
          <a-button
            :disabled="
              eventStore.fetchingStatus === 'loading' ||
              form.remainingSeats === 0
                ? true
                : false
            "
            type="primary"
            >Join</a-button
          >
        </a-popconfirm>
      </a-space>
    </template>
  </a-drawer>
</template>
<style scoped></style>
