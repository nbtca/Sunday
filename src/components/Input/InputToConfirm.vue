<template>
  <div class="mt-6 mb-1 flex flex-col items-center">
    <div class="font-semibold">
      输入 <span class="font-bold px-1">{{ confirmMessage }}</span> 来确认
    </div>
    <input-base
      class="w-[80vw] pt-2"
      v-model:content="confirmInput"
      required
      center
      :rules="[{ rule: reg, warning: '输入错误' }]"
    ></input-base>
  </div>
</template>

<script>
import InputBase from "../Input/InputBase.vue";
export default {
  name: "InputToConfirm",
  components: {
    InputBase,
  },
  data() {
    return {
      confirmInput: {},
    };
  },
  props: {
    confirmMessage: "",
  },
  computed: {
    reg() {
      return new RegExp(this.confirmMessage);
    },
  },
  watch: {
    confirmInput() {
      this.$emit("update:content", {
        isValid: this.confirmInput.isValid,
      });
    },
  },
};
</script>

<style></style>
