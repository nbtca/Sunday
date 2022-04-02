import axiosApi from "../axios/AxiosConfig"
const Event = {
  async get(eid) {
    if (eid) return await axiosApi("/events/" + eid, "get")
    else return await axiosApi("/events", "get")
  },
  async accept(eid) {
    return await axiosApi("/events/accept", eid, "post")
  },
  async drop(eid) {
    return await axiosApi("/events/drop", eid, "post")
  },
  async close(action) {
    return await axiosApi("/events/close", action, "post")
  },
  async reject(action) {
    return await axiosApi("/events/reject", action, "post")
  },
  async submit(e) {
    return await axiosApi("/events/submit", e, "post")
  },
  async alterSubmit(e) {
    return await axiosApi("/events/alterSubmit", e, "post")
  },
}
const Element = {
  async login(account){
    return await axiosApi("/elements/login", account, "post")
  },
  async get(rid) {
    if (rid) return await axiosApi("/elements/" + rid, "get")
    else return await axiosApi("/elements", "get")
  },
  async create(element) {
    return await axiosApi("/elements", element, "post")
  },
  async update(element) {
    return await axiosApi("/elements", element, "put")
  },
  async activate(element) {
    return await axiosApi("/elements/activate", element, "post")
  },
  async updateAvatar(e) {
    return await axiosApi("/elements/updateAvatar", e, "post")
  },
}

export { Event, Element }
