import Axios from "@/utils/axios"

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
