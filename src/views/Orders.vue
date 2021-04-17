<template>
    <div>
        <nav-bar id=content
     title="商品结算"
      :fixed="true"
      :placeholder="true"
    >
    </nav-bar>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-checkbox name="a"> <van-card
        :num="item.num"
        :price="item.price"
        :title="item.name"
        :thumb="item.picture"
        v-for="item in orderlists" :key="item.uid" 
        >
        <template #footer>
          <van-button size="normal"><icon name="plus" /></van-button>
          <div>{{price}}</div>
          <van-button size="normal"><icon name="minus" /></van-button>
        </template>
          </van-card>
          </van-checkbox>
    </van-checkbox-group>
        <!-- 结算 -->
        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
        <template #tip>
         你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
        </template>
        </van-submit-bar>
        </div>
</template>

<script>
import {  NavBar,Card,Tag,Button,SubmitBar,Checkbox,List,Icon,CheckboxGroup } from 'vant';
export default {
     data() {
    return {
      checked: false,
      orderlists:{},
      loading: false,
      finished: false,
      total:'',
      result: []
    };
  },
    components: {
    NavBar,VanCard:Card,VanTag:Tag,VanButton:Button,VanSubmitBar:SubmitBar,VanCheckbox:Checkbox,VanList:List,Icon,VanCheckboxGroup:CheckboxGroup
    },
    created(){
      this.getUserindex()
    },
    computed:{
    price:function (orderlists) {
      orderlists.forEach(item => {
        return item.price*item.num
      });
    }
    },
    methods:{
       getUserindex() {
        if(this.$store.getters.token)
        {
          this.$store.dispatch('user/orderlists').then((res) => {
            console.log(res.orderlists)
            this.orderlists=res.orderlists
          }).catch((err) => {
            console.log(err)
          })
        }
        else{
           this.$router.push({ path:'/login' })
        }
      },
      checkAll() {
      this.$refs.checkboxGroup.toggleAll(this.checked);
    },
      onClickEditAddress(){},
      onSubmit(){},
  }
}
</script>

<style lang="scss">

#content{

  .van-nav-bar{
    background: #3190e8;
  }
  .van-nav-bar__title,.van-nav-bar__title,.van-nav-bar .van-icon,.van-nav-bar__right{
    color: #fff;
    font-size: 0.30rem;
  }
}
.van-submit-bar{
    margin-bottom: 1rem;
}


</style>