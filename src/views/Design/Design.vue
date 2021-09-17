<template>
  <div class="relative h-[93vh] border">
    <img class="h-screen object-cover" src="https://sunday-res.oss-cn-hangzhou.aliyuncs.com/img/22405H211-0.jpg" alt="" />
    <div class="inset-x-0 top-0 absolute grid grid-cols-1 gap-3 p-2 overflow-auto h-full pt-10">
      <div class="card bg-base-self">
        none
        <div class="col-span-1 grid grid-cols-5 gap-2 p-2 justify-items-center">
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
        </div>
      </div>
      <div class="card materialThick">thick</div>
      <div class="card materialMedium">md</div>
      <div class="card materialThin">thin</div>
    </div>
    <bottom-dialog ref="BottomDialog"></bottom-dialog>
  </div>
</template>

<script>
import BottomDialog from "@/components/Dialog/BottomDialog.vue";
export default {
  name: "Design",
  components: { BottomDialog },
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
    open() {
      this.$refs.BottomDialog.openModal({ subject: "subject" })
        .then()
        .catch(() => {});
    },
    changeRole(role) {
      sessionStorage.setItem("user_role", role);
      this.role = role;
    },
  },
};
</script>

<style>
.card {
  @apply h-30 rounded-lg shadow-lg;
}
</style>
