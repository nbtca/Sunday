<script setup lang="ts">
import { useAccountStore } from "@/stores/account"
import LogoutButton from "../../components/LogoutButton.vue"

const store = useAccountStore()

const accountSetting = () => {
  window.open("https://myid.app.nbtca.space/account/aboutme", "_blank")
}
</script>
<template>
  <div class="h-full p-3 text-left">
    <div class="text-left text-2xl font-bold mt-4 mb-2 sm:mt-7 sm:mb-4">账户设置</div>
    <div>
      <div class="regular-footnote px-[13px] py-[11px] inline-block text-systemGrey-light">账户信息</div>
      <div class="bg-white rounded-lg w-full">
        <div class="label-item">
          <span>邮箱</span>
          <span>{{ store.userInfo?.email }}</span>
        </div>
        <div class="h-[0.5px] ml-4 bg-black/30"></div>
        <div class="label-item">
          <span>权限</span>
          <span>{{ store.userInfo?.roles?.filter(v => v.includes("Repair"))?.join(",") }}</span>
        </div>
        <div class="h-[0.5px] ml-4 bg-black/30"></div>
        <button @click="accountSetting" type="submit" class="label-item font-normal">
          <span>修改账户信息</span>
          <span class="textLink">myid.app.nbtca.space</span>
        </button>
      </div>
      <div class="regular-footnote px-[13px] py-[11px] inline-block text-systemGrey-light">前往 myid.app.nbtca.space 修改你的账户信息</div>
    </div>
    <div class="mt-16">
      <logout-button class="materialBtn btnWarning mt-1 shadow">登出账号</logout-button>
    </div>
  </div>
</template>

<style>
.regular-footnote {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.078px;
}

.bold-footnote {
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.078px;
}

.label-item {
  @apply px-4 py-[11px] w-full flex justify-between items-center;
}
</style>
