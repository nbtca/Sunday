<template>
  <div class="relative h-[93vh] border">
    <img class="h-screen object-cover" src="https://sunday-res.oss-cn-hangzhou.aliyuncs.com/img/22405H211-0.jpg" alt="" />
    <div class="inset-x-0 top-0 absolute grid grid-cols-1 gap-3 p-2 overflow-auto h-full pt-10">
      <!-- <div class="card materialThick">thick</div>
      <div class="card materialMedium">md</div> -->
      <div class="card bg-base-self">
        none
        <div class="col-span-2 grid grid-cols-3 sm:grid-cols-6 gap-6 p-2 justify-items-center">
          <button class="btn btnPrimary">primary</button>
          <button class="btn btnWarning">warning</button>
          <button class="btn btnNeutral">neutral</button>
          <button class="btn btnPrimaryReverse">primaryR</button>
          <button class="btn btnWarningReverse">WarningR</button>
          <button class="btn btnNeutralReverse">neutralR</button>
          <button class="btnsm btnPrimary">确认</button>
          <button class="btnsm btnWarning">确认</button>
          <button class="btnsm btnNeutral">确认</button>
          <button class="btnsm btnPrimaryReverse">confirm</button>
          <button class="btnsm btnWarningReverse">confirm</button>
          <button class="btnsm btnNeutralReverse">confirm</button>
          <button class="btnxs btnPrimary">确认</button>
          <button class="btnxs btnWarning">删除</button>
          <button class="btnxs btnNeutral ">确认</button>
          <button class="btnxs btnPrimaryReverse">确认</button>
          <button class="btnxs btnWarningReverse">确认</button>
          <button class="btnxs btnNeutralReverse">确认</button>
        </div>
      </div>
      <div class="card bg materialMedium flex flex-col">
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
import { Event } from "@/api/api";
export default {
  name: "Design",
  inject: ["BottomDialog", "Notify"],
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
      this.Notify("warning", "123123");
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
  @apply min-h-30 rounded-lg shadow-lg;
}
</style>
