<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"/>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from '@/components/FooterNav.vue'
export default {
       components: {
  "footer-nav": FooterNav,
}
}

 
</script>


<style lang="less">
@import './style/common.less';
body{
  font-size: 0.25rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0.6rem;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
