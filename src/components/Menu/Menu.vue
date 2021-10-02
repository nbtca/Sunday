<template>
  <div class="flex w-full justify-between sm:(overflow-hidden bg-base-self flex-col h-full border-r border-gray-400/30 p-2)">
    <div class="flex flex-col-reverse sm:(items-center) w-full relative sm:block">
      <div class="flex h-15 p-2 z-40 justify-between items-center sm:(p-0) md:(w-full h-24) lg:(p-2)">
        <div
          class="logo"
          @click="
            $router.push('/Events');
            isOpen = false;
          "
        >
          sunday
        </div>
        <div v-if="menuList.length == 1" @click="accountSetting" class="rounded-full h-11 w-11 overflow-hidden border block">
          <img class="" :src="avatar" alt="" />
        </div>
        <MenuIcon v-if="menuList.length > 1" class="bg-bg-gray-900 h-9 w-9 sm:(hidden)" @click="isOpen = !isOpen"></MenuIcon>
      </div>
      <div class="hidden sm:(block)">
        <button
          v-for="item in menuList"
          :key="item.name"
          class="text-xl cell whitespace-nowrap"
          :class="[item.name == selected ? 'bg-gray-400/40 cursor-default' : '']"
          @click="toLink(item)"
        >
          {{ item.meta.title }}
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
          <div
            class="
              divide-y divide-gray-400/50
              px-1
              rounded-xl
              backdrop-filter backdrop-blur-md
              shadow
              overflow-hidden
              border border-gray-400/50
            "
          >
            <div class="py-1" v-for="item in menuList" :key="item.name">
              <button
                class="
                  flex
                  items-center
                  justify-center
                  h-10
                  m-0
                  cell
                  rounded-lg
                  font-medium
                  whitespace-nowrap
                  hover:(shadow-none
                  bg-gray-400/50
                  backdrop-filter backdrop-blur)
                "
                @click="toLink(item)"
              >
                <div class="w-24">
                  {{ item.meta.title }}
                </div>
              </button>
            </div>
          </div>
          <div
            class="
              rounded-xl
              flex
              backdrop-filter backdrop-blur
              h-13
              shadow
              my-1.5
              p-1
              items-center
              justify-between
              border border-gray-400/50
            "
          >
            <div class="flex items-center">
              <div class="rounded-lg h-11 w-11 overflow-hidden border block">
                <img class="" :src="avatar" alt="" />
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
              <button @click="accountSetting" class="text-green-600 materialThick btnsm">设置</button>
              <!-- <button @click="logout" class="bg-warning text-warningContent ml-2 btnsm">登出</button> -->
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
    <div class="flex flex-col mb-4 hidden items-center sm:(flex)">
      <div class="flex flex-col items-center xl:(flex-row mb-4)">
        <div class="rounded-full hidden overflow-hidden border shadow-innerlg sm:(h-20 w-20 block) md:(h-28 w-28)">
          <img class="opacity-90" :src="avatar" alt="" />
        </div>
        <div class="relative xl:(self-end ml-2)">
          <div class="flex justify-center items-center xl:(flex-col items-start)">
            <div class="textSubHeading">{{ alias }}</div>
            <span v-if="role == 'admin'" class="bg-green-100 h-5 text-green-800 badge"> 管理员 </span>
          </div>
          <div class="text-left textDescription">
            {{ rid }}
          </div>
        </div>
      </div>
      <!-- <div>event count</div> -->
      <div class="flex flex-col lg:(flex-row)">
        <button class="btnsm m-2 materialThick text-green-700">账号设置</button>
        <button class="btnsm m-2 bg-warning text-warningContent" @click="logout">登出</button>
      </div>
    </div>
    <bottom-dialog ref="BottomDialog">
      <template #body>
        <div class="cellsm h-26 materialMedium bg-opacity-30">
          <div class="flex items-center">
            <div class="relative flex">
              <div class="rounded-full border border-gray-400/30 h-20 w-20 overflow-hidden">
                <img class="object-cover" :src="accountInfo.ravatar" alt="" />
              </div>
              <label for="file-upload" class="absolute relative textLink text-xs self-end cursor-pointer p-1 rounded-xl">
                <span>修改头像</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*" @change="updateAvatar" />
              </label>
              <!-- <button @click="updataAvatar" class="">修改头像</button> -->
            </div>
          </div>
          <div class="flex flex-col items-start pr-5">
            <div class="flex text-base font-medium">
              <div class="mr-2">{{ accountInfo.name }}</div>
              <div>{{ accountInfo.class }}</div>
            </div>
            <div class="leading-tight textDescription">{{ accountInfo.rid }}</div>
            <div>{{ accountInfo.gmt_create }}</div>
          </div>
        </div>
        <form class="relative">
          <input-section subject="昵称">
            <input-base subject="" :val="accountInfo.ralias" confirmBeforeInput></input-base>
          </input-section>
          <input-section subject="联系方式">
            <input-base subject="手机" :val="accountInfo.rphone" confirmBeforeInput></input-base>
            <input-base subject="QQ" :val="accountInfo.rqq" confirmBeforeInput></input-base>
          </input-section>
          <button @click="logout">登出</button>
          <div class="absolute inset-x-0 -bottom-12">
            <button type="submit" class="btnsm rounded-x-full text-center hover:shadow-transparent"></button>
          </div>
        </form>
        <div>
        </div>
      </template>
    </bottom-dialog>
  </div>
</template>

<script>
import { MenuIcon } from "@heroicons/vue/outline";
import { TransitionRoot } from "@headlessui/vue";
import { Element } from "@/api/api";
import BottomDialog from "@/components/BottomDialog/BottomDialogBase.vue";
import InputSection from "@/components/Input/InputSection.vue";
import InputBase from "@/components/Input/InputBase.vue";

export default {
  name: "Menu",
  components: { MenuIcon, TransitionRoot, BottomDialog, InputBase, InputSection },
  data() {
    return {
      isOpen: false,
      alias: "",
      avatar: "",
      role: "",
      rid: "",
      accountInfo: {},
      selected: "",
    };
  },
  created() {
    this.alias = sessionStorage.getItem("alias");
    this.avatar = sessionStorage.getItem("avatar");
    this.role = sessionStorage.getItem("user_role");
    this.rid = sessionStorage.getItem("rid");
    // this.menuList = this.$router.options.routes[0].children;
    // console.log(this.menuList);
  },
  computed: {
    menuList() {
      return this.$router.options.routes[0].children.filter(item => {
        for (let i of item.meta.roles) {
          if (i == this.role) {
            return item.meta.menuIcon != null;
          }
        }
      });
    },
  },
  methods: {
    toLink(item) {
      // this.isOpen = false;
      if (item.name != this.selected) {
        this.selected = item.name;
        this.$router.push(item.path);
      }
    },
    setAccountInfo() {
      return Element.get(this.rid).then(res => {
        this.accountInfo = res.data[0];
      });
    },
    accountSetting() {
      this.loading = true;
      this.setAccountInfo().then(res => {
        this.loading = false;
        this.$refs.BottomDialog.openModal({
          subject: "账号设置",
          rounded: true,
          acceptAction: () => {
            return () => {
              return Element.get();
            };
          },
        })
          .then()
          .catch(() => {});
      });
    },
    updateAvatar(event) {
      var file = event.target.files[0];
      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据
      Element.updateAvatar(param).then(res => {
        this.accountInfo.ravatar = res.data.avatar;
        sessionStorage.setItem("avatar", res.data.avatar);
        this.avatar = sessionStorage.getItem("avatar");
      });
    },

    logout() {
      sessionStorage.removeItem("access_token");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.logo {
  @apply font-bold font-mono text-center tracking-wide text-3xl italic text-shadow-sm uppercase sm:(text-2xl w-full self-center) md:(text-3xl) lg:text-4xl;
}
</style>
