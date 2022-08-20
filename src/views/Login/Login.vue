<template>
  <div class="flex flex-col items-center h-screen bg-base-self bg-white">
    <div class="flex flex-col items-center sm:mt-16 xl:mt-28">
      <div class="py-[5vh] h-80 w-[18vw] sm:h-auto" style="min-width: 250px">
        <img src="../../assets/logo.png" alt="" class="filter drop-shadow" />
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
import { Element } from "@/api/api"
import { isFormValid } from "@/utils/isFormValid"
import InputBase from "@/components/Input/InputBase.vue"
import { ref } from "vue"
import router from "@/router"
import md5 from "blueimp-md5"
import MemberService from "@/services/member"

const avatarHolder = "https://sunday-res.oss-cn-hangzhou.aliyuncs.com/img/logo.png"

const accountInput = ref({
  id: "",
  password: "",
})
const isIDValid = ref("")
const isPasswordValid = ref("")

const login = async () => {
  isPasswordValid.value = ""
  const account = isFormValid(accountInput.value)
  if (account != false) {
    let hashedPassword = ""
    if (account.password !== "") {
      hashedPassword = md5(account.password)
    }
    await MemberService.createToken({
      id: account.id,
      password: hashedPassword,
    })
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.token)
        localStorage.setItem("alias", res.alias)
        localStorage.setItem("avatar", res.avatar || avatarHolder)
        localStorage.setItem("role", res.role)
        localStorage.setItem("memberId", res.member_id)
        if (res.data.role == "notActivated") {
          router.push("/activate")
          router.push("/activate")
        } else {
          // window.history.back(-1);
          router.push("/Events")
        }
      })
      .catch(err => {
        // TODO code 422 id or password is wrong
        console.log("fail")
      })
    // await Element.login({
    //   id: account.id,
    //   password: hashedPassword,
    // })
    //   .then(res => {
    //     console.log(res)
    //     const resultCode = res.resultCode
    //     if (resultCode === 0) {
    //       localStorage.setItem("access_token", res.data.token)
    //       localStorage.setItem("alias", res.data.alias)
    //       localStorage.setItem("avatar", res.data.avatar || avatarHolder)
    //       localStorage.setItem("user_role", res.data.role)
    //       localStorage.setItem("rid", res.data.rid)
    //       if (res.data.role == "notActivated") {
    //         router.push("/activate")
    //         router.push("/activate")
    //       } else {
    //         // window.history.back(-1);
    //         router.push("/Events")
    //       }
    //     } else if (resultCode === 1010) {
    //       isIDValid.value = "账号不存在"
    //     } else if (resultCode === 1011) {
    //       isPasswordValid.value = "密码错误"
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error.res)
    //   })
  }
}
</script>
