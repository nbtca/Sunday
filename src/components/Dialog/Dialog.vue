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
                min-w-xs
                max-w-md
                p-6
                align-middle
                transition-all
                transform
                border border-gray-100
                bg-white
                shadow-xl
                rounded-xl
              "
            >
              <slot name="entire">
                <DialogTitle as="h3" class="text-xl text-center font-semibold leading-6">
                  {{ heading }}
                </DialogTitle>
                <slot name="body">
                  <div class="mt-6">
                    <p class="textDescription text-center">
                      {{ content }}
                    </p>
                  </div>
                </slot>
                <div class="mt-4 flex justify-center ">
                  <button
                    class="btn text-sm w-20 mx-3 sm:mx-5"
                    v-for="btn in btnList"
                    :key="btn.title"
                    :class="['bg-' + btn.color, 'text-' + btn.color + 'Content']"
                    @click="emitValue(btn.value)"
                  >
                    {{ btn.title }}
                  </button>
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
      btnList: {
        decline: { title: "取消", value: "decline", color: "warning" },
        accept: { title: "确认", value: "accept", color: "primary" },
      },
      open: false,
      value: "",
      heading: "Payment successful",
      content: "Your payment has been successfully submitted. We’ve sent your an email with all of the details of your order.",
    };
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
