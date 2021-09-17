<template>
  <TransitionRoot
    :show="open"
    class="flex flex-col h-auto w-full min-h-36 px-2 inset-x-0 bottom-0 left-0 z-50 absolute justify-between materialThick"
    :class="[rounded ? 'rounded-t-2xl' : '']"
    enter="transition ease-in-out  duration-150 transform"
    enter-from="opacity-0 translate-y-96 "
    enter-to="opacity-100 translate-y-0 "
    leave="transition ease-out duration-200 transform"
    leave-from="opacity-100 translate-y-0 "
    leave-to="opacity-0 translate-y-96"
  >
    <div class="flex flex-col">
      <div class="flex h-11 p-3 justify-between items-center">
        <div class="font-semibold text-base">{{ subject }}</div>
        <button :class="[closeAction ? 'text-gray-500/80' : '']" class="text-positive focus:outline-none h-6 w-12 rounded-lg" @click="emitValue('close')">
          取消
        </button>
      </div>
      <bottom-dialog-info v-if="content != []" :content="content"></bottom-dialog-info>
      <div v-if="confirmMessage" class="mt-6 mb-1 flex flex-col items-center">
        <div class="font-semibold">
          输入 <span class="font-bold px-1">{{ confirmMessage }}</span> 来确认
        </div>
        <input-base class="w-[80vw] pt-2" v-model:content="confirmInput" :warn="warning" center></input-base>
      </div>
      <slot name="body"> </slot>
    </div>
    <div class="flex flex-col h-28 pt-4 items-center">
      {{ message }}
      <button v-if="closeAction == false" @click="emitValue('accept')" class="bg-positive btnsm rounded-x-full text-positiveContent">
        {{ actionName }}
      </button>
    </div>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";
import BottomDialogInfo from "@/components/Dialog/BottomDialogInfo.vue";
import InputBase from "../Input/InputBase.vue";
export default {
  name: "BottomDialog",
  components: { TransitionRoot, TransitionChild, Dialog, DialogOverlay, BottomDialogInfo, InputBase },
  props: {
    parms: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      rounded: false,
      open: false,
      closeAction: false,
      value: "",
      subject: "Subject",
      actionName: "确认",
      message: "",
      confirmMessage: "",
      confirmInput: {},
      warning: "",
      content: [],
    };
  },
  //         emitValue(accept)->closeAction=true\\
  //   openModal-------watch"closeAction"------->e.action->res notice->wait 50000->resolve
  watch: {},
  methods: {
    openModal(e, action) {
      this.open = true;
      this.rounded = e.rounded;
      this.subject = e.subject;
      this.actionName = e.actionName;
      this.content = e.content;
      this.confirmMessage = e.confirmMessage;
      return new Promise((resolve, reject) => {
        this.$watch("closeAction", () => {
          if (this.value === "accept") {
            if (action != null) {
              this.message = "processing";
              let unpack = action();
              unpack(this.parms).then(res => {
                console.log(res);
                this.message = "success";
                setTimeout(() => {
                  resolve(this.value);
                  this.cleanUp();
                }, 1000);
              });
            } else {
              resolve(this.value);
              this.cleanUp();
            }
          } else {
            this.cleanUp();
            reject();
          }
        });
      });
    },
    cleanUp() {
      this.closeAction = false;
      this.message = "";
      this.open = false;
      this.value = "";
      this.subject = "";
      this.rounded = false;
      this.actionName = "确认";
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

<style></style>
