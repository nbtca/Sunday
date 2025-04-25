<template>
  <a class="h-10 bg-systemBlue-light flex items-center justify-center text-white text-sm px-2" href="https://docs.nbtca.space/repair/weekend.html#在github上处理维修" target="_blank">
    <span class="mr-1"> 查看如何在Github Issue中更快的处理维修 </span>
    <svg width="16" height="16" viewBox="0 0 29 29" fill="white" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2207_33208)">
        <path
          d="M14.6714 8.71435L13.1128 10.2964C14.6596 10.4253 15.6674 10.8823 16.4292 11.644C18.4799 13.6948 18.4682 16.601 16.4409 18.6284L12.6089 22.4487C10.5698 24.4878 7.68701 24.4995 5.63623 22.4604C3.58545 20.3979 3.59717 17.5151 5.63623 15.476L7.9331 13.1792C7.60498 12.4409 7.52295 11.562 7.65185 10.8003L4.20654 14.2338C1.40576 17.0463 1.38233 21.0307 4.21826 23.8667C7.06592 26.7143 11.0503 26.6909 13.851 23.8901L17.8589 19.8706C20.6714 17.0581 20.6948 13.0737 17.8471 10.2378C17.1089 9.49951 16.1714 8.97217 14.6714 8.71435ZM14.3784 18.3706L15.937 16.7885C14.3901 16.6713 13.3823 16.2026 12.6206 15.4409C10.5698 13.3901 10.5815 10.4839 12.6089 8.45654L16.4292 4.63623C18.4799 2.59717 21.3628 2.58545 23.4135 4.63623C25.4643 6.68701 25.4409 9.58154 23.4135 11.6088L21.1167 13.9057C21.4448 14.6557 21.5151 15.5229 21.3979 16.2846L24.8432 12.851C27.644 10.0386 27.6674 6.06592 24.8315 3.21826C21.9839 0.370608 17.9995 0.394045 15.187 3.20654L11.1909 7.21435C8.37842 10.0269 8.35498 14.0112 11.2026 16.8471C11.9409 17.5854 12.8784 18.1128 14.3784 18.3706Z"
          fill="white"
          fill-opacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="clip0_2207_33208">
          <rect width="24.8525" height="25.1045" fill="white" transform="translate(2.09863 1.08984)" />
        </clipPath>
      </defs>
    </svg>
  </a>
  <div
    class="safe-container relative flex flex-col-reverse sm:(flex-row) overflow-hidden h-[calc(100vh-40px)] bg-systemBackground-lightSecondary"
  >
    <div class="min-h-[83px] sm:w-[320px] bg-current)">
      <Menu ref="menu"></Menu>
    </div>
    <div class="w-full h-[calc(100dvh-83px)] sm:h-full" @click="this.$refs.menu.isOpen = false">
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
import { ref, onMounted } from "vue"
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
