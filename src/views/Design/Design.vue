<template>
  <div class="">
    <div class="" @click="open">
      <img class="object-cover h-screen" src="https://sunday-res.oss-cn-hangzhou.aliyuncs.com/img/22405H211-0.jpg" alt="" />
    </div>

    <bottom-dialog ref="BottomDialog"></bottom-dialog>
  </div>
</template>

<script>
import BottomDialog from "@/components/Dialog/BottomDialog.vue";
export default {
  name: "Design",
  components: { BottomDialog },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    cancel() {
      this.isOpen = false;
      console.log(this.isOpen);
    },
    open() {
      this.$refs.BottomDialog.openModal({ subject: "subject" })
        .then()
        .catch(() => {});
    },
  },
};
</script>

<style></style>
