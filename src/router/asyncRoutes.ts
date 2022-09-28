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
        meta: {
          menuIcon: true,
          roles: ["admin", "member"],
          title: "维修事件",
        },
        // children: [
        //   {
        //     path: "/Events/:eventId",
        //     name: "EventsDetail",
        //     component: () => import("@/views/Events/EventsDetail.vue"),
        //     meta: {
        //       title: "事件详情",
        //       roles: ["admin", "member"],
        //     },
        //   },
        // ],
      },
      {
        path: "/MemberManage",
        name: "MemberManage",
        component: () => import("@/views/MemberManage/MemberManage.vue"),
        meta: {
          menuIcon: true,
          roles: ["admin"],
          title: "成员管理",
        },
      },
    ],
  },
  {
    path: "/activate",
    name: "LoginActivate",
    component: () => import("@/views/Login/LoginActivate.vue"),
  },
]
export default asyncRoutes
