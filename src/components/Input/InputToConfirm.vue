<template>
  <div class="py-2 sm:(py-0 px-3 w-full) flex flex-col items-center">
    <div class="font-semibold">
      输入 <span class="font-extrabold text-lg text-warning px-1">{{ confirmMessage }}</span> 来确认
    </div>
    <input-base
      class="w-[80vw] sm:w-full pt-2"
      v-model:content="confirmInput"
      required
      center
      :rules="[{ rule: reg, warning: '输入错误' }]"
    ></input-base>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue"
import InputBase from "../Input/InputBase.vue"
const props = defineProps({
  confirmMessage: {
    type: String,
    default: "",
  },
})
const emit = defineEmits(["update:content"])
const confirmInput = ref({})
const reg = computed(() => {
  return new RegExp("^" + props.confirmMessage + "$")
})
watch(confirmInput, () => {
  emit("update:content", confirmInput.value)
})
</script>

<style></style>
