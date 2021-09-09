<template>
  <div class="flex justify-between w-full sm:(bg-base-self flex-col h-full border-r p-2)">
    <div class="relative flex flex-col-reverse sm:block w-full">
      <div class="h-15 p-2 md:(p-0 h-24) flex justify-between items-center z-40">
        <div class="text-center text-3xl sm:(w-full) lg:text-4xl font-bold font-mono italic tracking-wide uppercase text-gray-900">
          sunday
        </div>
        <MenuIcon class="w-9 h-9 bg-bg-gray-900 sm:(hidden)" @click="isOpen = !isOpen"></MenuIcon>
      </div>
      <div class="hidden sm:(block)">
        <button v-for="item in menuitems" :key="item.name" class="cell text-xl whitespace-nowrap" @click="toRepairEvents(item.link)">
          {{ item.name }}
        </button>
      </div>
      <TransitionRoot
        :show="isOpen"
        class="
          sm:(hidden)
          absolute
          inset-x-0
          z-30
          pb-12
          px-1.5
          pt-2
          bg-gradient-to-t
          from-gray-100/50
          via-gray-200/70
          to-gray-200/90
          rounded-t-xl
          border
          backdrop-filter backdrop-blur-lg
        "
        enter="transition-opacity ease-out duration-150"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in duration-150 "
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="">
          <div class="bg-gray-50/90 rounded-xl shadow-sm divide-y divide-gray-400/30 overflow-hidden">
            <button
              v-for="item in menuitems"
              :key="item.name"
              class="cell h-10 m-0 hover:shadow-none rounded-none whitespace-nowrap"
              @click="toRepairEvents(item.link)"
            >
              {{ item.name }}
            </button>
          </div>
          <div class="h-13 bg-gray-50/90 p-1 my-1.5 rounded-xl shadow-sm flex items-center justify-between">
            <div class="flex items-center">
              <div class="overflow-hidden rounded-lg h-11 w-11 block">
                <img class="" :src="avatar" alt="" />
              </div>
              <div class="ml-2">
                <div class="flex items-center">
                  <div class="textSubHeading">{{ alias }}</div>
                  <span v-if="role == 'admin'" class="h-5 badge bg-green-100 text-green-800"> 管理员 </span>
                </div>
                <div class="textDescription text-left leading-tight">
                  {{ rid }}
                </div>
              </div>
            </div>
            <div class="mr-1">
              <button class="btnsm bg-green-600 text-white">账号设置</button>
              <button class="ml-2 btnsm bg-warning text-warningContent" @click="logout">登出</button>
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
    <div class="hidden sm:(flex) flex-col items-center mb-4">
      <div class="hidden overflow-hidden rounded-full sm:(h-20 w-20 block) md:(h-28 w-28)">
        <img class="" :src="avatar" alt="" />
      </div>
      <div class="relative">
        <div class="textSubHeading">{{ alias }}</div>
        <div class="textDescription text-left">
          {{ rid }}
        </div>
        <span v-if="role == 'admin'" class="bottom-0 -top-2 -right-6 h-5 badge bg-green-100 text-green-800"> 管理员 </span>
      </div>
      <!-- <div>event count</div> -->
      <div><button>账号设置</button></div>
      <button class="btn bg-warning text-warningContent" @click="logout">登出</button>
    </div>
  </div>
</template>

<script>
import { MenuIcon } from "@heroicons/vue/outline";
import { TransitionRoot } from "@headlessui/vue";
export default {
  name: "Menu",
  components: { MenuIcon, TransitionRoot },
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
      // this.isOpen = false;
      this.$router.push(link);
    },
    logout() {
      sessionStorage.removeItem("access_token");
      this.$router.push("/login");
    },
  },
};
</script>
