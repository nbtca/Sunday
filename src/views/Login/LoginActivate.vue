<template>
  <div class="flex flex-col justify-start bg-base-self" style="height: 100vh">
    <div class="flex flex-col items-center">
      <form @submit.prevent="activate" class="grid gap-y-1 place-items-center" style="width: 17vw; min-width: 300px">
        <div class="text-3xl font-bold mt-12 mb-8 md:mt-18">
          <div>完善个人信息</div>
          <div class="text-lg textDescription mt-2">{{ rid }}</div>
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
        <!-- <InputBase
          subject="姓名"
          required
          class="w-full"
          v-model:content="account.name"
          :rules="[{ rule: /^[\u4e00-\u9fa5]{2,4}$/, warning: '格式错误' }]"
        />
        <InputBase
          subject="班级"
          hint="示例: 计算机196"
          required
          class="w-full"
          v-model:content="account.class"
          :rules="[
            {
              rule: /^([\u4e00-\u9fa5]{2,10})(\d{3})$/,
              warning: '格式错误',
            },
          ]"
        /> -->
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
        <InputBase
          required
          subject="QQ"
          class="w-full"
          v-model:content="account.qq"
          :rules="[{ rule: /[1-9][0-9]{4,14}/, warning: '格式错误' }]"
        />
        <!-- <label for="file-upload" class="relative w-3/5 btn materialThick select-none cursor-pointer">
          <span>上传头像</span>
          <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*" />
        </label> -->
        <!-- <button class="w-3/5 btn materialThick" @click="updateAvatar">上传头像</button> -->
        <button class="w-full btn bg-primary text-primaryContent mt-5" type="submit">提交</button>
      </form>
      <button class="w-full btn bg-warning text-primaryContent mt-5" style="width: 17vw; min-width: 300px" @click="logOut">取消</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import md5 from "blueimp-md5"
import router from "@/router"
import InputBase from "@/components/Input/InputBase.vue"
import { isFormValid } from "@/utils/isFormValid.js"
import { Element } from "@/api/api"
import logOut from "@/composables/LogOut.js"

const rid = ref(localStorage.getItem("rid"))
const account = ref({})
const reg = computed(() => {
  return new RegExp("^" + account.value.password + "$")
})

const activate = async () => {
  let formInput = isFormValid(account.value)
  formInput.password = md5(formInput.password)
  Element.activate(formInput)
    .then(() => {
      return Element.login({
        id: localStorage.getItem("rid"),
        password: account.value.password,
      })
    })
    .then(res => {
      console.log(res)
      localStorage.setItem("access_token", res.data.token)
      localStorage.setItem("alias", res.data.alias)
      localStorage.setItem("user_role", res.data.role)
      localStorage.setItem("rid", res.data.rid)
    })
    .finally(()=>{
      router.push("/Events")
      router.push("/Events")
    })
}
</script>
