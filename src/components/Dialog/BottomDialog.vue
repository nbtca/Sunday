<template>
  <TransitionRoot
    :show="open"
    class="
      absolute
      inset-x-0
      bottom-0
      left-0
      z-50
      w-full
      min-h-36
      h-auto
      flex flex-col
      justify-between
      px-2
      bg-gray-200/90
      backdrop-filter backdrop-blur-lg
    "
    :class="[rounded ? 'rounded-t-2xl' : '']"
    enter="transition ease-in-out  duration-150 transform"
    enter-from="opacity-0 translate-y-96 "
    enter-to="opacity-100 translate-y-0 "
    leave="transition ease-out duration-200 transform"
    leave-from="opacity-100 translate-y-0 "
    leave-to="opacity-0 translate-y-96"
  >
    <div class="flex flex-col">
      <div class="h-11 p-3 flex justify-between items-center">
        <div class="font-semibold text-base">{{ subject }}</div>
        <button :class="[closeAction ? 'text-gray-500/80' : '']" class="text-positive focus:outline-none" @click="emitValue('close')">
          取消
        </button>
      </div>
      <slot name="body">
        <div class="flex flex-col">
          <div class="h-48">
            <!-- <input type="text" class="textInput h-8 bg-gray-500/30" /> -->
          </div>
        </div>
      </slot>
    </div>
    <div class="h-24 flex flex-col items-center">
      {{ message }}
      <button v-if="closeAction == false" @click="emitValue('accept')" class="btnsm rounded-x-full bg-positive text-positiveContent">
        {{ actionName }}
      </button>
    </div>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";
export default {
  name: "BottomDialog",
  components: { TransitionRoot, TransitionChild, Dialog, DialogOverlay },
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
    };
  },
  //         emitValue(accept)->closeAction=true\\
  //   openModal-------watch"closeAction"------->e.action->res notice->wait 50000->resolve

  methods: {
    openModal(e, action) {
      this.open = true;
      this.rounded = e.rounded;
      this.subject = e.subject;
      this.actionName = e.actionName;
      return new Promise((resolve, reject) => {
        this.$watch("closeAction", () => {
          if (this.value === "accept") {
            if (action != null) {
              this.message = "processing";
              console.log(this.description);
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
      //   this.closeModal();
      this.closeAction = true;
      this.value = e;
      console.log(this.closeAction);
      // this.$emit(e);
    },
  },
};
</script>

<style></style>
