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
         <Icon name="star-o" size="18" />
      </template>

      <template #title>
        <span>历史订单</span>
      </template>
    </nav-bar>
    <van-tabs @change="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" class="order-tab" v-model="status">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="300"
      >
        <div v-for="item in orderlists" :key="item.id" class="order-item-box" @click="goTo(item.orderNo)">
          <div class="order-item-header">
            <span>订单时间：2020-12-12</span>
            <span>已支付</span>
          </div>
          <van-card
            :num="item.num"
            :price="item.num*item.price"
            :title="item.name"
            desc="单价9元"
            :thumb="item.picture"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { NavBar,Icon } from 'vant';

export default {
  data() {
    return {
      status: '',
      loading: false,
      finished: false,
      refreshing: false,
      orderlists: [],
    }
  },
  components: {
   NavBar,Icon
  },
  async mounted() {
   this.getorders()
  },
   computed: {
		...mapState({islogin: state => state.user.islogin})
	},
  methods: {
     getorders() {
        if(this.islogin)
        {
          this.$store.dispatch('user/orderlists').then((res) => {
            let list =process.env.NODE_ENV === 'development'? res.orderlists:res.data.orderlists
            if(this.status==="2"||this.status===""){
            this.orderlists=this.$store.getters.shoplists.concat(list)
            this.refreshing = false
            this.finished = true
            }
            else{
               this.orderlists=[]
            }
          }).catch((err) => {
            console.log(err)
          })
        }
        else{
          this.$router.push({ path:'/login' })
        }
      },
    onChangeTab(name, title) {
      this.status = name
      console.log(name)
      this.getorders()
    },
    goTo(id) {
     
    },
   onClickLeft() {
     this.$router.go(-1)
    },
    onRefresh() {
     this.refreshing = true
      this.finished = false
      this.loading = true
      this.getorders()
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
