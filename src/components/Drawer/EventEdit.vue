<script setup>
import { FormOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useEventStore } from "@/stores/useEventStore";

const eventStore = useEventStore();
const props = defineProps({
  id: String,
});
const emit = defineEmits(["editEvent"]);

const form = reactive({
  title: "",
  location: "",
  totalSeats: null,
  remainingSeats: null,
  description: "",
});

const registerUsers = ref([]);

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
const showDrawer = async () => {
  const event = await eventStore.fetchEvent(props.id);
  const registerUsers = await eventStore.fetchRegisteredUsers(props.id);
  form.title = event.title;
  form.location = event.location;
  form.totalSeats = event.totalSeats;
  form.remainingSeats = event.remainingSeats;
  form.description = event.description;

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


const searchTable = () => {
  // eventStore.fetchEvents(
  //   currentPage.value,
  //   pageSize.value,
  //   search.value,
  //   availableSeats.value,
  //   createdAtDate.value,
  //   updatedAtDate.value
  // );
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


</script>

<template>
  <form-outlined class="trigger_icon" @click="showDrawer" />
  <a-drawer
    title="Edit event"
    :width="720"
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
          <a-row :gutter="[16, 0]">
            <a-col class="tw-my-3" :span="24" :md="12" :lg="12">
              <p>Join Date</p>
              <a-range-picker
                @change="selectJoinDate"
                v-model:value="joinDate"
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

      <!-- <a-row>
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
                        filters.formatNumber(record.totalSeats)
                      }}</a-typography-text>
                    </template>

                    <template v-else-if="column.dataIndex === 'remainingSeats'">
                      <a-typography-text>{{
                        filters.formatNumber(record.remainingSeats)
                      }}</a-typography-text>
                    </template>

                    <template
                      v-else-if="column.dataIndex === 'registeredUsers'"
                    >
                      <a-typography-text strong>{{
                        filters.formatNumber(record.registeredUsers.length)
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
                        <EventEdit
                          @editEvent="handleEditEvent"
                          :id="record._id"
                        />

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
      </a-row> -->
    </a-form>
    <template #extra>
      <a-space>
        <a-button
          :loading="eventStore.fetchingStatus === 'loading' ? true : false"
          @click="onClose"
          >Cancel</a-button
        >
        <a-button
          :disabled="eventStore.fetchingStatus === 'loading' ? true : false"
          type="primary"
          @click="handleSubmit($refs.formRef)"
          >Submit</a-button
        >
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
