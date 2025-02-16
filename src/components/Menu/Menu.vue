<template>
  <div class="flex w-full justify-between sm:(overflow-hidden bg-base-self flex-col h-full border-r border-gray-400/30 p-2)">
    <div class="flex flex-col-reverse sm:(items-center) w-full relative hidden sm:block">
      <div class="flex h-15 mb-2 p-2 z-40 justify-between items-center sm:(p-0 m-0) md:(w-full h-24) lg:(p-2)">
        <div class="logo" @click="toEvent">sunday</div>
      </div>
      <div class="">
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
    </div>
    <div class="flex flex-col mb-4 hidden sm:flex">
      <div class="flex">
        <div class="border rounded-full flex-shrink-0 h-16 w-16 relative overflow-hidden flex items-center justify-center">
          <img class="object-cover w-full" :src="store.userInfo?.picture || defaultAvatar" alt="" />
        </div>
        <div class="flex ml-2">
          <div class="flex flex-col items-start">
            <div class="textSubHeading pl-1">{{ store.userInfo?.name || store.userInfo?.email }}</div>
            <div class="flex flex-row items-center gap-2 text-sm">
              <button class="rounded flex items-center text-blue-600 p-1 gap-1 hover:bg-gray-200" @click="accountSetting">
                <CogIcon class="h-6"></CogIcon>
                <span class="hidden md:block">设置</span>
              </button>
              <logout-button class="rounded flex items-center gap-1 p-1 hover:bg-gray-200">
                <ArrowLeftStartOnRectangleIcon class="h-6"></ArrowLeftStartOnRectangleIcon>
                <span class="hidden md:block">登出</span>
              </logout-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[83px] shrink-0 flex-shrink-0 sm:hidden flex items-center w-full bg-white/75 border-t border-black/20">
      <div class="tab-bar-item" @click="toEvent">
        <div>
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            xmlns="http://www.w3.org/2000/svg"
            :class="selectedItem?.name == 'Events' ? 'tab-bar-item-icon-active' : 'tab-bar-item-icon'"
          >
            <path
              d="M3.04297 21.0547L0.572266 24.7393C0.34668 25.0723 0.314453 25.4268 0.561523 25.6738L2.77441 27.8867C3.02148 28.1338 3.37598 28.1016 3.70898 27.876L7.39355 25.4053C7.74805 25.1689 7.98438 24.8037 8.04883 24.4062L8.20996 23.332L13.6455 17.9072L14.4727 18.7451C15.0742 19.3359 15.8477 19.3467 16.46 18.7344L18.3291 16.8652C17.9209 16.3496 17.9424 15.6729 18.4043 15.2109C18.8662 14.749 19.543 14.7275 20.0479 15.1357L26.3213 8.87305C28.0078 7.18652 28.0293 5.38184 26.375 3.7168L24.7314 2.07324C23.0664 0.418945 21.2617 0.44043 19.5752 2.1377L13.3125 8.40039C13.7207 8.91602 13.6992 9.60352 13.2373 10.0439C12.7754 10.5059 12.0986 10.5273 11.583 10.1191L9.71387 11.9883C9.10156 12.6006 9.1123 13.3848 9.70312 13.9756L10.541 14.8027L5.11621 20.2383L4.04199 20.3994C3.64453 20.4639 3.26855 20.7002 3.04297 21.0547ZM11.4434 12.5898L12.0664 11.9775C12.8721 12.1172 13.6348 11.8379 14.29 11.1826C14.9453 10.5273 15.2031 9.77539 15.042 8.99121L20.8428 3.21191C21.7129 2.33105 22.6582 2.33105 23.5176 3.19043L25.2578 4.93066C26.1172 5.80078 26.1172 6.73535 25.2363 7.61621L19.457 13.4062C18.6729 13.2451 17.9209 13.5029 17.2656 14.1582C16.6104 14.8135 16.3311 15.5762 16.4707 16.3926L15.8584 17.0049C15.6113 17.252 15.3105 17.2734 15.0527 17.0156L11.4326 13.3955C11.1748 13.1484 11.1963 12.8369 11.4434 12.5898ZM17.1689 9.06641C16.9648 9.27051 16.9648 9.60352 17.1797 9.81836C17.3623 10.001 17.7168 10.0225 17.9102 9.81836L22.1641 5.52148C22.3682 5.32812 22.3789 5.0166 22.1641 4.80176C21.9707 4.6084 21.6484 4.59766 21.4443 4.80176L17.1689 9.06641ZM18.6514 10.5488C18.4473 10.7529 18.458 11.0859 18.6514 11.2793C18.8555 11.4834 19.1777 11.4834 19.3818 11.2793L23.6572 7.01465C23.8613 6.81055 23.8613 6.49902 23.6572 6.28418C23.4639 6.08008 23.1201 6.09082 22.9268 6.28418L18.6514 10.5488ZM2.18359 25.04L4.46094 22.043L5.77148 21.8174L11.6582 15.9307L12.5176 16.79L6.63086 22.6768L6.40527 23.9873L3.4082 26.2646L2.18359 25.04Z"
            />
          </svg>
        </div>
        <div :class="selectedItem?.name == 'Events' ? 'text-[#007AFF]' : 'tab-bar-item-text'">维修</div>
      </div>
      <div class="tab-bar-item" @click="toAccount">
        <div class="border rounded-full flex-shrink-0 h-[32x] w-[32px] relative overflow-hidden flex items-center justify-center">
          <img class="object-cover w-full" :src="store.userInfo?.picture || defaultAvatar" alt="" />
        </div>
        <div :class="selectedItem?.name == 'Account' ? 'text-[#007AFF]' : 'tab-bar-item-text'">账号设置</div>
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
const toAccount = () => {
  router.push({
    name: "Account",
  })
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
  window.open("https://myid.app.nbtca.space/account/aboutme", "_blank")
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

.tab-bar-item {
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  gap: 4px;
  user-select: none;
  color: #3c3c43;
}

.tab-bar-item-icon {
  fill: #3c3c43;
  opacity: 0.6;
}
.tab-bar-item-icon-active {
  fill: #007aff;
}
.tab-bar-item-text {
  color: #3c3c43;
  opacity: 0.6;
}
</style>
