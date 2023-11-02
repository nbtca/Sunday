import router from "@/router"
import { useAccountStore } from "@/stores/account"

const logOut = () => {
  const store = useAccountStore()
  store.account = {}
  store.token = ""
}

export default logOut
