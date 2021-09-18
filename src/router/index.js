import { createRouter, createWebHashHistory } from "vue-router";
import constantRoutes from "./constantRoutes";
import asyncRoutes from "./asyncRoutes";

const routes = asyncRoutes.concat(constantRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("access_token");
  const userRole = sessionStorage.getItem("user_role");
  if (to.matched.length !== 0) {
    if (token) {
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        if (userRole) {
          next();
        } else {
          // 模拟不存在用户权限时，获取用户权限
          // const userRole = sessionStorage.getItem("user_role");
          // // 并根据权限设置对应的路由
          // let constructed = constructionRouters(routes);
          // console.log(constructed);
          // // store.commit('SET_ROLES_AND_ROUTES', userRole)
          // // 如果提示 addRoutes 已弃用，使用扩展运算符完成该操作
          // // router.addRoute(...store.getters.getRoutes)
          // router.addRoutes(getRoutes);
          // // 如果 addRoutes 并未完成，路由守卫会再执行一次
          // // next({ ...to, replace: true });
          next();
        }
      }
    } else {
      if (to.path === "/login") {
        next();
      } else {
        next("/login");
      }
    }
  } else {
    next({ path: "/NotFound" });
  }
});
function constructionRouters(router, t) {
  t = router.filter(item => {
    // 如果 roles 没有被设置，则所有人均可访问
    if (!item.meta || !item.meta.roles || item.meta.roles.length === 0) return true;
    return item.meta.roles.indexOf(sessionStorage.getItem("user_role")) !== -1;
  });
  for (const item of t) {
    if (item.children) {
      item.children = constructionRouters(item.children);
    }
  }
  return t;
}
export default router;
