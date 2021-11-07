<template>
  <div class="flex flex-col h-screen justify-between">
    <div>
      <div class="flex py-5 px-4 items-center justify-between sm:px-10">
        <div class="text-left">
          <h3 class="font-medium pt-4 text-4xl">事件详情</h3>
          <p class="ml-0.5 textDescription">{{ detail.gmt_create }}</p>
        </div>
        <div class="textSubHeading">{{ statusToText[detail.status + 1] }}</div>
      </div>
      <div class="">
        <dl>
          <div class="bg-gray-50 infoCell">
            <dt class="text-gray-500 infoHead">型号</dt>
            <dd class="infoContent">
              {{ detail.model }}
            </dd>
          </div>
          <div class="bg-white infoCell">
            <dt class="text-gray-500 infoHead">问题描述</dt>
            <dd class="infoContent">
              {{ detail.user_description }}
            </dd>
          </div>
          <div class="bg-gray-50 infoCell">
            <dt class="text-gray-500 infoHead">联系方式</dt>
            <dd class="flex infoContent justify-center">
              <table>
                <tr>
                  <td class="w-20">QQ</td>
                  <td>
                    {{ detail.eqq }}
                  </td>
                </tr>
                <tr>
                  <td>微信</td>
                  <td>
                    {{ detail.ephone }}
                  </td>
                </tr>
                <tr>
                  <td>偏好</td>
                  <td>
                    {{ contactPreference[detail.econtact_preference] }}
                  </td>
                </tr>
              </table>
            </dd>
          </div>
          <div class="bg-white infoCell">
            <dt class="text-gray-500 infoHead">维修历史</dt>
            <dd class="infoContent">
              <div v-for="item in detail.repair_description" :key="item.time">
                {{ item.description }}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="mb-20 w-full px-20">
      <div>
        <button v-if="detail.status == 0" class="bg-primary text-primaryContent w-20 btn" @click="acceptEvent(detail)">接受</button>
      </div>
      <div v-if="detail.rid == rid && detail.status == 1" class="flex flex-col">
        <textarea
          v-model="descriptionToSubmit"
          class="border h-28 shadow-inner mb-7 w-60 textInput self-center md:(w-72) lg:(w-80)"
          style="resize: none"
        ></textarea>
        <div>
          <button class="bg-warning text-warningContent mx-5 btn" @click="dropEvent(detail)">放弃</button>
          <button class="bg-primary text-primaryContent btn" @click="submitEvent(detail)">提交</button>
        </div>
      </div>
      <div v-if="detail.status == 2 && role == 'admin'" class="flex flex-nowrap justify-center">
        <button class="bg-warning text-warningContent mx-4 w-20 btn" @click="rejectEvent()">退回</button>
        <button class="bg-primary text-primaryContent mx-4 w-20 btn" @click="closeEvent()">通过</button>
      </div>
    </div>
    <Dialog ref="Dialog"> </Dialog>
  </div>
</template>
//TODO:display repair_description
<script setup>
import {  watch, ref, inject } from "vue";
import Dialog from "@/components/Dialog/Dialog.vue";
import { Event } from "@/api/api";
import { acceptEvent, submitEvent, alterSubmit, dropEvent, judgeSubmit } from "./EventActions";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();

const role = ref(sessionStorage.getItem("user_role"));
const rid = ref(sessionStorage.getItem("rid"));
const eid = ref(route.params.eid);
const statusToText = ref(["取消", "待接受", "已接受", "待确认", "关闭"]);
const contactPreference = ref(["QQ", "微信", "电话"]);
const descriptionToSubmit = ref("");
const detail = ref({});

const BottomDialog = inject("BottomDialog");

const setDetail = () => {
  eid.value = route.params.eid;
  Event.get(eid.value).then(res => {
    console.log(res);
    detail.value = res.data;
  });
};
setDetail();
watch(route, setDetail);


// const acceptEvent = event => {
//   console.log(123);
//   BottomDialog({
//     subject: "接受事件",
//     content: [{ 型号: event.model }, { 问题描述: event.user_description }, { 创建时间: event.gmt_create }],
//     acceptAction: () => {
//       return Event.accept({ eid: event.eid });
//     },
//   }).then(res => {
//     setEvents();
//     // filterHandler("我的");
//   });
// };
// const acceptEvent = () => {
//   this.$refs.Dialog.openModal({
//     heading: "确认接受事件",
//     content: "",
//   })
//     .then(async () => {
//       await Event.accept({ eid: this.eid });
//       this.setDetail();
//       this.$emit("update");
//     })
//     .catch(() => {});
// };
// const dropEvent = () => {
//   this.$refs.Dialog.openModal({
//     heading: "确认放弃事件",
//     content: "",
//   })
//     .then(async () => {
//       await Event.drop({ eid: this.eid });
//       this.setDetail();
//       this.$emit("update");
//     })
//     .catch(() => {});
// };
// const closeEvent = () => {
//   this.$refs.Dialog.openModal({
//     heading: "确认关闭事件",
//     content: "",
//   })
//     .then(async () => {
//       await Event.close({ eid: this.eid });
//       this.setDetail();
//       this.$emit("update");
//     })
//     .catch(() => {});
// };
// const rejectEvent = () => {
//   this.$refs.Dialog.openModal({
//     heading: "确认退回事件",
//     content: "",
//   })
//     .then(async () => {
//       await Event.reject({ eid: this.eid });
//       this.setDetail();
//       this.$emit("update");
//     })
//     .catch(() => {});
// };
// const submitEvent = () => {
//   this.$refs.Dialog.openModal({
//     heading: "确认提交事件",
//     content: "",
//   })
//     .then(async () => {
//       await Event.submit({
//         eid: this.eid,
//         description: this.descriptionToSubmit,
//       });
//       this.setDetail();
//       this.$emit("update");
//     })
//     .catch(() => {});
// };
</script>

<style></style>
