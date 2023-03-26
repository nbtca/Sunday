<template>
  <div class="cellsm overflow-visible">
    <div class="flex">
      <div class="border rounded-full flex-shrink-0 h-14 w-14 relative overflow-hidden">
        <img class="object-fill object-center z-0 absolute" :src="member.avatar || defaultAvatar" alt="" />
      </div>
      <div class="flex flex-col text-left ml-2 items-start justify-center">
        <div class="flex items-center">
          <div class="font-semibold text-base leading-tight">
            {{ member.alias || "null" }}
          </div>
          <span v-if="member.role == '2'" class="bg-green-100 h-5 text-green-800 badge"> 管理员 </span>
        </div>
        <div>
          <div class="text-xs textDescription">
            {{ member.memberId }}
          </div>
          <div class="text-xs textDescription">最后登入&nbsp;{{ member.gmtModified }}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col h-full justify-center items-center"></div>
  </div>
</template>
<script setup lang="ts">
import type Member from "@/models/member"

const defaultAvatar = "https://oss.nbtca.space/weekend/1679839327.png"

const props = defineProps<{
  member: Member
}>()

</script>
