<template>
  <div class="transform pt-3 px-2">
    <div class="cellsm rounded-xl materialThick bg-gray-300/90  h-18 shadow-md">
      <div class="w-1/5 p-2">
        <ExclamationIcon class="" />
      </div>
      <div class="w-4/5 text-center text-base font-semibold p-3">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationIcon } from "@heroicons/vue/outline";

export default {
  name: "notify",
  components: {
    ExclamationIcon,
  },
  props: {
    content: "",
  },
  data() {
    return {
      isShowing: false,
    };
  },
};
</script>

<style></style>
