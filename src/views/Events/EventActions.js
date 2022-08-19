import { ref } from "vue"

import BottomDialog from "@/components/BottomDialog/index.js"
import { Event } from "@/api/api"
const events = ref([])
const setEvents = () => {
  Event.get().then(res => (events.value = res.data))
}

const eventBottomDialog = config => {
  // TODO condition
  BottomDialog(config).then(() => setEvents())
}

const acceptEvent = event => {
  BottomDialog({
    subject: "接受事件",
    content: [
      {
        key: "型号",
        value: event.model
      },
      {
        key: "问题描述",
        value: event.user_description
      },
      {
        key: "创建时间",
        value: event.gmt_create
      }
    ],
    acceptAction: () => {
      return Event.accept({ eid: event.eid })
    },
  }).then(() => {
    setEvents()
    // filterHandler("我的");
  })
}
const submitEvent = event => {
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
        value: event.model
      },
      {
        key: "问题描述",
        value: event.user_description
      },
      {
        key: "创建时间",
        value: event.gmt_create
      }
    ],
    acceptActionName: "提交",
    acceptAction: e => {
      return Event.submit({ eid: event.eid, description: e.description })
    },
  })
}
const alterSubmit = event => {
  Event.get(event.eid).then(res => {
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
          value: event.model
        },
        {
          key: "问题描述",
          value: event.user_description
        },
        {
          key: "创建时间",
          value: event.gmt_create
        }
      ],
      acceptActionName: "提交",
      acceptAction: e => {
        return Event.alterSubmit({ eid: event.eid, description: e.description })
      },
    })
  })
}
const dropEvent = event => {
  eventBottomDialog({
    subject: "放弃事件",
    confirmMessage: "放弃",
    content: [
      {
        key: "型号",
        value: event.model
      },
      {
        key: "问题描述",
        value: event.user_description
      },
      {
        key: "创建时间",
        value: event.gmt_create
      }
    ],
    acceptAction: () => {
      return Event.drop({ eid: event.eid })
    },
  })
}
const getPerviousDescription = async eid => {
  const res = await Event.get(eid)
  const repairDescription = res.data.repair_description
  const previousRepairDescription = repairDescription[repairDescription.length - 1]
  return previousRepairDescription
}
const judgeSubmit = async event => {
  const previousRepairDescription = await getPerviousDescription(event.eid)
  eventBottomDialog({
    subject: "审核提交",
    acceptActionName: "通过",
    declineActionName: "退回",
    rounded: true,
    content: [
      {
        key: "型号",
        value: event.model
      },
      {
        key: "问题描述",
        value: event.user_description
      },
      {
        key: "维修描述",
        value: event.gmt_create
      },
      {
        key: "提交时间",
        value: event.gmt_create
      }
    ],
    acceptAction: () => {
      return Event.close({ eid: event.eid })
    },
    declineAction: () => {
      return Event.reject({ eid: event.eid })
    },
  })
}

export { setEvents, events, getPerviousDescription, acceptEvent, submitEvent, alterSubmit, dropEvent, judgeSubmit }
