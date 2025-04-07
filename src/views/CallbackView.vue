<script setup lang="ts">
import router from "@/router"
import { useAccountStore } from "@/stores/account"
import { useHandleSignInCallback, useLogto } from "@logto/vue"
import { ref, onMounted } from "vue"
import LogoutButton from "@/components/LogoutButton.vue"
import { handleCreateToken } from "./Login/login"

const store = useAccountStore()

const { isAuthenticated, getAccessToken } = useLogto()
const authenticateFailed = ref(false)
const needBindMember = ref(false)

const { isLoading, error } = useHandleSignInCallback(async () => {
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (!token) {
    return
  }
  try {
    await handleCreateToken(token)
  } catch (error) {
    if (error instanceof Error && error.message == "need bind member") {
      needBindMember.value = true
    } else {
      authenticateFailed.value = true
    }
  }
})

const onRegisterMember = () => {
  router.push({ name: "LoginRegister" })
}
onMounted(async () => {
  if (!isAuthenticated.value) {
    return
  }
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (!token) {
    throw new Error("token is not found")
    return
  }
  try {
    await handleCreateToken(token)
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.message == "need bind member") {
      needBindMember.value = true
    } else {
      authenticateFailed.value = false
    }
  }
})
</script>

<template>
  <div class="h-screen w-full bg-systemBackground-lightSecondary">
    <div class="p-6 flex items-center justify-center h-screen">
      <p v-if="isLoading">页面跳转中。。。</p>
      <p v-if="authenticateFailed">认证失败，跳转至登入页面。</p>
      <div v-if="needBindMember" class="flex flex-col items-center justify-center h-full">
        <div class="pb-10 text-lg flex flex-col items-center">
          <div class="pb-8 text-2xl font-bold">你没有访问维修平台的权限</div>
          <div class="">
            点击下方的
            <span class="italic font-bold"> 登记信息 </span>
            来申请访问权限
          </div>
          <div class="mt-2">如遇到问题，你可以通过邮件联系我们: <a class="" href="mailto:contact@nbtca.space">contact@nbtca.space</a></div>
        </div>
        <div style="width: 20vw; min-width: 300px">
          <button
            class="w-full btn bg-gradient-to-b from-primary/80 to-primary text-primaryContent shadow-md mt-8"
            @click="onRegisterMember"
          >
            登记信息
          </button>
          <logout-button class="mt-6 p-2"> 登出 </logout-button>
        </div>
      </div>
    </div>
  </div>
</template>
