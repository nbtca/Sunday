<template>
  <div class="flex flex-col items-center justify-center h-full p-4 bg-systemBackground-lightSecondary">
    <div class="pb-10 text-lg flex flex-col items-center">
      <div class="text-2xl font-bold">你已经成功登记了你的信息</div>
      <div class="mt-4">请等待管理员为你添加权限</div>
    </div>
    <member-card class="w-84" :member="store.account" />
    <div class="width-[20vw] min-w-[300px] mt-8">
      <logout-button class="w-full btn bg-gradient-to-b from-primary/80 to-primary text-primaryContent shadow-md">登出</logout-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import LogoutButton from "@/components/LogoutButton.vue"
import MemberCard from "../MemberManage/MemberCard.vue"
import { useAccountStore } from "@/stores/account"
import { useLogto } from "@logto/vue"
import { onMounted } from "vue"
import { handleCreateToken } from "./login"

const { signOut, getAccessToken } = useLogto()
const store = useAccountStore()
const logOut = () => {
  signOut(import.meta.env.VITE_LOGTO_REDIRECT_URL)
}
onMounted(async () => {
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (token == undefined) {
    throw new Error("token is undefined")
  }
  handleCreateToken(token)
})
</script>
