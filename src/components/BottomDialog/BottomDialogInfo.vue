<template>
  <div class="px-2 w-full">
    <table class="divide-y divide-gray-400/30 w-full">
      <tr v-for="item in contentList" :key="item.name">
        <td class="w-[43vw] pr-10 text-right whitespace-nowrap sm:w-auto">{{ item.name }}</td>
        <td class="py-[9px] text-sm text-left font-medium pr-5 overflow-ellipsis line-clamp-6 max-h-39 sm:(text-base pr-0)">
          {{ item.value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Content = {
  key: string
  value: string
}

const props = defineProps({
  content: {
    // eslint-disable-next-line no-undef
    type: Array<Content>,
  },
})
const { content } = toRefs(props)

const contentList = computed(() => {
  if (!content) {
    return []
  }
  const ans = []
  if (content.value != null)
    for (const item of content.value) {
      ans.push({
        name: item.key,
        value: item.value,
      })
    }
  return ans
})
</script>

<style></style>
