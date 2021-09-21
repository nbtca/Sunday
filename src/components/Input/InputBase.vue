<template>
  <div class="select-none flex flex-col items-center">
    <div class="w-full flex justify-between items-center mb-0.5">
      <div v-if="subject" class="mx-1 font-medium text-sm sm:(text-lg font-semibold mb-1 )">
        {{ isSubjectRequired }}
      </div>
      <div>
        <button v-if="disabled" @click="disabled = false" class="mx-1 textLink font-medium text-xs">编辑</button>
        <button
          v-if="disabled == false && confirmBeforeInput"
          @click="
            disabled = true;
            input = val;
          "
          class="mx-1 font-medium text-xs"
        >
          取消
        </button>
      </div>
    </div>
    <div class="relative w-full mb-3 sm:mb-0">
      <input
        :type="type"
        class="transition duration-100 my-0 p-2 w-full rounded-lg shadow-innersm materialInput sm:(bg-transparent border textInput)"
        :class="[
          warning ? 'ring-[2px] ring-warning' : '',
          isValid && input ? '' : '',
          center ? 'text-center' : '',
          disabled ? ' bg-opacity-0 border-gray-400 shadow-none' : 'border-gray-400/10',
        ]"
        :required="required"
        :placeholder="placeholder"
        v-model.lazy="input"
        :readonly="disabled"
      />
      <div class="absolute inset-y-0 right-0 pr-2 flex items-center sm:hidden">
        <div v-if="warning == ''" class="textDescription">
          {{ hint }}
        </div>
        <div class="text-left textDescription text-warning">
          {{ warning }}
        </div>
      </div>
    </div>
    <div class="h-5 w-full mt-0.5 hidden sm:block">
      <div v-if="warning == ''" class="text-left mx-2 textDescription">
        {{ hint }}
      </div>
      <div class="text-left mx-2 textDescription text-warning">
        {{ warning }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputBase",
  props: {
    type: {
      type: String,
      default: "text",
    },
    subject: String,
    rules: {
      type: Array,
      default: [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
    warn: {
      type: String,
      default: "",
    },
    confirmBeforeInput: {
      type: Boolean,
      default: false,
    },
    val: {
      type: String,
      default: "",
    },
    content: Object,
    placeholder: String,
  },
  data() {
    return {
      input: "",
      warning: "",
      disabled: false,
    };
  },
  computed: {
    isSubjectRequired() {
      return this.required ? this.subject + "*" : this.subject;
    },
    isValid() {
      return !this.warning && this.warn == "" && (this.input != "" || !this.required) ? true : false;
    },
  },
  mounted() {
    this.warning = this.warn;
    this.input = this.val;
    this.confirmBeforeInput ? (this.disabled = true) : "";
    this.$emit("update:content", {
      value: this.isValid ? this.input : null,
      isValid: this.isValid,
    });
  },
  watch: {
    warn() {
      this.warning = this.warn;
      this.$emit("update:content", {
        value: this.input,
        isValid: this.isValid,
      });
      console.log(this.warning);
    },
    input() {
      let tmp = "";
      if (this.warn != "") {
        this.waning = this.warn;
      } else {
        for (let item of this.rules) {
          if (!item.rule.test(this.input)) {
            tmp = item.warning;
          }
        }
        if (!this.required && this.input == "") {
          this.warning = "";
        } else {
          this.warning = tmp;
        }
      }
      this.$emit("update:content", {
        value: this.input,
        isValid: this.isValid,
      });
    },
    val() {
      this.input = this.val;
    },
  },
};
</script>

<style></style>
