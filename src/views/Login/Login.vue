<template>
  <GlobalBanner></GlobalBanner>
  <div class="flex flex-col items-center justify-center h-[calc(100vh-40px)] bg-systemBackground-lightSecondary">
    <div class="flex flex-col items-center pb-28">
      <div class="w-[18vw] sm:h-auto" style="min-width: 250px">
        <img src="../../assets/images/logo.png" alt="" class="filter drop-shadow" />
      </div>
      <button
        class="w-full btn bg-gradient-to-b from-primary/80 to-primary text-primaryContent shadow-md mt-10 w-84"
        type="submit"
        @click="onSighInWithLogto"
      >
        <div class="flex items-center gap-2">
          <img src="../../assets/images/logto.svg" alt="" class="h-6 w-6" />
          <div>登入</div>
        </div>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLogto } from "@logto/vue"
import GlobalBanner from "@/components/Banner/GlobalBanner.vue"

const { signIn } = useLogto()
const onSighInWithLogto = () => {
  return signIn(import.meta.env.VITE_LOGTO_CALLBACK_URL)
}
</script>
