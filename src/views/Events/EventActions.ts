import { ref } from "vue"

import BottomDialog from "@/components/BottomDialog/index.js"
import EventService from "@/services/event"
import type { Event } from "@/models/event"
import type { BottomDialogConfig } from "@/components/BottomDialog/types"
const events = ref(Array<Event>())
const setEvents = () => {
  EventService.getAll()
    .then(res => {
      events.value = res
    })
    .catch(err => {
      // TODO handle
      console.log(err)
    })
}

const eventBottomDialog = (config: BottomDialogConfig) => {
  // TODO condition
  BottomDialog(config).then(() => setEvents())
}

const acceptEvent = (event: Event) => {
  BottomDialog({
    subject: "接受事件",
    content: [
      {
        key: "型号",
        value: event.model,
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
      return EventService.accept(event.eventId)
    },
  }).then(() => {
    setEvents()
  })
}

const submitEvent = (event: Event) => {
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
        value: event.model,
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
      return Event.submit({ eventId: event.eventId, description: e.description })
    },
  })
}
const alterSubmit = (event:Event) => {
  Event.get(event.eventId).then(res => {
    const eventDetail = res.data.repair_description
    eventBottomDialog({
      subject: "修改提交",
      formList: [
        {
          subject: "维修描述",
          id: "description",
          required: true,
          type: "textarea",
          val: eventDetail[eventDetail.length - 1].description,
        },
      ],
      rounded: true,
      content: [
        {
          key: "型号",
          value: event.model,
        },
        {
          key: "问题描述",
          value: event.user_description,
        },
        {
          key: "创建时间",
          value: event.gmtCreate,
        },
      ],
      acceptActionName: "提交",
      acceptAction: e => {
        return Event.alterSubmit({ eventId: event.eventId, description: e.description })
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
        value: event.model,
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
      // return Event.drop({ eventId: event.eventId })
      return EventService.drop(event.eventId)
    },
  })
}
const getPerviousDescription = async (eventId: string) => {
  const res = await Event.get(eventId)
  const repairDescription = res.data.repair_description
  const previousRepairDescription = repairDescription[repairDescription.length - 1]
  return previousRepairDescription
}
const judgeSubmit = async (event: Event) => {
  const previousRepairDescription = await getPerviousDescription(event.eventId)
  eventBottomDialog({
    subject: "审核提交",
    acceptActionName: "通过",
    declineActionName: "退回",
    rounded: true,
    content: [
      {
        key: "型号",
        value: event.model,
      },
      {
        key: "问题描述",
        value: event.problem,
      },
      {
        key: "维修描述",
        value: event.gmtCreate,
      },
      {
        key: "提交时间",
        value: event.gmtCreate,
      },
    ],
    acceptAction: () => {
      return Event.close({ eventId: event.eventId })
    },
    declineAction: () => {
      return Event.reject({ eventId: event.eventId })
    },
  })
}

export { setEvents, events, getPerviousDescription, acceptEvent, submitEvent, alterSubmit, dropEvent, judgeSubmit }
