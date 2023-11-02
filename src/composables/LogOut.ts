import router from "@/router"
import { useAccountStore } from "@/stores/account"
import { useLogto } from "@logto/vue"

const logOut = () => {
  const store = useAccountStore()
  store.account = {}
  store.token = ""
  const { signOut } = useLogto()

  signOut(import.meta.env.VITE_LOGTO_REDIRECT_URL)
}

export default logOut
