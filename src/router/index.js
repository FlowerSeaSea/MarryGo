import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

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
    path: "/cart",
    name: "Cart",
    component: () => import("@/pages/Cart.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("@/pages/Mine.vue"),
  },
  {
    path: "/head-portrait",
    name: "head-portrait",
    component: () => import("@/pages/HeadPortrait.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/pages/News.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/Login.vue"),
  },
  {
    path: "/codelogin",
    name: "CodeLogin",
    component: () => import("@/pages/login/CodeLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/login/Register.vue"),
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("@/pages/Payment.vue"),
  },
  {
    path: "/order",
    name: "Order",
    meta: {
      keepAlive:true
     },
    component: () => import("@/pages/Order.vue"),
  },
  {
    path: "/detaile",
    name: "shopDetaile",
    meta:{
      keepAlive:true
    },
    component: () => import("@/pages/shopDetaile.vue"),
  },
  {
    path: "/path",
    name: "Path",
    children: [
      {
        path: "/",
        name: "pathIndex",
        component: () => import("@/pages/path/Path-Index.vue"),
      },
      {
        path: "/path-list",
        name: "path-list",
        component: () => import("@/pages/path/Path-List.vue"),
      }
    ],
    component: () => import("@/pages/Path.vue"),
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

// 导航守卫
router.beforeEach((to,from,next)=>{
  let nextRoute = ['Payment','Cart','Path','Order','pathIndex','path-list'];
  // 是否是登录中
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))

  // 当前进入的页面，是不是需要验证那些页面
  if( nextRoute.indexOf(to.name)>=0){
    if(!userInfo){
      router.push('/login')
    }
  }

  next()
})

export default router;
