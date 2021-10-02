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
        <TabGroup class="w-full">
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
            v-for="item in fiilteredList"
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
                @click="judgeSubmit(item)"
                class="bg-primary text-primaryContent btnxs"
              >
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
    <!-- <Dialog focus ref="Dialog"> </Dialog> -->
    <bottom-dialog ref="BottomDialog" :passData="passData">
      <template #body>
        <div v-if="action == 'submit' || action == 'alter'" class="flex flex-col items-center">
          <div class="font-semibold mt-5 ml-11 self-start">维修描述*</div>
          <form class="relative w-full flex flex-col items-center justify-center" @submit="$refs.BottomDialog.emitValue('accept')">
            <textarea
              class="border-none rounded-xl materialInput h-36 mt-1 p-3 placeholder-gray-600 w-5/6 resize-none"
              cols="30"
              rows="4"
              type="textarea"
              placeholder="讲三句话...热烈地竹霍...衷心的感谢...办成功..."
              v-model="passData.description"
              required
            ></textarea>
            <div class="absolute inset-x-0 -bottom-12">
              <button type="submit" class="btnsm rounded-x-full text-center hover:shadow-transparent"></button>
            </div>
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
import BottomDialog from "@/components/BottomDialog/BottomDialogBase.vue";
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue";
export default {
  name: "Events",
  components: {
    TabGroup,
    TabList,
    Tab,
    Dialog,
    BottomDialog,
    ScrollArea,
  },
  inject: ["BottomDialog"],
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
      selected: "",
      searchQuery: "",
      checkOnly: false, //审核
      eventsMatchingByRID: false,
      passData: {},
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
    action() {
      this.passData = {};
    },
    passData() {
      console.log(this.passData);
    },
  },
  created() {
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
      // console.log(this.events);
    },
    showDetail(e) {
      this.selected = e;
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
      let config = {
        subject: "接受事件",
        content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
        acceptAction: () => {
          return Event.accept({ eid: event.eid });
        },
      };
      this.BottomDialog(config).then(() => this.setEvents());
    },
    submitEvent(event) {
      this.passData.eid = event.eid;
      this.action = "submit";
      console.log(event);
      this.$refs.BottomDialog.openModal({
        subject: "提交维修",
        acceptActionName: "提交",
        rounded: true,
        content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
        acceptAction: () => {
          return e => {
            return Event.submit({ eid: event.eid, description: e.description });
          };
        },
      })
        .then(() => {
          this.passData = {};
          this.setEvents();
        })
        .catch(() => {});
    },
    alterSubmit(event) {
      this.action = "alter";
      this.passData = {};
      Event.get(event.eid).then(res => {
        let eventDetail = res.data.repair_description;
        this.passData.description = eventDetail[eventDetail.length - 1].description;
        this.$refs.BottomDialog.openModal({
          subject: "修改提交",
          acceptActionName: "提交",
          rounded: true,
          content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
          acceptAction: () => {
            return e => {
              //TODO add /event/alter
              return Event.alterSubmit({ eid: event.eid, description: e.description });
            };
          },
        })
          .then(() => {
            this.setEvents();
          })
          .catch(() => {});
      });
    },
    dropEvent(event) {
      let config = {
        subject: "放弃事件",
        confirmMessage: "放弃",
        content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
        acceptAction: () => {
          return Event.drop({ eid: event.eid });
        },
      };
      this.BottomDialog(config).then(() => this.setEvents());
    },
    async judgeSubmit(event) {
      this.action = "judge";
      var lastRepairDescription;
      await Event.get(event.eid).then(res => {
        var repairDesacription = res.data.repair_description;
        lastRepairDescription = repairDesacription[repairDesacription.length - 1];
      });
      let config = {
        subject: "审核提交",
        acceptActionName: "通过",
        rounded: true,
        content: [
          { 型号: event.model },
          { 问题描述: event.user_description },
          { 创建时间: event.gmt_create },
          { 维修描述: lastRepairDescription.description },
          { 提交时间: lastRepairDescription.time },
        ],
        // TODO test
        acceptAction: () => {
          return Event.close({ eid: event.eid });
        },
        declineAction: () => {
          return Event.reject({ eid: event.eid });
        },
      };
      this.BottomDialog(config).then(() => this.setEvents());
      // await this.$refs.BottomDialog.openModal({
      //   subject: "审核提交",
      //   acceptActionName: "通过",
      //   rounded: true,
      //   content: [
      //     { 型号: event.model },
      //     { 问题描述: event.user_description },
      //     { 创建时间: event.gmt_create },
      //     { 维修描述: lastRepairDescription.description },
      //     { 提交时间: lastRepairDescription.time },
      //   ],
      //   acceptAction: () => {
      //     return e => {
      //       return Event.close({ eid: event.eid });
      //     };
      //   },
      //   declineAction: () => {
      //     return e => {
      //       return Event.reject({ eid: event.eid });
      //     };
      //   },
      // })
      //   .then(() => {
      //     this.setEvents();
      //   })
      //   .catch(() => {});
    },
  },
};
</script>

<style></style>
