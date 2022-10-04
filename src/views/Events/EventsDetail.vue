<template>
  <div class="flex flex-col justify-between h-screen">
    <div class="px-3 pt-1 md:(px-6 pt-4)">
      <div class="flex pb-1 md:(py-5 px-6) lg:px-0 items-center justify-between">
        <div class="text-left">
          <h3 class="font-medium pt-4 text-2xl md:(pt-4 text-4xl)">
            <div class="hidden md:flex">
              事件详情
              <span class="text-3xl pl-2 text-gray-400 font-medium">{{ "#" + detail?.eventId }}</span>
            </div>
            <div class="md:hidden">{{ detail?.status }}</div>
          </h3>
          <p class="ml-0.5 textDescription">{{ detail?.gmtCreate }}</p>
        </div>
        <div class="hidden md:flex textSubHeading">{{ detail?.status }}</div>
      </div>
      <div class="border border-gray-200 rounded-lg overflow-hidden">
        <div class="infoCell">
          <dt class="text-gray-500 infoHead">型号</dt>
          <dd class="infoContent">
            {{ detail?.model || "无型号" }}
          </dd>
        </div>
        <div class="infoCell">
          <dt class="text-gray-500 infoHead">问题描述</dt>
          <dd class="infoContent">
            {{ detail?.problem }}
          </dd>
        </div>
        <div class="infoCell" v-if="eventStore.mine">
          <dt class="text-gray-500 infoHead">联系方式</dt>
          <dd class="flex infoContent justify-center">
            <table>
              <tr>
                <td class="w-20">QQ</td>
                <td>
                  {{ detail?.qq }}
                </td>
              </tr>
              <tr>
                <td>微信</td>
                <td>
                  {{ detail?.phone }}
                </td>
              </tr>
              <tr>
                <td>偏好</td>
                <td>
                  {{ detail?.contactPreference }}
                </td>
              </tr>
            </table>
          </dd>
        </div>
        <div class="infoCell hidden md:grid">
          <dt class="text-gray-500 infoHead">维修历史</dt>
          <dd class="infoContent">
            <div v-for="log in detail?.logs" :key="log.logId">
              {{ log.description }}
            </div>
          </dd>
        </div>
      </div>
    </div>

    <div class="w-full pb-16">
      <div>
        <button
          v-if="detail?.status == 'open'"
          class="bg-primary text-primaryContent w-20 btn"
          @click="acceptEvent(detail)">
          接受
        </button>
      </div>
      <div v-if="isCurrentMember(detail, store.account.memberId) && detail.status == 'accepted'" class="flex flex-col">
        <div>
          <button class="bg-warning text-warningContent mx-5 btn" @click="dropEvent(detail)">放弃</button>
          <button class="bg-primary text-primaryContent btn" @click="commitEvent(detail)">提交</button>
        </div>
      </div>
      <div
        v-if="detail?.status == 'committed' && store.account.role == 'admin'"
        class="flex flex-nowrap justify-center">
        <button class="bg-warning text-warningContent mx-4 w-20 btn" @click="rejectEvent(detail)">退回</button>
        <button class="bg-primary text-primaryContent mx-4 w-20 btn" @click="closeEvent(detail)">通过</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, inject, onMounted } from "vue"
import { acceptEvent, commitEvent, dropEvent, getLastLog } from "./EventActions"
import EventService from "@/services/event"
import { isCurrentMember } from "@/utils/event"
import type { Event } from "@/models/event"
import { useAccountStore } from "@/stores/account"
import { BottomDialogInjectionKey, type BottomDialogType } from "@/components/BottomDialog/types"
import { useEventStore } from "@/stores/event"

const store = useAccountStore()
const eventStore = useEventStore()

// const statusToText = ref(["取消", "待接受", "已接受", "待审核", "关闭"])
// const contactPreference = ref(["QQ", "微信", "电话"])

const detail = ref<Event>()
const setDetail = async () => {
  if (eventStore.eventId == null) {
    return
  }
  console.log(eventStore.mine)
  if (eventStore.mine) {
    EventService.getMemberEvent(eventStore.eventId).then(res => {
      detail.value = res
    })
  } else {
    EventService.get(eventStore.eventId).then(res => {
      detail.value = res
    })
  }
}

onMounted(() => {
  setDetail()
})

watch(() => eventStore.eventId, setDetail)
const BottomDialog = inject(BottomDialogInjectionKey) as BottomDialogType

const rejectEvent = async (event: Event) => {
  BottomDialog({
    subject: "审核提交",
    acceptActionName: "退回",
    rounded: true,
    content: [
      { key: "型号", value: event.model || "无型号" },
      { key: "问题描述", value: event.problem },
      { key: "创建时间", value: event.gmtCreate },
      { key: "维修描述", value: getLastLog(event)?.description || "" },
      { key: "提交时间", value: getLastLog(event)?.gmtCreate || "" },
    ],
    acceptAction: () => {
      return EventService.rejectCommit(event.eventId)
    },
  })
}
const closeEvent = async (event: Event) => {
  BottomDialog({
    subject: "审核提交",
    acceptActionName: "通过",
    rounded: true,
    content: [
      { key: "型号", value: event.model || "无型号" },
      { key: "问题描述", value: event.problem },
      { key: "创建时间", value: event.gmtCreate },
      { key: "维修描述", value: getLastLog(event)?.description || "" },
      { key: "提交时间", value: getLastLog(event)?.gmtCreate || "" },
    ],
    acceptAction: () => {
      return EventService.close(event.eventId)
    },
  })
}
</script>

<style></style>
