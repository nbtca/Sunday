import { createRouter, createWebHistory } from "vue-router"
import constantRoutes from "./constantRoutes"
import asyncRoutes from "./asyncRoutes"
import { useAccountStore } from "@/stores/account"
import { useLogto } from "@logto/vue"

declare module "vue-router" {
  interface RouteMeta {
    menuIcon?: boolean
    roles?: string[]
    title?: string
  }
}

const routes = asyncRoutes.concat(constantRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // const { isAuthenticated } = useLogto()

  // const target = to.matched[to.matched.length - 1]
  // if (!isAuthenticated.value && target.meta.roles && target.meta.roles?.length > 0) {
  //   next({ path: "/login" })
  //   return
  // }
  // next()
  const store = useAccountStore()
  store.setUserInfo()
  const token = store.token
  let userRole = store.account?.role
  if (userRole == null) {
    userRole = ""
  }
  const target = to.matched[to.matched.length - 1]
  if (to.matched.length == 0) {
    // 404
    next({ path: "/NotFound" })
    return
  }
  if (!token) {
    if (to.path === "/login" || to.path === "/callback" || to.path === "/register") {
      next()
    } else {
      next("/login")
    }
    return
  }

  if (userRole.includes("inactive") && to.path != "/activate") {
    next({ path: "/activate" })
    return
  }

  if (to.path === "/login") {
    next({ path: "/Events" })
    return
  }
  // role
  if (!target.meta?.roles || target.meta.roles.length == 0 || target.meta.roles.indexOf(userRole) !== -1) {
    if (userRole == "notActivated") {
      userRole == "notActivated" ? next({ path: "/notActivated" }) : next()
    } else {
      to.path === "/" ? next({ path: "/Events" }) : next()
    }
  } else {
    next("/NotAuthorized")
  }
})

export default router
