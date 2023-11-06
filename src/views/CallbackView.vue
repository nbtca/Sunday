<script setup lang="ts">
import type Member from "@/models/member"
import router from "@/router"
import { useAccountStore } from "@/stores/account"
import { useHandleSignInCallback, useLogto } from "@logto/vue"
import { ref, onMounted, computed } from "vue"
import InputBase from "@/components/Input/InputBase.vue"
import { isFormValid } from "@/utils/isFormValid"
import md5 from "blueimp-md5"

const store = useAccountStore()

const { signIn, signOut, isAuthenticated, fetchUserInfo, getAccessToken } = useLogto()
const authenticateFailed = ref(false)
const needBindMember = ref(false)

const createTokenViaLogtoToken = async (token: string) => {
  return await window.fetch("/api/member/token/logto", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

const handleCreateToken = async () => {
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (token == undefined) {
    throw new Error("token is undefined")
  }

  const res = await createTokenViaLogtoToken(token)
  const body: unknown = await res.json()
  if (res.status == 422 && body instanceof Object && "message" in body && body.message.includes("not found")) {
    needBindMember.value = true
    return
  }
  if (body instanceof Object && "token" in body && "memberId" in body && "role" in body) {
    store.account = body as Member
    store.token = body.token as string
    if (body.role instanceof Array && body.role.includes("inactive")) {
      router.push("/activate")
      router.push("/activate")
    } else {
      router.push("/Events")
    }
  } else {
    // setTimeout(() => {
    //   signOut(import.meta.env.VITE_LOGTO_REDIRECT_URL)
    // }, 2000)
  }
}

const { isLoading, error } = useHandleSignInCallback(async () => {
  await handleCreateToken()
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

  await handleCreateToken()
}
const logout = () => {
  signOut(import.meta.env.VITE_LOGTO_REDIRECT_URL)
}
onMounted(() => {
  if (isAuthenticated.value) {
    handleCreateToken()
  }
})
</script>

<template>
  <div class="p-3 h-full">
    <p v-if="isLoading">页面跳转中。。。</p>
    <p v-if="authenticateFailed">认证失败，跳转至登入页面。</p>
    <div v-if="needBindMember" class="flex flex-col items-center justify-center h-full">
      <div class="pb-10 text-lg flex flex-col items-center">
        <div class="pb-8 text-2xl font-bold">在第一次登入时，我们需要您绑定你的账户信息</div>
        <div class="">如果你原先已经使用过此维修平台，请输入原先用于登入的帐号和密码</div>
        <div class="">如果这是第一次使用，请联系管理员添加你的信息，随后只需要输入你的学号即可</div>
      </div>
      <form @submit.prevent="login" class="grid gap-4 place-items-center" style="width: 20vw; min-width: 300px">
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
        <button class="w-full btn bg-gradient-to-b from-primary/80 to-primary text-primaryContent shadow-md" type="submit">绑定账号</button>
      </form>
    </div>
  </div>
</template>
