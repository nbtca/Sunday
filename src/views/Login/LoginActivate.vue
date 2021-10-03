<template>
  <div class="flex flex-col justify-start" style="height: 100vh">
    <div class="flex flex-col items-center">
      <form @submit="activate" class="grid gap-y-1 place-items-center" style="width: 17vw; min-width: 300px">
        <div class="text-3xl font-bold my-12 md:mt-18">完善个人信息</div>
        <InputBase subject="密码" required type="password" class="w-full" v-model:content="account.password" />
        <InputBase
          subject="确认密码"
          required
          type="password"
          :warn="isPasswordConsistent"
          class="w-full"
          v-model:content.lazy="account.passwordConfirm"
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
        <label for="file-upload" class="relative w-3/5 btn materialThick select-none cursor-pointer">
          <span>上传头像</span>
          <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*" />
        </label>
        <!-- <button class="w-3/5 btn materialThick" @click="upload">上传头像</button> -->
        <button class="w-full btn bg-primary text-primaryContent mt-5" type="submit">提交</button>
      </form>
    </div>
  </div>
</template>
<script>
import InputBase from "@/components/Input/InputBase.vue";
import InputSection from "@/components/Input/InputSection.vue";
import isValid from "@/Utils/isValid";
import { Element, Account } from "@/api/api";
import axiosApi from "@/axios/AxiosConfig";
export default {
  name: "LoginActivate",
  setup() {},
  components: { InputBase, InputSection },
  data() {
    return {
      account: {
        password: {},
        passwordConfirm: {},
        name: {},
        class: {},
        phone: {},
        qq: {},
      },
      form: new FormData(),
    };
  },
  computed: {
    isPasswordConsistent() {
      let ans = "";
      if (this.account.password.value != this.account.passwordConfirm.value || this.account.passwordConfirm == {}) ans = "密码不一致";
      return ans;
    },
  },
  methods: {
    updateAvatar(event) {
      var file = event.target.files[0];
      // let param = new FormData();
      this.form.append("file", file);
      // Element.updateAvatar(param).then(res => {
      //   this.accountInfo.ravatar = res.data.avatar;
      //   sessionStorage.setItem("avatar", res.data.avatar);
      //   this.avatar = sessionStorage.getItem("avatar");
      // });
    },
    async activate(e) {
      console.log(e);
      // let account = isValid(this.account);
      // if (account) {
      //   this.form.append("password", account.password);
      //   this.form.append("name", account.name);
      //   this.form.append("class", account.class);
      //   this.form.append("phone", account.phone);
      //   this.form.append("qq", account.qq);
      //   await Element.activate(this.form);
      //   // Account.login({
      //   //   rid: sessionStorage.getItem("rid", res.data.rid),
      //   //   password: this.account.password,
      //   // }).then(res => {
      //   //   console.log(res);
      //   //   this.$router.push("/");
      //   // });
      // }
    },
  },
};
</script>
