const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/components/test.vue"),
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
];

export default constantRoutes;
