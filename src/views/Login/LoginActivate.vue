<template>
  <div class="flex flex-col justify-start" style="height: 100vh">
    <div class="flex flex-col items-center">
      <form @submit="activate" class="grid gap-y-1 place-items-center" style="width: 17vw; min-width: 300px">
        <div class="text-3xl font-bold my-12 md:mt-18">完善个人信息</div>
        <InputBase subject="密码" required class="w-full" v-model:content="account.password" />
        <InputBase subject="确认密码" required :warn="isPasswordConsistent" class="w-full" v-model:content.lazy="account.passwordConfirm" />
        <InputBase subject="昵称" required class="w-full" v-model:content="account.alias" />
        <!-- <InputBase
          subject="姓名"
          required
          class="w-full"
          v-model:content="account.name"
          :rules="[{ rule: /^[\u4e00-\u9fa5]{2,4}$/, warning: '格式错误' }]"
        />
        <InputBase
          subject="班级"
          hint="示例: 计算机196"
          required
          class="w-full"
          v-model:content="account.class"
          :rules="[
            {
              rule: /^([\u4e00-\u9fa5]{2,10})(\d{3})$/,
              warning: '格式错误',
            },
          ]"
        /> -->
        <InputBase
          subject="电话"
          class="w-full"
          required
          v-model:content="account.phone"
          :rules="[
            {
              rule: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              warning: '格式错误',
            },
          ]"
        />
        <InputBase
          required
          subject="QQ"
          class="w-full"
          v-model:content="account.qq"
          :rules="[{ rule: /[1-9][0-9]{4,14}/, warning: '格式错误' }]"
        />
        <!-- <div>
          <div>
            <label class="block text-sm font-medium text-gray-700"> Cover photo </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="
                      relative
                      cursor-pointer
                      bg-white
                      rounded-md
                      font-medium
                      text-indigo-600
                      hover:text-indigo-500
                      focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500
                    "
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*" @change="getFile" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div> -->
        <button class="w-3/5 btn materialThick" @click="upload">上传头像</button>
        <button class="w-full btn bg-primary text-primaryContent mt-5" type="submit">提交</button>
      </form>
    </div>
  </div>
</template>
<script>
import InputBase from "@/components/Input/InputBase.vue";
import InputSection from "@/components/Input/InputSection.vue";
import isValid from "@/Utils/isValid";
import { Element } from "@/api/api";
import axiosApi from "@/axios/AxiosConfig";
export default {
  name: "LoginActivate",
  setup() {},
  components: { InputBase, InputSection },
  data() {
    return {
      account: {
        password: {},
        passwordConfirm: {},
        name: {},
        class: {},
        phone: {},
        qq: {},
      },
      pic: new FormData(),
    };
  },
  computed: {
    isPasswordConsistent() {
      let ans = "";
      if (this.account.password.value != this.account.passwordConfirm.value || this.account.passwordConfirm == {}) ans = "密码不一致";
      return ans;
    },
  },
  methods: {
    async getFile(event) {
      var file = event.target.files[0];

      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据
      param.append("chunk", "0"); // 添加form表单中其他数据
      console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      await axiosApi("/test", param, "post");

      // console.log(this.pic);
      // for (var i = 0; i < file.length; i++) {
      //   //    上传类型判断
      //   var imgName = file[i].name;
      //   var idx = imgName.lastIndexOf(".");
      //   if (idx != -1) {
      //     var ext = imgName.substr(idx + 1).toUpperCase();
      //     ext = ext.toLowerCase();
      //     if (ext != "pdf" && ext != "doc" && ext != "docx") {
      //     } else {
      //       this.pic.push(file[i]);
      //     }
      //   } else {
      //   }
      // }
    },
    async upload() {},
    activate() {
      let that = this;
      let account = isValid(this.account);
      if (account) {
        Element.update(account)
          .Account.login()
          .then(() => {
            that.$router.push("/");
          });
      }
    },
  },
};
</script>
