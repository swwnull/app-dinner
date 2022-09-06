<template>
  <div class="order-box">
    <nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <Icon name="revoke" size="18" />
      </template>
      <template #right>
         <Icon name="setting-o" size="18"/>
      </template>

      <template #title>
        <span>收藏店铺</span>
      </template>
    </nav-bar>
    <ShopList :shopListArr="shopListArr"></ShopList>
  </div>
</template>

<script>
import {getRestaurantsData} from '@/api/data'
import ShopList from '@/components/ShopList.vue'
import { NavBar,Icon } from 'vant';

export default {
  data() {
    return {
      shopListArr:[],
    }
  },
  components: {
   NavBar,Icon,ShopList,
  },
  mounted(){
        this.init()
      },
  methods: {
     init(){
      getRestaurantsData().then((res)=>{
      console.log(res);
      this.shopListArr = res
    })
     },
     onClickLeft(){
       this.$router.go(-1);
    },
     
  }
}
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .order-box {
    .order-tab {
      position: fixed;
      left: 0;
      z-index: 1000;
      width: 100%;
    }
    .order-list-refresh {
      margin-top: 0.6rem;
      .van-card__content {
        display: flex;
        text-align: left;
        flex-direction: column;
        justify-content: center;
        .van-card__title{
          line-height: 0.4rem;
        }
      }
      .van-pull-refresh__head {
        background: #f9f9f9;
      }
      .van-list {
        min-height: calc(100vh - 88px);
        background: #f9f9f9;
        margin-top: 0.4rem;
      }
      .order-item-box {
        margin: 0.4rem 0.2rem;
        background-color: #fff;
        .order-item-header {
          font-size: 0.24rem;
          padding: 0.2rem 0.4rem 0 0.4rem;
          display: flex;
          justify-content: space-between;
        }
        .van-card {
          background-color: #fff;
          margin-top: 0;
          .van-card__price{
            font-size: 0.35rem;
          }
          .van-card__num{
            font-size: 0.4rem;
          }
        }
      }
    }
  }
</style>
