<script setup>
import { ref, onMounted, computed } from "vue";
import { useEventStore } from "@/stores/useEventStore";
import filters from "@/helpers/filters";
import { PlusOutlined } from "@ant-design/icons-vue";

const eventStore = useEventStore();

const search = ref("");
const date = ref();

const currentPage = ref(1);
const pageSize = ref(5);
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
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Total Seats",
    dataIndex: "totalSeats",
    width: 160,
  },
  {
    title: "Remaining Seats",
    dataIndex: "remainingSeats",
    width: 160,
  },
  {
    title: "Registered Users",
    dataIndex: "registeredUsers",
    width: 160,
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    width: 160,
  },
  {
    title: "UpdatedAt",
    dataIndex: "updatedAt",
    width: 160,
  },
];

const searchTable = () => {
  if (!date.value) {
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      "",
      ""
    );
  } else {
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      date.value[0],
      date.value[1]
    );
  }
};

const selectDate = () => {
  if (!date.value) {
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      "",
      ""
    );
  } else {
    eventStore.fetchEvents(
      currentPage.value,
      pageSize.value,
      search.value,
      date.value[0],
      date.value[1]
    );
  }
};

const handleTableChange = (paginationOrPageSize, type) => {
  if (type === "pagination") {
    currentPage.value = paginationOrPageSize;
    if (!date.value) {
      eventStore.fetchEvents(
        currentPage.value,
        pageSize.value,
        search.value,
        "",
        ""
      );
    } else {
      eventStore.fetchEvents(
        currentPage.value,
        pageSize.value,
        search.value,
        date.value[0],
        date.value[1]
      );
    }
  } else if (type === "pageSize") {
    currentPage.value = 1;
    pageSize.value = paginationOrPageSize;
    if (!date.value) {
      eventStore.fetchEvents(
        currentPage.value,
        pageSize.value,
        search.value,
        "",
        ""
      );
    } else {
      eventStore.fetchEvents(
        currentPage.value,
        pageSize.value,
        search.value,
        date.value[0],
        date.value[1]
      );
    }
  }
};

const startItem = computed(() => {
  return (currentPage.value - 1) * pageSize.value + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * pageSize.value, eventStore.totalEvents);
});

onMounted(() => {
  eventStore.fetchEvents(
    currentPage.value,
    pageSize.value,
    search.value,
    "",
    ""
  );
});
</script>
<template>
  <div v-if="$route.meta.showContent">
    <a-typography-title class="tw-mb-1" :level="2"
      >Event Registration</a-typography-title
    >
    <a-typography-text type="secondary"
      >Below is a list of all events that are currently open for registration.
      Click on the event name to proceed.</a-typography-text
    >
    <a-row>
      <a-col class="tw-my-5 tw-p-3 tw-bg-[#f5f5f5]" :span="24">
        <a-row :gutter="[16, 16]">
          <a-col :span="24" :md="8" :lg="8">
            <a-range-picker @change="selectDate" v-model:value="date" />
          </a-col>
          <!-- <a-col :span="24" :md="8" :lg="8">
            <a-input v-model:search="search" placeholder="Search" />
          </a-col>
          <a-col :span="24" :md="8" :lg="8">
            <a-input v-model:search="search" placeholder="Search" />
          </a-col> -->
        </a-row>
        <a-row>
          <a-col class="tw-flex tw-my-3" :span="24" :md="12" :lg="12">
            <a-input v-model:value="search" placeholder="Search" />
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
                  <a-button type="primary">
                    <template #icon> <plus-outlined /> </template>Create
                    Event</a-button
                  >
                </a-col>
              </a-row>
            </a-col>
            <a-divider class="tw-m-0" />
            <a-col :span="24">
              <a-table
                :loading="
                  eventStore.fetchingStatus === 'loading' ? true : false
                "
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
                    <div>
                      <a-typography-text strong>{{
                        record.title
                      }}</a-typography-text>
                    </div>
                    <a-typography-text type="secondary">{{
                      record.description
                    }}</a-typography-text>
                  </template>
                  <template v-if="column.dataIndex === 'location'">
                    <a-typography-text strong>{{
                      record.location
                    }}</a-typography-text>
                  </template>

                  <template v-else-if="column.dataIndex === 'registeredUsers'">
                    <a-typography-text strong>{{
                      record.registeredUsers.length
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
  </div>
  <router-view v-else></router-view>
</template>

<style></style>
