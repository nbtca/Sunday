import Axios from "@/utils/axios"
const Event = {
  async get(eid) {
    if (eid) return await Axios("/events/" + eid, "get")
    else return await Axios("/events", "get")
  },
  async accept(eid) {
    return await Axios("/events/accept", eid, "post")
  },
  async drop(eid) {
    return await Axios("/events/drop", eid, "post")
  },
  async close(action) {
    return await Axios("/events/close", action, "post")
  },
  async reject(action) {
    return await Axios("/events/reject", action, "post")
  },
  async submit(e) {
    return await Axios("/events/submit", e, "post")
  },
  async alterSubmit(e) {
    return await Axios("/events/alterSubmit", e, "post")
  },
}
const Element = {
  async login(account) {
    return await Axios("/elements/login", account, "post")
  },
  async get(rid) {
    if (rid) return await Axios("/elements/" + rid, "get")
    else return await Axios("/elements", "get")
  },
  async create(element) {
    return await Axios("/elements", element, "post")
  },
  async update(element) {
    return await Axios("/elements", element, "put")
  },
  async activate(element) {
    return await Axios("/elements/activate", element, "post")
  },
  async updateAvatar(e) {
    return await Axios("/elements/updateAvatar", e, "post")
  },
}

export { Event, Element }
