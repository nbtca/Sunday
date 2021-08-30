<template>
  <div
    class="
      flex
      justify-between
      w-full
      border-t
      sm:(bg-base-self
      flex-col
      h-full
      border-r)
      p-2
      overflow-hidden
    "
  >
    <div class="flex flex-col-reverse sm:block">
      <div class="w-full h-15 md:h-24 flex justify-between items-center">
        <div
          class="
            text-center text-3xl
            sm:(w-full)
            lg:text-4xl
            font-bold font-mono
            italic
            tracking-wide
            uppercase
            text-gray-900
          "
        >
          sunday
        </div>
        <!-- <div class="relative h-full w-full border ">
          <img src="../../assets/banner.png" alt="" class="object-contain object-center" />
        </div> -->
        <MenuIcon
          class="block w-10 h-10 sm:(hidden)"
          @click="isOpen = !isOpen"
        ></MenuIcon>
      </div>
      <div class="hidden sm:(block)">
        <button
          v-for="item in menuitems"
          :key="item.name"
          class="cell text-xl whitespace-nowrap"
          @click="toRepairEvents(item.link)"
        >
          {{ item.name }}
        </button>
      </div>
      <div v-if="isOpen" class="sm:(hidden)">
        <button
          v-for="item in menuitems"
          :key="item.name"
          class="cell md:text-xl whitespace-nowrap"
          @click="toRepairEvents(item.link)"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
    <div class="hidden sm:(flex) flex-col items-center mb-4">
      <div
        class="
          hidden
          overflow-hidden
          rounded-full
          sm:(h-20
          w-20
          block)
          md:(h-28
          w-28)
        "
      >
        <img class="" :src="avatar" alt="" />
      </div>
      <div class="relative">
        <div class="textSubHeading">{{ alias }}</div>
        <div class="textDescription text-left">
          {{ rid }}
        </div>
        <span
          v-if="role == 'admin'"
          class="bottom-0 -top-2 -right-6 h-5 badge bg-green-100 text-green-800"
        >
          管理员
        </span>
      </div>
      <!-- <div>event count</div> -->
      <div><button>账号设置</button></div>
      <button class="btn bg-warning text-warningContent" @click="logout">
        登出
      </button>
    </div>
  </div>
</template>

<script>
import { MenuIcon } from "@heroicons/vue/outline";

export default {
  name: "Menu",
  components: { MenuIcon },
  data() {
    return {
      isOpen: false,
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
        {
          name: "设计",
          icon: "star",
          link: "/Design/",
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
