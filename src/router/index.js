import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/business',
        name: 'Business',
        component: () => import('../pages/Business.vue')
    },
    {
        path: '/secrete',
        name: 'Secrete',
        component: () => import('../pages/Secrete.vue')
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import('../pages/Shop.vue')
    },
    {
        path: '/mine',
        name: 'Mine',
        component: () => import('../pages/Mine.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login.vue')
    },
    {
        path: '/shopDetaile',
        name: 'shopDetaile',
        component: () => import('../pages/shopDetaile.vue')
    }
]

const router = new VueRouter({
    routes
  })
  
  export default router
  