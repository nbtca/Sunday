<script setup lang="ts">
import { onMounted, ref } from "vue"
import router from "@/router"
import InputBase from "@/components/Input/InputBase.vue"
import { isFormValid } from "@/utils/isFormValid"
import MemberService from "@/services/member"
import { useAccountStore } from "@/stores/account"
import { useLogto } from "@logto/vue"
import { createTokenViaLogtoToken } from "@/services/logto"
import type Member from "@/models/member"

const store = useAccountStore()
const { getAccessToken } = useLogto()

const account = ref({
  memberId: "",
  name: "",
  section: "",
  passwordConfirm: "",
  alias: "",
  phone: "",
  qq: "",
})
const qqRule = ref([{ rule: /[1-9][0-9]{4,14}/, warning: "格式错误" }])

// TODO  move to util
const handleCreateToken = async () => {
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (token == undefined) {
    throw new Error("token is undefined")
  }

  const res = await createTokenViaLogtoToken(token)
  const body: unknown = await res.json()
  if (res.status == 422) {
    throw new Error(body as string)
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
const activate = async () => {
  const formInput = isFormValid(account.value)
  console.log(formInput)
  if (!formInput) return
  // const password = md5(formInput.password)
  let accessToken = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (accessToken == undefined) {
    throw new Error("token is undefined")
  }
  await MemberService.createWithLogto(accessToken, {
    memberId: formInput.memberId,
    name: formInput.name,
    section: formInput.section,
    alias: formInput.alias,
    phone: formInput.phone,
    qq: formInput.qq,
  })
  handleCreateToken()
}

onMounted(() => {
  // if (store.account.memberId != "") {
  //   router.push("/Events")
  // }
})
</script>
<template>
  <div class="flex flex-col items-center justify-center h-full p-4 bg-ligth-se">
    <div class="pb-10 text-lg flex flex-col items-center">
      <div class="text-2xl font-bold">在你可以使用维修平台之前，我们需要收集你的一些信息</div>
      <div class="mt-4">这些信息会被用来验证你的身份,请认真填写</div>
    </div>
    <div style="width: 20vw; min-width: 300px" class="flex flex-col items-center">
      <form @submit.prevent="activate" class="flex flex-col gap-3 lg:gap-0" style="width: 17vw; min-width: 300px">
        <InputBase
          subject="学号"
          type="text"
          placeholder="学号"
          maxLength="10"
          :rules="[{ rule: /^\d{10}$/, warning: '格式错误' }]"
          required
          class="w-full"
          v-model:content="account.memberId"
        />
        <InputBase
          subject="班级"
          placeholder="专业+班级"
          maxLength="12"
          hint="示例: 星舰建设181"
          required
          class="w-full"
          :rules="[
            {
              rule: /^([\u4e00-\u9fa5]{2,10})(\d{3})$/,
              warning: '格式错误',
            },
          ]"
          v-model:content="account.section"
        />
        <InputBase
          subject="姓名"
          :rules="[{ rule: /^[\u4e00-\u9fa5]{2,4}$/, warning: '格式错误' }]"
          required
          class="w-full"
          v-model:content="account.name"
        />
        <InputBase subject="昵称" placeholder="别人会看到的名字" required class="w-full" v-model:content="account.alias" />
        <InputBase
          subject="电话"
          placeholder="你的手机号"
          class="w-full"
          required
          v-model:content="account.phone"
          :rules="[
            {
              rule: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              warning: '格式错误',
            },
          ]"
        />
        <InputBase required subject="QQ" class="w-full" v-model:content="account.qq" :rules="qqRule" />
        <button class="w-full btn bg-primary text-primaryContent mt-5" type="submit">提交</button>
      </form>
    </div>
  </div>
</template>
