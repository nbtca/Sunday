import router from "@/router"
import { useAccountStore } from "@/stores/account"

const logOut = () => {
  const store = useAccountStore()
  store.token = ""
  localStorage.clear()
  router.push("/login")
}

export default logOut
