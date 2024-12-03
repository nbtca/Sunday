<script setup lang="ts">
import { ref, inject, computed, onMounted } from "vue"
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue"
import { PlusIcon } from "@heroicons/vue/24/outline"
import MemberCard from "./MemberCard.vue"
import MemberService from "@/services/member"
import type Member from "@/models/member"
import { BottomDialogInjectionKey, type BottomDialogType } from "@/components/BottomDialog/types"
import { useAccountStore } from "@/stores/account"
import { TabGroup, TabList, Tab } from "@headlessui/vue"

const store = useAccountStore()

const members = ref<Member[]>([])
const setMembers = async () => {
  const res = await MemberService.getByPage(0, 50)
  // TODO paging
  members.value = res
}

const inactiveMembers = ref<Member[]>([])
const setInactiveMembers = async () => {
  const res = await MemberService.getFullByPage(0, 50)
  // TODO paging
  inactiveMembers.value = res.filter(v => v.role?.includes("inactive"))
}

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
const setData = () => {
  const group = [setMembers()]
  if (store.account.role == "admin") {
    group.push(setInactiveMembers())
  }
  return Promise.all(group)
}

const activeMembers = computed(() => members.value.filter(member => !member.role?.includes("inactive")))
const activeMember = async (memberId: string) => {
  await MemberService.updateBasic({ memberId: memberId, role: "member" })
  setData()
}

// const addElementByBottomDialog = () => {
//   BottomDialog(addElementConfig).then(() => setMembers())
// }
enum ViewMemberOption {
  Active,
  Inactive,
}
const viewMemberOption = ref<ViewMemberOption>(ViewMemberOption.Active)

onMounted(() => {
  setData()
})
</script>
<template>
  <div class="h-full bg-systemBackground-lightSecondary">
    <div class="hidden sm:block relative">
      <div class="flex w-full pt-9 pb-6 px-8 justify-between z-50">
        <div class="textHeading">成员管理</div>
        <!-- <button
          class="bg-primary flex text-primaryContent w-30 btn justify-center items-center"
          @click="addElementByBottomDialog"
          v-if="store.account.role == 'admin'"
        >
          <PlusIcon class="h-5 text-white mr-2 w-5" />
          <div>添加成员</div>
        </button> -->
      </div>
      <div class="mt-4 px-4">
        <div v-if="store.account.role == 'admin'">
          <div class="rounded-xl overflow-hidden">
            <div class="text-left textSubHeading mb-4 pl-4">待通过的申请</div>
            <table v-if="inactiveMembers.length != 0" class="w-full bg-white rounded-xl table-auto">
              <tr class="bg-[#f8fafc] border-b">
                <th class="p-2">学号</th>
                <th class="p-2">姓名</th>
                <th class="p-2">班级</th>
                <th class="p-2">QQ</th>
                <th class="p-2">操作</th>
              </tr>
              <tr v-for="member in inactiveMembers" :key="member.memberId" class="bg-white border-b last:border-0">
                <td class="p-2">{{ member.memberId }}</td>
                <td class="p-2">{{ member.name }}</td>
                <td class="p-2">{{ member.section }}</td>
                <td class="p-2">{{ member.qq }}</td>
                <td class="p-2">
                  <button class="btnsm bg-primary text-primaryContent" @click="activeMember(member.memberId as string)">通过</button>
                </td>
              </tr>
            </table>
            <div v-else>
              <div class="pl-4 text-left text-gray-400 pt-2">暂无待通过的申请</div>
            </div>
            <!-- <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-4 overflow-auto content-start">
            <member-card class="mb-0" v-for="member in inactiveMembers" :key="member.memberId" :member="member"></member-card>
          </div> -->
          </div>
          <div class="h-[0.5px] w-full bg-gray-300 my-8"></div>
        </div>
        <div>
          <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-4 overflow-auto h-screen content-start">
            <member-card class="mb-0" v-for="member in activeMembers" :key="member.memberId" :member="member"></member-card>
          </div>
        </div>
      </div>
      <div
        class="p-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-4 overflow-auto pt-30 h-screen content-start"
      >
        <member-card class="mb-0" v-for="member in members" :key="member.memberId" :member="member"></member-card>
      </div>
    </div>
    <div class="sm:hidden">
      <scroll-area v-if="viewMemberOption == ViewMemberOption.Active">
        <member-card v-for="member in activeMembers" :key="member.memberId" :member="member"></member-card>
        <div class="py-14"></div>
      </scroll-area>
      <scroll-area v-else>
        <div class="cellsm" v-for="member in inactiveMembers" :key="member.memberId" :member="member">
          <div class="flex flex-col w-full">
            <div class="my-1">
              <div class="detail-member-card-item">
                <div class="font-bold w-10 text-left">学号</div>
                <div>
                  {{ member.memberId }}
                </div>
              </div>
              <div class="detail-member-card-item">
                <div class="font-bold w-10 text-left">班级</div>
                <div>
                  {{ member.section }}
                </div>
              </div>
              <div class="detail-member-card-item">
                <div class="font-bold w-10 text-left">姓名</div>
                <div>
                  {{ member.name }}
                </div>
              </div>
              <div class="detail-member-card-item">
                <div class="font-bold w-10 text-left">QQ</div>
                <div>
                  {{ member.qq || "无" }}
                </div>
              </div>
            </div>
            <div class="mb-1">
              <button class="btnsm bg-primary text-primaryContent w-full" @click="activeMember(member.memberId as string)">通过</button>
            </div>
          </div>
        </div>
        <div class="py-14"></div>
      </scroll-area>
      <div class="border-t flex h-12 w-full py-2 px-1 items-center bg-gray-50">
        <TabGroup class="w-full" :defaultIndex="0">
          <TabList class="flex space-x-1 p-1">
            <Tab as="template" v-slot="{ selected }">
              <button
                class="rounded-lg font-semibold w-full py-2.5 text-indigo-600 leading-5 focus:(outline-none border-base-standout )"
                :class="[selected ? 'bg-white shadow cursor-default' : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400']"
                @click="viewMemberOption = ViewMemberOption.Active"
              >
                成员
              </button>
            </Tab>
            <Tab as="template" v-slot="{ selected }" v-if="store.account.role == 'admin'">
              <button
                class="flex items-center justify-center rounded-lg font-semibold w-full py-2.5 text-indigo-600 leading-5 focus:(outline-none border-base-standout )"
                :class="[selected ? 'bg-white shadow cursor-default' : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400']"
                @click="viewMemberOption = ViewMemberOption.Inactive"
              >
                待通过
                <div
                  class="rounded-full w-5 h-5 ml-1 text-white text-sm flex items-center justify-center"
                  :class="[
                    selected ? 'bg-systemBlue-light shadow cursor-default' : 'bg-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400',
                  ]"
                >
                  {{ inactiveMembers.length }}
                </div>
              </button>
            </Tab>
          </TabList>
        </TabGroup>
        <!-- <input
          type="text"
          class="border-base-standout rounded-lg h-10 shadow-inner my-0.5 mx-0.5 text-center flex-grow"
          placeholder="搜索"
        /> -->
        <!-- <button
          class="rounded-lg flex h-8 mx-1 w-8 justify-center items-center focus:(shadow-inner outline-none) flex-shrink-0"
          @click="addElementByBottomDialog"
          v-if="store.account.role == 'admin'"
        >
          <PlusIcon class="h-5 text-gray-900 w-5" />
        </button> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-member-card-item {
  @apply flex justify-between  even:bg-white odd:bg-gray-100 p-1  rounded-lg;
}
</style>
