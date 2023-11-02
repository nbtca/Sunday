<script setup lang="ts">
import { useAccountStore } from "@/stores/account"
import { useLogto } from "@logto/vue"

const store = useAccountStore()
const { signOut } = useLogto()

const logOut = () => {
  const store = useAccountStore()
  store.account = {}
  store.token = ""
  signIn(import.meta.env.VITE_LOGTO_CALLBACK_URL)
}
</script>
<template>
  <button @click="logOut">
    <slot></slot>
  </button>
</template>
