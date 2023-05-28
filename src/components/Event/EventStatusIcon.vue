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
  return icon
})
</script>
<template>
  <img :src="'/src/assets/images/' + iconName" alt="" />
</template>
