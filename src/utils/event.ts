import type { Event } from "@/models/event"

const isCurrentMember = (event: Event, memberId: string) => {
  if (event == undefined) {
    return false
  } else {
    if (event.member == undefined) {
      return false
    }
    return event.member.memberId == memberId
  }
}

const statusCovert = (status: string) => {
  switch (status) {
    case "open":
      return "待处理"
    case "cancelled":
      return "取消"
    case "accepted":
      return "受理"
    case "COMMITTED":
      return "待审核"
    case "CLOSED":
      return "已关闭"
    default:
      return "未知状态"
  }
}

export { isCurrentMember, statusCovert }
