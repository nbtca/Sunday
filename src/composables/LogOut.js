import router from "@/router"

const logOut = () => {
  localStorage.clear()
  router.push("/login")
}

export default logOut