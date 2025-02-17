<template>
  <div class="flex h-full">
    <div class="flex flex-col h-full w-full items-center sm:(w-[24vw] min-w-[270px] border-r border-gray-400/30)">
      <div
        class="bg-gray-50 border-base-standout/70 flex flex-col w-full pt-2 pb-1 px-1 items-center border-b"
      >
        <input
          type="text"
          class="border-base-standout rounded-lg h-10 shadow-inner my-1 mx-0.5 text-center sm:(rounded text-left) "
          style="width: 98%"
          v-model="searchQuery"
          placeholder="搜索"
        />
        <TabGroup class="w-full" :defaultIndex="0">
          <TabList class="flex space-x-1 p-1">
            <Tab v-for="item in roleFilter" as="template" :key="item.name" v-slot="{ selected }">
              <button
                @click="filterHandler(item)"
                class="rounded-lg font-semibold w-full py-2.5 text-indigo-600 leading-5 focus:(outline-none border-base-standout )"
                :class="[selected ? 'bg-white shadow cursor-default' : 'text-gray-400 hover:bg-gray-50/[0.12] hover:text-blue-400']"
              >
                {{ item.name }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <div class="flex-grow overflow-auto w-full p-2 sm:hidden">
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
                v-if="item.status == 'committed' && store.account.role == 'admin'"
                @click="judgeSubmit(item)"
                class="btnxs btnWarningReverse"
              >
                审核
              </button>
              <div class="uppercase" v-if="item.status == 'cancelled' || item.status == 'closed'">
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
              <span class="text-xs mr-2 textDescription">#{{ item.eventId }}</span>
              <span class="text-xs textDescription">{{ dayjs(item.gmtCreate).format("YY/MM/DD HH:mm") }}</span>
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
      </div>
      <scroll-area @scroll="onScroll" class="hidden sm:block">
        <button
          v-for="item in filteredList"
          :key="item.eventId"
          class="flex flex-row flex-nowrap cell justify-between"
          :class="[item.eventId == eventStore.eventId ? 'bg-gray-400/30 cursor-default shadow' : '']"
          @click="showDetail(item)"
        >
          <div class="text-left w-2/3 truncate">
            {{ item.problem }}
          </div>
          <div class="" v-if="item.status != undefined">
            <event-status-icon :status="item.status"></event-status-icon>
          </div>
        </button>
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
import { ref } from "vue"
import { setEvents, acceptEvent, commitEvent, alterCommit, dropEvent, judgeSubmit } from "./EventActions"
import { TabGroup, TabList, Tab } from "@headlessui/vue"
import ScrollArea from "@/components/ScrollArea/ScrollArea.vue"
import EventCard from "../../components/EventCard/EventCard.vue"
import EventsDetail from "./EventsDetail.vue"
import { isCurrentMember } from "@/utils/event"
import { useAccountStore } from "@/stores/account"
import { useEventStore } from "@/stores/event"
import type { Event } from "@/models/event"
import { searchQuery, roleFilter, filterHandler, filteredList, eventsMatchingByRID } from "./EventActions"
import EventStatusIcon from "@/components/Event/EventStatusIcon.vue"
import { useLogto } from "@logto/vue"
import dayjs from "dayjs"

const store = useAccountStore()
const eventStore = useEventStore()
const memberId = ref(store.account.memberId || "")

const Logto = useLogto()
const reachBottomDistance = 100
let isReachingBottom = false


Logto.fetchUserInfo().then(res => {
  console.log(res)
})

const onScroll = e => {
  let offsetHeight = Math.ceil(e.target.getBoundingClientRect().height)
  let currentHeight = e.target.scrollTop + offsetHeight + reachBottomDistance
  if (currentHeight >= e.target.scrollHeight && !isReachingBottom) {
    isReachingBottom = true
  }
  if (currentHeight < e.target.scrollHeight) {
    isReachingBottom = false
  }
}

const showDetail = (e: Event) => {
  eventStore.eventId = e.eventId
  if (e.member == null) {
    eventStore.mine = false
    return
  }
  eventStore.mine = e.member.memberId == (store.account.memberId || "")
}

setEvents()
</script>

<style></style>
