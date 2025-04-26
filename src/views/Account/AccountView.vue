<script setup lang="ts">
import { useAccountStore } from "@/stores/account"
import LogoutButton from "../../components/LogoutButton.vue"
import { onMounted, ref } from "vue"

const store = useAccountStore()

const userInfo = ref<{
  identities: Record<string, Record<string, unknown>>
}>()

const accountSetting = () => {
  window.open("https://myid.app.nbtca.space/account/aboutme", "_blank")
}

onMounted(async () => {
  const token = await store.logto.getAccessToken()
  const res = await fetch(`${import.meta.env.VITE_LOGTO_ENDPOINT}/api/my-account`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    if (res.status === 200) {
      return res.json()
    } else {
      console.error("Error fetching account info")
      return null
    }
  })
  userInfo.value = res
})
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
        <div class="h-[1px] ml-4 bg-black/20"></div>
        <div class="label-item">
          <span>Github</span>
          <span v-if="userInfo?.identities?.github">
            {{ userInfo?.identities?.github?.details?.rawData?.userInfo?.login }}
            ({{ userInfo?.identities?.github?.details?.name }})
          </span>
          <span v-else class="text-systemGrey-light">未关联</span>
        </div>
        <div class="h-[1px] ml-4 bg-black/20"></div>
        <div class="label-item">
          <span>权限</span>
          <span>{{ store.userInfo?.roles?.filter(v => v.includes("Repair"))?.join(",") }}</span>
        </div>
        <div class="h-[1px] ml-4 bg-black/20"></div>
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
