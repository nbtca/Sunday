import type Member from "@/models/member"
import { defineStore } from "pinia"
import { ref } from "vue"


export const useAccountStore = defineStore("account", () => {

  const account = ref<Member>({
    avatar: "",
  })
  const token = ref("")

  const setAccount = (a: Member) => {
    account.value = a
  }

  return {
    account,
    token,
    setAccount
  }
}, {
  persist: {
    storage: sessionStorage,
    pick: ['token', "account"],
  },
})
