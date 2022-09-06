import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      keepAlive: true // 不需要缓存
    }
  },
  {
    path: '/goodlists',
    name: 'goodlists',
    component: () => import('@/views/Goodlists.vue'),
    meta: {
      keepAlive: true // 不需要缓存
    }
  },
  {
    path: '/car',
    name: 'Car',
    component: () => import('@/views/Car.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import( '@/views/Mine.vue'),
    meta: {
      keepAlive: false // 不需要缓存
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      keepAlive: false // 不需要缓存
    }
  },
  {
    path: '/orderlists',
    name: 'Orderlists',
    component: () => import( '@/views/Orderlists.vue'),
    meta: {
      keepAlive: false // 不需要缓存
    }
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/components/Map.vue'),
    meta: {
      keepAlive: false // 不需要缓存
    }
  },  
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      keepAlive: false // 不需要缓存
    }
  },  
  {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/Collect.vue'),
    meta: {
      keepAlive: false // 不需要缓存
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    meta: {
      keepAlive: false // 不需要缓存
    }
  },    
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
