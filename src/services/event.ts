import Axios from "@/utils/axios"
import type { Event } from "@/models/event"

interface EventFilter {
  offset?: number
  limit?: number
  status?: string
  order?: "DESC" | "ASC"
}

const EventService = {
  async get(eventId: number) {
    const res = await Axios("/events/" + eventId, null, "get")
    return res as Event
  },
  async getAll(filter: EventFilter) {
    const res = await Axios(`/events`, filter, "get")
    return res as Event[]
  },
  async getMemberEvent(eventId: number) {
    const res = await Axios("/member/events/" + eventId, null, "get")
    return res as Event
  },
  async getAllMemberEvents(filter?:EventFilter) {
    const res = await Axios("/member/events", filter, "get")
    return res as Event[]
  },
  async accept(eventId: number) {
    const res = await Axios("/member/events/" + eventId + "/accept", null, "post")
    return res as Event
  },
  async drop(eventId: number) {
    const res = await Axios("/member/events/" + eventId + "/accept", null, "delete")
    return res as Event
  },
  async commit(eventId: number, content: string) {
    const res = await Axios(
      "/member/events/" + eventId + "/commit",
      {
        content: content,
      },
      "post"
    )
    return res as Event
  },
  async alterCommit(eventId: number, content: string) {
    const res = await Axios(
      "/member/events/" + eventId + "/commit",
      {
        content: content,
      },
      "patch"
    )
    return res as Event
  },
  async close(eventId: number) {
    const res = await Axios("/events/" + eventId + "/close", null, "post")
    return res as Event
  },
  async rejectCommit(eventId: number) {
    const res = await Axios("/events/" + eventId + "/commit", null, "delete")
    return res as Event
  },
}

export default EventService
