<script setup lang="ts">
import { Status } from "@/models/event"
import { computed } from "vue"

const props = defineProps<{
  status: Status
}>()

const iconName = computed(() => {
  let icon = ""
  if (props.status == Status.Open) icon = "status_initial.svg"
  else if (props.status == Status.Accepted || props.status == Status.Committed) icon = "status_ongoing.svg"
  else if (props.status == Status.Closed) icon = "status_complete.svg"
  else if (props.status == Status.Cancelled) icon = "status_cancelled.svg"
  return new URL(`../../assets/images/${icon}`, import.meta.url).href
})
</script>
<template>
  <img :src="iconName" alt="" />
</template>
