<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" badge="20" to="/orders">订单</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/login">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  data() {
    return {
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
  components: {
   [Tabbar.name]: Tabbar,
  [TabbarItem.name]: TabbarItem,
  },
}
</script>

<style>

</style>