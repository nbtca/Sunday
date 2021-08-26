<template>
  <div class="flex flex-col items-center p-10" style="height: 100vh">
    <div id="login" class="flex flex-col items-center mt-52">
      <form
        class="flex flex-col items-center"
        style="width: 25vw; min-width: 300px"
      >
        <input
          v-model="id"
          class="w-full textInput"
          type="text"
          placeholder="id"
        />
        <input
          v-model="password"
          class="w-full textInput mt-5"
          type="password"
          placeholder="password"
        />
        <button
          class="w-full btn bg-primary text-primaryContent"
          type="btn"
          @click="login()"
        >
          login
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { login } from "../../api/api";
// import crypto from "crypto";
import { ref, computed } from "vue";
export default {
  name: "Login",
  setup() {
    const model = ref("");
    return {
      model,
      isValid: computed(() => model.value.length <= 3),
    };
  },
  components: {
    // radio
  },
  data() {
    return {
      isPwd: true,
      id: "",
      password: "",
      isIDValid: true,
      isPasswordValid: true,
    };
  },
  methods: {
    login() {
      var that = this;
      // var hashedPassword = null;
      // if (this.password !== "") {
      //   const hash = crypto.createHash("md5");
      //   hash.update(this.password);
      //   hashedPassword = hash.digest("hex");
      // }
      login({
        id: this.id,
        password: this.password,
      })
        .then(function (response) {
          console.log(response);
          const resultCode = response.resultCode;
          if (resultCode === 0) {
            const token = response.data.token;
            console.log(token);
            sessionStorage.setItem("access_token", token);
            sessionStorage.setItem("user_role", response.data.role);
            sessionStorage.setItem("alias", response.data.alias);
            sessionStorage.setItem("rid", response.data.rid);
            sessionStorage.setItem("avatar", response.data.avatar);
            if (response.data.isPasswordEmpty) {
              that.$router.push("/register");
            } else {
              that.$router.push("/");
            }
          } else if (resultCode === 101) {
            that.isIDValid = false;
          } else if (resultCode === 102) {
            that.isPasswordValid = false;
          }
        })
        .catch(function (error) {
          console.log(error.response);
        });
    },
  },
};
</script>
