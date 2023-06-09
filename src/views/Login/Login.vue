<template>
  <div class="flex flex-col items-center h-screen bg-base-self bg-white">
    <div class="flex flex-col items-center sm:mt-16 xl:mt-28">
      <div class="py-[5vh] h-80 w-[18vw] sm:h-auto" style="min-width: 250px">
        <img src="../../assets/images/logo.png" alt="" class="filter drop-shadow" />
      </div>
      <form @submit.prevent="login" class="grid gap-6 place-items-center" style="width: 20vw; min-width: 300px">
        <InputBase
          placeholder="ID"
          hint="学号"
          maxLength="10"
          required
          :passWarning="isIDValid"
          class="w-full"
          v-model:content="accountInput.id"
          :rules="[{ rule: /^\d{10}$/, warning: '格式错误' }]"
        />
        <InputBase
          placeholder="密码"
          :passWarning="isPasswordValid"
          type="password"
          class="w-full"
          v-model:content="accountInput.password"
        />
        <button class="w-full btn bg-gradient-to-b from-primary/80 to-primary text-primaryContent shadow-md" type="submit">登入</button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isFormValid } from "@/utils/isFormValid"
import InputBase from "@/components/Input/InputBase.vue"
import { ref } from "vue"
import router from "@/router"
import md5 from "blueimp-md5"
import MemberService from "@/services/member"
import { useAccountStore } from "@/stores/account"

const store = useAccountStore()

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
  try {
    const res = await MemberService.createToken({
      id: account.id,
      password: hashedPassword,
    })
    store.account = res
    store.token = res.token
    if (res.role.includes("inactive")) {
      router.push("/activate")
      router.push("/activate")
    } else {
      router.push("/Events")
    }
  } catch (error) {
    const errorData = error.response.data as any
    console.log(errorData)
    if (!errorData.errors || errorData.errors.length == 0) {
      return
    }
    if (errorData.errors[0].field == "password") {
      isPasswordValid.value = "密码错误"
    }
    if (errorData.errors[0].field == "memberId") {
      isIDValid.value = "ID不存在"
    }
    // if(!error.response.data || !error.response.data.errors ||)
    // console.log(error.response.data)
  }
}
</script>
