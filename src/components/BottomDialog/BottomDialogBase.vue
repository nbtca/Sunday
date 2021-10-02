<template>
  <TransitionRoot :show="open">
    <div class="absolute inset-x-0 bottom-0 left-0 z-50 fixed">
      <TransitionChild
        class="h-screen relative"
        enter="duration-200 ease-out "
        enter-from="opacity-0"
        enter-to="opacity-100 "
        leave="duration-100 ease-in "
        leave-from="opacity-50"
        leave-to="opacity-0"
      >
        <div class="h-screen absolute inset-0 top-5 bg-black/50"></div>
      </TransitionChild>

      <TransitionChild
        class="flex flex-col h-auto w-full min-h-36 px-2 justify-between materialThick"
        :class="[rounded ? 'rounded-t-2xl' : '']"
        enter="transition ease-out  duration-150 transform"
        enter-from="opacity-0 translate-y-96 "
        enter-to="opacity-100 translate-y-0 "
        leave="transition ease-in duration-200 transform"
        leave-from="opacity-100 translate-y-0 "
        leave-to="opacity-0 translate-y-96"
      >
        <div class="flex flex-col">
          <div class="flex py-2.5 px-2 justify-between items-center">
            <div class="font-semibold text-base">{{ subject }}</div>
            <button
              :class="[closeAction ? 'text-gray-500/80' : '']"
              class="text-positive focus:outline-none h-6 font-medium rounded-lg"
              @click="cancel"
            >
              取消
            </button>
          </div>
          <bottom-dialog-info v-if="content != []" :content="content"></bottom-dialog-info>

          <slot name="body"> </slot>
          <div v-if="confirmMessage" class="mt-6 mb-1 flex flex-col items-center">
            <div class="font-semibold">
              输入 <span class="font-bold px-1">{{ confirmMessage }}</span> 来确认
            </div>
            <input-base class="w-[80vw] pt-2" v-model:content="confirmInput" :warn="warning" center></input-base>
          </div>
        </div>
        <div class="flex flex-col min-h-28 py-4 px-2 items-center">
          {{ message }}
          <slot name="actionSpace">
            <div v-if="closeAction == false" class="" :class="[showDecline ? 'flex justify-around w-[80vw]' : '']">
              <button v-if="showDecline" @click="emitValue('decline')" class="btnsm declineBtn text-warning">
                {{ declineActionName }}
              </button>
              <button
                @click="emitValue('accept')"
                class="btnsm"
                :class="[showDecline ? 'declineBtn text-primary' : 'rounded-x-full btnPositive', btnClass]"
              >
                {{ acceptActionName }}
              </button>
            </div>
          </slot>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";
import BottomDialogInfo from "@/components/BottomDialog/BottomDialogInfo.vue";
import InputBase from "../Input/InputBase.vue";
export default {
  name: "BottomDialog",
  components: { TransitionRoot, TransitionChild, Dialog, DialogOverlay, BottomDialogInfo, InputBase },
  props: {
    passData: {
      type: Object,
      default: {},
    },
    btnClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      open: false, // 显示
      closeAction: false, // 点击 取消/确认/拒绝
      value: "",
      subject: "Subject", // header 主题
      acceptActionName: "",
      declineActionName: "",
      showDecline: false, // 显示拒绝按钮
      rounded: false, // 上部圆角
      message: "", // 操作feedback
      content: [], // info列表内容
      confirmMessage: "", // 输入来确认
      confirmInput: {},
      warning: "",
    };
  },
  //         emitValue(accept)->closeAction=true\\
  //   openModal-------watch"closeAction"------->e.action->res notice->wait 50000->resolve
  methods: {
    openModal(e) {
      this.open = true;
      this.rounded = e.rounded;
      this.subject = e.subject;
      this.acceptActionName = e.acceptActionName || "确认";
      this.declineActionName = e.declineActionName || "拒绝";
      this.showDecline = e.declineAction;
      this.content = e.content;
      this.confirmMessage = e.confirmMessage;
      // return new Promise((resolve, reject) => {
      //   let performAction = action => {
      //     this.message = "processing";
      //     action(this.passData).then(res => {
      //       console.log(res);//TODO rescode 判断 success
      //       this.message = "success";
      //       setTimeout(() => {
      //         resolve(this.value);
      //         this.cleanUp();
      //       }, 1000);
      //     });
      //   };
      //   this.$watch("closeAction", () => {
      //     if (this.value === "accept") {
      //       if (e.acceptAction) {
      //         console.log(this.passData);
      //         performAction(e.acceptAction());
      //       } else {
      //         resolve(this.value);
      //         this.cleanUp();
      //       }
      //     } else if (this.value === "decline") {
      //       performAction(e.declineAction());
      //     } else {
      //       reject();
      //       this.cleanUp();
      //     }
      //   });
      // });
    },
    cancel() {
      this.open = false;
      this.cleanUp;
    },
    cleanUp() {
      this.closeAction = false;
      this.message = "";
      this.open = false;
      this.value = "";
      this.subject = "";
      this.rounded = false;
      this.showDecline = false;
    },
    emitValue(e) {
      if (e != "accept" || this.confirmInput.value == this.confirmMessage || !this.confirmMessage) {
        this.closeAction = true;
        this.value = e;
        this.warning = "";
      } else {
        this.warning = " ";
      }
    },
  },
};
</script>

<style>
.declineBtn {
  @apply materialThin bg-gray-50/70 border border-gray-100 rounded-2xl h-11 w-3/7 shadow hover:shadow-lg text-base font-bold;
}
</style>
