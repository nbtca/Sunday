<template>
  <div class="safe-container relative flex flex-col-reverse sm:(flex-row) overflow-hidden h-screen">
    <div class="sm:(w-[17vw] mix-w-[17vw] bg-current)">
      <Menu ref="menu"></Menu>
    </div>
    <div class="w-full" @click="this.$refs.menu.isOpen = false">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu/Menu.vue"
import { ref } from "@vue/reactivity"
const isSafari = ref(false)

var userAgent = navigator.userAgent
isSafari.value = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty("---vh", `${vh}px`)
</script>

<style>
@supports (padding-top: constant(safe-area-inset-top)) {
  .safe-container {
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  }
}

@media (display-mode: fullscreen) {
  .safe-container {
    padding: 0;
  }
}

@media (display-mode: standalone) {
  .safe-container {
    padding: 0;
  }
}
</style>
