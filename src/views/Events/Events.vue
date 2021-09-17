<template>
  <div class="flex">
    <div class="flex flex-col h-full w-full items-center sm:(w-[24vw] min-w-[250px] border-r)">
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
        <TabGroup class="w-full">
          <TabList class="flex space-x-1 p-1">
            <Tab v-for="item in filterOptions" as="template" :key="item" v-slot="{ selected }">
              <button
                @click="filterHandler(item)"
                class="rounded-lg font-semibold w-full py-2.5 text-indigo-600 leading-5 focus:(outline-none border-base-standout )"
                :class="[selected ? 'bg-white shadow' : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400']"
              >
                {{ item }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <div
        class="flex flex-col-reverse w-full px-2 overflow-auto sm:flex-col"
        style="height: 100vh"
        :style="[isSafari ? '' : 'height: calc(var(---vh, 1vh) * 100)']"
      >
        <div class="hidden sm:block">
          <button
            v-for="item in fiilteredList"
            :key="item.eid"
            class="flex flex-row flex-nowrap cell justify-between"
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
        <div class="sm:hidden">
          <div class="py-20"></div>
          <div v-for="item in fiilteredList" :key="item.eid" class="cellsm">
            <div class="flex flex-col h-full w-3/4 justify-between">
              <p class="font-medium h-10 text-left overflow-ellipsis overflow-hidden line-clamp-2">
                {{ item.user_description }}
              </p>
              <div class="flex text-left items-center justify-start">
                <div class="w-17 truncate">{{ item.model }}</div>
                <span class="text-xs ml-2 textDescription">{{ item.gmt_create }}</span>
                <button
                  v-if="(item.status == 1 || item.status == 2) && item.rid == rid && eventsMatchingByRID"
                  @click="dropEvent(item)"
                  class="text-xs font-medium text-warning w-8 rounded ml-2"
                >
                  放弃
                </button>
              </div>
            </div>
            <div class="">
              <button v-if="item.status == 0" @click="acceptEvent(item)" class="bg-primary text-primaryContent btnxs">接受</button>
              <div class="relative">
                <div>
                  <button v-if="item.status == 1 && item.rid == rid" @click="submitEvent(item)" class="bg-gray-300/70 text-active btnxs">
                    提交
                  </button>
                  <button
                    v-if="item.status == 2 && item.rid == rid && eventsMatchingByRID"
                    @click="alterSubmit(item)"
                    class="btnxs bg-gray-300/70 text-warning"
                  >
                    修改
                  </button>
                </div>
              </div>
              <button
                v-if="item.status == 2 && role == 'admin' && checkOnly"
                @click="acceptEvent(item)"
                class="bg-primary text-primaryContent btnxs"
              >
                审核
              </button>
            </div>
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
      </div>
    </div>
    <div class="w-full hidden sm:block">
      <router-view @update="setEvents()"></router-view>
    </div>
    <!-- <Dialog focus ref="Dialog"> </Dialog> -->
    <bottom-dialog ref="BottomDialog" :parms="parms">
      <template #body>
        <div v-if="action == 'submit' || action == 'alter'" class="flex flex-col items-center">
          <div class="font-semibold mt-5 ml-11 self-start">维修描述*</div>
          <form class="w-full" action="">
            <textarea
              class="border-none rounded-xl materialInput h-36 mt-1 p-3 placeholder-gray-600 w-5/6 resize-none"
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
      action: "",
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
      this.action = "accept";
      console.log(event);
      this.$refs.BottomDialog.openModal(
        {
          subject: "接受事件",
          actionName: "确定",
          content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
        },
        function () {
          return () => {
            return Event.accept({ eid: event.eid });
          };
        }
      )
        .then(() => this.setEvents())
        .catch(() => {});
    },
    submitEvent(event) {
      this.parms.eid = event.eid;
      this.action = "submit";
      console.log(event);
      this.$refs.BottomDialog.openModal(
        {
          subject: "提交维修",
          actionName: "提交",
          rounded: true,
          content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
        },
        function () {
          return e => {
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
    dropEvent(event) {
      event = event;
      this.action = "drop";
      this.$refs.BottomDialog.openModal(
        {
          subject: "放弃事件",
          actionName: "确定",
          confirmMessage: "放弃",
          content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
        },
        function () {
          return () => {
            return Event.drop({ eid: event.eid });
          };
        }
      )
        .then(() => this.setEvents())
        .catch(() => {});
    },
    async alterSubmit(event) {
      this.action = "alter";
      let eventDetail;
      Event.get(event.eid).then(res => {
        eventDetail = res.data.repair_description;
        this.parms.description = eventDetail[eventDetail.length - 1].description;
      });
      await this.$refs.BottomDialog.openModal(
        {
          subject: "修改提交",
          actionName: "提交",
          rounded: true,
          content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
        },
        function () {
          return e => {
            //TODO add /event/alter
            return Event.submit(e);
          };
        }
      )
        .then(() => {
          this.parms = {};
          this.setEvents();
        })
        .catch(() => {});
      this.parms = {};
    },
  },
};
</script>

<style></style>
