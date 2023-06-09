import type Member from "@/models/member"
import { defineStore } from "pinia"

export const useAccountStore = defineStore("account", {
  state() {
    return {
      account: {
        avatar: "",
      } as Member,
      token: "",
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["token", "account"],
      },
    ],
  },
  actions: {
    setAccount(account: Member) {
      this.account = account
    },
  },
})
