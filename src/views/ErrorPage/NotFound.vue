<template>
  <div class="flex flex-col items-center justify-center bg-base-self h-screen w-screen">
    <div class="textHeading">404</div>
    <div class="textHeading">页面不存在</div>
    <button class="btn bg-primary text-primaryContent w-20 mt-10" @click="back">返回</button>
  </div>
</template>

<script setup lang="ts">
const back = () => {
  window.history.back()
  window.history.back()
}
</script>

<style></style>
