<template>
  <div class="flex w-full justify-between sm:(bg-base-self flex-col h-full border-r p-2)">
    <div class="flex flex-col-reverse w-full relative sm:block">
      <div class="flex h-15 p-2 z-40 justify-between items-center md:(p-0 h-24)">
        <div
          class="font-bold font-mono text-center tracking-wide text-3xl italic text-shadow-sm uppercase sm:(w-full) lg:text-4xl"
          @click="
            $router.push('/');
            isOpen = false;
          "
        >
          sunday
        </div>
        <!-- <button class="h-11 w-11 flex items-center justify-center rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.99 114.94" class="h-8 fill-current text-gray-900">
            <g id="Regular-M">
              <path
                d="M37.21,66.92l4.68-4.59L9.52,29.81a7.83,7.83,0,0,1-2.64-5.42A7.83,7.83,0,0,1,9.52,19L16.41,12A7.49,7.49,0,0,1,21.8,9.42a7.88,7.88,0,0,1,5.45,2.67L62.11,46.9,67,42.55,32.37,7.69q-5.11-5.13-10.5-5.15t-10.4,5L5,14q-5,5-5,10.37T5.13,34.89ZM34,45.19a1.82,1.82,0,0,0,2.59,0,1.76,1.76,0,0,0,0-2.54L18.36,24.39a1.91,1.91,0,0,0-1.27-.46,1.77,1.77,0,0,0-1.32.46,2.24,2.24,0,0,0-.51,1.37A1.55,1.55,0,0,0,15.77,27Zm6-6a1.74,1.74,0,0,0,1.32.52,1.81,1.81,0,0,0,1.27-.52,2.12,2.12,0,0,0,.53-1.39,1.69,1.69,0,0,0-.48-1.24L24.41,18.38a1.72,1.72,0,0,0-1.29-.51,1.74,1.74,0,0,0-1.76,1.81,1.92,1.92,0,0,0,.51,1.24Zm62.84,74.91,8.74-8.74a2.49,2.49,0,0,0,.71-1.93,4.57,4.57,0,0,0-.81-2.22L101.32,86A6.19,6.19,0,0,0,97,83.18l-4.39-.68L68.9,58.81,64.36,64,89.75,89.33l5.46.93,9.33,12.4-4.44,4.44L87.74,97.78l-1-5.47L61.62,67.11,57,72.29l22.9,22.85.69,4.4a5.14,5.14,0,0,0,.92,2.44,6.86,6.86,0,0,0,1.91,1.85l15.28,10.35a3.82,3.82,0,0,0,2.25.76A2.76,2.76,0,0,0,102.88,114.14ZM7.62,108.37a21.7,21.7,0,0,0,9.2,5.64,17.68,17.68,0,0,0,9.91,0,20.62,20.62,0,0,0,9.11-5.59,34.18,34.18,0,0,0,4.59-5.64q1.91-3,3.76-6.44t4.37-7.84q2.52-4.35,6.37-9.79t9.72-12.3Q70.5,59.59,79.1,51l-4.25-4.3Q65.43,56.14,59.3,63.21T49.39,75.54q-3.78,5.25-6.08,9.2t-4,7.08q-1.68,3.12-3.56,5.93a39.43,39.43,0,0,1-4.91,5.84,12.65,12.65,0,0,1-9.11,4.13,12.94,12.94,0,0,1-9.3-4.18,13.14,13.14,0,0,1-4.2-9.33,12.56,12.56,0,0,1,4.05-9.08,42.34,42.34,0,0,1,5.89-4.91q2.8-1.87,6-3.56t7.08-4q3.93-2.3,9.2-6.08t12.33-9.91q7.05-6.13,16.48-15.55L65,36.89Q56.4,45.49,49.54,51.34T37.23,61q-5.44,3.83-9.79,6.34t-7.84,4.4q-3.48,1.88-6.44,3.76A33,33,0,0,0,7.52,80.1a21,21,0,0,0-5.59,9.13A17.71,17.71,0,0,0,2,99.15,21.65,21.65,0,0,0,7.62,108.37Zm13.91-7.76a6.08,6.08,0,0,0,6.06-6,5.78,5.78,0,0,0-1.78-4.25,5.9,5.9,0,0,0-4.28-1.76,6,6,0,0,0-6,6,5.84,5.84,0,0,0,1.76,4.27A5.72,5.72,0,0,0,21.53,100.61Zm46.83-53a28.68,28.68,0,0,0,9.4,6.35A29.47,29.47,0,0,0,88.43,56.2,27.78,27.78,0,0,0,99,54.37a26.66,26.66,0,0,0,15.51-16.16A28.8,28.8,0,0,0,112,14.48l-4.73,4.78a22.45,22.45,0,0,1,2.29,8.67,21.66,21.66,0,0,1-1.24,8.59A20.18,20.18,0,0,1,94,49.19a22,22,0,0,1-11.08-.29A23.28,23.28,0,0,1,67,33.11,22,22,0,0,1,66.77,22a19.61,19.61,0,0,1,5.45-9.62A19.85,19.85,0,0,1,83.76,6.64,21.2,21.2,0,0,1,96.63,8.81L101.42,4A28.37,28.37,0,0,0,89.7.15,28,28,0,0,0,77.81,1.47,25.35,25.35,0,0,0,67.68,7.84a25.53,25.53,0,0,0-6,9.13,27.6,27.6,0,0,0-1.88,10.57,28.91,28.91,0,0,0,8.59,20ZM83.15,25.66l7.23,7.18a8.44,8.44,0,0,0,5.91,2.78,7.79,7.79,0,0,0,5.76-2.54l10.25-10.3L108,18.53l-9.33,9.23c-1.46,1.5-2.93,1.5-4.39,0l-6-6q-2.34-2.38-.24-4.49l9.42-9.33L93.07,3.64,82.91,13.84a7.79,7.79,0,0,0-2.64,5.86A8.8,8.8,0,0,0,83.15,25.66Z"
              />
            </g>
          </svg>
        </button> -->
        <MenuIcon class="bg-bg-gray-900 h-9 w-9 sm:(hidden)" @click="isOpen = !isOpen"></MenuIcon>
      </div>
      <div class="hidden sm:(block)">
        <button v-for="item in menuitems" :key="item.name" class="text-xl cell whitespace-nowrap" @click="toLink(item.link)">
          {{ item.name }}
        </button>
      </div>
      <TransitionRoot
        :show="isOpen"
        class="border rounded-t-xl px-1.5 pt-2 pb-12 inset-x-0 z-30 absolute materialThin sm:(hidden)"
        enter="transition-opacity ease-out duration-150"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in duration-150 "
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="">
          <div class="divide-y rounded-xl divide-gray-400/30 bg-gray-50/90 shadow-sm overflow-hidden border border-gray-400/20">
            <button
              v-for="item in menuitems"
              :key="item.name"
              class="rounded-none h-10 m-0 font-medium cell whitespace-nowrap hover:shadow-none"
              @click="toLink(item.link)"
            >
              {{ item.name }}
            </button>
          </div>
          <div class="rounded-xl flex bg-gray-50/90 h-13 shadow-sm my-1.5 p-1 items-center justify-between border">
            <div class="flex items-center">
              <div class="rounded-lg h-11 w-11 overflow-hidden block shadow-innerlg">
                <img class="opacity-90" :src="avatar" alt="" />
              </div>
              <div class="ml-2">
                <div class="flex items-center">
                  <div class="textSubHeading">{{ alias }}</div>
                  <span v-if="role == 'admin'" class="bg-green-100 h-5 text-green-800 badge"> 管理员 </span>
                </div>
                <div class="text-left leading-tight textDescription">
                  {{ rid }}
                </div>
              </div>
            </div>
            <div class="mr-1">
              <button class="bg-neutral text-neutralContent btnsm">账号设置</button>
              <button class="bg-warning text-warningContent ml-2 btnsm" @click="logout">登出</button>
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
    <div class="flex-col mb-4 hidden items-center sm:(flex)">
      <div class="rounded-full hidden overflow-hidden sm:(h-20 w-20 block) md:(h-28 w-28)">
        <img class="" :src="avatar" alt="" />
      </div>
      <div class="relative">
        <div class="textSubHeading">{{ alias }}</div>
        <div class="text-left textDescription">
          {{ rid }}
        </div>
        <span v-if="role == 'admin'" class="bg-green-100 h-5 -top-2 -right-6 bottom-0 text-green-800 badge"> 管理员 </span>
      </div>
      <!-- <div>event count</div> -->
      <div><button>账号设置</button></div>
      <button class="bg-warning text-warningContent btn" @click="logout">登出</button>
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
          link: "/",
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
    toLink(link) {
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
