<script setup lang="ts">
import { ref, inject } from "vue"
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import { UserIcon, UploadIcon, PlusIcon, UserAddIcon } from "@heroicons/vue/outline"
import ElementCard from "./MemberCard.vue"
import MemberService from "@/services/member"
import type Member from "@/models/member"
import { BottomDialogInjectionKey, type BottomDialogType } from "@/components/BottomDialog/types"

const members = ref(Array<Member>())
const setMembers = () => {
  MemberService.getByPage(0, 30).then(res => {
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
    <div class="hidden sm:block">
      <div class="flex w-full p-8 pb-2 justify-between">
        <div class="textHeading">成员管理</div>
        <Menu as="div" class="z-50">
          <div>
            <MenuButton class="bg-primary flex text-primaryContent w-30 btn justify-center items-center">
              <PlusIcon class="h-5 text-white mr-2 w-5" />
              <div>添加成员</div>
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="divide-y bg-white rounded-md divide-gray-100 shadow-lg ring-black mt-2 origin-top-right right-4 ring-1 ring-opacity-5 w-40 absolute focus:outline-none"
            >
              <div class="py-1 px-1">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="addElementByBottomDialog"
                    :class="[
                      active ? 'text-primaryContent bg-primary' : '',
                      'group flex rounded-md items-center w-full h-full p-2 text-sm',
                    ]"
                  >
                    <UserAddIcon :active="active" class="h-5 mr-2 text-violet-300 w-5" aria-hidden="true" />
                    手动添加
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[active ? 'text-primaryContent bg-primary' : '', 'group flex rounded-md items-center w-full px-2 py-2 text-sm']"
                  >
                    <UploadIcon :active="active" class="h-5 mr-2 text-violet-300 w-5" aria-hidden="true" />
                    从表格导入
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <div class="w-full py-2 align-middle">
        <table class="divide-y divide-gray-200 h-2/3 overflow-hidden w-full">
          <thead class="">
            <tr>
              <th scope="col" class="tableHead"></th>
              <th scope="col" class="tableHead">联系方式</th>
              <th scope="col" class="tableHead hidden md:block">最后登入</th>
            </tr>
          </thead>
          <tbody class="divide-y border divide-base-standout">
            <tr v-for="member in members" :key="member.memberId">
              <td class="tableCell">
                <div class="flex items-center">
                  <div class="border rounded-full flex-shrink-0 h-14 w-14 overflow-hidden hidden relative lg:block">
                    <img v-if="member.avatar" class="object-fill absolute" :src="member.avatar" alt="" />
                    <UserIcon v-if="!member.avatar" class="bg-base-standout object-fill p-1" />
                  </div>
                  <div class="flex flex-col md:ml-4 items-start">
                    <div class="inline-flex items-center">
                      <div class="font-medium text-lg tracking-wider">
                        {{ member.alias || "null" }}
                      </div>
                      <span v-if="member.role == 'admin'" class="bg-green-100 text-green-800 badge"> 管理员 </span>
                    </div>
                    <div class="textDescription">
                      {{ member.memberId }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="tableCell">
                <table class="w-full">
                  <tr>
                    <td class="w-20">QQ</td>
                    <td class="text-left">
                      {{ member.qq || "null" }}
                    </td>
                  </tr>
                  <tr>
                    <td>手机</td>
                    <td class="text-left">
                      {{ member.phone || "null" }}
                    </td>
                  </tr>
                </table>
              </td>
              <td class="tableCell hidden md:block">
                {{ member.gmtModified }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sm:hidden">
      <scroll-area>
        <ElementCard v-for="member in members" :key="member.memberId" :member="member"></ElementCard>
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
