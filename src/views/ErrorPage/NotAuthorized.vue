<template>
  <div class="flex flex-col items-center justify-center bg-systemBackground-light h-screen w-screen">
    <div class="textHeading">!</div>
    <div class="textHeading">没有权限</div>
    <button class="btn bg-primary text-primaryContent w-20 mt-10" @click="back">返回</button>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import { useAccountStore } from "@/stores/account"
const store = useAccountStore()
const back = () => {
  router.push("/")
}
</script>

<style></style>
