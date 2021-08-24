<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <div class="h-16 w-full border">LOGO</div>
      <button
        v-for="item in menuitems"
        :key="item.name"
        class="cell"
        @click="toRepairEvents(item.link)"
      >
        {{ item.name }}
      </button>
    </div>
    <div class="flex flex-col items-center h-56 mb-15 border">
      <div class="h-30 w-30 rounded-full border">AVATAR</div>
      <div>alias</div>
      <div>role</div>
      <div>event count</div>
      <div>account setting</div>
    </div>
    <!-- <q-card flat class="q-pa-lg">
      <div class="q-ml-xs" style="font-size: 2em">
        {{ alias }}
        <q-badge
          v-if="role != ''"
          align="top"
          color="yellow-6"
          text-color="black"
        >
          {{ role }}
        </q-badge>
      </div>
      <q-btn unelevated color="purple" label="登出" @click="logout" />
    </q-card> -->
  </div>
</template>

<script>
export default {
  name: "Menu",
  components: {},
  data() {
    return {
      alias: "",
      role: "",
      menuitems: [
        {
          name: "维修事件",
          icon: "star",
          link: "/Events/",
        },
        {
          name: "事件管理",
          icon: "star",
          link: "/EventsManage/",
        },
        {
          name: "成员管理",
          icon: "star",
          link: "/ElementManage/",
        },
        {
          name: "维修日管理",
          icon: "star",
          link: "/ElementManage/",
        },
      ],
    };
  },
  created() {
    this.alias = sessionStorage.getItem("alias");
    this.role = sessionStorage.getItem("user_role") === "admin" ? "管理员" : "";
  },
  methods: {
    toRepairEvents(link) {
      this.$router.push(link);
    },
    logout() {
      sessionStorage.removeItem("access_token");
      this.$router.push("/login");
    },
  },
};
</script>
