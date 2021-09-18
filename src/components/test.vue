<template>
  <div class="h-96 w-96 flex flex-col justify-center items-center w-full">
    <button @click="call">12322</button>
    <success></success>
  </div>
</template>

<script>
import InputBase from "@/components/Input/InputBase.vue";
import Success from "./Dialog/success.vue";
import notify from "@/components/Notify/ButtomDialog.js";
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
