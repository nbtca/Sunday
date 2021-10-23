<template>
  <div class="flex flex-col items-center h-full bg-base-self" style="">
    <div class="flex flex-col items-center sm:mt-28">
      <div class="py-[5vh]" style="width: 15vw; min-width: 250px">
        <img src="../../assets/logo.png" alt="" class="filter drop-shadow" />
      </div>
      <form @submit.prevent="login" class="grid gap-6 place-items-center" style="width: 20vw; min-width: 300px">
        <InputBase
          placeholder="ID"
          hint="学号"
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
        <button class="w-full btn bg-primary text-primaryContent shadow-md" type="submit">登入</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { Account } from "@/api/api";
import { isFormValid } from "@/Utils/isFormValid";
import InputBase from "@/components/Input/InputBase.vue";
import { ref } from "@vue/reactivity";
import router from "@/router";
// import crypto from "crypto";

const accountInput = ref({});
const isIDValid = ref("");
const isPasswordValid = ref("");



const login = async () => {
  isPasswordValid.value = "";
  let account = isFormValid(accountInput.value);
  let avatarHolder = "https://sunday-res.oss-cn-hangzhou.aliyuncs.com/img/logo.png";
  if (account != false) {
    // var hashedPassword = null;
    // if (account.password !== "") {
    //   const hash = crypto.createHash("md5");
    //   hash.update(account.password);
    //   hashedPassword = hash.digest("hex");
    // }
    await Account.login(account)
      .then(res => {
        console.log(res);
        const resultCode = res.resultCode;
        if (resultCode === 0) {
          const token = res.data.token;
          sessionStorage.setItem("access_token", token);
          sessionStorage.setItem("alias", res.data.alias);
          sessionStorage.setItem("avatar", res.data.avatar || avatarHolder);
          sessionStorage.setItem("user_role", res.data.role);
          sessionStorage.setItem("rid", res.data.rid);
          if (res.data.role == "notActivated") {
            router.push("/activate");
          } else {
            router.push("/Events");
          }
        } else if (resultCode === 1010) {
          isIDValid.value = "账号不存在";
        } else if (resultCode === 1011) {
          isPasswordValid.value = "密码错误";
        }
      })
      .catch(function (error) {
        console.log(error.res);
      });
  }
};
</script>
