<template>
  <div class="felx flex-col items-center my-2 px-1">
    <div class="text-left text-lg font-bold text-gray-600 mb-2">{{ subject }}</div>
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputSection",
  props: {
    subject: "",
  },
};
</script>

<style></style>
