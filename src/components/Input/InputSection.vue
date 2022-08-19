<template>
  <div class="my-2 px-1">
    <div class="text-left text-lg font-bold text-gray-600 mb-2">{{ subject }}</div>
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const props = defineProps({
  subject: {
    type: String,
    required: true,
  },
})
</script>

<style></style>
