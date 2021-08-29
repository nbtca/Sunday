import axiosApi from "../axios/AxiosConfig";

const Event = {
  async get(eid) {
    if (eid) return await axiosApi("/events/" + eid, "get");
    else return await axiosApi("/events", "get");
  },
  async accept(eid) {
    return await axiosApi("/events/accept", eid, "post");
  },
  async drop(eid) {
    return await axiosApi("/events/drop", eid, "post");
  },
  async close(action) {
    return await axiosApi("/events/close", action, "post");
  },
  async submit(e) {
    return await axiosApi("/events/submit", e, "post");
  },
};
const Element = {
  async get(rid) {
    if (rid) return await axiosApi("/elements/" + eid, "get");
    else return await axiosApi("/elements", "get");
  },
  async create(element) {
    return await axiosApi("/elements", element, "post");
  },
};
// export async function getEvents(eid) {
//   if (eid) return await axiosApi("/events/" + eid, "get");
//   else return await axiosApi("/events", "get");
// }
// export async function acceptEvents(eid) {
//   return await axiosApi("/events/accept", eid, "post");
// }
const Account = {
  async login(account) {
    return await axiosApi("/login", account, "post");
  },
};
// ((this.eventsMatchingByID && events.rid === this.rid) ||
// !this.eventsMatchingByID) &&
// (!this.checkOnly ||
// (this.checkOnly &&
//   events.status == 2 &&
//   events.rid !== this.rid)) &&
export { Event, Element, Account };
