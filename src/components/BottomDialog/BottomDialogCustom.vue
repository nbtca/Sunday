<script setup>
import { onMounted, ref } from "vue";
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import { isFormValid } from "@/Utils/isFormValid.js";
import BottomDialogInfo from "@/components/BottomDialog/BottomDialogInfo.vue";
import InputBase from "../Input/InputBase.vue";
import InputToConfirm from "../Input/InputToConfirm.vue";
const props = defineProps({
  parentNode: Object,
  subject: {
    type: String,
    default: "主题",
  },
  description: String,
  content: Array, // info列表内容
  formList: { type: Array, default: [] },
  confirmMessage: "", // 输入来确认
  acceptActionName: {
    type: String,
    default: "确认",
  },
  acceptAction: Function,
  declineActionName: {
    type: String,
    default: "取消",
  },
  declineAction: Function,
  btnClass: "",
  rounded: false, // 上部圆角
});

const open = ref(false);
onMounted(() => {
  open.value = true;
});

const getFormInput = ref({});
const message = ref("");
const isConfirmInputValid = ref(false);
const performAction = action => {
  let formInput = isFormValid(getFormInput.value);
  if ((isConfirmInputValid.value !== false || !props.confirmMessage) && (formInput != false || props.formList == null)) {
    message.value = "processing";
    action(formInput).then(res => {
      if (res.resultCode == 0) {
        message.value = "success";
      } else {
        message.value = res.resultMsg;
      }
      setTimeout(() => {
        destroySelf("done");
      }, 1000);
    });
  } else {
    //TODO focus on input
  }
};

const destroySelf = e => {
  open.value = false;
  let closeEvent = new CustomEvent("close", { detail: { event: e } });
  props.parentNode.dispatchEvent(closeEvent);
};
</script>
<template>
  <TransitionRoot :show="open">
    <div class="absolute inset-x-0 bottom-0 left-0 z-50 fixed">
      <TransitionChild
        class="absolute relative"
        style="height: 100vh"
        enter="duration-200 ease-out "
        enter-from="opacity-0"
        enter-to="opacity-100 "
        leave="duration-100 ease-in "
        leave-from="opacity-50"
        leave-to="opacity-0"
      >
        <div class="fixed absolute inset-0 top-0 bg-gray-900/20" style="height: 100vh"></div>
      </TransitionChild>

      <TransitionChild
        class="absolute inset-x-0 bottom-0 flex flex-col h-auto w-full min-h-36 px-2 shadow-lg justify-between materialThick sm:hidden"
        :class="[rounded ? 'rounded-t-2xl' : '']"
        enter="transition ease-out  duration-150 transform"
        enter-from="opacity-0 translate-y-96 "
        enter-to="opacity-100 translate-y-0 "
        leave="transition ease-in duration-200 transform"
        leave-from="opacity-100 translate-y-0 "
        leave-to="opacity-0 translate-y-96"
      >
        <div class="flex h-11 px-2 justify-between items-center">
          <div class="font-semibold text-base">{{ subject }}</div>
          <button
            :class="[message == '' ? 'text-gray-500/80' : '']"
            class="text-positive focus:outline-none h-6 font-medium rounded-lg"
            @click="destroySelf('cancel')"
          >
            取消
          </button>
        </div>
        <form action="">
          <div class="flex flex-col items-center">
            <bottom-dialog-info v-if="content != []" :content="content"></bottom-dialog-info>
            <input-to-confirm
              v-if="confirmMessage"
              v-model:content="isConfirmInputValid"
              :confirmMessage="confirmMessage"
              class="mt-2"
            ></input-to-confirm>
            <div v-if="formList" class="px-2 py-2 w-full">
              <div v-for="item in formList" key="item.id">
                <input-base
                  class="mt-2"
                  :subject="item.subject"
                  :required="item.required"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :hint="item.hint"
                  :rules="item.rules"
                  :val="item.val"
                  v-model:content="getFormInput[item.id]"
                ></input-base>
              </div>
            </div>
          </div>
          <div class="flex flex-col min-h-28 py-4 px-2 items-center">
            {{ message }}
            <div v-if="message == ''" class="" :class="[declineAction ? 'flex justify-around w-[80vw]' : '']">
              <button v-if="declineAction" @click="performAction(declineAction)" class="materialBtn mx-2 btnWarningReverse">
                {{ declineActionName }}
              </button>
              <button
                @click="performAction(acceptAction)"
                class=""
                :class="[
                  declineAction ? 'materialBtn btnPrimaryReverse mx-2' : 'btnsm btnPositive rounded-x-full',
                  confirmMessage ? 'rounded-x-lg btnWarning' : '',
                  btnClass,
                ]"
              >
                {{ acceptActionName }}
              </button>
            </div>
          </div>
        </form>
      </TransitionChild>

      <TransitionChild
        class="hidden sm:block"
        enter="transition-opacity  duration-500 ease-out"
        enter-from="opacity-0"
        enter-to="materialCard"
        leave="transition-opacity duration-200 ease-in"
        leave-from="opacity-100 "
        leave-to="opacity-0"
      >
        <div class="flex items-center justify-center h-full select-none">
          <div class="flex flex-col justify-between materialCard w-72 p-3 shadow-3xl">
            <div class="py-3 font-medium text-lg">
              <div class="text-center">{{ subject }}</div>
              <p class="mt-3 w-full text-base overflow-ellipsis overflow-hidden">
                {{ description }}
              </p>
              <bottom-dialog-info :content="content"></bottom-dialog-info>
            </div>
            <div class="w-full bg-transparent border border-t border-gray-900/10 px-6"></div>
            <div class="grid gap-y-3 pt-3">
              <button @click="performAction(acceptAction)" class="materialBtn btnPositiveReverse">{{ acceptActionName }}</button>
              <!-- <button class="materialBtn btnPositiveReverse">123</button> -->
            </div>
            <button @click="destroySelf()" class="materialBtn btnWarningReverse mt-5">取消</button>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>
<style></style>
