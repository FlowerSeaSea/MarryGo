import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/business",
    name: "Business",
    component: () => import("@/pages/Business.vue"),
  },
  {
    path: "/secrete",
    name: "Secrete",
    component: () => import("@/pages/Secrete.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/pages/Shop.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("@/pages/Mine.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/login/Register.vue"),
  },
  {
    path: "/detaile",
    name: "shopDetaile",
    component: () => import("@/pages/shopDetaile.vue"),
  },
  {
    path: "/search",
    name: "search",
    children: [
      {
        path: "/",
        name: "search-index",
        component: () => import("@/pages/search/search-index.vue"),
      },
      {
        path: "search-list",
        name: "search-list",
        component: () => import("@/pages/search/search-list.vue"),
      },
    ],
    component: () => import("@/pages/Search.vue"),
  },
  {
    path: "/recovery",
    name: "Recovery",
    children: [
      {
        path: "/",
        name: "RecoveryIndex",
        component: () => import("@/pages/recovery/RecoveryIndex.vue"),
      },
      {
        path: "btn",
        name: "btn",
        component: () => import("@/pages/recovery/RecoveryBtn.vue"),
      },
    ],
    component: () => import("@/pages/recovery/Recovery.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
