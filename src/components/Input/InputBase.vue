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
    <div class="h-5 w-full">
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
    rules: Array,
    required: {
      type: Boolean,
      default: false,
    },
    hint: {
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
      return !this.warning && (this.input != "" || !this.required)
        ? true
        : false;
    },
  },
  watch: {
    input() {
      let tmp = "";
      for (let item of this.rules) {
        if (!item.rule.test(this.input)) {
          tmp = item.warning;
        }
      }
      //   this.vaild = flag ? false : true;
      if (!this.required && this.input == "") {
        this.warning = "";
      } else {
        this.warning = tmp;
      }
      this.$emit("update:content", {
        value: this.isVaild ? this.input : null,
        isVaild: this.isVaild,
      });
    },
  },
};
</script>

<style></style>
