import type Member from "@/models/member"
import { useLogto, type UserInfoResponse } from "@logto/vue"
import { defineStore } from "pinia"
import { onMounted, ref } from "vue"

export const useAccountStore = defineStore(
  "account",
  () => {
    const account = ref<Member>({})
    const token = ref("")

    const logto = useLogto()
    const userInfo = ref<UserInfoResponse>()
    const setUserInfo = async () => {
      userInfo.value = await logto.fetchUserInfo()
    }
    const setAccount = (a: Member) => {
      account.value = a
    }

    return {
      account,
      token,
      setAccount,
      logto,
      userInfo,
      setUserInfo,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["token", "account", "userInfo"],
    },
  }
)
