<template>
  <div class="cellsm " :class="class">
    <div class="flex flex-col h-full w-3/4 justify-between">
      <p class="text-left font-medium h-10 overflow-ellipsis overflow-hidden line-clamp-2">
        <slot name="body">body</slot>
      </p>
      <div>
        <div class="text-left py-0.5">
          <slot name="info"></slot>
        </div>
        <div class="flex text-left items-center justify-start select-none">
          <slot name="footer">footer</slot>
        </div>
      </div>
    </div>
    <div class="">
      <slot name="action">action</slot>
    </div>
    <div v-if="bannerMessage" class="cellBanner">{{ bannerMessage }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  bannerMessage: {
    type: String,
    default: "",
  },
})
</script>
<style>
.cellBanner {
  @apply absolute flex items-center justify-center h-5 w-20 transform -rotate-45 top-2 -left-5 bg-primary text-primaryContent shadow-2xl text-xs;
}
</style>
