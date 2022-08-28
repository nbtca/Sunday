import type { Event } from "@/models/event"

const isCurrentMember = (event: Event, memberId: string) => {
  if (event.member == undefined) {
    return false
  }
  return event.member.memberId == memberId
}


export {
  isCurrentMember
}