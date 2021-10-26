<template>
  <div class="px-2 w-full">
    <table class="divide-y divide-gray-400/30 w-full">
      <tr v-for="item in contentList" :key="item.key">
        <td class="py-[9px] w-[43vw] pl-5 pr-10 whitespace-normal text-right">{{ item.name }}</td>
        <td class="py-[9px] text-sm text-left font-medium pr-5">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "BottomDialogInfo",
  props: {
    content: {},
  },
  computed: {
    contentList() {
      let ans = [];
      if (this.content != null)
        for (let item of this.content) {
          for (let key in item) {
            ans.push({
              name: key,
              value: item[key],
            });
          }
        }
      // console.log(ans);
      return ans;
    },
  },
};
</script>

<style></style>
