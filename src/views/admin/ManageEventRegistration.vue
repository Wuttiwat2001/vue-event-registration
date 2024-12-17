<script setup>
import { ref, onMounted, computed } from "vue";
import { useEventStore } from "@/stores/useEventStore";
import filters from "@/helpers/filters";
import EventCreate from "@/components/Drawer/EventCreate.vue";
import EventEdit from "@/components/Drawer/EventEdit.vue";
import { DeleteOutlined } from "@ant-design/icons-vue";

const eventStore = useEventStore();

const search = ref("");
const availableSeats = ref("any");
const createdAtDate = ref([]);
const updatedAtDate = ref([]);

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

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    width: 280,
  },
  {
    title: "Location",
    dataIndex: "location",
    width: 200,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 120,
  },
  {
    title: "Total Seats",
    dataIndex: "totalSeats",
    width: 180,
    sorter: (a, b) => a.totalSeats - b.totalSeats,
  },
  {
    title: "Remaining Seats",
    dataIndex: "remainingSeats",
    width: 180,
    sorter: (a, b) => a.remainingSeats - b.remainingSeats,
  },
  {
    title: "Registered Users",
    dataIndex: "registeredUsers",
    width: 180,
    sorter: (a, b) => a.registeredUsers.length - b.registeredUsers.length,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    width: 160,
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    width: 160,
    sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
  },
  {
    title: "Action",
    dataIndex: "action",
    width: 80,
  },
];

const searchTable = () => {
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    availableSeats.value,
    createdAtDate.value,
    updatedAtDate.value
  );
};

const selectAvailableSeats = () => {
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    availableSeats.value,
    createdAtDate.value,
    updatedAtDate.value
  );
};

const selectCreatedAtDate = () => {
  if (!createdAtDate.value) {
    createdAtDate.value = [];
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      availableSeats.value,
      createdAtDate.value,
      updatedAtDate.value
    );
  } else {
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      availableSeats.value,
      createdAtDate.value,
      updatedAtDate.value
    );
  }
};

const selectUpdatedAtDate = () => {
  if (!updatedAtDate.value) {
    updatedAtDate.value = [];
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      availableSeats.value,
      createdAtDate.value,
      updatedAtDate.value
    );
  } else {
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      availableSeats.value,
      createdAtDate.value,
      updatedAtDate.value
    );
  }
};

const handleTableChange = (paginationOrPageSize, type) => {
  if (type === "pagination") {
    currentPage.value = paginationOrPageSize;
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      availableSeats.value,
      createdAtDate.value,
      updatedAtDate.value
    );
  } else if (type === "pageSize") {
    currentPage.value = 1;
    pageSize.value = paginationOrPageSize;

    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      availableSeats.value,
      createdAtDate.value,
      updatedAtDate.value
    );
  }
};

const startItem = computed(() => {
  return (currentPage.value - 1) * pageSize.value + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * pageSize.value, eventStore.totalEvents);
});

const handleEditEvent = () => {
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    availableSeats.value,
    createdAtDate.value,
    updatedAtDate.value
  );
};

const handleCreateEvent = () => {
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    availableSeats.value,
    createdAtDate.value,
    updatedAtDate.value
  );
};

const onClickSearchItem = async (value) => {
  search.value = value;
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    availableSeats.value,
    createdAtDate.value,
    updatedAtDate.value
  );
};

const deleteEvent = async (id) => {
  await eventStore.removeEvent(id);
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    availableSeats.value,
    createdAtDate.value,
    updatedAtDate.value
  );
};

onMounted(() => {
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    availableSeats.value,
    createdAtDate.value,
    updatedAtDate.value
  );
});
</script>
<template>
  <a-typography-title class="tw-mb-1" :level="2"
    >Event Registration</a-typography-title
  >
  <a-typography-text type="secondary"
    >Below is a list of all events that are currently open for registration.
    Click on the event name to proceed.</a-typography-text
  >
  <a-row>
    <a-col class="tw-my-5 tw-p-3 tw-bg-[#f5f5f5]" :span="24">
      <a-row :gutter="[16, 0]">
        <a-col class="tw-my-3" :span="24" :md="8" :lg="8">
          <p>Available Seats</p>
          <a-select
            @change="selectAvailableSeats"
            v-model:value="availableSeats"
            placeholder="Select number of seats"
            class="tw-w-full"
          >
            <a-select-option value="any">All</a-select-option>
            <a-select-option value="available">Available</a-select-option>
            <a-select-option value="full">Full</a-select-option>
          </a-select>
        </a-col>
        <a-col class="tw-my-3" :span="24" :md="8" :lg="8">
          <p>Created At</p>
          <a-range-picker
            @change="selectCreatedAtDate"
            v-model:value="createdAtDate"
            class="tw-w-full"
          />
        </a-col>
        <a-col class="tw-my-3" :span="24" :md="8" :lg="8">
          <p>Updated At</p>
          <a-range-picker
            @change="selectUpdatedAtDate"
            v-model:value="updatedAtDate"
            class="tw-w-full"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col class="tw-flex tw-my-3" :span="24" :md="12" :lg="12">
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
                <EventCreate @createEvent="handleCreateEvent" />
              </a-col>
            </a-row>
          </a-col>
          <a-divider class="tw-m-0" />
          <a-col :span="24">
            <a-table
              :loading="eventStore.fetchingStatus === 'loading' ? true : false"
              :columns="columns"
              :data-source="eventStore.events"
              :pagination="false"
              :scroll="{
                x: 'max-content',
                y: '50vh',
              }"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'title'">
                  <div class="tw-w-[280px] tw-truncate">
                    <a-typography-text
                      @click="onClickSearchItem(record.title)"
                      class="trigger_text"
                      strong
                      >{{ record.title }}</a-typography-text
                    >
                    <br />
                    <a-typography-text
                      @click="onClickSearchItem(record.description)"
                      class="trigger_text"
                      type="secondary"
                      >{{ record.description }}</a-typography-text
                    >
                    <br />
                    <a-typography-text
                      @click="
                        onClickSearchItem(
                          `${record.createdBy.firstName} ${record.createdBy.lastName}`
                        )
                      "
                      class="trigger_text"
                      type="secondary"
                      >Created by:
                      {{
                        record.createdBy.firstName +
                        " " +
                        record.createdBy.lastName
                      }}</a-typography-text
                    >
                  </div>
                </template>
                <template v-if="column.dataIndex === 'location'">
                  <div class="tw-w-[200px] tw-truncate">
                    <a-typography-text
                      @click="onClickSearchItem(record.location)"
                      class="trigger_text"
                      strong
                      >{{ record.location }}</a-typography-text
                    >
                  </div>
                </template>

                <template v-else-if="column.dataIndex === 'status'">
                  <a-tag v-if="record.remainingSeats > 0" color="green"
                    >Available</a-tag
                  >
                  <a-tag v-else color="red">Full</a-tag>
                </template>

                <template v-else-if="column.dataIndex === 'totalSeats'">
                  <a-typography-text>{{
                    filters.formatNumber(record.totalSeats) + " seats"
                  }}</a-typography-text>
                </template>

                <template v-else-if="column.dataIndex === 'remainingSeats'">
                  <a-typography-text>{{
                    filters.formatNumber(record.remainingSeats) + " seats"
                  }}</a-typography-text>
                </template>

                <template v-else-if="column.dataIndex === 'registeredUsers'">
                  <a-typography-text strong>{{
                    filters.formatNumber(record.registeredUsers.length) +
                    " users"
                  }}</a-typography-text>
                </template>

                <template v-else-if="column.dataIndex === 'createdAt'">
                  <a-typography-text type="secondary">{{
                    filters.formatDate(record.createdAt)
                  }}</a-typography-text>
                </template>

                <template v-else-if="column.dataIndex === 'updatedAt'">
                  <a-typography-text type="secondary">{{
                    filters.formatDate(record.updatedAt)
                  }}</a-typography-text>
                </template>

                <template v-else-if="column.dataIndex === 'action'">
                  <div class="tw-flex tw-justify-center">
                    <EventEdit @editEvent="handleEditEvent" :id="record._id" />

                    <a-popconfirm
                      title="Are you sure delete this event?"
                      placement="topRight"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="() => deleteEvent(record._id)"
                    >
                      <delete-outlined
                        class="trigger_icon tw-ms-2 tw-text-red-500"
                      />
                    </a-popconfirm>
                  </div>
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
              :total="eventStore.totalEvents"
              :show-size-changer="false"
              :pageSize="pageSize"
              @change="(value) => handleTableChange(value, 'pagination')"
            />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.trigger_text {
  cursor: pointer;
  transition: color 0.3s;
}

.trigger_text:hover {
  color: #1890ff !important;
  text-decoration: underline;
}
.trigger_icon {
  cursor: pointer;
  transition: color 0.3s;
}
.trigger_icon:hover {
  color: #ef4444 !important;
}
</style>
