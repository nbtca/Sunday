<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

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
                w-full
                max-w-md
                p-6
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-xl
              "
            >
              <slot name="body">
                <DialogTitle
                  as="h3"
                  class="
                    text-lg text-center
                    font-medium
                    leading-6
                    text-gray-900
                  "
                >
                  {{ heading }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="textDescription text-center">
                    {{ content }}
                  </p>
                </div>
              </slot>
              <div class="mt-4 flex justify-around mx-20">
                <button
                  v-for="btn in btnList"
                  :key="btn.title"
                  class="
                    btn
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    bg-blue-100
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-blue-500
                  "
                  @click="emitValue(btn.value)"
                >
                  {{ btn.title }}
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";

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
    heading: {
      type: String,
      default: "Payment successful",
    },
    content: {
      type: String,
      default:
        "Your payment has been successfully submitted. We’ve sent your an email with all of the details of your order.",
    },
    // btnList: {
    //   type: Array,
    //   default: () => [
    //     { title: "确认", value: "accept" },
    //     { title: "取消", value: "decline" },
    //   ],
    // },
    noDecline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btnList: {
        decline: { title: "取消", value: "decline" },
        accept: { title: "确认", value: "accept" },
      },
      open: false,
      value: "",
    };
  },
  created() {
    if (this.noDecline) {
      delete this.btnList.decline;
    }
  },
  methods: {
    async openModal() {
      this.open = true;
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
    closeModal() {
      this.open = false;
    },
    emitValue(e) {
      this.closeModal();
      this.value = e;
      // this.$emit(e);
    },
  },
};
</script>
