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
            :class="[item.eid == selectedItem ? 'bg-gray-400/30 cursor-default shadow' : '']"
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
          <event-card
            v-for="item in filteredList"
            :key="item.eid"
            :class="[item.status == 1 && item.rid == rid ? 'h-26' : '']"
            :bannerMessage="item.status == 2 && eventsMatchingByRID ? '已提交' : ''"
          >
            <template #body>
              {{ item.user_description }}
            </template>
            <template #action>
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
            </template>
            <template #info>
              <div v-if="item.status == 1 && item.rid == rid">
                <div>
                  QQ:<em>{{ item.qq || "无" }}</em>
                </div>
                <div>
                  电话:<em>{{ item.qq || "无" }}</em>
                </div>
              </div>
            </template>
            <template #footer>
              <div class="w-17 truncate">{{ item.model }}</div>
              <span class="text-xs ml-2 textDescription">{{ item.gmt_create }}</span>
              <button
                v-if="(item.status == 1 || item.status == 2) && item.rid == rid && eventsMatchingByRID"
                @click="dropEvent(item)"
                class="
                  text-xs
                  font-medium
                  text-warning
                  w-8
                  p-[1px]
                  rounded
                  ml-2
                  mb-0.5
                  border border-warning
                  hover:(bg-warning
                  text-warningContent)
                "
              >
                放弃
              </button>
            </template>
          </event-card>
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
import { setEvents, events, acceptEvent, submitEvent, alterSubmit, dropEvent, judgeSubmit } from "./EventActions";
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue";
import EventCard from "../../components/EventCard/EventCard.vue";
// const events = ref([]);

const rid = ref(sessionStorage.getItem("rid"));
const role = ref(sessionStorage.getItem("user_role"));

const statusToText = ref(["取消", "待接受", "已接受", "待审核", "关闭"]);

// filter
const defaultIndex = ref(0);
const filterOptions = ref(role.value == "admin" ? ["全部", "我的", "审核"] : ["待接受", "我的"]);
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

import { useRoute } from "vue-router";
const route = useRoute();

const selectedItem = computed(() => {
  let fullPath = route.path;
  let tailIndex = fullPath.lastIndexOf("/");
  let pagePath = fullPath.substring(tailIndex + 1);
  return pagePath;
});

// detail handler
const showDetail = e => {
  router.push("/Events/" + e);
};

// event actions
// const setEvents = () => {
//   Event.get().then(res => (events.value = res.data));
// };
setEvents();
</script>

<style></style>
