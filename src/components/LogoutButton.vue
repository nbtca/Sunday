<script setup lang="ts">
import router from "@/router"
import { useAccountStore } from "@/stores/account"
import { useLogto } from "@logto/vue"

const store = useAccountStore()
const { signOut } = useLogto()

const logOut = () => {
  const store = useAccountStore()
  store.account = {}
  store.token = ""
  signOut(import.meta.env.VITE_LOGTO_REDIRECT_URL)
}
</script>
<template>
  <button @click="logOut">
    <slot></slot>
  </button>
</template>
