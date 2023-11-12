<script setup lang="ts">
import type Member from "@/models/member"
import router from "@/router"
import { useAccountStore } from "@/stores/account"
import { useHandleSignInCallback, useLogto } from "@logto/vue"
import { ref, onMounted, computed } from "vue"
import InputBase from "@/components/Input/InputBase.vue"
import LogoutButton from "@/components/LogoutButton.vue"
import { isFormValid } from "@/utils/isFormValid"
import md5 from "blueimp-md5"
import { createTokenViaLogtoToken } from "@/services/logto"
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

const accountInput = ref({
  id: "",
  password: "",
})
const isIDValid = ref("")
const isPasswordValid = ref("")

const login = async () => {
  isPasswordValid.value = ""
  const account = isFormValid(accountInput.value)
  if (!account) return
  let hashedPassword = ""
  if (account.password != undefined && account.password != "") {
    hashedPassword = md5(account.password)
  }
  let token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (!token) {
    return
  }
  const res = await window.fetch(`/api/members/${account.id}/logto_id`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: hashedPassword,
    }),
  })
  const body = (await res.json()) as unknown
  if (
    res.status != 200 &&
    body instanceof Object &&
    "errors" in body &&
    body.errors instanceof Array &&
    body.errors.length > 0 &&
    "field" in body.errors[0]
  ) {
    if (body.errors[0].field == "password") {
      isPasswordValid.value = "密码错误"
    }
    if (body.errors[0].field == "memberId") {
      isIDValid.value = "ID不存在"
    }
    if (body.errors[0].field == "member") {
      isIDValid.value = "该ID已经被绑定"
    }
    return
  }
  handleCreateToken(token)
}
const onRegisterMember = () => {
  router.push({ name: "LoginRegister" })
}
onMounted(async () => {
  if (!isAuthenticated.value) {
    return
  }
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (!token) {
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
          <div class="pb-8 text-2xl font-bold">在第一次登入时，我们需要您绑定你的账户信息</div>
          <div class="">如果你原先已经使用过此维修平台，请输入原先用于登入的帐号和密码来绑定信息</div>
          <div class="mt-2">
            如果这是你第一次使用，请点击下方的
            <span class="italic font-bold"> 登记信息 </span>
            来获取你的账号
          </div>
        </div>
        <div style="width: 20vw; min-width: 300px">
          <form @submit.prevent="login" class="grid gap-4 place-items-center">
            <InputBase
              placeholder=""
              hint="学号"
              maxLength="10"
              required
              :passWarning="isIDValid"
              class="w-full"
              v-model:content="accountInput.id"
              :rules="[{ rule: /^\d{10}$/, warning: '格式错误' }]"
            />
            <InputBase
              placeholder="初始密码为空"
              hint="密码"
              :passWarning="isPasswordValid"
              type="password"
              class="w-full"
              v-model:content="accountInput.password"
            />
            <button class="w-full btn bg-gradient-to-b from-primary/80 to-primary text-primaryContent shadow-md" type="submit">
              绑定账号
            </button>
          </form>
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
