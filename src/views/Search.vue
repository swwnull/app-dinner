<template>
  <div class="order-box">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入"
      @search="onSearch"
      @input="search"
    >
     <template #left>
        <Icon @click="onClickLeft" name="revoke" size="18" />
      </template>
      <template #action>
        <div @click="find()">搜索</div>
      </template>
    
    </van-search>
    <div v-if="shopListArr.length">
      <ShopList :shopListArr="shopListArr"></ShopList>
    </div>
    <div>
      <span>{{messages}}</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'; //引入lodash
import {getRestaurantsData} from '@/api/data'
import ShopList from '@/components/ShopList.vue'
import { Search,Icon } from 'vant';

export default {
  data() {
    return {
      value:"",
      shopListArr:[],
      messages:""
    }
  },
  components: {
   Search,Icon,ShopList,
  },
  watch:{
    value:function(newvalue,oldvalue){
      if(newvalue!==oldvalue){
        this.getData()
      }
    }

  },
  methods: {
     find(){
       if(this.value){
          this.getData()
          }
          else{
            alert("请输入到搜索栏")
          }
     },
     getData(){
      getRestaurantsData().then((res)=>{
        this.shopListArr=[]
        for(let item in res){
          if(this.value==res[item].name){
            this.shopListArr.push(res[item])
            this.messages="下面没有了"
          }
        }
        if(this.shopListArr.length<1)
        {
          this.messages="没有搜索到其他结果"
        }
      })
     },
     search:
       _.debounce(
        function (){
          if(this.value){
          this.getData()
          }
          else{
           console.log("请输入")
          }
        },
        1000
      ),
     onClickLeft() {
     this.$router.go(-1)
    },
     onSearch(){ 
       console.log("onSearch");
       console.log(this.value);
     },
     
  }
}
</script>

<style lang="less" scoped>
  @import '../style/mixin';
   .van-search__content{
    border-radius: 0.53333rem;
  }
  .van-search__action{
    color: white;
  }
  .van-icon-revoke{
    padding-right: 0.2rem;
    color: white;
  }
</style>
