<script setup lang="ts">
import { ref, inject } from "vue"
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue"
import { PlusIcon } from "@heroicons/vue/outline"
import MemberCard from "./MemberCard.vue"
import MemberService from "@/services/member"
import type Member from "@/models/member"
import { BottomDialogInjectionKey, type BottomDialogType } from "@/components/BottomDialog/types"

const members = ref(Array<Member>())
const setMembers = () => {
  MemberService.getByPage(0, 30).then(res => {
    // TODO paging
    members.value = res
  })
}
setMembers()

const BottomDialog = inject(BottomDialogInjectionKey) as BottomDialogType
const addElementConfig = {
  subject: "添加成员",
  formList: [
    {
      id: "memberId",
      subject: "ID",
      required: true,
      type: "text",
      placeholder: "学号",
      maxLength: 10,
      hint: "(应该是)",
      rules: [{ rule: /^\d{10}$/, warning: "格式错误" }],
      value: "",
    },
    {
      id: "name",
      subject: "姓名",
      required: true,
      type: "text",
      maxLength: 4,
      hint: "真名!",
      rules: [{ rule: /^[\u4e00-\u9fa5]{2,4}$/, warning: "格式错误" }],
      value: "",
    },
    {
      subject: "班级",
      id: "section",
      required: true,
      type: "text",
      placeholder: "专业+班级",
      maxLength: 12,
      hint: "示例: 星舰建设181",
      rules: [
        {
          rule: /^([\u4e00-\u9fa5]{2,10})(\d{3})$/,
          warning: "格式错误",
        },
      ],
    },
  ],
  acceptAction: e => {
    return MemberService.create(e)
  },
}
const addElementByBottomDialog = () => {
  BottomDialog(addElementConfig).then(() => setMembers())
}
</script>
<template>
  <div class="h-full">
    <div class="hidden sm:block relative">
      <div class="flex w-full py-6 px-8 justify-between absolute materialMedium bg-white/70 z-50">
        <div class="textHeading">成员管理</div>
        <button class="bg-primary flex text-primaryContent w-30 btn justify-center items-center" @click="addElementByBottomDialog">
          <PlusIcon class="h-5 text-white mr-2 w-5" />
          <div>添加成员</div>
        </button>
      </div>
      <div class="p-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-2 overflow-auto pt-24 h-screen">
        <member-card v-for="member in members" :key="member.memberId" :member="member"></member-card>
      </div>
    </div>
    <div class="sm:hidden">
      <scroll-area>
        <member-card v-for="member in members" :key="member.memberId" :member="member"></member-card>
        <div class="py-14"></div>
      </scroll-area>
      <div class="border-t flex h-12 w-full py-2 px-1 items-center">
        <input
          type="text"
          class="border-base-standout rounded-lg h-10 shadow-inner my-0.5 mx-0.5 text-center w-[90vw]"
          placeholder="搜索"
        />
        <!-- <button disabled class="flex h-8 mx-1 w-8 justify-center items-center">
          <UploadIcon class="h-5 text-gray-900 w-5" />
        </button> -->
        <button
          class="rounded-lg flex h-8 mx-1 w-8 justify-center items-center focus:(shadow-inner outline-none)"
          @click="addElementByBottomDialog"
        >
          <PlusIcon class="h-5 text-gray-900 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
