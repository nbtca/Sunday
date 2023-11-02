<script setup lang="ts">
import logOut from "@/composables/LogOut"
import type Member from "@/models/member"
import router from "@/router"
import { useAccountStore } from "@/stores/account"
import Axios from "@/utils/axios"
import { useHandleSignInCallback, useLogto } from "@logto/vue"
import { ref, onMounted } from "vue"

const store = useAccountStore()

const { signIn, signOut, isAuthenticated, fetchUserInfo, getAccessToken } = useLogto()
const authenticateFailed = ref(false)
const { isLoading } = useHandleSignInCallback(async () => {
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)

  const res = await window.fetch("/api/member/token/logto", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  const body = await res.json()

  if ("token" in body && "memberId" in body && "role" in body) {
    store.account = body as Member
    store.token = body.token
    if (body.role.includes("inactive")) {
      router.push("/activate")
      router.push("/activate")
    } else {
      router.push("/Events")
    }
  } else {
    setTimeout(() => {
      signOut(import.meta.env.VITE_LOGTO_REDIRECT_URL)
    }, 2000)
  }
})
</script>

<template>
  <div class="p-3">
    <p v-if="isLoading">页面跳转中。。。</p>
    <p v-if="authenticateFailed">认证失败，跳转至登入页面。</p>
  </div>
</template>
