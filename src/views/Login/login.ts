import type Member from "@/models/member"
import router from "@/router"
import { createTokenViaLogtoToken } from "@/services/logto"
import { useAccountStore } from "@/stores/account"

export const handleCreateToken = async (token: string) => {
  const store = useAccountStore()
  const res = await createTokenViaLogtoToken(token)
  const body: unknown = await res.json()
  if (res.status == 422 && body instanceof Object && "message" in body && body.message.includes("not found")) {
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
    // setTimeout(() => {
    //   signOut(import.meta.env.VITE_LOGTO_REDIRECT_URL)
    // }, 2000)
  }
}
