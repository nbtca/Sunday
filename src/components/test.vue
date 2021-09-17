<template>
  <div class="h-96 w-96 flex flex-col justify-center items-center w-full">
    <button>12322</button>
  </div>
</template>

<script>
import InputBase from "@/components/Input/InputBase.vue";
// import CallButtomDialog from "@/components/Dialog/ButtomDialog.js";
export default {
  components: {
    InputBase,
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
  },
};

// start-
</script>
