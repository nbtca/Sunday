<template>
  <div class="relative h-[93vh] border">
    <img class="h-screen object-cover" src="https://sunday-res.oss-cn-hangzhou.aliyuncs.com/img/22405H211-0.jpg" alt="" />
    <div class="inset-x-0 top-0 absolute grid grid-cols-1 gap-3 p-2 overflow-auto h-full pt-10">
      <div class="card materialThick">thick</div>
      <div class="card materialMedium">md</div>
      <div class="card bg-base-self">
        none
        <div class="col-span-2 grid grid-cols-5 gap-2 p-2 justify-items-center">
          <button class="btn bg-primary text-primaryContent">确认</button>
          <button class="btn bg-warning text-warningContent">warning</button>
          <button class="btn bg-neutral text-gray-700">nutural</button>
          <button class="btn bg-base-standout text-primary">primary</button>
          <button class="btn bg-base-standout text-green-600">warning</button>
          <button class="btnsm bg-primary text-primaryContent">确认</button>
          <button class="btnsm bg-gray-300">confirm</button>
          <button class="btnxs rounded-full bg-primary text-primaryContent">确认</button>
          <button class="btnxs bg-warning text-warningContent font-bold">删除</button>
          <button class="btnxs bg-base-standout text-blue-800 text-sm font-bold">确认</button>
        </div>
      </div>
      <div class="card bg materialMedium felx flex-col">
        <div>control</div>
        <div class="">
          <button class="btn bg-blue-200/70 mx-3" @click="changeRole('element')">element</button>
          <button class="btn bg-green-200/70 mx-3" @click="changeRole('admin')">admin</button>
          <button class="btn bg-green-200/70 mx-3" @click="callNotify('admin')">callNotify</button>
          <button class="btn bg-green-200/70 mx-3 w-auto" @click="callBottomDialog('admin')">callBottomDialog</button>
        </div>
      </div>
      <div class="card materialThin">thin</div>
    </div>
    <!-- <bottom-dialog ref="BottomDialog"></bottom-dialog> -->
    <!-- <div class="bottom-0 left-0 absolute flex items-center justify-center select-none pointer-events-none">
      <div class="flex flex-col justify-between materialCard w-72 p-3 shadow-3xl font-medium text-lg">
        <div class="py-3">
          <div class="">Subject</div>
          <p class="mt-3 w-full text-base overflow-ellipsis overflow-hidden">生成，是个使用频率很高的词汇，具有、形成、养育等意思。</p>
        </div>
        <div class="w-full bg-transparent border border-t border-gray-500/20 px-6"></div>
        <div class="pt-3">
          <button class="w-full h-10 materialThick bg-gray-400/20 text-gray-800 rounded-lg font-bold">确认</button>
          <button class="mt-3 w-full h-10 materialThick bg-warning/90 text-warningContent rounded-lg font-bold">取消</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import notify from "@/components/Notify/Notify.js";
import { Event } from "@/api/api";
export default {
  name: "Design",
  inject: ["BottomDialog"],
  data() {
    return {
      isOpen: true,
      role: "",
    };
  },
  methods: {
    cancel() {
      this.isOpen = false;
      console.log(this.isOpen);
    },
    // open() {
    //   this.$refs.BottomDialog.openModal({ subject: "subject" })
    //     .then()
    //     .catch(() => {});
    // },
    changeRole(role) {
      sessionStorage.setItem("user_role", role);
      this.role = role;
    },
    callNotify() {
      notify("warning", "123123");
    },
    async callBottomDialog() {
      let config = {
        subject: "123",
        content: [{ 123: 123 }, { 123: 123 }, { 123: 123 }, { 123: 123 }],
        confirmMessage: "132",
        acceptAction: () => {
          return Event.get();
        },
      };
      this.BottomDialog(config).then(() => {
        console.log(4);
      });
    },
  },
};
</script>

<style>
.card {
  @apply h-30 rounded-lg shadow-lg;
}
</style>
