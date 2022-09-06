
<template>
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item" alt="" @click="goTo()">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import {Swipe, SwipeItem} from 'vant';
export default {
  components: {
    VanSwipe:Swipe,VanSwipeItem:SwipeItem
  },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  methods: {
    goTo() {
      console.log("点击了轮播")
    }
  }
}
</script>

<style lang='less' scoped>
  .my-swipe .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
