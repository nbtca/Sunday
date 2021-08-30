<template>
  <div class="flex">
    <div
      class="flex flex-col items-center border-r h-full"
      style="width: 24vw; min-width: 250px"
    >
      <div
        class="
          flex flex-col
          order-last
          self-end
          sm:order-first
          items-center
          w-full
          bg-base-emphasize
          border-b
        "
      >
        <input
          type="text"
          class="
            border border-base-standout
            rounded
            shadow-inner
            h-8
            my-0.5
            order-last
          "
          style="width: 99%"
          v-model="searchQuery"
        />
        <TabGroup class="w-full">
          <TabList class="flex p-1 space-x-1">
            <Tab
              v-for="item in filterOptions"
              as="template"
              :key="item"
              v-slot="{ selected }"
            >
              <button
                @click="filterHandler(item)"
                class="
                  w-full
                  py-2.5
                  text-sm
                  leading-5
                  font-medium
                  text-blue-700
                  rounded-lg
                  focus:(outline-none
                  ring-2)
                  ring-offset-2
                  ring-offset-blue-400
                  ring-white
                  ring-opacity-60
                "
                :class="[
                  selected
                    ? 'bg-white shadow'
                    : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400',
                ]"
              >
                {{ item }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <div class="px-2 overflow-auto w-full h-screen">
        <button
          v-for="item in fiilteredList"
          :key="item.eid"
          class="cell felx flex-row justify-between flex-nowrap"
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
    </div>
    <div class="w-full">
      <router-view @update="setEvents()"></router-view>
    </div>
  </div>
</template>

<script>
import { Event } from "@/api/api";
import { TabGroup, TabList, Tab } from "@headlessui/vue";

export default {
  name: "Events",
  components: {
    TabGroup,
    TabList,
    Tab,
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
      return this.events.filter((events) => {
        return (
          ((!this.checkOnly &&
            this.eventsMatchingByID &&
            events.rid === this.rid) ||
            (!this.checkOnly &&
              !this.eventsMatchingByID &&
              events.status == 0) ||
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
      Event.get().then((res) => (this.events = res.data));
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
  },
};
</script>

<style></style>
