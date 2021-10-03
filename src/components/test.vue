<template>
  <div class="fill w-full bg-green-700 border border-blue-500 flex flex-col justify-between items-center">
    <div>123</div>
    <div class="w-full h-3/5 bg-black">
      <div class="bg-white h-full"></div>

    </div>
    <!-- <button class="btn bg-blue-400" @click="call">alart</button> -->
    <div>123</div>
  </div>
</template>

<script>
import InputBase from "@/components/Input/InputBase.vue";
import Success from "./Dialog/success.vue";
import Notify from "@/components/Notify";
export default {
  components: {
    InputBase,
    Success,
  },
  // created() {
  //   var userAgent = navigator.userAgent;
  //   this.isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("---vh", `${vh}px`);
  // },
  data() {
    return {
      content: "",
      isFormValid: true,
    };
  },
  watch() {},
  methods: {
    submit() {
      var pattern = /^[0-9]*$/;
      let str = "123";
      let r = new RegExp(pattern);
      console.log(r.test(str));
      console.log("submit");
    },
    call() {
      Notify("warning", "123123");
    },
  },
};
</script>
<style>
.fill {
  height: 100vh;
}

/* Avoid Chrome to see Safari hack */

</style>
