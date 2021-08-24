<template>
  <div class="flex flex-col justify-between h-full">
    <div class="">
      <div class="flex items-center justify-between px-4 py-5 sm:px-10">
        <div class="text-left">
          <h3 class="pt-4 text-3xl font-medium text-gray-900">事件详情</h3>
          <p class="ml-0.5 text-sm text-gray-500">Eid:{{ eid }}</p>
        </div>
        <div>{{ statusToText[detail.status + 1] }}</div>
      </div>
      <div class="border-gray-200">
        <dl>
          <div class="bg-gray-50 tableCell">
            <dt class="text-gray-500 tableHead">型号</dt>
            <dd class="tableContent">
              {{ detail.model }}
            </dd>
          </div>
          <div class="bg-white tableCell">
            <dt class="text-gray-500 tableHead">问题描述</dt>
            <dd class="tableContent">
              {{ detail.user_description }}
            </dd>
          </div>
          <div class="bg-gray-50 tableCell">
            <dt class="text-gray-500 tableHead">联系方式</dt>
            <dd class="tableContent flex justify-center">
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
          <div class="bg-white tableCell">
            <dt class="text-gray-500 tableHead">维修历史</dt>
            <dd class="tableContent">
              <div v-for="item in detail.repair_description" :key="item.time">
                {{ item.description }}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="self-end mb-20 px-20">
      <button
        v-if="detail.status == 0"
        class="btn bg-primary text-primaryContent"
        @click="acceptEvent"
      >
        接受
      </button>
      <!-- v-if="detail.rid == rid && detail.status == 1" -->
      <div class="flex flex-col items-end">
        <textarea
          v-model="descriptionToSubmit"
          class="border-2 shadow-inner h-28 w-80 mb-10"
          style="resize: none"
        ></textarea>
        <div>
          <button class="btn bg-warning mx-5" @click="dropEvent">放弃</button>
          <button
            class="btn bg-primary text-primaryContent"
            @click="submitEvnet"
          >
            提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
//TODO:display repair_description
<script>
import axiosApi from "../../axios/AxiosConfig";
import { getEvents, acceptEvents } from "../../api/api";
export default {
  name: "EventsDetail",
  data() {
    return {
      rid: "",
      eid: "",
      statusToText: ["取消", "待接受", "已接受", "待确认", "关闭"],
      contactPreference: ["QQ", "微信", "电话/短信"],
      descriptionToSubmit: "",
      detail: {},
    };
  },
  watch: {
    $route() {
      this.eid = this.$route.params.eid;
      this.getdetail();
    },
  },
  created() {
    this.rid = sessionStorage.getItem("rid");
    this.getdetail();
  },
  methods: {
    async getdetail() {
      await getEvents(this.eid).then((response) => {
        this.detail = response.data;
      });
      console.log(this.detail);
    },
    acceptEvent() {
      const that = this;
      acceptEvents({ eid: this.eid }).then((response) => {
        that.getdetail();
      });
    },
    dropEvent() {
      const that = this;
      axiosApi("/events/drop", { eid: this.eid }, "post").then((response) => {
        that.getdetail();
      });
    },
    submitEvnet() {
      const that = this;
      axiosApi(
        "/events/submit",
        { eid: this.eid, description: this.descriptionToSubmit },
        "post"
      ).then((response) => {
        that.getdetail();
        console.log(response);
      });
    },
  },
};
</script>

<style></style>
