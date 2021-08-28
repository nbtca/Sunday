<template>
  <div class="h-96 w-96 flex flex-col justify-center items-center w-full">
    <form @submit="submit">
      <InputBase
        placeholder=""
        subject="ID"
        required
        v-model:content="content"
        :rules="[{ rule: /^[0-9]*$/, warning: 'number only' }]"
      ></InputBase>
      <button type="submit" class="btn bg-primary text-primaryContent">
        123
      </button>
    </form>
  </div>
  <div>
    {{ content }}
  </div>
</template>

<script>
import InputBase from "@/components/Input/InputBase.vue";
export default {
  components: {
    InputBase,
  },
  data() {
    return {
      content: "",
      isFormVaild: true,
    };
  },
  watch() {},
  methods: {
    submit() {
      var pattern = /^[0-9]*$/;
      let str = "123";
      let r = new RegExp(pattern);
      console.log(r.test(str));
      console.log("submit");
    },
  },
};

// start-
</script>
