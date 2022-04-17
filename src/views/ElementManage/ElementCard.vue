<template>
  <div class="cellsm overflow-visible">
    <div class="flex">
      <div class="border rounded-full flex-shrink-0 h-14 w-14 relative overflow-hidden">
        <img v-if="element.ravatar" class="object-fill object-center z-0 absolute" :src="element.ravatar" alt="" />
        <UserIcon v-if="!element.ravatar" class="m-1" />
      </div>
      <div class="flex flex-col text-left ml-2 items-start justify-center">
        <div class="flex items-center">
          <div class="font-semibold text-base leading-tight">
            {{ element.ralias || "null" }}
          </div>
          <span v-if="element.role == '2'" class="bg-green-100 h-5 text-green-800 badge"> 管理员 </span>
        </div>
        <div>
          <div class="text-xs textDescription">
            {{ element.rid }}
          </div>
          <div class="text-xs textDescription">最后登入&nbsp;{{ element.gmt_modified }}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col h-full justify-center items-center"></div>
  </div>
</template>
<script setup>
import { UserIcon } from "@heroicons/vue/outline"
const props = defineProps({
  element: {
    type: Object,
  },
})
</script>
