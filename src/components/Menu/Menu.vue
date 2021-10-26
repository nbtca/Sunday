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
        <div v-if="menuList.length < 2" @click="accountSetting" class="rounded-full h-11 w-11 overflow-hidden border block">
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
        <!-- //TODO add overlay -->
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
              <button @click="accountSetting" class="btnsm btnNeutralReverse">设置</button>
              <!-- <button @click="logOut" class="bg-warning text-warningContent ml-2 btnsm">登出</button> -->
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
        <button class="btnsm m-2 btnNeutral">账号设置</button>
        <button class="btnsm m-2 bg-warning text-warningContent" @click="logOut">登出</button>
      </div>
    </div>
    <bottom-dialog ref="bottomDialog">
      <template #body>
        <div class="cellsm mb-2.5 h-26 materialMedium bg-opacity-30">
          <div class="flex items-center">
            <div class="relative flex">
              <div class="rounded-full border border-gray-400/30 h-20 w-20 overflow-hidden">
                <img class="object-cover" :src="accountInfo.ravatar" alt="" />
              </div>
              <label for="file-upload" class="absolute relative textLink text-xs self-end cursor-pointer rounded-xl">
                <span>修改头像</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*" @change="updateAvatar" />
              </label>
              <!-- <button @click="updateAvatar" class="">修改头像</button> -->
            </div>
          </div>
          <div class="flex flex-col items-start pr-5">
            <div class="flex text-base font-medium">
              <div class="mr-2">{{ accountInfo.name }}</div>
              <div>{{ accountInfo.class }}</div>
            </div>
            <div class="leading-tight textDescription">{{ accountInfo.rid }}</div>
            <div>{{ accountInfo.gmt_create }}</div>
            <!-- //TODO change the time format -->
          </div>
        </div>
        <form class="relative">
          <input-section subject="昵称">
            <input-base subject="" :passValue="accountInfo.ralias" confirmBeforeInput></input-base>
          </input-section>
          <input-section subject="联系方式">
            <input-base subject="手机" :passValue="accountInfo.rphone" confirmBeforeInput></input-base>
            <input-base subject="QQ" :passValue="accountInfo.rqq" confirmBeforeInput></input-base>
          </input-section>
        </form>
      </template>
      <template #actionSpace>
        <button type="submit" class="materialBtn btnPrimaryReverse">确定</button>
        <button @click="logOut" class="materialBtn btnWarning mt-3">登出</button>
      </template>
    </bottom-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Element } from "@/api/api";
import router from "@/router";
import { MenuIcon } from "@heroicons/vue/outline";
import { TransitionRoot } from "@headlessui/vue";
import BottomDialog from "@/components/BottomDialog/BottomDialogBase.vue";
import InputSection from "@/components/Input/InputSection.vue";
import InputBase from "@/components/Input/InputBase.vue";

const isOpen = ref(false);
const alias = ref(sessionStorage.getItem("alias"));
const avatar = ref(sessionStorage.getItem("avatar"));
const role = ref(sessionStorage.getItem("user_role"));
const rid = ref(sessionStorage.getItem("rid"));

const menuList = computed(() => {
  return router.options.routes[0].children.filter(item => {
    for (let i of item.meta.roles) {
      if (i == role.value) {
        return item.meta.menuIcon != null;
      }
    }
  });
});

const selected = ref("");
const toLink = item => {
  if (item.name != selected.value) {
    selected.value = item.name;
    router.push(item.path);
  }
};

const accountInfo = ref({});
const setAccountInfo = () => {
  return Element.get(rid.value).then(res => {
    accountInfo.value = res.data[0];
  });
};

const loading = ref(false);
const bottomDialog = ref(null);
const accountSetting = () => {
  loading.value = true;
  setAccountInfo().then(res => {
    loading.value = false;
    bottomDialog.value.openModal({
      subject: "账号设置",
      rounded: true,
      acceptAction: () => {
        return () => {
          return Element.get();
        };
      },
    });
  });
};
const updateAvatar = event => {
  let file = event.target.files[0];
  let param = new FormData();
  param.append("file", file);
  Element.updateAvatar(param).then(res => {
    accountInfo.value.ravatar = res.data.avatar;
    sessionStorage.setItem("avatar", res.data.avatar);
    avatar.value = sessionStorage.getItem("avatar");
  });
};
const logOut = () => {
  sessionStorage.removeItem("access_token");
  router.push("/login");
};
</script>
<style>
.logo {
  @apply font-bold font-mono text-center tracking-wide text-3xl italic text-shadow-sm uppercase sm:(text-2xl w-full self-center) md:(text-3xl) lg:text-4xl;
}
</style>
