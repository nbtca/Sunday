<template>
  <div class="select-none flex flex-col items-center">
    <div class="w-full flex justify-between items-center mb-0.5">
      <div v-if="subject" class="mx-1 font-medium text-sm sm:(text-lg font-semibold)">
        {{ subject + (required ? "*" : "") }}
      </div>
    </div>
    <div class="relative w-full">
      <div class="absolute -top-6 right-0">
        <button v-if="disabled" @click="disabled = false" class="mx-1 textLink font-medium text-xs">编辑</button>
        <button
          v-if="disabled == false && confirmBeforeInput"
          @click="
            disabled = true;
            input = passValue;
          "
          class="mx-1 font-medium text-xs"
        >
          取消
        </button>
      </div>
      <input
        v-if="type != 'textarea'"
        :type="type"
        :class="[
          warning ? 'ring-[2px] ring-warning' : '',
          isValid && input ? '' : '',
          center ? 'text-center' : '',
          disabled ? ' bg-opacity-0 border-gray-400/60 shadow-none cursor-default pointer-events-none' : 'border-gray-400/10',
        ]"
        class="
          transition
          duration-100
          p-2
          w-full
          rounded-lg
          shadow-innersm
          materialInput
          sm:(bg-transparent
          border border-gray-500
          textInput
          )
        "
        :required="required"
        :placeholder="placeholder"
        v-model.lazy="input"
        :readonly="disabled"
        :maxLength="maxLength"
      />
      <textarea
        v-if="type == 'textarea'"
        class="rounded-xl materialInput h-36 mt-1 p-3 placeholder-gray-600 w-auto mx-5 mt-4 resize-none transition duration-100"
        :class="[
          warning ? 'ring-[2px] ring-warning' : '',
          isValid && input ? '' : '',
          center ? 'text-center' : '',
          disabled ? ' bg-opacity-0 border-gray-400/60 shadow-none cursor-default pointer-events-none' : 'border-gray-400/10',
        ]"
        cols="30"
        rows="4"
        :required="required"
        :placeholder="placeholder || '讲三句话...热烈地竹霍...衷心的感谢...办成功...'"
        v-model.lazy="input"
        :readonly="disabled"
        type="textarea"
      ></textarea>
      <div class="absolute pr-2 flex items-center sm:hidden" :class="[type == 'textarea' ? 'bottom-4 right-1' : 'inset-y-0 right-0']">
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

<script setup>
// TODO add length limit
// TODO add icon "show" when type is password

import { onMounted, computed, ref, toRefs, watch } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  subject: String,
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
  confirmBeforeInput: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: [],
  },
  maxLength: {
    type: Number,
    default: null,
  },
  passWarning: {
    type: String,
    default: "",
  },
  passValue: {
    type: String,
    default: "",
  },
  content: String | Boolean,
  placeholder: String,
});
const { passValue, passWarning, rules } = toRefs(props);

const input = ref("");
const emit = defineEmits(["update:content"]);
const emitInput = () => {
  emit("update:content", isValid.value ? input.value : false);
};
watch(passValue, () => {
  input.value = passValue.value;
});

const warning = ref("");
watch(passWarning, () => {
  warning.value = passWarning.value;
  emitInput();
});

watch(input, () => {
  if (!props.required && input.value == "") {
    warning.value = "";
  } else {
    warning.value = "";
    for (let item of rules.value) {
      if (!item.rule.test(input.value)) {
        warning.value = item.warning;
        break;
      }
    }
  }
  emitInput();
});

// valid condition:
// not required: empty match rule
// required: match rule
// passing warning is empty
const isValid = computed(() => {
  return warning.value == "" && (input.value != "" || !props.required) ? true : false;
});

const disabled = ref(false);
onMounted(() => {
  warning.value = passWarning.value;
  input.value = passValue.value;
  disabled.value = props.confirmBeforeInput;
  emitInput();
});
</script>

<style></style>
