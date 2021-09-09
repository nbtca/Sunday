<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal('outter')">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
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

          <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                sm:(
                min-w-xs
                max-w-md
                w-auto
                )
                w-[70vw]
                align-middle
                transition-all
                transform
                border border-gray-100
                bg-white
                shadow-xl
                rounded-xl
                overflow-hidden
                select-none
              "
            >
              <slot name="entire">
                <div class="p-4 border-b sm:(border-b-0 p-8)">
                  <DialogTitle as="h3" class="text-base sm:(text-xl leading-6) text-center font-semibold">
                    {{ heading }}
                  </DialogTitle>
                  <slot name="body">
                    <div class="sm:mt-2">
                      <p class="textDescription text-center">
                        {{ content }}
                      </p>
                    </div>
                  </slot>
                </div>
                <div class="">
                  <!-- <div class="hidden sm:block flex flex-row pb-6">
                    <button
                      class=" btn font-medium mx-5 w-20"
                      :class="['bg-' + btn.color, 'text-' + btn.color + 'Content']"
                      v-for="btn in btnList"
                      :key="btn.title"
                      @click="emitValue(btn.value)"
                    >
                      {{ btn.title }}
                    </button>
                  </div> -->
                  <div class="sm:hidden divide-y">
                    <button
                      v-for="btn in constructColor"
                      :key="btn.title"
                      class="h-11 w-full select-none font-medium hover:bg-gray-200 focus:(outline-none) transition duration-300 ease-in-out"
                      :class="btn.textcolor"
                      @click="emitValue(btn.value)"
                    >
                      {{ btn.title }}
                    </button>
                  </div>
                </div>
              </slot>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from "@headlessui/vue";

export default {
  name: "dialog",
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
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
    noDecline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btnList: [
        { title: "确认", value: "accept", color: "positive" },
        { title: "取消", value: "decline", color: "warning" },
      ],
      open: false,
      value: "",
      heading: "Payment successful",
      content: "Your payment has been successfully submitted. We’ve sent your an email with all of the details of your order.",
    };
  },
  computed: {
    constructColor() {
      let tempBtnList = this.btnList;
      for (let btn of tempBtnList) {
        btn.textcolor = "text-" + btn.color;
        btn.bgcolor = "bg-" + btn.color;
      }
      console.log(tempBtnList)
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
