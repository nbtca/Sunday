<template>
  <div
    class="flex flex-col w-full px-2 overflow-auto min-h-0"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "ScrollArea",
  data() {
    return {
      isSafari: false,
    }
  },
  async created() {
    var userAgent = navigator.userAgent
    this.isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("---vh", `${vh}px`)
  },
}
</script>

<style></style>
