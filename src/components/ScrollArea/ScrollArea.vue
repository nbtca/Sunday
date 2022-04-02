<template>
  <div
    class="flex flex-col-reverse w-full px-2 overflow-auto sm:flex-col"
    style="height: 100vh"
    :style="[isSafari ? '' : 'height: calc(var(---vh, 1vh) * 100)']"
  >
    <slot></slot>
  </div>
</template>

<script>
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
