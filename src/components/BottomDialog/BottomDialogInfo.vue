<template>
  <div class="px-2 w-full">
    <table class="divide-y divide-gray-400/30 w-full">
      <tr v-for="item in contentList" :key="item.key">
        <td class="w-[43vw] pr-10 text-right whitespace-nowrap sm:w-auto">{{ item.name }}</td>
        <td class="py-[9px] text-sm text-left font-medium pr-5 sm:(text-base pr-0)">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { computed, toRefs } from "@vue/reactivity";

const props = defineProps({
  content: {
    type: Array,
  },
});
const { content } = toRefs(props);

const contentList = computed(() => {
  let ans = [];
  if (content.value != null)
    for (let item of content.value) {
      for (let key in item) {
        ans.push({
          name: key,
          value: item[key],
        });
      }
    }
  // console.log(ans);
  return ans;
});
</script>

<style></style>
