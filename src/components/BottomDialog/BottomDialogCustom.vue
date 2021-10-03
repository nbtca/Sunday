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
            @click="destroySelf()"
          >
            取消
          </button>
        </div>
        <form action="">
          <div class="flex flex-col">
            <bottom-dialog-info v-if="content != []" :content="content"></bottom-dialog-info>
            <input-to-confirm
              v-if="confirmMessage"
              v-model:content="isConfirmInputValid"
              :confirmMessage="confirmMessage"
            ></input-to-confirm>
            <div v-if="nativeFormList" class="mx-4 pt-4">
              <div v-for="item in nativeFormList" key="item.id">
                <input-base
                  :subject="item.subject"
                  :required="item.required"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :hint="item.hint"
                  :rules="item.rules"
                  :val="item.val"
                  v-model:content="item.value"
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
                :class="[declineAction ? 'materialBtn btnPrimaryReverse mx-2' : 'btnsm btnPositive rounded-x-full', btnClass]"
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

        <div class="flex items-center justify-center h-full select-none">
          <div class="flex flex-col justify-between materialCard w-72 p-3 shadow-3xl">
            <div class="py-3 font-medium text-lg">
              <div class="text-center">{{ subject }}</div>
              <p class="mt-3 w-full text-base overflow-ellipsis overflow-hidden">
                {{ description }}
              </p>
              <dialog-info :content="content"></dialog-info>
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

<script>
import { onMounted } from "vue";

import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";
import BottomDialogInfo from "@/components/BottomDialog/BottomDialogInfo.vue";
import InputBase from "../Input/InputBase.vue";
import InputToConfirm from "../Input/InputToConfirm.vue";
import { ref, computed, toRefs } from "vue";
export default {
  name: "BottomDialog",
  components: { TransitionRoot, TransitionChild, Dialog, DialogOverlay, BottomDialogInfo, InputBase, InputToConfirm },
  props: {
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
    formList: Array,
    confirmMessage: "", // 输入来确认
    parentNode: Object,
  },
  setup(props) {
    const open = ref(false);
    onMounted(() => {
      open.value = true;
    });

    const nativeFormList = ref(props.formList);
    const getFormInput = computed(() => {
      let temp = {};
      for (let item of nativeFormList.value) {
        temp[item.id] = item.value;
      }
      return temp;
    });
    const isFormInputValid = e => {
      let ans = {};
      for (let item of Object.keys(e)) {
        if (e[item].isValid == false) {
          ans = false;
          break;
        } else {
          ans[item] = e[item].value;
        }
      }
      return ans;
    };

    const message = ref("");
    const isConfirmInputValid = ref(false);
    const performAction = action => {
      let formInput = isFormInputValid(getFormInput.value);
      if ((isConfirmInputValid.value.isValid == true || !props.confirmMessage) && (formInput != false || props.formList == null)) {
        message.value = "processing";
        action(formInput).then(res => {
          if (res.resultCode == 0) {
            message.value = "success";
          } else {
            message.value = res.resultMsg;
          }
          setTimeout(() => {
            destroySelf();
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

    return {
      open,
      message,
      nativeFormList,
      isConfirmInputValid,
      performAction,
      destroySelf,
    };
  },
};
</script>

<style></style>
