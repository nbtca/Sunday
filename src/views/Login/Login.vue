<template>
  <div class="flex flex-col items-center p-10">
    <div id="login" class="flex flex-col items-center mt-52">
      <form class="flex flex-col items-center" style="width: 25vw; min-width: 300px">
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
          class="
            w-full
            btn
            bg-primary
            text-primaryContent
          "
          type="btn"
          @click="sendAccount()"
        >
          login
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    sendAccount() {
      const accountObject = {
        id: this.id,
        pwd: this.password,
      };
      console.log(accountObject);
      if ((this.id === "1") & (this.password === "1"))
        this.$router.push("./Home");
    },
  },
};
</script>
