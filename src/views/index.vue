<template>
  <div
    class="relative flex flex-col-reverse sm:(flex flex-row) overflow-hidden"
    style="height: 100vh"
    :style="[isSafari ? '' : 'height: calc(var(---vh, 1vh) * 100)']"
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

<script>
import Menu from "@/components/Menu/Menu.vue";
export default {
  name: "Index",
  data() {
    return {
      isSafari: false,
    };
  },
  components: {
    Menu,
  },
  created() {
    var userAgent = navigator.userAgent;
    this.isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("---vh", `${vh}px`);
  },
};
</script>

<style></style>
