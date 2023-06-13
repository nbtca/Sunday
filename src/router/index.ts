import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import constantRoutes from "./constantRoutes"
import asyncRoutes from "./asyncRoutes"
import { useAccountStore } from "@/stores/account"

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
  const store = useAccountStore()
  const token = store.token
  let userRole = store.account.role
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
    if (to.path === "/login") {
      next()
    } else {
      next("/login")
    }
    return
  }

  if (to.path === "/login") {
    next({ path: "/Events" })
    return
  }
  // role
  const roles = target.meta.role || []
  if (!target.meta || !target.meta.roles || roles.length == 0 || roles.indexOf(userRole) !== -1) {
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
