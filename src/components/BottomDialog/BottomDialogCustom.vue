<script lang="ts"></script>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { TransitionRoot, TransitionChild } from "@headlessui/vue"
import { isFormValid } from "@/utils/isFormValid"
import BottomDialogInfo from "@/components/BottomDialog/BottomDialogInfo.vue"
import InputBase from "../Input/InputBase.vue"
import InputToConfirm from "../Input/InputToConfirm.vue"
import type { Content, FormItem } from "./types"

interface Props {
  parentNode: Element
  subject: string
  description?: String
  content?: Array<Content>
  formList?: Array<FormItem>
  confirmMessage?: string // 输入来确认
  acceptActionName?: string
  acceptAction: Function
  declineActionName?: string
  declineAction?: Function
  btnClass?: string
  rounded?: boolean
}

const props = defineProps<Props>()

const getFormInput = ref(new Object())

const open = ref(false)

onMounted(() => {
  open.value = true
})

const message = ref("")
const isConfirmInputValid = ref(false)

const performAction = (action: any) => {
  const formInput = isFormValid(getFormInput.value)
  console.log(getFormInput.value)
  console.log(formInput)
  // confirm input is valid when confirmMessage is required and form input is valid
  if ((isConfirmInputValid.value == true || props.confirmMessage != "") && (formInput != false || props.formList == null)) {
    message.value = "处理中..."
    action(formInput).then((res: any) => {
      if (res.resultCode == 0) {
        message.value = "成功!"
      } else {
        message.value = res.resultMsg
      }
      setTimeout(() => {
        destroySelf("done")
      }, 1000)
    })
  } else {
    console.log("unable")
    //TODO focus on input
  }
}

const destroySelf = (e: any) => {
  open.value = false
  const closeEvent = new CustomEvent("close", { detail: { event: e } })
  props.parentNode.dispatchEvent(closeEvent)
}
</script>
<template>
  <TransitionRoot :show="open">
    <div class="absolute inset-x-0 bottom-0 left-0 z-50 fixed">
      <TransitionChild
        class="absolute relative bg-gray-900/20 sm:(bg-gray-300/10 backdrop-filter backdrop-blur-lg )"
        style="height: 100vh"
        enter="duration-200 ease-out"
        enter-from="opacity-0 "
        enter-to="opacity-100 "
        leave="duration-100 ease-in "
        leave-from="opacity-50"
        leave-to="opacity-0"
      >
        <div class="fixed absolute inset-0 top-0" style="height: 100vh"></div>
      </TransitionChild>

      <!-- mobile -->
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
              v-if="confirmMessage && confirmMessage != ''"
              v-model:content="isConfirmInputValid"
              :confirmMessage="confirmMessage"
              class="mt-2"
            ></input-to-confirm>
            <div v-if="formList" class="px-2 py-2 w-full">
              <div v-for="item in formList" :key="item.id">
                <input-base
                  class="mt-2 text-center"
                  :subject="item.subject"
                  :required="item.required"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :max-length="item.maxLength"
                  :hint="item.hint"
                  :rules="item.rules"
                  :pass-value="item.value"
                  v-model:content="getFormInput[item.id]"
                ></input-base>
              </div>
            </div>
          </div>
          <div class="flex flex-col min-h-28 py-4 px-2 items-center">
            {{ message }}
            <div v-if="message == ''" class="" :class="[declineAction ? 'flex justify-around w-[90vw]' : '']">
              <button v-if="declineAction" @click="performAction(declineAction)" class="materialBtn mx-2 btnWarningReverse">
                {{ declineActionName || "取消" }}
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
                {{ acceptActionName || "确认" }}
              </button>
            </div>
          </div>
        </form>
      </TransitionChild>

      <!-- desktop  -->
      <TransitionChild
        class="absolute inset-0 hidden sm:block"
        enter="transition-opacity  duration-100 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100 "
        leave="transition-opacity duration-100 ease-in"
        leave-from="opacity-50 "
        leave-to="opacity-0"
      >
        <div class="flex items-center justify-center h-full select-none">
          <div class="flex flex-col justify-between materialCard w-80 p-3 shadow-3xl text-lg">
            <div class="text-center font-medium text-xl mt-3">{{ subject }}</div>
            <form class="mt-3">
              <p class="w-full text-base overflow-ellipsis overflow-hidden">
                {{ description }}
              </p>
              <div class="flex flex-col items-center">
                <bottom-dialog-info v-if="content != []" :content="content"></bottom-dialog-info>
                <input-to-confirm
                  v-if="confirmMessage"
                  v-model:content="isConfirmInputValid"
                  :confirmMessage="confirmMessage"
                  class="mt-2"
                ></input-to-confirm>
                <div v-if="formList" class="w-full">
                  <div v-for="item in formList" :key="item.id">
                    <input-base
                      class=""
                      :subject="item.subject"
                      :required="item.required"
                      :type="item.type"
                      :placeholder="item.placeholder"
                      :maxLength="item.maxLength"
                      :hint="item.hint"
                      :rules="item.rules"
                      :value="item.value"
                      v-model:content="getFormInput[item.id]"
                    ></input-base>
                  </div>
                </div>
              </div>
              <div class="w-full bg-transparent border border-t border-gray-900/10 px-6"></div>
              <div class="grid gap-y-3 pt-3">
                <button @click="performAction(acceptAction)" class="materialBtn btnPositiveReverse">
                  {{ acceptActionName || "确认" }}
                </button>
                <!-- <button class="materialBtn btnPositiveReverse">123</button> -->
              </div>
              <div
                @click="destroySelf('cancel')"
                class="materialBtn materialBtn flex items-center justify-center text-lg cursor-pointer btnWarningReverse mt-5"
              >
                取消
              </div>
            </form>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>
<style></style>
