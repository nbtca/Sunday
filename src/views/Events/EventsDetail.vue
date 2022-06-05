<template>
  <div class="flex flex-col justify-between h-screen ">
    <div class="px-3 pt-1 md:(px-6 pt-4)">
      <div class="flex pb-1 md:(py-5 px-6) lg:px-0 items-center justify-between">
        <div class="text-left">
          <h3 class="font-medium pt-4 text-2xl md:(pt-4 text-4xl)">
            <div class="hidden md:flex">事件详情</div>
            <div class="md:hidden">{{ statusToText[detail.status + 1] }}</div>
          </h3>
          <p class="ml-0.5 textDescription">{{ detail.gmt_create }}</p>
        </div>
        <div class="hidden md:flex textSubHeading">{{ statusToText[detail.status + 1] }}</div>
      </div>
      <div class=" border rounded-lg overflow-hidden">
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
        <div class="bg-white infoCell hidden md:grid">
          <dt class="text-gray-500 infoHead">维修历史</dt>
          <dd class="infoContent">
            <div v-for="item in detail.repair_description" :key="item.time">
              {{ item.description }}
            </div>
          </dd>
        </div>
      </div>
    </div>

    <div class="w-full pb-16">
      <div>
        <button v-if="detail.status == 0" class="bg-primary text-primaryContent w-20 btn" @click="acceptEvent(detail)">接受</button>
      </div>
      <div v-if="detail.rid == rid && detail.status == 1" class="flex flex-col">
        <div>
          <button class="bg-warning text-warningContent mx-5 btn" @click="dropEvent(detail)">放弃</button>
          <button class="bg-primary text-primaryContent btn" @click="submitEvent(detail)">提交</button>
        </div>
      </div>
      <div v-if="detail.status == 2 && role == 'admin'" class="flex flex-nowrap justify-center">
        <button class="bg-warning text-warningContent mx-4 w-20 btn" @click="rejectEvent(detail)">退回</button>
        <button class="bg-primary text-primaryContent mx-4 w-20 btn" @click="closeEvent(detail)">通过</button>
      </div>
    </div>
  </div>
</template>
//TODO:display repair_description
<script setup>
import { watch, ref, inject } from "vue"
import { useRoute } from "vue-router"
import { Event } from "@/api/api"
import { acceptEvent, submitEvent, dropEvent, getPerviousDescription } from "./EventActions"

const route = useRoute()

const role = ref(localStorage.getItem("user_role"))
const rid = ref(localStorage.getItem("rid"))
const eid = ref(route.params.eid)
const statusToText = ref(["取消", "待接受", "已接受", "待审核", "关闭"])
const contactPreference = ref(["QQ", "微信", "电话"])

const detail = ref({})
const setDetail = () => {
  eid.value = route.params.eid
  Event.get(eid.value).then(res => {
    detail.value = res.data
  })
}
setDetail()
watch(route, setDetail)

const BottomDialog = inject("BottomDialog")
// not working yet
const rejectEvent = async event => {
  let previousRepairDescription = await getPerviousDescription(eid.value)
  BottomDialog({
    subject: "审核提交",
    acceptActionName: "退回",
    rounded: true,
    content: [
      { 型号: event.model },
      { 问题描述: event.user_description },
      { 创建时间: event.gmt_create },
      { 维修描述: previousRepairDescription.description },
      { 提交时间: previousRepairDescription.time },
    ],
    acceptAction: () => {
      return Event.reject({ eid: event.eid })
    },
  })
}
const closeEvent = async event => {
  let previousRepairDescription = await getPerviousDescription(eid.value)
  BottomDialog({
    subject: "审核提交",
    acceptActionName: "通过",
    rounded: true,
    content: [
      { 型号: event.model },
      { 问题描述: event.user_description },
      { 创建时间: event.gmt_create },
      { 维修描述: previousRepairDescription.description },
      { 提交时间: previousRepairDescription.time },
    ],
    acceptAction: () => {
      return Event.close({ eid: event.eid })
    },
  })
}
</script>

<style></style>
