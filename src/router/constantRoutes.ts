import type { RouteRecordRaw } from "vue-router"

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/callback",
    name: "callback",
    component: () => import("@/views/CallbackView.vue"),
  },
  {
    path: "/NotFound",
    name: "NotFound",
    component: () => import("@/views/ErrorPage/NotFound.vue"),
  },
  {
    path: "/NotAuthorized",
    name: "NotAuthorized",
    component: () => import("@/views/ErrorPage/NotAuthorized.vue"),
  },
]

export default constantRoutes
