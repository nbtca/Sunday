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
        class="flex flex-col h-auto w-full min-h-36 px-2 shadow-lg justify-between materialThick"
        :class="[rounded ? 'rounded-t-2xl' : '']"
        enter="transition ease-out  duration-150 transform"
        enter-from="opacity-0 translate-y-96 "
        enter-to="opacity-100 translate-y-0 "
        leave="transition ease-in duration-200 transform"
        leave-from="opacity-100 translate-y-0 "
        leave-to="opacity-0 translate-y-96"
      >
        <div class="flex flex-col">
          <div class="flex h-11 px-2 justify-between items-center">
            <div class="font-semibold text-base">{{ subject }}</div>
            <button
              :class="[closeAction ? 'text-gray-500/80' : '']"
              class="text-positive focus:outline-none h-6 font-medium rounded-lg"
              @click="close"
            >
              取消
            </button>
          </div>
          <bottom-dialog-info v-if="content != []" :content="content"></bottom-dialog-info>

          <slot name="body"> </slot>
          <!-- <div v-if="confirmMessage" class="mt-6 mb-1 flex flex-col items-center">
            <div class="font-semibold">
              输入 <span class="font-bold px-1">{{ confirmMessage }}</span> 来确认
            </div>
            <input-base class="w-[80vw] pt-2" v-model:content="confirmInput" :warn="warning" center></input-base>
          </div> -->
          <input-to-confirm v-if="confirmMessage" v-model:content="isConfirmInputValid" :confirmMessage="confirmMessage"></input-to-confirm>
        </div>
        <div class="flex flex-col h-28 pt-4 items-center">
          {{ message }}
          <slot name="actionSpace">
            <div v-if="closeAction == false" class="" :class="[declineAction ? 'flex justify-around w-[80vw]' : '']">
              <button v-if="declineAction" @click="performAction(declineAction)" class="btnsm declineBtn text-warning">
                {{ declineActionName }}
              </button>
              <button
                @click="performAction(acceptAction)"
                class="btnsm"
                :class="[declineAction ? 'declineBtn text-primary' : 'bg-positive text-positiveContent rounded-x-full', btnClass]"
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
import { h, render } from "vue";

import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";
import BottomDialogInfo from "@/components/BottomDialog/BottomDialogInfo.vue";
import InputBase from "../Input/InputBase.vue";
import InputToConfirm from "../Input/InputToConfirm.vue";
export default {
  name: "BottomDialog",
  components: { TransitionRoot, TransitionChild, Dialog, DialogOverlay, BottomDialogInfo, InputBase, InputToConfirm },
  props: {
    // passData: {
    //   type: Object,
    //   default: {},
    // },
    subject: {
      type: String,
      default: "主题",
    },
    acceptActionName: {
      type: String,
      default: "确认",
    },
    declineActionName: {
      type: String,
      default: "取消",
    },
    btnClass: "",
    acceptAction: Function,
    declineAction: Function,
    rounded: false, // 上部圆角
    content: Array, // info列表内容
    confirmMessage: "", // 输入来确认
    parentNode: Object,
  },
  data() {
    return {
      message: "", // 操作feedback
      open: false, // 显示
      closeAction: false, // 点击 取消/确认/拒绝
      // value: "",
      isConfirmInputValid: false,
      warning: "",
    };
  },
  mounted() {
    this.open = true;
  },
  methods: {
    close() {
      this.destroySelf();
    },
    performAction(action) {
      if (this.isConfirmInputValid == true || !this.confirmMessage) {
        this.closeAction = true;
        this.message = "processing";
        action().then(res => {
          if (res.resultCode == 0) {
            this.message = "success";
          } else {
            this.message = res.resultMsg;
          }
          setTimeout(() => {
            this.destroySelf();
          }, 1000);
        });
      } else {
        //TODO focus on input
      }
    },
    destroySelf() {
      this.open = false;
      let closeEvent = new CustomEvent("close", { detail: { e_name: " this is a test " } });
      this.parentNode.dispatchEvent(closeEvent);
    },
    // openModal(e) {
    //   this.open = true;
    //   this.rounded = e.rounded;
    //   this.subject = e.subject;
    //   this.acceptActionName = e.acceptActionName || "确认";
    //   this.declineActionName = e.declineActionName || "拒绝";
    //   this.showDecline = e.declineAction;
    //   this.content = e.content;
    //   this.confirmMessage = e.confirmMessage;
    //   return new Promise((resolve, reject) => {
    //     let performAction = action => {
    //       this.message = "processing";
    //       action(this.passData).then(res => {
    //         console.log(res);
    //         this.message = "success";
    //         setTimeout(() => {
    //           resolve(this.value);
    //           this.cleanUp();
    //         }, 1000);
    //       });
    //     };
    //     this.$watch("closeAction", () => {
    //       if (this.value === "accept") {
    //         if (e.acceptAction) {
    //           console.log(this.passData);
    //           performAction(e.acceptAction());
    //         } else {
    //           resolve(this.value);
    //           this.cleanUp();
    //         }
    //       } else if (this.value === "decline") {
    //         performAction(e.declineAction());
    //       } else {
    //         reject();
    //         this.cleanUp();
    //       }
    //     });
    //   });
    // },
    // emitValue(e) {
    //   if (e != "accept" || this.confirmInput.value == this.confirmMessage || !this.confirmMessage) {
    //     this.closeAction = true;
    //     this.value = e;
    //     this.warning = "";
    //   } else {
    //     this.warning = " ";
    //   }
    // },
    // cleanUp() {
    //   this.closeAction = false;
    //   this.message = "";
    //   this.open = false;
    //   this.value = "";
    //   this.subject = "";
    //   this.rounded = false;
    //   this.showDecline = false;
    // },
  },
};
</script>

<style>
.declineBtn {
  @apply materialThin bg-gray-50/70 border border-gray-100 rounded-2xl h-11 w-3/7 shadow hover:shadow-lg text-base font-bold;
}
</style>
