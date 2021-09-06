<template>
  <div class="flex">
    <div class="flex flex-col items-center h-full w-full sm:(w-[24vw] min-w-[250px] border-r)">
      <div class="flex flex-col order-last self-end items-center w-full px-0.5 bg-base border-t sm:(order-first border-b px-0)">
        <input
          type="text"
          class="border-base-standout rounded-lg sm:(rounded text-left) shadow-inner h-10 my-0.5 mx-0.5 order-last text-center"
          style="width: 99%"
          v-model="searchQuery"
          placeholder="搜索"
        />
        <TabGroup class="w-full">
          <TabList class="flex p-1 space-x-1">
            <Tab v-for="item in filterOptions" as="template" :key="item" v-slot="{ selected }">
              <button
                @click="filterHandler(item)"
                class="w-full py-2.5 font-semibold leading-5 text-blue-700 rounded-lg focus:(outline-none border-gray-200 )"
                :class="[selected ? 'bg-white shadow' : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400']"
              >
                {{ item }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <div class="px-2 overflow-auto w-full h-screen flex flex-col-reverse sm:flex-col">
        <div class="hidden sm:block">
          <button
            v-for="item in fiilteredList"
            :key="item.eid"
            class="cell flex flex-row justify-between flex-nowrap"
            @click="showDetail(item.eid)"
          >
            <div class="truncate w-2/3 text-left">
              {{ item.user_description }}
            </div>
            <div>
              {{ statusToText[item.status + 1] }}
            </div>
          </button>
        </div>
        <div class="sm:hidden pt-40">
          <div
            v-for="item in fiilteredList"
            :key="item.eid"
            class="w-full h-20 px-2 py-1 my-1 bg-white rounded-xl border border-gray-200 flex justify-between items-center text-sm"
          >
            <div class="w-3/4 h-full flex flex-col justify-between">
              <p class="h-10 font-medium overflow-ellipsis overflow-hidden line-clamp-2 text-left">
                {{ item.user_description }}
              </p>
              <div class="text-left">
                <span class="align-baseline">{{ item.model }}</span>
                <span class="textDescription ml-4 text-xs align-baseline">{{ item.gmt_create }}</span>
              </div>
            </div>
            <div class="">
              <button
                v-if="item.status == 0"
                @click="acceptEvent(item)"
                class="btnsm text-xs w-13 h-7 rounded-full bg-primary text-primaryContent"
              >
                接受
              </button>
              <button
                v-if="item.status == 2"
                @click="acceptEvent(item)"
                class="btnsm text-xs w-13 h-7 rounded-full bg-primary text-primaryContent"
              >
                审核
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full hidden sm:block">
      <router-view @update="setEvents()"></router-view>
    </div>
    <Dialog focus ref="Dialog"> </Dialog>
  </div>
</template>

<script>
import { Event } from "@/api/api";
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import Dialog from "@/components/Dialog/Dialog.vue";
export default {
  name: "Events",
  components: {
    TabGroup,
    TabList,
    Tab,
    Dialog,
  },
  setup() {},
  data() {
    return {
      rid: "",
      filterOptions: ["待接受", "我的"],
      statusToText: ["取消", "待接受", "已接受", "待审核", "关闭"],
      currentList: "全部",
      events: [],
      searchQuery: "",
      checkOnly: false,
      eventsMatchingByID: false,
    };
  },
  computed: {
    fiilteredList() {
      return this.events.filter(events => {
        return (
          ((!this.checkOnly && this.eventsMatchingByID && events.rid === this.rid) ||
            (!this.checkOnly && !this.eventsMatchingByID && events.status == 0) ||
            (this.checkOnly && events.status == 2)) &&
          events.user_description.indexOf(this.searchQuery) >= 0
        );
      });
    },
  },
  watch: {
    $route() {},
  },
  async created() {
    this.rid = sessionStorage.getItem("rid");
    if (sessionStorage.getItem("user_role") == "admin") {
      this.filterOptions = ["全部", "我的", "审核"];
    }
    this.setEvents();
  },
  methods: {
    setEvents() {
      Event.get().then(res => (this.events = res.data));
      console.log(this.events);
    },
    showDetail(e) {
      this.$router.push("/Events/" + e);
    },
    filterHandler(e) {
      this.checkOnly = false;
      this.eventsMatchingByID = false;
      if (e == "全部") {
        this.eventsMatchingByID = false;
      } else if (e == "我的") {
        this.eventsMatchingByID = true;
      } else if (e == "审核") {
        this.checkOnly = true;
      }
    },
    acceptEvent(item) {
      this.$refs.Dialog.openModal({
        heading: "确认接受事件",
        content: item.user_description,
      })
        .then(async () => {
          console.log(item.eid);
          await Event.accept({ eid: item.eid });
          this.setEvents();
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
