<template>
  <div class="flex">
    <div class="flex flex-col h-full w-full items-center sm:(w-[24vw] min-w-[250px] border-r border-gray-400/30)">
      <div
        class="
          bg-base
          border-t border-base-standout/70
          flex flex-col
          order-last
          w-full
          px-0.5
          self-end
          items-center
          sm:(order-first
          border-b
          px-0)
        "
      >
        <input
          type="text"
          class="border-base-standout rounded-lg order-last h-10 shadow-inner my-0.5 mx-0.5 text-center sm:(rounded text-left)"
          style="width: 98%"
          v-model="searchQuery"
          placeholder="搜索"
        />
        <TabGroup class="w-full" :defaultIndex="defaultIndex" v-slot="{ selected }">
          <TabList class="flex space-x-1 p-1">
            <Tab v-for="item in filterOptions" as="template" :key="item" v-slot="{ selected }">
              <button
                @click="filterHandler(item)"
                class="rounded-lg font-semibold w-full py-2.5 text-indigo-600 leading-5 focus:(outline-none border-base-standout )"
                :class="[selected ? 'bg-white shadow cursor-default' : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400']"
              >
                {{ item }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <scroll-area>
        <div class="hidden sm:block">
          <button
            v-for="item in filteredList"
            :key="item.eid"
            class="flex flex-row flex-nowrap cell justify-between"
            :class="[item.eid == selected ? 'bg-gray-400/40 cursor-default' : '']"
            @click="showDetail(item.eid)"
          >
            <div class="text-left w-2/3 truncate">
              {{ item.user_description }}
            </div>
            <div>
              {{ statusToText[item.status + 1] }}
            </div>
          </button>
        </div>
        <!-- mobile -->
        <div class="sm:hidden">
          <div class="py-20"></div>
          <div v-for="item in filteredList" :key="item.eid" class="cellsm" :class="[item.status == 1 && item.rid == rid ? 'h-26' : '']">
            <div class="flex flex-col h-full w-3/4 justify-between">
              <p class="text-left font-medium h-10 overflow-ellipsis overflow-hidden line-clamp-2">
                {{ item.user_description }}
              </p>
              <div>
                <div v-if="item.status == 1 && item.rid == rid" class="text-left py-0.5">
                  <div>
                    QQ:<em>{{ item.qq || "无" }}</em>
                  </div>
                  <div>
                    电话:<em>{{ item.qq || "无" }}</em>
                  </div>
                </div>
                <div class="flex text-left items-center justify-start">
                  <div class="w-17 truncate">{{ item.model }}</div>
                  <span class="text-xs ml-2 textDescription">{{ item.gmt_create }}</span>
                  <button
                    v-if="(item.status == 1 || item.status == 2) && item.rid == rid && eventsMatchingByRID"
                    @click="dropEvent(item)"
                    class="text-xs font-medium text-warning w-8 p-[1px] rounded ml-2 mb-0.5 border border-warning hover:(bg-warning text-warningContent)"
                  >
                    放弃
                  </button>
                </div>
              </div>
            </div>
            <div class="">
              <button v-if="item.status == 0" @click="acceptEvent(item)" class="btnxs btnPrimary">接受</button>
              <div class="relative">
                <div>
                  <button v-if="item.status == 1 && item.rid == rid" @click="submitEvent(item)" class="btnxs btnActiveReverse">提交</button>
                  <button
                    v-if="item.status == 2 && item.rid == rid && eventsMatchingByRID"
                    @click="alterSubmit(item)"
                    class="btnxs btnWarningReverse"
                  >
                    修改
                  </button>
                </div>
              </div>
              <button v-if="item.status == 2 && role == 'admin' && checkOnly" @click="judgeSubmit(item)" class="btnxs btnWarningReverse">
                审核
              </button>
            </div>
            <!--//TODO show status <div class="absolute top-0 right-0 mt-1 mr-2 rounded-x-full w-13 shadow-innerlg bg-primary text-primaryContent text-shadow-xl ">123</div> -->
            <div
              v-if="item.status == 2 && eventsMatchingByRID"
              class="
                absolute
                flex
                items-center
                justify-center
                h-5
                w-20
                transform
                -rotate-45
                top-2
                -left-5
                bg-primary
                text-primaryContent
                shadow-2xl
                text-xs
              "
            >
              已提交
            </div>
          </div>
        </div>
      </scroll-area>
    </div>
    <div class="w-full hidden sm:block">
      <router-view @update="setEvents()"></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, inject } from "vue";
import router from "@/router";
import { Event } from "@/api/api";
import { TabGroup, TabList, Tab } from "@headlessui/vue";
// import Dialog from "@/components/Dialog/Dialog.vue";
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue";

const events = ref([]);

const rid = ref(sessionStorage.getItem("rid"));
const role = ref(sessionStorage.getItem("user_role"));

const defaultIndex = ref(0);
const filterOptions = ref(role.value == "admin" ? ["全部", "我的", "审核"] : ["待接受", "我的"]);
const statusToText = ref(["取消", "待接受", "已接受", "待审核", "关闭"]);

const checkOnly = ref(false);
const eventsMatchingByRID = ref(false);
const searchQuery = ref("");
const filterHandler = e => {
  console.log(e);
  checkOnly.value = false;
  eventsMatchingByRID.value = false;
  if (e == "全部") {
    eventsMatchingByRID.value = false;
  } else if (e == "我的") {
    eventsMatchingByRID.value = true;
  } else if (e == "审核") {
    checkOnly.value = true;
  }
};
const filteredList = computed(() => {
  return events.value.filter(events => {
    return (
      ((!checkOnly.value && eventsMatchingByRID.value && events.rid === rid.value) ||
        (!checkOnly.value && !eventsMatchingByRID.value && events.status == 0) ||
        (checkOnly.value && events.status == 2)) &&
      events.user_description.indexOf(searchQuery.value) >= 0
    );
  });
});

const selected = ref("");
const showDetail = e => {
  selected.value = e;
  router.push("/Events/" + e);
};

const setEvents = () => {
  Event.get().then(res => (events.value = res.data));
};
setEvents();

const BottomDialog = inject("BottomDialog");
const eventBottomDialog = config => {
  // TODO condition
  BottomDialog(config).then(() => setEvents());
};

const acceptEvent = event => {
  BottomDialog({
    subject: "接受事件",
    content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
    acceptAction: () => {
      return Event.accept({ eid: event.eid });
    },
  }).then(res => {
    setEvents();
    // filterHandler("我的");
  });
};
const submitEvent = event => {
  eventBottomDialog({
    subject: "提交维修",
    formList: [
      {
        subject: "维修描述",
        id: "description",
        required: true,
        type: "textarea",
      },
    ],
    rounded: true,
    content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
    acceptActionName: "提交",
    acceptAction: e => {
      return Event.submit({ eid: event.eid, description: e.description });
    },
  });
};
const alterSubmit = event => {
  Event.get(event.eid).then(res => {
    let eventDetail = res.data.repair_description;
    eventBottomDialog({
      subject: "修改提交",
      formList: [
        {
          subject: "维修描述",
          id: "description",
          required: true,
          type: "textarea",
          val: eventDetail[eventDetail.length - 1].description,
        },
      ],
      rounded: true,
      content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
      acceptActionName: "提交",
      acceptAction: e => {
        return Event.alterSubmit({ eid: event.eid, description: e.description });
      },
    });
  });
};
const dropEvent = event => {
  eventBottomDialog({
    subject: "放弃事件",
    confirmMessage: "放弃",
    content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
    acceptAction: () => {
      return Event.drop({ eid: event.eid });
    },
  });
};
const judgeSubmit = async event => {
  var previousRepairDescription;
  await Event.get(event.eid).then(res => {
    var repairDescription = res.data.repair_description;
    previousRepairDescription = repairDescription[repairDescription.length - 1];
  });
  eventBottomDialog({
    subject: "审核提交",
    acceptActionName: "通过",
    declineActionName: "退回",
    rounded: true,
    content: [
      { 型号: event.model },
      { 问题描述: event.user_description },
      { 创建时间: event.gmt_create },
      { 维修描述: previousRepairDescription.description },
      { 提交时间: previousRepairDescription.time },
    ],
    // TODO test
    acceptAction: () => {
      return Event.close({ eid: event.eid });
    },
    declineAction: () => {
      return Event.reject({ eid: event.eid });
    },
  });
};
</script>

<style></style>
