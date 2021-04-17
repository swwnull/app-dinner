<template>
   <div class="my">
    <!-- 个人信息区域 -->
    <div class="top">
      <div class="msg">
        <van-img @click="$router.push('/info')" :src="userInfo.avatar" round style="width:2rem;height:2rem" />
        <h3>{{userInfo.username}}</h3>
      </div>
    </div>
    <!-- 收藏区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏店铺" />
      <van-grid-item icon="clock-o" text="历史订单" />
      <van-grid-item icon="orders-o" text="账单" />
    </van-grid>
    <!-- 信息区域 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button type="danger" @click="logout" block>注销</van-button>
  </div>
</template>

<script>
import { Grid, GridItem, Cell, CellGroup,Image, Button } from 'vant';
export default {
     data() {
    return {
      checked: true,
      userInfo:{}
    };
  },
    components: {
   VanGrid:Grid, VanGridItem:GridItem, VanCell:Cell, VanCellGroup:CellGroup,VanImg:Image,VanButton:Button
    },
    created(){
      this.getUserindex()
    },
    methods:{
      getUserindex() {
       if(this.$store.getters.token)
       {
         this.userInfo.username=this.$store.getters.username
         this.userInfo.avatar=this.$store.getters.avatar
         console.log(this.$store.getters.username)
       }
       else{
         console.log("123")
         this.$router.push({ path:'/login' })
       }
      },
      logout(){
          this.$store.dispatch('user/logout').then(() => {
            console.log(this.$store.getters.token)
            this.$router.push({ path:'/login' })
          }).catch((err) => {
            console.log(err)
          
          })
      },
      onClickEditAddress(){},
      onSubmit(){}
  }
}
</script>

<style lang="scss">

.my{

  .top{
    background: #3190e8;
   padding-bottom: 0.5rem;
  }
  .van-image{
    margin-top:0.5rem;
  }
 .van-img{
    height: 0.50rem;
    width: 0.50rem;
  }
 .van-image{
   height: 1rem;
   width: 0.5rem;
 }
 .van-button{
   margin-top: 2rem;
}

 }



</style>