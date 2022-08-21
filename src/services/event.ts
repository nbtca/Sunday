import Axios from "@/utils/axios"
import type { Event } from "@/models/event"

const EventService = {
  async getAll() {
    const res = await Axios("/events", null, "get")
    return res as Event[]
  },
  async getMemberEvent(eventId: string) {
    const res = await Axios("/member/events/" + eventId, null, "get")
    return res as Event
  },
  async accept(eventId: string) {
    const res = await Axios("/member/events/" + eventId + "/accept", null, "post")
    return res as Event
  },
  async drop(eventId: string) {
    const res = await Axios("/member/events/" + eventId + "/accept", null, "delete")
    return res as Event
  },
  async commit(eventId: string, content: string) {
    const res = await Axios(
      "/member/events/" + eventId + "/commit",
      {
        content: content,
      },
      "post"
    )
    return res as Event
  },
  async alterCommit(eventId: string, content: string) {
    const res = await Axios(
      "/member/events/" + eventId + "/commit",
      {
        content: content,
      },
      "patch"
    )
    return res as Event
  },
  async close(eventId: string) {
    const res = await Axios("/events/" + eventId + "/close", null, "post")
    return res as Event
  },
  async rejectCommit(eventId: string) {
    const res = await Axios("/events/" + eventId + "/commit", null, "delete")
    return res as Event
  },
}

export default EventService
