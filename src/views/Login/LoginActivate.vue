<template>
  <div class="flex flex-col items-center" style="height: 100vh">
    <div class="flex flex-col items-center mt-20 md:mt-28">
      <form
        @submit="LoginActivate"
        class="grid gap-1 place-items-center"
        style="width: 17vw; min-width: 300px"
      >
        完善个人信息
        <InputBase
          subject="密码"
          required
          class="w-full"
          v-model:content="account.password"
        />
        <InputBase
          subject="确认密码"
          required
          :warn="isPasswordConsistent"
          class="w-full"
          v-model:content.lazy="account.passwordConfirm"
        />
        <InputBase
          subject="昵称"
          required
          class="w-full"
          v-model:content="account.alias"
          :rules="[{ rule: /^[\u4e00-\u9fa5]{2,4}$/, warning: '格式错误' }]"
        />
        <InputBase
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
        />
        <InputBase
          subject="电话号码"
          class="w-full"
          v-model:content="account.phone"
          :rules="[
            {
              rule: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              warning: '格式错误',
            },
          ]"
        />
        <InputBase
          subject="QQ"
          class="w-full"
          v-model:content="account.qq"
          :rules="[{ rule: /[1-9][0-9]{4,14}/, warning: '格式错误' }]"
        />

        <button
          class="w-full btn bg-primary text-primaryContent"
          type="submit"
          @click="login()"
        >
          提交
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import InputBase from "@/components/Input/InputBase.vue";
import isVaild from "@/Utils/isVaild";
export default {
  name: "LoginActivate",
  setup() {},
  components: { InputBase },
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
    };
  },
  computed: {
    isPasswordConsistent() {
      let ans = "";
      if (this.account.password.value != this.account.passwordConfirm.value)
        ans = "密码不一致";
      return ans;
    },
  },
  methods: {
    activate() {
      console.log(this.account);
      console.log(isVaild(this.account));
    },
  },
};
// const pwdAgainCheck = async(rule, value, callback) => {
//       if (value.length < 1) {
//         this.changeAgainFlag = 2;
//         return callback(new Error('重复密码不能为空！'));
//       } else if(this.formValidate.password != this.formValidate.againPassword){
//         this.changeAgainFlag = 2;
//         return callback(new Error('两次输入密码不一致！'));
//       }else{
//         this.changeAgainFlag = 1;
//         callback()
//       }
//     };
//     return {
//       changeFlag: 0,
//       changeAgainFlag: 0,
//       formValidate: {
//           password: '',
//           againPassword: ''
//       },
//       ruleValidate: {
//           password: [
//               { required: true, validator: pwdCheck, trigger: 'blur' }
//           ],
//           againPassword: [
//               { required: true, validator: pwdAgainCheck, trigger: 'blur' }
//           ]
//       }
//     }
</script>
