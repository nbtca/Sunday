<template>
  <div class="relative h-[93vh] border">
    <img class="h-screen object-cover" src="https://sunday-res.oss-cn-hangzhou.aliyuncs.com/img/22405H211-0.jpg" alt="" />
    <div class="inset-x-0 top-0 absolute grid grid-cols-1 gap-3 p-2 overflow-auto h-full pt-10">
      <div class="card bg materialMedium h-40 ">
        <div>control</div>
        <div class="flex justify-center">
          <button class="btn bg-blue-200/70 mx-3" @click="changeRole('element')">element</button>
          <button class="btn bg-green-200/70 mx-3" @click="changeRole('admin')">admin</button>
          <button class="btn bg-green-200/70 mx-3" @click="callNotify('admin')">notify</button>
          <button class="btn bg-green-200/70 mx-3 w-auto" @click="callBottomDialog('admin')">dialog</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { Event } from "@/api/api"
export default {
  name: "Design",
  inject: ["BottomDialog", "Notify"],
  data() {
    return {
      isOpen: true,
      role: "",
    }
  },
  methods: {
    cancel() {
      this.isOpen = false
      console.log(this.isOpen)
    },
    changeRole(role) {
      localStorage.setItem("user_role", role)
      this.role = role
    },
    callNotify() {
      this.Notify("warning", "123123")
    },
    async callBottomDialog() {
      let config = {
        subject: "123",
        content: [{ 123: 123 }, { 123: 123 }, { 123: 123 }, { 123: 123 }],
        confirmMessage: "132",
        acceptAction: () => {
          return Event.get()
        },
      }
      this.BottomDialog(config).then(() => {
        console.log(4)
      })
    },
  },
}
</script>

<style>
.card {
  @apply min-h-30 rounded-lg shadow-lg;
}
</style>
