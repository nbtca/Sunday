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
      <div
        class="px-2 overflow-auto w-full flex flex-col-reverse sm:flex-col"
        style="height: 100vh"
        :style="[isSafari ? '' : 'height: calc(var(---vh, 1vh) * 100)']"
      >
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
        <div class="sm:hidden">
          <div class="py-20"></div>
          <div
            v-for="item in fiilteredList"
            :key="item.eid"
            class="w-full h-20 px-2 py-1 my-1 bg-white rounded-xl border border-gray-200 flex justify-between items-center text-sm"
          >
            <div class="w-3/4 h-full flex flex-col justify-between">
              <p class="h-10 font-medium overflow-ellipsis overflow-hidden line-clamp-2 text-left">
                {{ item.user_description }}
              </p>
              <div class="flex items-center justify-start text-left">
                <div class="w-15">{{ item.model }}</div>
                <span class="textDescription ml-4 text-xs mt-1">{{ item.gmt_create }}</span>
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
                v-if="item.status == 1 && item.rid == rid"
                @click="submitEvent(item)"
                class="btnsm text-xs w-13 h-7 rounded-full bg-green-500"
              >
                提交
              </button>
              <button v-if="item.status == 2 && item.rid == rid" @click="" class="text-xs w-13 h-7 rounded-full">修改</button>
              <button
                v-if="item.status == 2 && role == 'admin' && item.rid != rid"
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
    <!-- <Dialog focus ref="Dialog"> </Dialog> -->
    <bottom-dialog ref="BottomDialog" :parms="parms">
      <template #body>
        <div v-if="currentEvent.status == 0" class="flex flex-col items-center justify-center h-44">
          <table class="divide-y divide-gray-400/30">
            <tr>
              <td class="py-2 w-[40vw] pr-10 whitespace-normal text-right">型号</td>
              <td class="py-2 text-sm text-left font-medium pr-5">{{ currentEvent.model }}</td>
            </tr>
            <tr>
              <td class="py-2 w-[40vw] pr-10 whitespace-normal text-right">问题描述</td>
              <td class="py-2 text-sm text-left font-medium pr-5">{{ currentEvent.user_description }}</td>
            </tr>
            <tr>
              <td class="py-2 w-[40vw] pr-10 whitespace-normal text-right">提交时间</td>
              <td class="py-2 text-sm text-left pr-5">{{ currentEvent.gmt_create }}</td>
            </tr>
          </table>
        </div>
        <div v-if="currentEvent.status == 1" class="flex flex-col items-center justify-center h-88">
          <table class="divide-y divide-gray-400/30 border-b border-gray-400/30">
            <tr>
              <td class="py-2 w-[40vw] pr-10 whitespace-normal text-right">型号</td>
              <td class="py-2 text-sm text-left font-medium pr-5">{{ currentEvent.model }}</td>
            </tr>
            <tr>
              <td class="py-2 w-[40vw] pr-10 whitespace-normal text-right">问题描述</td>
              <td class="py-2 text-sm text-left font-medium pr-5">{{ currentEvent.user_description }}</td>
            </tr>
            <tr>
              <td class="py-2 w-[40vw] pr-10 whitespace-normal text-right">提交时间</td>
              <td class="py-2 text-sm text-left pr-5">{{ currentEvent.gmt_create }}</td>
            </tr>
          </table>
          <div class="self-start ml-11 font-semibold mt-5">维修描述*</div>
          <form class="w-full" action="">
            <textarea
              class="resize-none border-none w-5/6 h-36 rounded-xl mt-1 p-3 bg-gray-400/40 placeholder-gray-600"
              name=""
              id=""
              cols="30"
              rows="4"
              type="textarea"
              placeholder="讲三句话...热烈地竹霍...衷心的感谢...办成功..."
              v-model="parms.description"
              required
            ></textarea>
          </form>
        </div>
      </template>
    </bottom-dialog>
  </div>
</template>

<script>
import { Event } from "@/api/api";
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import Dialog from "@/components/Dialog/Dialog.vue";
import BottomDialog from "@/components/Dialog/BottomDialog.vue";
export default {
  name: "Events",
  components: {
    TabGroup,
    TabList,
    Tab,
    Dialog,
    BottomDialog,
  },
  setup() {},
  data() {
    return {
      rid: "",
      role: "",
      filterOptions: ["待接受", "我的"],
      statusToText: ["取消", "待接受", "已接受", "待审核", "关闭"],
      currentList: "全部",
      currentEvent: "",
      events: [],
      searchQuery: "",
      checkOnly: false, //审核
      eventsMatchingByRID: false,
      isSafari: false,
      parms: {},
    };
  },
  computed: {
    fiilteredList() {
      return this.events.filter(events => {
        return (
          ((!this.checkOnly && this.eventsMatchingByRID && events.rid === this.rid) ||
            (!this.checkOnly && !this.eventsMatchingByRID && events.status == 0) ||
            (this.checkOnly && events.status == 2)) &&
          events.user_description.indexOf(this.searchQuery) >= 0
        );
      });
    },
  },
  watch: {
    $route() {},
    parms() {
      console.log(this.parms);
    },
  },
  async created() {
    var userAgent = navigator.userAgent;
    this.isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("---vh", `${vh}px`);
    this.rid = sessionStorage.getItem("rid");
    this.role = sessionStorage.getItem("user_role");
    if (this.role == "admin") {
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
      this.eventsMatchingByRID = false;
      if (e == "全部") {
        this.eventsMatchingByRID = false;
      } else if (e == "我的") {
        this.eventsMatchingByRID = true;
      } else if (e == "审核") {
        this.checkOnly = true;
      }
    },
    acceptEvent(event) {
      this.currentEvent = event;
      console.log(this.currentEvent);
      this.$refs.BottomDialog.openModal(
        {
          subject: "接受事件",
        },
        function () {
          return () => {
            console.log("aceeeeee");
            return Event.accept({ eid: event.eid });
          };
        }
      )
        .then(() => this.setEvents())
        .catch(() => {});
    },
    submitEvent(event) {
      this.parms.eid = event.eid;
      this.currentEvent = event;
      console.log(this.currentEvent);
      this.$refs.BottomDialog.openModal(
        {
          subject: "提交维修",
          actionName: "提交",
          rounded: true,
        },
        function () {
          return e => {
            console.log(e);
            return Event.submit(e);
          };
        }
      )
        .then(() => {
          this.parms = {};
          this.setEvents();
        })
        .catch(() => {});
    },
    // acceptEvent(item) {
    //   this.$refs.Dialog.openModal({
    //     heading: "确认接受事件",
    //     content: item.user_description,
    //   })
    //     .then(async () => {
    //       console.log(item.eid);
    //       await Event.accept({ eid: item.eid });
    //       this.setEvents();
    //     })
    //     .catch(() => {});
    // },
  },
};
</script>

<style></style>
