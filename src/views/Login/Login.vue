<template>
  <div class="flex flex-col items-center" style="height: 100vh">
    <div class="flex flex-col items-center mt-20 md:mt-28">
      <form @submit.prevent="login" class="grid gap-4 place-items-center" style="width: 17vw; min-width: 300px">
        <div class="" style="width: 15vw; min-width: 250px">
          <img src="../../assets/logo.png" alt="" />
        </div>
        <InputBase
          placeholder="ID"
          hint="学号"
          required
          :warn="isIDValid"
          class="w-full"
          v-model:content="account.id"
          :rules="[{ rule: /^\d{10}$/, warning: '格式错误' }]"
        />
        <InputBase placeholder="密码" :warn="isPasswordValid" class="w-full" v-model:content="account.password" />
        <button class="w-full btn bg-primary text-primaryContent" type="submit">登入</button>
      </form>
    </div>
  </div>
</template>
<script>
import { Account } from "@/api/api";
import InputBase from "@/components/Input/InputBase.vue";
import isVaild from "@/Utils/isVaild";
// import crypto from "crypto";
export default {
  name: "Login",
  setup() {},
  components: { InputBase },
  data() {
    return {
      account: {
        id: {},
        password: {},
      },
      isPwd: true,
      isIDValid: "",
      isPasswordValid: "",
    };
  },
  methods: {
    async login() {
      console.log("123");
      var that = this;
      let account = isVaild(this.account);
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
              sessionStorage.setItem("user_role", res.data.role);
              sessionStorage.setItem("alias", res.data.alias);
              sessionStorage.setItem("rid", res.data.rid);
              sessionStorage.setItem("avatar", res.data.avatar);
              if (!res.data.isActivated) {
                that.$router.push("/activate");
              } else {
                that.$router.push("/");
              }
            } else if (resultCode === 101) {
              that.isIDValid = "账号不存在";
              console.log(that.isIDValid);
            } else if (resultCode === 102) {
              that.isPasswordValid = "密码错误";
            }
          })
          .catch(function (error) {
            console.log(error.res);
          });
      }
    },
  },
};
</script>
