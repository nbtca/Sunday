<template>
  <div class="flex flex-row w-full h-full">
    <div
      class="flex flex-col items-center border-r px-2"
      style="width: 20vw; min-width: 250px"
    >
      <div class="sticky top-0 w-full h-auto py-4">ACTIVE | MINE (Slider)</div>
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
    <div class="overflow-hidden w-full">
      <router-view> </router-view>
    </div>
  </div>
</template>
//TODO:search

<script>
import { getEvents } from "@/api/api";
export default {
  name: "Events",
  components: {},
  setup() {
    return {};
  },
  data() {
    return {
      statusToText: ["取消", "待接受", "已接受", "待确认", "关闭"],
      currentList: "全部",
      events: [],
      searchQuery: "",
      eventsMatchingByID: false,
    };
  },
  computed: {
    fiilteredList() {
      const rid = sessionStorage.getItem("rid");
      console.log(rid);
      return this.events.filter((events) => {
        return (
          ((this.eventsMatchingByID && events.rid === rid) ||
            !this.eventsMatchingByID) &&
          events.user_description.indexOf(this.searchQuery) >= 0
        );
      });
    },
  },
  watch: {
    $route() {
      // this.showAll();
    },
  },
  async created() {
    await getEvents().then((res) => (this.events = res.data));
    this.showAll();
  },
  methods: {
    showDetail(e) {
      console.log(e);
      this.$router.push("/Events/" + e);
    },
    showAll() {
      this.eventsMatchingByID = false;
      this.currentList = "全部";
    },
    showMine() {
      this.eventsMatchingByID = true;
      this.currentList = "我的";
    },
  },
};
</script>

<style></style>
