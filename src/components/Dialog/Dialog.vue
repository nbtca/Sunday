<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal('outter')">
      <div class="inset-0 z-10 fixed overflow-y-auto">
        <div class="min-h-screen text-center px-4 flex items-center justify-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out "
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in "
            leave-from="opacity-20"
            leave-to="opacity-0"
          >
            <DialogOverlay :class="['fixed inset-0', focus ? 'bg-black opacity-20' : '']" />
          </TransitionChild>

          <span class="h-screen inline-block align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="div"
            class=""
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <!-- <div
              class="
                materialMedium
                border
                rounded-xl
                shadow-xl
                transform
                transition-all
                w-[70vw]
                inline-block
                align-middle
                overflow-hidden select-none
                sm:(
                min-w-xs
                max-w-md
                w-auto
                )
                "
            >
              <slot name="entire">
                <div class="border-b p-4 sm:(border-b-0 p-8) ">
                  <DialogTitle as="h3" class="font-semibold text-base text-center sm:(text-xl leading-6) ">
                    {{ heading }}
                  </DialogTitle>
                  <slot name="body">
                    <div class="sm:mt-2">
                      <p class="text-center textDescription">
                        {{ content }}
                      </p>
                    </div>
                  </slot>
                </div>
                <slot name="action">
                  <div class="">
                    <div class="flex flex-row pb-6 hidden sm:block">
                      <button
                        class="font-medium mx-5 w-20 btn"
                        :class="[btn.bgcolor, 'text-' + btn.color + 'Content']"
                        v-for="btn in btnList"
                        :key="btn.title"
                        @click="emitValue(btn.value)"
                      >
k3                      </button>
                    </div>
                    <div class="flex text-primary text-warning sm:hidden" :class="[btnList.length > 2 ? 'flex-col' : 'flex-cel']">
                      <button
                        v-for="btn in constructColor"
                        :key="btn.title"
                        class="
                          font-medium
                          h-11
                          w-full
                          transition
                          ease-in-out
                          duration-300
                          select-none
                          hover:bg-gray-200
                          focus:(outline-none)
                        "
                        :class="btn.textcolor"
                        @click="emitValue(btn.value)"
                      >
                        {{ btn.title }}
                      </button>
                    </div>
                  </div>
                </slot>
              </slot>
            </div> -->

            <div class="flex items-center justify-center select-none">
              <div class="flex flex-col justify-between materialCard w-72 p-3 shadow-3xl">
                <div class="py-3 font-medium text-lg">
                  <div class="">{{ heading }}</div>
                  <p class="mt-3 w-full text-base overflow-ellipsis overflow-hidden">
                    {{ content }}
                  </p>
                  <dialog-info :content="[{ 123: 123 }, { 123: 123 }, { 123: 123 }, { 123: 123 }]"></dialog-info>
                </div>
                <div class="w-full bg-transparent border border-t border-gray-900/10 px-6"></div>
                <div class="pt-3">
                  <button class="materialButton bg-gray-400/20 text-gray-800 hover:(bg-gray-400/40)">确认</button>
                  <button class="mt-3 w-full h-10 materialThick bg-warning/90 text-warningContent rounded-lg font-bold">确认</button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from "@headlessui/vue";
import DialogInfo from "./DialogInfo.vue";

export default {
  name: "dialog",
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogInfo,
  },
  props: {
    // heading: {
    //   type: String,
    //   default: "Payment successful",
    // },
    // content: {
    //   type: String,
    //   default:
    //     "Your payment has been successfully submitted. We’ve sent your an email with all of the details of your order.",
    // },
    // btnList: {
    //   type: Array,
    //   default: () => [
    //     { title: "确认", value: "accept" },
    //     { title: "取消", value: "decline" },
    //   ],
    // },
    focus: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
    noDecline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btnList: [
        { title: "确认", value: "accept", color: "primary" },
        { title: "取消", value: "decline", color: "warning" },
      ],
      open: false,
      value: "",
      heading: "",
      content: "",
    };
  },
  computed: {
    constructColor() {
      let tempBtnList = this.btnList;
      for (let btn of tempBtnList) {
        btn.textcolor = "text-" + btn.color;
        btn.bgcolor = "bg-" + btn.color;
      }
      console.log(tempBtnList);
      return tempBtnList;
    },
  },
  created() {
    if (this.noDecline) {
      delete this.btnList.decline;
    }
  },
  methods: {
    async openModal(e) {
      this.open = true;
      this.heading = e.heading;
      this.content = e.content;
      this.value = "";
      return await new Promise((resolve, reject) => {
        this.$watch("open", () => {
          if (this.value === "accept") {
            resolve(this.value);
          } else {
            reject();
          }
        });
      });
    },
    closeModal(location) {
      if (!this.focus || location != "outter") {
        this.open = false;
      }
    },
    emitValue(e) {
      this.closeModal();
      this.value = e;
      // this.$emit(e);
    },
  },
};
</script>
<style>
.materialButton {
  @apply w-full h-10 materialThick rounded-lg font-bold transition duration-300 ease-in-out focus:(outline-none);
}
</style>
