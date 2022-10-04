import { defineStore } from "pinia"
import { ref } from "vue"

export const useEventStore = defineStore("event", () => {
  const eventId = ref<number>()
  const mine = ref<boolean>()
  return {
    eventId,
    mine,
  }
})
