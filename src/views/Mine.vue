<template>
   <div class="my">
    <!-- 个人信息区域 -->
    <div class="top">
      <div class="msg">
        <van-img @click="$router.push('/info')" :src="this.Info.avatar" round style="width:2rem;height:2rem" />
        <h3>{{this.Info.username}}</h3>
      </div>
    </div>
    <!-- 收藏区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" @click="$router.push('/collect')" text="收藏店铺" />
      <van-grid-item icon="clock-o" @click="$router.push('/orderlists')" text="历史订单" />
      <van-grid-item icon="orders-o" @click="getlogin" text="账单" />
    </van-grid>
    <!-- 信息区域 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="关于我"  @click="$router.push('/about')" is-link />
    </van-cell-group>
    <van-button type="danger" @click="logout" block>注销</van-button>
  </div>
</template>

<script>
import { Grid, GridItem, Cell, CellGroup,Image, Button } from 'vant';
import { mapState } from 'vuex'; 

export default {
     data() {
    return {
      checked: true,
      Info:{}
    };
  },
    components: {
   VanGrid:Grid, VanGridItem:GridItem, VanCell:Cell, VanCellGroup:CellGroup,VanImg:Image,VanButton:Button
    },
    created(){
      this.getUserindex()
    },
     computed: {
		...mapState({islogin: state => state.user.islogin,userinfo: state => state.user.userinfo,token: state => state.user.token})
	},
  //  watch:{
  //     islogin(newValue, oldValue){
  //       if(newValue){
  //          this.getUserindex()
  //          console.log("登陆过期，请重新登陆")
  //       }
  //   },
    // deep: true
    // },
    methods:{
      getUserindex() {
        console.log("123")
       if(this.islogin=="false")
       {
        this.$router.push({ path:'/login' })
       }
       else{
        this.Info=this.userinfo
       }
      },
      logout(){
          this.$store.dispatch('user/logout').then(() => {
            this.$router.push({ path:'/login' })
          }).catch((err) => {
            console.log(登出错误)
          
          })
      },
  }
}
</script>

<style lang="less" scoped>

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