<template>
  <div class="flex">
    <div class="flex flex-col h-full w-full items-center sm:(w-[24vw] min-w-[270px] border-r border-gray-400/30)">
      <div
        class="bg-gray-50 border-t border-base-standout/70 flex flex-col order-last w-full px-0.5 self-end items-center sm:(border-t-0 order-first border-b px-0 pb-0.5)"
      >
        <input
          type="text"
          class="border-base-standout rounded-lg order-last h-10 shadow-inner my-0.5 mx-0.5 text-center sm:(rounded text-left)"
          style="width: 98%"
          v-model="searchQuery"
          placeholder="搜索"
        />
        <TabGroup class="w-full" :defaultIndex="defaultIndex">
          <TabList class="flex space-x-1 p-1">
            <Tab v-for="item in filterOptions" as="template" :key="item" v-slot="{ selected }">
              <button
                @click="filterHandler(item)"
                class="rounded-lg font-semibold w-full py-2.5 text-indigo-600 leading-5 focus:(outline-none border-base-standout )"
                :class="[
                  selected
                    ? 'bg-white shadow cursor-default'
                    : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400',
                ]"
              >
                {{ item }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <scroll-area>
        <div class="hidden sm:block">
          <button
            v-for="item in filteredList"
            :key="item.eventId"
            class="flex flex-row flex-nowrap cell justify-between"
            :class="[item.eventId == eventStore.eventId ? 'bg-gray-400/30 cursor-default shadow' : '']"
            @click="showDetail(item.eventId as number)"
          >
            <div class="text-left w-2/3 truncate">
              {{ item.problem }}
            </div>
            <div>
              {{ item.status }}
            </div>
          </button>
        </div>
        <!-- mobile -->
        <div class="sm:hidden flex flex-col-reverse">
          <event-card
            v-for="item in filteredList"
            :key="item.eventId"
            :class="isCurrentMember(item, memberId) ? 'h-30' : ''"
            :bannerMessage="item.status == 'committed' && eventsMatchingByRID ? '已提交' : ''"
          >
            <template #body>
              {{ item.problem }}
            </template>
            <template #action>
              <button v-if="item.status == 'open'" @click="acceptEvent(item)" class="btnxs btnPrimary">接受</button>
              <div class="relative">
                <div>
                  <button
                    v-if="item.status == 'accepted' && isCurrentMember(item, memberId)"
                    @click="commitEvent(item)"
                    class="btnxs btnActiveReverse"
                  >
                    提交
                  </button>
                  <button
                    v-if="item.status == 'committed' && isCurrentMember(item, memberId) && eventsMatchingByRID"
                    @click="alterCommit(item)"
                    class="btnxs btnWarningReverse"
                  >
                    修改
                  </button>
                </div>
              </div>
              <button
                v-if="item.status == 'committed' && store.account.role == 'admin' && checkOnly"
                @click="judgeSubmit(item)"
                class="btnxs btnWarningReverse"
              >
                审核
              </button>
              <div v-if="item.status == 'cancelled' || item.status == 'closed'">
                {{ item.status }}
              </div>
            </template>
            <template #info>
              <div v-if="isCurrentMember(item, memberId)">
                <div>
                  QQ:<em>{{ item.qq || "无" }}</em>
                </div>
                <div>
                  电话:<em>{{ item.phone || "无" }}</em>
                </div>
              </div>
            </template>
            <template #footer>
              <div class="w-17 truncate">{{ item.model || "无型号" }}</div>
              <span class="text-xs ml-2 textDescription">{{ item.gmtCreate }}</span>
              <button
                v-if="item.status == 'accepted' && isCurrentMember(item, memberId) && eventsMatchingByRID"
                @click="dropEvent(item)"
                class="text-xs font-medium text-warning w-8 p-[1px] rounded ml-2 mb-0.5 border border-warning hover:(bg-warning text-warningContent)"
              >
                放弃
              </button>
            </template>
          </event-card>
          <div v-if="filteredList.length == 0">
            <div class="mb-2 text-center text-gray-400">现在是空的</div>
          </div>
          <div class="py-20"></div>
        </div>
      </scroll-area>
    </div>
    <div class="w-full hidden sm:block">
      <div v-if="eventStore.eventId != undefined">
        <events-detail></events-detail>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import router from "@/router"
import { setEvents, events, acceptEvent, commitEvent, alterCommit, dropEvent, judgeSubmit } from "./EventActions"
import { TabGroup, TabList, Tab } from "@headlessui/vue"
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue"
import EventCard from "../../components/EventCard/EventCard.vue"
import EventsDetail from "./EventsDetail.vue"
import { useRoute } from "vue-router"
import { isCurrentMember } from "@/utils/event"
import { useAccountStore } from "@/stores/account"
import { useEventStore } from "@/stores/event"

const store = useAccountStore()
const eventStore = useEventStore()
const memberId = ref(store.account.memberId || "")

// const statusToText = ref(["已取消", "待接受", "已接受", "待审核", "已关闭"])

// filter
const defaultIndex = ref(0)
const filterOptions = ref(store.account.role == "admin" ? ["全部", "我的", "审核"] : ["待接受", "我的"])
const checkOnly = ref(false)
const eventsMatchingByRID = ref(false)
const searchQuery = ref("")

const filterHandler = (e: string) => {
  checkOnly.value = false
  eventsMatchingByRID.value = false
  if (e == "全部") {
    eventsMatchingByRID.value = false
  } else if (e == "我的") {
    eventsMatchingByRID.value = true
  } else if (e == "审核") {
    checkOnly.value = true
  }
}
const filteredList = computed(() => {
  const menuFilter = events.value.filter(event => {
    if (checkOnly.value === true) {
      // for admin to validate commits
      return event.status == "committed"
    } else if (eventsMatchingByRID.value === true) {
      return isCurrentMember(event, memberId.value) && event.status != "closed"
    } else {
      return event.status == "open"
    }
  })
  return menuFilter.filter(event => {
    // TODO new API for searching events
    return event.problem.indexOf(searchQuery.value) >= 0
  })
})

const showDetail = (e: number) => {
  eventStore.eventId = e
}

setEvents()
</script>

<style></style>
