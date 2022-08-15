<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal('outer')">
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
            <DialogOverlay :class="['fixed inset-0', focus ? 'bg-black/20' : '']" />
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
            <div class="flex items-center justify-center select-none">
              <div class="flex flex-col justify-between materialCard w-72 p-3 shadow-3xl">
                <div class="py-3 font-medium text-lg">
                  <div class="">{{ heading }}</div>
                  <p class="mt-3 w-full text-base overflow-ellipsis overflow-hidden">
                    {{ content }}
                  </p>
                </div>
                <div class="w-full bg-transparent border border-t border-gray-900/10 px-6"></div>
                <div class="grid gap-y-3 pt-3">
                  <button class="materialButton" :class="btn.class" v-for="btn in btnList" :key="btn.title" @click="emitValue(btn.value)">
                    {{ btn.title }}
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue"
export default {
  name: "dialog",
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
  },
  props: {
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
        { title: "确认", value: "accept", class: "btnPrimary" },
        { title: "取消", value: "decline", class: "btnWarningReverse" },
      ],
      open: false,
      value: "",
      heading: "",
      content: "",
    }
  },
  created() {
    if (this.noDecline) {
      delete this.btnList.decline
    }
  },
  methods: {
    async openModal(e) {
      this.open = true
      this.heading = e.heading
      this.content = e.content
      this.value = ""
      return await new Promise((resolve, reject) => {
        this.$watch("open", () => {
          if (this.value === "accept") {
            resolve(this.value)
          } else {
            reject()
          }
        })
      })
    },
    closeModal(location) {
      if (!this.focus || location != "outer") {
        this.open = false
      }
    },
    emitValue(e) {
      this.closeModal()
      this.value = e
      // this.$emit(e);
    },
  },
}
</script>
<style>
.materialButton {
  @apply w-full h-10 rounded-lg font-bold transition duration-300 ease-in-out focus:(outline-none);
}
</style>
