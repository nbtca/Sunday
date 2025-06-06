<script setup lang="ts">
import { onMounted, ref } from "vue"
import InputBase from "@/components/Input/InputBase.vue"
import { isFormValid } from "@/utils/isFormValid"
import MemberService from "@/services/member"
import { useAccountStore } from "@/stores/account"
import { useLogto } from "@logto/vue"
import { handleCreateToken } from "./login"

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

const activate = async () => {
  const formInput = isFormValid(account.value)
  if (!formInput) return
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
  const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCE)
  if (token == undefined) {
    throw new Error("token is undefined")
  }
  handleCreateToken(token)
}

</script>
<template>
  <div class="flex flex-col items-center justify-center h-full w-full p-6 bg-systemBackground-lightSecondary">
    <div class="pb-6 lg:pb-10 text-lg flex flex-col items-center">
      <div class="text-2xl font-bold">在你可以使用维修平台之前，我们需要收集你的一些信息</div>
      <div class="mt-2 lg:mt-4 text-base">这些信息会被用来验证你的身份,请认真填写</div>
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
        <InputBase subject="昵称" required class="w-full" v-model:content="account.alias" />
        <InputBase
          subject="电话"
          placeholder="你的手机号"
          class="w-full"
          required
          v-model:content="account.phone"
          :rules="[
            {
              rule: /^1[3456789]\d{9}$/,
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
