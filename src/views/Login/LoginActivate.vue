<template>
  <div class="flex flex-col justify-start bg-base-self" style="height: 100vh">
    <div class="flex flex-col items-center">
      <form @submit.prevent="activate" class="grid gap-y-1 place-items-center" style="width: 17vw; min-width: 300px">
        <div class="text-3xl font-bold mt-12 mb-8 md:mt-18">
          <div>完善个人信息</div>
          <div class="text-lg textDescription mt-2">{{ store.account.memberId }}</div>
        </div>
        <InputBase subject="密码" required type="password" class="w-full" v-model:content="account.password" />
        <InputBase
          subject="确认密码"
          required
          type="password"
          class="w-full"
          v-model.lazy:content="account.passwordConfirm"
          :rules="[{ rule: reg, warning: '密码不一致' }]"
        />
        <InputBase subject="昵称" required class="w-full" v-model:content="account.alias" />
        <InputBase
          subject="电话"
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
      <button class="w-full btn bg-warning text-primaryContent mt-5" style="width: 17vw; min-width: 300px" @click="logOut">取消</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import md5 from "blueimp-md5"
import router from "@/router"
import InputBase from "@/components/Input/InputBase.vue"
import { isFormValid } from "@/utils/isFormValid"
import logOut from "@/composables/LogOut"
import MemberService from "@/services/member"
import { useAccountStore } from "@/stores/account"

const store = useAccountStore()

const account = ref({
  password: "",
  passwordConfirm: "",
  alias: "",
  phone: "",
  qq: "",
})
const qqRule = ref([{ rule: /[1-9][0-9]{4,14}/, warning: "格式错误" }])
const reg = computed(() => {
  return new RegExp("^" + account.value.password + "$")
})

const activate = async () => {
  const formInput = isFormValid(account.value)
  const password = md5(formInput.password)
  formInput.password = MemberService.active({
    password: password,
    alias: formInput.alias,
    phone: formInput.phone,
    qq: formInput.qq,
  }).then(() => {
    MemberService.createToken({
      id: store.account.memberId || "",
      password: password,
    }).then(res => {
      store.account = res
      store.token = res.token
      if (res.role.includes("inactive")) {
        router.push("/activate")
        router.push("/activate")
      } else {
        router.push("/Events")
      }
    })
  })
}
</script>
