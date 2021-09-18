<template>
  <TransitionRoot
    :show="isShowing"
    enter="transition ease-in-out  duration-150 transform"
    enter-from="opacity-0 translate-y-96 "
    enter-to="opacity-100 translate-y-0 "
    leave="transition ease-out duration-200 transform"
    leave-from="opacity-100 translate-y-0 "
    leave-to="opacity-0 translate-y-96"
  >
    <div class="pt-3 px-2">
      <div class="cellsm materialThin h-18 shadow-md">
        <div class="w-1/5 p-2">
          <ExclamationIcon class="" />
        </div>
        <div class="w-4/5 text-center p-3">
          {{ content }}
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot } from "@headlessui/vue";
import { ExclamationIcon } from "@heroicons/vue/outline";
export default {
  name: "notify",
  components: {
    TransitionRoot,
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
  created() {
    console.log("created");
    this.isShowing = true;
  },
  beforeUnmount() {
    console.log("unmounted");
    this.isShowing = false;
  },
};
</script>

<style></style>
