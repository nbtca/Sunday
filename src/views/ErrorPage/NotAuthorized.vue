<template>
  <div class="flex flex-col items-center justify-center bg-base-self h-screen w-screen">
    <div class="textHeading">!</div>
    <div class="textHeading">没有权限</div>
    <button class="btn bg-primary text-primaryContent w-20 mt-10" @click="back">返回</button>
  </div>
</template>

<script setup>
const back = () => {
  window.history.back(-1)
  window.history.back(-1)
}
</script>

<style></style>
