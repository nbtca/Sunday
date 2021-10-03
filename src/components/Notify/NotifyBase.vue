<template>
  <TransitionRoot
    class="pt-3 px-2 sm:(flex flex-row-reverse)"
    enter="transition ease-out  duration-200 transform"
    enter-from="opacity-0 -translate-y-18 "
    enter-to="opacity-100 translate-y-0 "
    leave="transition ease-in duration-100 "
    leave-from="opacity-100  "
    leave-to="opacity-0"
    :show="isShow"
  >
    <div class="cellsm sm:w-[20vw] rounded-xl materialMedium border border-gray-300/30 h-16 shadow-md">
      <div class="w-1/5 p-2">
        <ExclamationIcon class="" />
      </div>
      <div class="w-4/5 text-center text-base font-semibold p-3 select-none">
        {{ content }}
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { ExclamationIcon } from "@heroicons/vue/outline";

const props = defineProps({
  content: "",
});

const isShow = ref(false);
onMounted(() => {
  isShow.value = true;
  setTimeout(() => {
    isShow.value = false;
  }, 3000);
});
</script>

<style></style>
