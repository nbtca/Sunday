import { computed, ref } from "vue"

import BottomDialog from "@/components/BottomDialog/index.js"
import EventService from "@/services/event"
import type { Event } from "@/models/event"
import type { BottomDialogConfig } from "@/components/BottomDialog/types"
import { useEventStore } from "@/stores/event"
import { useAccountStore } from "@/stores/account"
import { isCurrentMember } from "@/utils/event"
const events = ref(Array<Event>())
const detail = ref<Event>()
const eventStore = useEventStore()
const store = useAccountStore()

const setEvents = async () => {
  console.log("setting")
  events.value = await EventService.getAll({ order: "DESC" })
}
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

const getLastLog = (e: Event) => {
  if (e.logs == null) {
    return null
  } else {
    return e.logs[e.logs.length - 1]
  }
}

const checkOnly = ref(false)
const eventsMatchingByRID = ref(false)
const searchQuery = ref("")
interface FilterOption {
  name: string
  handler: () => void
  adminOnly?: boolean
}
const filterOptions: FilterOption[] = [
  {
    name: "待接受",
    handler: () => {
      setEvents()
      eventsMatchingByRID.value = false
    },
  },
  {
    name: "我的",
    handler: () => {
      eventsMatchingByRID.value = true
      setMemberEvents()
    },
  },
  {
    name: "审核",
    handler: () => {
      checkOnly.value = true
    },
    adminOnly: true,
  },
]
const roleFilter = computed(() => {
  return filterOptions.filter(item => !item.adminOnly || store.account.role == "admin")
})

const currentFilter = ref(filterOptions[0])

const filterHandler = (o: FilterOption) => {
  checkOnly.value = false
  eventsMatchingByRID.value = false
  o.handler()
  currentFilter.value = o
}
const filteredList = computed(() => {
  const menuFilter = events.value.filter(event => {
    if (checkOnly.value === true) {
      // for admin to validate commits
      return event.status == "committed"
    } else if (eventsMatchingByRID.value === true) {
      return isCurrentMember(event, store.account.memberId || "") && event.status != "closed"
    } else {
      return event.status == "open"
    }
  })
  return menuFilter.filter(event => {
    // TODO new API for searching events
    return event.problem.indexOf(searchQuery.value) >= 0
  })
})

const setMemberEvents = async () => {
  const res = await EventService.getAllMemberEvents()
  events.value = res
}

const eventBottomDialog = (config: BottomDialogConfig) => {
  // TODO condition
  BottomDialog(config).then(() => {
    currentFilter.value.handler()
    setDetail()
  })
}

const acceptEvent = (event: Event) => {
  if (event.eventId == undefined) {
    return
  }
  BottomDialog({
    subject: "接受事件",
    content: [
      {
        key: "型号",
        value: event.model || "无型号",
      },
      {
        key: "问题描述",
        value: event.problem as string,
      },
      {
        key: "创建时间",
        value: event.gmtCreate as string,
      },
    ],
    acceptAction: () => {
      return EventService.accept(event.eventId)
    },
  }).then(() => {
    setEvents()
    setDetail()
  })
}

const commitEvent = (event: Event) => {
  eventBottomDialog({
    subject: "提交维修",
    formList: [
      {
        subject: "维修描述",
        id: "description",
        required: true,
        type: "textarea",
      },
    ],
    rounded: true,
    content: [
      {
        key: "型号",
        value: event.model || "无型号",
      },
      {
        key: "问题描述",
        value: event.problem,
      },
      {
        key: "创建时间",
        value: event.gmtCreate,
      },
    ],
    acceptActionName: "提交",
    acceptAction: e => {
      return EventService.commit(event.eventId, e.description)
    },
  })
}

const alterCommit = (event: Event) => {
  EventService.getMemberEvent(event.eventId).then(res => {
    // TODO if last log action is not commit ?????????
    eventBottomDialog({
      subject: "修改提交",
      formList: [
        {
          subject: "维修描述",
          id: "description",
          required: true,
          type: "textarea",
          value: getLastLog(res)?.description,
        },
      ],
      rounded: true,
      content: [
        {
          key: "型号",
          value: event.model || "无型号",
        },
        {
          key: "问题描述",
          value: event.problem,
        },
        {
          key: "创建时间",
          value: event.gmtCreate,
        },
      ],
      acceptActionName: "提交",
      acceptAction: e => {
        return EventService.alterCommit(event.eventId, e.description)
      },
    })
  })
}

const dropEvent = (event: Event) => {
  eventBottomDialog({
    subject: "放弃事件",
    confirmMessage: "放弃",
    content: [
      {
        key: "型号",
        value: event.model || "无型号",
      },
      {
        key: "问题描述",
        value: event.problem,
      },
      {
        key: "创建时间",
        value: event.gmtCreate,
      },
    ],
    acceptAction: () => {
      return EventService.drop(event.eventId)
    },
  })
}

const judgeSubmit = async (event: Event) => {
  eventBottomDialog({
    subject: "审核提交",
    acceptActionName: "通过",
    declineActionName: "退回",
    rounded: true,
    content: [
      {
        key: "型号",
        value: event.model || "无型号",
      },
      {
        key: "问题描述",
        value: event.problem,
      },
      {
        key: "维修描述",
        value: getLastLog(event)?.description || "",
      },
      {
        key: "提交时间",
        value: event.gmtCreate,
      },
    ],
    acceptAction: () => {
      return EventService.close(event.eventId)
    },
    declineAction: () => {
      return EventService.rejectCommit(event.eventId)
    },
  })
}

export {
  setEvents,
  getLastLog,
  events,
  searchQuery,
  roleFilter,
  filterHandler,
  filteredList,
  eventsMatchingByRID,
  acceptEvent,
  commitEvent,
  alterCommit,
  dropEvent,
  judgeSubmit,
  setDetail,
  detail,
}
