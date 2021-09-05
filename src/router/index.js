import { createRouter, createWebHashHistory } from "vue-router";
import constantRoutes from "./constantRoutes";
import asyncRoutes from "./asyncRoutes";
// TODO: router
const routes = constantRoutes.concat(asyncRoutes);
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/LoginActivate",
    name: "LoginActivate",
    component: () => import("@/views/Login/LoginActivate.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/components/test.vue"),
  },
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/Events",
        name: "Events",
        component: () => import("@/views/Events/Events.vue"),
        children: [
          {
            path: ":eid",
            name: "EventsDetail",
            component: () => import("@/views/Events/EventsDetail.vue"),
          },
        ],
      },
      {
        path: "/ElementManage",
        name: "ElementManage",
        component: () => import("@/views/ElementManage/ElementManage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("access_token");
  if (to.matched.length !== 0) {
    if (token) {
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        next();
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
// function constructionRouters(router, t) {
//   t = router.filter((item) => {
//     // 如果 roles 没有被设置，则所有人均可访问
//     if (!item.meta.roles || item.meta.roles.length === 0) return true;
//     return item.meta.roles.indexOf(sessionStorage.getItem("user_role")) !== -1;
//   });
//   for (const item of t) {
//     if (item.children) {
//       item.children = constructionRouters(item.children);
//     }
//   }
//   return t;
// }
export default router;
