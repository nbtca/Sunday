import { createRouter, createWebHashHistory } from "vue-router";

// TODO: router
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// router.beforeEach((to, from, next) => {
//   const token = sessionStorage.getItem("access_token");
//   if (token) {
//     next();
//     if (to.path === "/login") {
//       next({ path: "/" });
//     }
//   } else {
//     if (to.path === "/login") {
//       next();
//     } else {
//       next("/login");
//     }
//   }
// });
export default router;
