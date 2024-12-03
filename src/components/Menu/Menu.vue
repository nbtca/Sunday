<template>
  <div class="flex w-full justify-between sm:(overflow-hidden bg-base-self flex-col h-full border-r border-gray-400/30 p-2)">
    <div class="flex flex-col-reverse sm:(items-center) w-full relative sm:block">
      <div class="flex h-15 mb-2 p-2 z-40 justify-between items-center sm:(p-0 m-0) md:(w-full h-24) lg:(p-2)">
        <div class="flex items-center sm:hidden" @click="accountSetting">
          <div class="rounded-full h-11 w-11 overflow-hidden border block">
            <img class="" :src="store.account.avatar || defaultAvatar" alt="" />
          </div>
          <div class="ml-2">
            <div class="flex items-center">
              <div class="textSubHeading">{{ store.account.alias }}</div>
              <span v-if="store.account.role == 'admin'" class="bg-green-100 h-5 text-green-800 badge"> 管理员 </span>
            </div>
            <div class="text-left leading-tight textDescription">
              {{ store.account.memberId }}
            </div>
          </div>
        </div>
        <div class="logo hidden sm:block" @click="toEvent">sunday</div>
        <Bars3Icon v-if="menuList.length > 1" class="bg-bg-gray-900 h-9 w-9 sm:(hidden)" @click="isOpen = !isOpen"></Bars3Icon>
      </div>
      <div class="hidden sm:block">
        <button
          v-for="item in menuList"
          :key="item.name"
          class="text-xl cell whitespace-nowrap"
          :class="[item == selectedItem ? 'bg-gray-400/30 cursor-default shadow' : '']"
          @click="toLink(item)"
        >
          {{ item.meta?.title }}
        </button>
      </div>
      <!-- overlay -->
      <div v-if="isOpen" class="absolute z-20 h-screen w-full overflow-hidden sm:hidden" @click="isOpen = false"></div>
      <TransitionRoot
        :show="isOpen"
        class="border rounded-t-xl px-1.5 pt-2 pb-17 inset-x-0 z-30 absolute materialThin sm:(hidden)"
        enter="transition-opacity ease-out duration-150"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in duration-150 "
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="">
          <div
            class="divide-y divide-gray-400/50 px-1 rounded-xl backdrop-filter backdrop-blur-md shadow overflow-hidden border border-gray-400/50"
          >
            <div class="py-1" v-for="item in menuList" :key="item.name">
              <button
                class="flex items-center justify-center h-10 m-0 cell rounded-lg font-medium whitespace-nowrap hover:(shadow-none bg-gray-400/50 backdrop-filter backdrop-blur)"
                :class="[item == selectedItem ? 'bg-gray-400/40 cursor-default' : '']"
                @click="toLink(item)"
              >
                <div class="w-24">
                  {{ item.meta?.title }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
    <div class="flex flex-col mb-4 hidden items-center sm:(flex)">
      <div class="flex flex-col items-center xl:(flex-row mb-4)">
        <div
          class="border rounded-full flex-shrink-0 sm:(h-20 w-20 block) md:(h-28 w-28) relative overflow-hidden flex items-center justify-center"
        >
          <img class="object-cover sm:(h-20 w-20 block) md:(h-28 w-28)" :src="store.account.avatar || defaultAvatar" alt="" />
        </div>
        <div class="relative xl:(self-end ml-2)">
          <div class="flex justify-center items-center xl:(flex-col items-start)">
            <div class="textSubHeading">{{ store.account.alias }}</div>
            <span v-if="store.account.role == 'admin'" class="bg-green-100 h-5 text-green-800 badge"> 管理员 </span>
          </div>
          <div class="text-left textDescription">
            {{ store.account.memberId }}
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center gap-4 text-sm">
        <button class="rounded-full flex items-center text-blue-600 px-2 py-1" @click="accountSetting">
          <CogIcon class="h-6"></CogIcon>
          设置
        </button>
        <logout-button class="p-2 rounded"> 登出 </logout-button>
      </div>
    </div>
    <BottomDialog ref="bottomDialog">
      <template #body>
        <div
          class="flex items-center justify-between rounded-xl px-5 mb-2.5 h-26 bg-white/50 border border-gray-400/40 materialMedium shadow-lg"
        >
          <div class="flex items-center">
            <div class="relative flex">
              <div class="rounded-full border border-gray-400/30 h-20 w-20 overflow-hidden">
                <img class="object-cover h-20" :src="store.account.avatar" alt="" />
              </div>
              <label for="file-upload" class="absolute relative textLink text-xs self-end cursor-pointer rounded-xl">
                <span>修改头像</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*" @change="updateAvatar" />
              </label>
            </div>
          </div>
          <div class="flex flex-col items-start">
            <div class="flex text-base font-medium">
              <div class="mr-2">{{ store.account.name }}</div>
              <div>{{ store.account.section }}</div>
            </div>
            <div class="leading-tight textDescription">{{ store.account.memberId }}</div>
          </div>
        </div>
        <form @submit.prevent="" class="relative">
          <input-section subject="昵称">
            <input-base subject="" :passValue="store.account.alias" confirmBeforeInput v-model:content="newAccountInfo.alias"></input-base>
          </input-section>
          <input-section subject="联系方式">
            <input-base
              subject="手机"
              :passValue="store.account.phone"
              confirmBeforeInput
              v-model:content="newAccountInfo.phone"
            ></input-base>
            <input-base subject="QQ" :passValue="store.account.qq" confirmBeforeInput v-model:content="newAccountInfo.qq"></input-base>
          </input-section>
          <input-section subject="" class="mt-4">
            <button @click="updateAccount" type="submit" class="materialBtn btnPrimaryReverse shadow">确定</button>
          </input-section>
        </form>
      </template>
      <template #actionSpace>
        <logout-button class="materialBtn btnWarning mt-1 shadow">登出</logout-button>
      </template>
    </BottomDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import router from "@/router"
import { Bars3Icon, ArrowLeftStartOnRectangleIcon, CogIcon } from "@heroicons/vue/24/outline"
import { TransitionRoot } from "@headlessui/vue"
import BottomDialog from "@/components/BottomDialog/BottomDialogBase.vue"
import InputSection from "@/components/Input/InputSection.vue"
import InputBase from "@/components/Input/InputBase.vue"
import LogoutButton from "../LogoutButton.vue"
import { useRoute, type RouteRecordRaw } from "vue-router"
import MemberService from "@/services/member"
import CommonService from "@/services/common"
import { useAccountStore } from "@/stores/account"

// TODO
const defaultAvatar = "https://oss.nbtca.space/weekend/1679839327.png"

const store = useAccountStore()

const isOpen = ref(false)

const newAccountInfo = ref({
  alias: "",
  phone: "",
  qq: "",
})

const menuList = computed(() => {
  const children = router.options.routes[0].children
  if (!children) return []
  return children.filter(item => {
    if (item.meta == undefined || item.meta.menuIcon == null) {
      return false
    }
    if (!item.meta.roles) {
      return true
    }
    return item.meta.roles.find(r => r == store.account.role)
  })
})

const route = useRoute()

const selectedItem = computed(() => {
  const fullPath = route.path
  const tailIndex = fullPath.indexOf("/", 1)
  const pagePath = tailIndex == -1 ? fullPath : fullPath.substring(0, tailIndex)
  if (menuList.value == null) {
    return null
  }
  return menuList.value.find(item => item.path == pagePath)
})

const toLink = (item: RouteRecordRaw) => {
  if (item != selectedItem.value) {
    router.push(item.path)
  }
}

const toEvent = () => {
  router.push("/Events")
}

const setAccountInfo = async () => {
  return MemberService.get()
    .then(res => {
      store.account = res
    })
    .catch(err => {
      // TODO handel
      console.log(err)
    })
}

watch(route, setAccountInfo)

const bottomDialog = ref()
const accountSetting = () => {
  bottomDialog.value.openModal({
    subject: "账号设置",
    rounded: true,
    acceptAction: () => {
      return () => {
        return MemberService.get()
      }
    },
  })
}
const updateAvatar = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const fileList = target.files as FileList
  const file = fileList[0]
  const url = await CommonService.upload(file)
  MemberService.updateAvatar(url.url).then(res => {
    store.account.avatar = url.url
  })
}

const updateAccount = () => {
  if (
    newAccountInfo.value.alias == store.account.alias &&
    newAccountInfo.value.qq == store.account.qq &&
    newAccountInfo.value.phone == store.account.phone
  ) {
    bottomDialog.value.cancel()
    return
  }
  MemberService.update(newAccountInfo.value).then(async res => {
    store.account = res
    bottomDialog.value.cancel()
  })
}
</script>
<style>
.logo {
  @apply select-none cursor-default font-bold font-mono text-center tracking-wide text-3xl italic text-shadow-sm uppercase sm:(text-2xl w-full self-center) md:(text-3xl) lg:text-4xl;
}
</style>
