<template>
  <div class="flex flex-row" style="height: 100vh">
    <div
      class="p-2 bg-base-100 border-r h-full"
      style="width: 17vw; min-width: 200px"
    >
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
