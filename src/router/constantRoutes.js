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
    component: () => import("@/views/404/404.vue"),
  },
];

export default constantRoutes;
