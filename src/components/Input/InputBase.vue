<template>
  <div class="select-none flex flex-col items-center">
    <div v-if="subject" class="self-start mx-1 mb-1 text-lg">
      {{ isSubjectRequired }}
    </div>
    <input
      :type="type"
      :class="[
        'textInput my-0 w-full',
        warning ? 'ring-[2px] ring-warning' : '',
        isVaild && input ? 'ring-[2px] ring-green-500 border-0' : '',
      ]"
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
    isVaild() {
      return !this.warning &&
        this.warn == "" &&
        (this.input != "" || !this.required)
        ? true
        : false;
    },
  },
  mounted() {
    this.warning = this.warn;
    this.$emit("update:content", {
      value: this.isVaild ? this.input : null,
      isVaild: this.isVaild,
    });
  },
  watch: {
    warn() {
      this.warning = this.warn;
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
        isVaild: this.isVaild,
      });
    },
  },
};
</script>

<style></style>
