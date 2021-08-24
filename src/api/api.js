import axiosApi from "../axios/AxiosConfig";



export async function getEvents(eid) {
  if (eid) return await axiosApi("/events/" + eid, "get");
  else return await axiosApi("/events", "get");
}
export async function acceptEvents(eid) {
  return await axiosApi("/events/accept", eid , "post");
}

export async function login(account) {
  return await axiosApi("/login", account, "post");
}
