import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
  },
  {
    path: '/goodlists/:id',
    name: 'Goodlists',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Goodlists.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Orders.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    meta : {                      //加一个自定义obj
      requireAuth:true      //这个参数 true 代表需要登录才能进入A
  },
    component: () => import(/* webpackChunkName: "about" */ '@/views/Mine.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch(err => err)
}
export default router
