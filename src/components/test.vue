<template>
  <div class="flex flex-col w-40">
    <div>value: {{ open }}</div>
    <button @click="change">changeValue</button>
    <button @click="start">listen</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      flag: false,
      open: false,
    };
  },
  watch() {},
  methods: {
    async start() {
      console.log("start");
      this.open = true;
      await new Promise((resolve) => {
        const unwatch = this.$watch("open", (newVal) => {
          resolve(newVal);
        });
      }).then((res) => {
        console.log(res);
      });
      // await this.openModal;
    },
    change() {
      this.open = !this.open;
    },
    // async someAction() {
    //   this.$store.someStoreValue = "NEW VALUE";
    //   await new Promise((resolve) => {
    //     if (this.flag) {
    //       resolve();
    //     } else {
    //       const unwatch = this.$watch("open", (newVal) => {
    //         if (newVal) {
    //           unwatch();
    //           resolve();
    //         }
    //       });
    //     }
    //   });
    // },
  },
};

// start-
</script>
