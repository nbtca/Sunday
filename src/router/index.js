import { createRouter, createWebHashHistory } from "vue-router"
import constantRoutes from "./constantRoutes"
import asyncRoutes from "./asyncRoutes"

const routes = asyncRoutes.concat(constantRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token")
  const userRole = localStorage.getItem("user_role")
  const target = to.matched[to.matched.length - 1]
  if (to.matched.length !== 0) {
    // 404
    if (token) {
      // login
      if (to.path === "/login") {
        next({ path: "/Events" })
      } else {
        // role
        if (!target.meta || !target.meta.roles || target.meta.roles.length == 0 || target.meta.roles.indexOf(userRole) !== -1) {
          if (userRole == "notActivated") {
            if (to.path === "/activate") {
              next()
            } else {
              next({ path: "/activate" })
            }
          } else {
            if (to.path === "/") {
              next({ path: "/Events" })
            }
            next()
          }
        } else {
          next("/NotAuthorized")
        }
      }
    } else {
      if (to.path === "/login") {
        next()
      } else {
        next("/login")
      }
    }
  } else {
    next({ path: "/NotFound" })
  }

})
// function constructionRouters(router, t) {
//   t = router.filter(item => {
//     // 如果 roles 没有被设置，则所有人均可访问
//     if (!item.meta || !item.meta.roles || item.meta.roles.length === 0) return true
//     return item.meta.roles.indexOf(localStorage.getItem("user_role")) !== -1
//   })
//   for (const item of t) {
//     if (item.children) {
//       item.children = constructionRouters(item.children)
//     }
//   }
//   return t
// }
export default router
