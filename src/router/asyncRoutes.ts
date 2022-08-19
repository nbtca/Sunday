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
          menuIcon: "true",
          roles: ["admin", "element"],
          title: "维修事件",
        },
        children: [
          {
            path: ":eid",
            name: "EventsDetail",
            component: () => import("@/views/Events/EventsDetail.vue"),
            meta: {
              title: "事件详情",
              roles: ["admin", "element"],
            },
          },
        ],
      },
      {
        path: "/ElementManage",
        name: "ElementManage",
        component: () => import("@/views/MemberManage/MemberManage.vue"),
        meta: {
          menuIcon: "true",
          roles: ["admin"],
          title: "成员管理",
        },
      },
      {
        path: "/Design",
        name: "design",
        component: () => import("@/views/Design/Design.vue"),
        meta: {
          menuIcon: "true",
          roles: ["admin"],
          title: "设计",
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
