<template>
  <div class="pt-3 px-2 animate__bounceInDown animate__bounceInUp">
    <div class="cellsm materialThin h-18 shadow-md">
      <div class="w-1/5 p-2">
        <ExclamationIcon class="" />
      </div>
      <div class="w-4/5 text-center p-3">
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
