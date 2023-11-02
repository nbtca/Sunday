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
import { onMounted } from "vue"
const isSafari = ref(false)
var userAgent = navigator.userAgent
isSafari.value = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty("---vh", `${vh}px`)

// const urlBase64ToUint8Array = (base64String: string) => {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
//   const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
//   const rawData = window.atob(base64)
//   return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)))
// }

// const subscribe = () => {
//   navigator.serviceWorker.ready
//     .then(registration => {
//       const vapidPublicKey = "BGtkbcjrO12YMoDuq2sCQeHlu47uPx3SHTgFKZFYiBW8Qr0D9vgyZSZPdw6_4ZFEI9Snk1VEAj2qTYI1I1YxBXE"

//       return registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
//       })
//     })
//     .then(subscription => {
//       console.log(
//         JSON.stringify({
//           subscription: subscription,
//         })
//       )
//     })
//     .catch(err => console.error(err))
// }

// onMounted(async () => {
// const { getAccessToken } = useLogto()
// const token = await getAccessToken("https://api.nbtca.space/v2")
// console.log(token)
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register(new URL("../sw.ts", import.meta.url).href)
//     .then(registration => {
//       console.log(registration)
//       return registration.pushManager.getSubscription()
//       return registration.pushManager.getSubscription()
//     })
//     .then(function (subscription) {
//       if (!subscription) {
//         subscribe()
//       } else {
//         console.log(
//           JSON.stringify({
//             subscription: subscription,
//           })
//         )
//       }
//     })
// }
// })
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
