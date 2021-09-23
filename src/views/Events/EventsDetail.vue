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
        <button v-if="detail.status == 0" class="bg-primary text-primaryContent w-20 btn" @click="acceptEvent">接受</button>
      </div>
      <div v-if="detail.rid == rid && detail.status == 1" class="flex flex-col">
        <textarea
          v-model="descriptionToSubmit"
          class="border h-28 shadow-inner mb-7 w-60 textInput self-center md:(w-72) lg:(w-80)"
          style="resize: none"
        ></textarea>
        <div>
          <button class="bg-warning mx-5 btn" @click="dropEvent">放弃</button>
          <button class="bg-primary text-primaryContent btn" @click="submitEvnet">提交</button>
        </div>
      </div>
      <div v-if="detail.status == 2 && role == 'admin'" class="flex flex-nowrap justify-center">
        <button class="bg-warning mx-4 w-20 btn" @click="rejectEvent()">退回</button>
        <button class="bg-primary mx-4 text-primaryContent w-20 btn" @click="closeEvent()">通过</button>
      </div>
    </div>
    <Dialog ref="Dialog"> </Dialog>
  </div>
</template>
//TODO:display repair_description
<script>
import Dialog from "@/components/Dialog/Dialog.vue";
import { Event } from "@/api/api";
export default {
  name: "EventsDetail",
  components: {
    Dialog,
  },
  data() {
    return {
      role: "",
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
      this.setDetail();
    },
  },
  created() {},
  mounted() {
    this.role = sessionStorage.getItem("user_role");
    this.rid = sessionStorage.getItem("rid");
    this.eid = this.$route.params.eid;
    this.setDetail();
  },
  methods: {
    setDetail() {
      Event.get(this.eid).then(res => {
        console.log(res);
        this.detail = res.data;
      });
    },
    acceptEvent() {
      this.$refs.Dialog.openModal({
        heading: "确认接受事件",
        content: "",
      })
        .then(async () => {
          await Event.accept({ eid: this.eid });
          this.setDetail();
          this.$emit("update");
        })
        .catch(() => {});
    },
    dropEvent() {
      this.$refs.Dialog.openModal({
        heading: "确认放弃事件",
        content: "",
      })
        .then(async () => {
          await Event.drop({ eid: this.eid });
          this.setDetail();
          this.$emit("update");
        })
        .catch(() => {});
    },
    closeEvent() {
      this.$refs.Dialog.openModal({
        heading: "确认关闭事件",
        content: "",
      })
        .then(async () => {
          await Event.close({ eid: this.eid });
          this.setDetail();
          this.$emit("update");
        })
        .catch(() => {});
    },
    rejectEvent() {
      this.$refs.Dialog.openModal({
        heading: "确认退回事件",
        content: "",
      })
        .then(async () => {
          await Event.reject({  eid: this.eid });
          this.setDetail();
          this.$emit("update");
        })
        .catch(() => {});
    },
    submitEvnet() {
      this.$refs.Dialog.openModal({
        heading: "确认提交事件",
        content: "",
      })
        .then(async () => {
          await Event.submit({
            eid: this.eid,
            description: this.descriptionToSubmit,
          });
          this.setDetail();
          this.$emit("update");
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
