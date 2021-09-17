<template>
  <div class="select-none flex flex-col items-center">
    <div v-if="subject" class="self-start mx-1 mb-0.5 font-medium text-sm sm:(text-lg font-semibold mb-1 )">
      {{ isSubjectRequired }}
    </div>
    <input
      :type="type"
      class="my-0 p-2 w-full materialInput rounded-lg shadow-innersm border-0 sm:(bg-transparent border textInput)"
      :class="[warning ? 'ring-[2px] ring-warning' : '', isValid && input ? '' : '', center ? 'text-center' : '']"
      :required="required"
      :placeholder="placeholder"
      v-model.lazy="input"
    />
    <div class="h-5 w-full mt-0.5">
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
    content: Object,
    placeholder: String,
  },
  data() {
    return {
      input: "",
      warning: "",
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
  },
};
</script>

<style></style>
