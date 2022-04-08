<template>
  <div
    class="relative flex flex-col-reverse bg-base-self sm:(flex-row) overflow-hidden "
    :style="[isSafari ? 'height: 100vh' : 'height: calc(var(---vh, 1vh) * 100)']"
  >
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

<script setup>
import Menu from "@/components/Menu/Menu.vue"
import { ref } from "@vue/reactivity"
const isSafari = ref(false)

var userAgent = navigator.userAgent
isSafari.value = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty("---vh", `${vh}px`)
</script>

<style></style>
