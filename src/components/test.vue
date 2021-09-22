<template>
  <div class="h-96 w-full bg-green-700 flex flex-col justify-center items-center w-full">
    <button class="btn bg-blue-400" @click="call">alart</button>
  </div>
</template>

<script>
import InputBase from "@/components/Input/InputBase.vue";
import Success from "./Dialog/success.vue";
import notify from "@/components/Notify/Notify.js";
export default {
  components: {
    InputBase,
    Success,
  },
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
      notify("warning", "123123");
    },
  },
};

// start-
</script>
