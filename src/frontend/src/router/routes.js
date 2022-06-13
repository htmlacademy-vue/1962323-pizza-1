import { auth, isLoggedIn } from "@/middlewares";
export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/TheIndex.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/TheCart.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/TheProfile.vue"),
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth],
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/TheOrders.vue"),
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/TheLogin.vue"),
    meta: {
      layout: "AppLayoutWithoutHeader",
      middlewares: [isLoggedIn],
      transition: "none",
    },
  },
  {
    path: "/success",
    name: "Popup",
    component: () => import("../views/ThePopup.vue"),
    meta: {
      layout: "AppLayoutWithoutHeader",
      transition: "fade",
    },
  },
];
