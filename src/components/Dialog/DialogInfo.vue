<template>
  <div class="px-2">
    <table class="divide-y divide-gray-400/30 w-full">
      <tr v-for="item in contentList" :key="item.key" class="text-base font-normal">
        <td class="w-2/5 pr-3 text-right whitespace-normal">{{ item.name }}</td>
        <td class="w-3/5 pl-8 text-left">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DialogInfo",
  props: {
    content: {},
  },
  computed: {
    contentList() {
      const ans = []
      if (this.content != null)
        for (const item of this.content) {
          for (const key in item) {
            ans.push({
              name: key,
              value: item[key],
            })
          }
        }
      return ans
    },
  },
}
</script>

<style></style>
