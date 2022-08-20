import { defineStore } from "pinia"
import { ref } from "vue"

export const useCounterStore = defineStore("account", () => {
  const alias = ref("")
  const avatar = ref("")

  persist: {
    enable: true
  }
  return {
    alias,
    avatar,
  }
})
