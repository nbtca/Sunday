import type Member from "@/models/member"
import router from "@/router"
import { createTokenViaLogtoToken } from "@/services/logto"
import { useAccountStore } from "@/stores/account"

export const handleCreateToken = async (token: string) => {
  const store = useAccountStore()
  const res = await createTokenViaLogtoToken(token)
  const body: {
    title: string
    detail: string
  } = await res.json()
  if (res.status == 422 && body.detail.includes("not found")) {
    throw new Error("need bind member")
  }
  if (body instanceof Object && "token" in body && "memberId" in body && "role" in body) {
    store.account = body as Member
    store.token = body.token as string
    if (body.role instanceof Array && body.role.includes("inactive")) {
      router.push("/activate")
      router.push("/activate")
    } else {
      router.push("/Events")
    }
  } else {
    router.push("/")
  }
}
