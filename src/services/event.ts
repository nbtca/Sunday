import Axios from "@/utils/axios"
import type { Event } from "@/models/event"

const EventService = {
  async getAll() {
    const res = await Axios("/events", null, "get")
    return res as Event[]
  },
  async accept(eventId: string) {
    // POST /member/events/{event_id}/accept
    const res = await Axios("/member/events/" + eventId + "/accept", null, "post")
    return res as Event
  },
  async drop(eventId: string) {
    // POST /member/events/{event_id}/accept
    const res = await Axios("/member/events/" + eventId + "/accept", null, "delete")
    return res as Event
  },
}

export default EventService
