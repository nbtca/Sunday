const asyncRoutes = [
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
      {
        path: "/Design",
        name: "design",
        component: () => import("@/views/Design/Design.vue"),
      },
    ],
  },
];
export default asyncRoutes;
