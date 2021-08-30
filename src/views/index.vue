<template>
  <div class="flex flex-col-reverse	 sm:(flex flex-row) overflow-hidden" style="height: 100vh">
    <div class=" sm:(w-[17vw] mix-w-[17vw] bg-current)">
      <Menu></Menu>
    </div>
    <div class="w-full">
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
  components: {
    Menu,
  },
};
</script>

<style></style>
