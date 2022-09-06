<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="cart-o"  to="/car">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/mine">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  data() {
    return {
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
  created(){
    this.getorders()
  },
  updated(){
    this.show = (this.islogin===true) ? '0' : '1';
      // if(this.islogin===true)
      // {
      //   this.show='0'
      // }
      // else
      // {
      //   this.show='1'
      // }
      
  },
  computed:{
     islogin:function(){
        console.log("computed")
        return this.$store.state.user.islogin
    },
   },
  methods:{
    getorders() {
        if(this.$store.getters.token)
        {
          this.$store.dispatch('user/orderlists').then((res) => {
            let orderlist=res.orderlists
            this.ordernum+=orderlist.reduce((ordernum, item) => ordernum + item.num, 0)
            console.log("getorders")
          }).catch((err) => {
            console.log(err)
          })
        }
         else{
        this.ordernum=false
      }
      },
  },
  components: {
   [Tabbar.name]: Tabbar,
  [TabbarItem.name]: TabbarItem,
  },
}
</script>

<style>

</style>