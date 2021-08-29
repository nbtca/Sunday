<template>
  <div class="flex flex-col justify-between h-full px-1 overflow-hidden">
    <div>
      <div
        class="
          h-16
          w-full
          text-2xl
          md:text-3xl
          lg:text-4xl
          font-bold font-mono
          italic
          tracking-wide
          uppercase
          flex
          items-center
          text-gray-900
          justify-center
        "
      >
        sunday
      </div>
      <button
        v-for="item in menuitems"
        :key="item.name"
        class="cell whitespace-nowrap"
        @click="toRepairEvents(item.link)"
      >
        {{ item.name }}
      </button>
    </div>
    <div class="flex flex-col items-center mb-4">
      <div class="overflow-hidden h-20 w-20 rounded-full md:(h-28 w-28)">
        <img class="" :src="avatar" alt="" />
      </div>
      <div class="relative">
        <div class="text-2xl">{{ alias }}</div>
        <div class="textDescription text-left">
          {{ rid }}
        </div>
        <span
          v-if="role == 'admin'"
          class="
            bottom-0
            -top-2
            -right-6
            h-5
            px-2
            text-xs
            leading-5
            font-semibold
            rounded-full
            bg-green-100
            text-green-800
          "
        >
          管理员
        </span>
      </div>
      <div>event count</div>
      <div><button>账号设置</button></div>
      <button class="btn bg-warning text-warningContent" @click="logout">
        登出
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  components: {},
  data() {
    return {
      alias: "",
      avatar: "",
      role: "",
      menuitems: [
        {
          name: "维修事件",
          icon: "star",
          link: "/Events/",
        },
        {
          name: "成员管理",
          icon: "star",
          link: "/ElementManage/",
        },
      ],
    };
  },
  created() {
    this.alias = sessionStorage.getItem("alias");
    this.avatar = sessionStorage.getItem("avatar");
    this.role = sessionStorage.getItem("user_role");
    this.rid = sessionStorage.getItem("rid");
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
