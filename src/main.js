import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant'
import '@/config/rem'
import '@/style/common.less'

var _ = require('lodash')

Vue.config.productionTip = false
if(process.env.NODE_ENV == 'development') require('@/api/mock')


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Lazyload, {
  lazyComponent: true
});

router.beforeEach((to, from, next) => {
  if(to.path === '/login'&&store.getters.token){
    console.log(store.getters.userinfo)
      next("mine")
  }
  else{
    next();
}
})
