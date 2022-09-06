<template>
    <div>
        <nav-bar id=content
        title="购物车"
        :fixed="true"
        :placeholder="true"
    >
    </nav-bar>

       <div class="orderlist"> 
       <div calss="shopitem" v-for="item in orderlists" :key="item.id" >
        <van-checkbox id="check" v-model="item.isChecked"  @click="singleSelect(item.id, item)" name="a">  
          </van-checkbox>
           <van-card
         style="margin-left:20px"
         :num="item.number"
         :price="item.price"
         :title="item.name"
         :desc="item.number*item.price"
         :thumb="item.image"
        >
        <template #footer>
          <van-button size="normal"  @click="addnum(item.id)"><icon name="plus" /></van-button>
          <span>{{item.number}}</span>
          <van-button size="normal"  @click="minusnum(item.id)" :disabled="item.number<=0"><icon name="minus" /></van-button>
        </template>
          </van-card>
      </div>
        </div>

        <!-- 结算 -->
        <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="allchecked" @click="checkall">全选</van-checkbox>
        <template #tip>
         你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
        </template>
        </van-submit-bar>
        </div>
</template>

<script>

import {  NavBar,Card,Stepper,Tag,Button,SubmitBar,Checkbox,List,Icon,CheckboxGroup,Dialog } from 'vant';
import { mapState } from 'vuex'; 

export default {
     data() {
    return {
      orderid:{},
      checked: false,
      orderlists:[],
      checklists:[],
      loading: false,
      finished: false,
      totalPrice:0,
      checkAll:false,
      show:false,
      allchecked:false,
    };
  },
    components: {
    NavBar,VanCard:Card,VanStepper:Stepper,VanTag:Tag,VanButton:Button,VanSubmitBar:SubmitBar,VanCheckbox:Checkbox,VanList:List,Icon,Dialog,VanCheckboxGroup:CheckboxGroup
    },
    created(){
      this.getorders()
    },
    // watch:{
    //   checklists(oldlist,newlist){
    //     if(newlist)
    //     console.log("gaibian")
    //     console.log(this.checklists)
    //   }
    // },
    computed:{
      ...mapState({islogin: state => state.user.islogin,userinfo: state => state.user.userinfo,shoplists: state => state.user.shoplists}),   
      totalprice() {
          let sum=0;
            for (let i of this.orderlists) {  
            sum+=i.price*i.num
           } 
            return sum;
          },
   },
    methods:{
       getorders() {
        if(this.islogin)
        {
          this.$store.dispatch('user/orderlists').then((res) => {
            let beforelists=process.env.NODE_ENV === 'development'? res.orderlists:res.data.orderlists
            let newlists= this.shoplists.reduce((pre, cur) => {
              return cur.children ? pre.concat(cur.children) : pre.concat(cur);
              }, []);
              this.orderlists=beforelists.concat(newlists)
              console.log(this.orderlists);
          }).catch((err) => {
            this.$router.push({ path:'/login' })
          })
          this.count();
        }
        else{
           this.$router.push({ path:'/login' })
        }
      },


      singleSelect(id, item) {
        if(item.isChecked){
          if(this.checklists.length){
             for (let citme of this.checklists) {
               let index =this.checklists.findIndex(function(i) { return i.id ==id; })
              if (citme.id === id) {
                citme.number = item.number;
              }
              else if(index==-1){
                this.checklists.push(item)
              }
          }
          }
          else{
            this.checklists.push(item)
        }
        if(this.checklists.length==this.orderlists.length){ 
                this.count();
                this.allchecked = true
                this.checkall()
              }
          this.count()
          console.log(this.checklists);
        }
         else{
           this.allchecked = false
           if(this.checklists.length===0){
           }
           else if(this.checklists.length>0){
              let i= this.checklists.map(citem => citem.id).indexOf(id)
              this.checklists.splice(i, 1)
              this.count()
              this.orderlists[i].isChecked=false

              }
         } 
        
    },
     // 全选
      checkall() {
        this.checklists=[]
      if (this.allchecked === true&&this.orderlists.length>0) {
        this.orderlists.forEach(el => {
          el.isChecked = true;
        });
        for(let item of this.orderlists){
           this.checklists.push(item)
        }
      } else {
        this.orderlists.forEach(el => {
        el.isChecked = false;
      })
      }this.count();
    },

      addnum(id){
         let i= this.orderlists.map(citem => citem.id).indexOf(id)
         this.orderlists[i].number++
         this.count()
    },

      minusnum(id){    
          let i= this.orderlists.map(citem => citem.id).indexOf(id)
          this.orderlists[i].number--
          if(this.orderlists[i].number==0){
          Dialog.confirm({
            message: '是否删除此商品',
          })
            .then(() => {
              this.orderlists.splice(i, 1)
               this.count()
            })
            .catch(() => {
               this.count()
            });
        }
         this.count()
        },

      count() {
        let sum = 0; //临时总价
        console.log("count")
        if(this.checklists.length===0){
          this.totalPrice=0 
          }
        else{
           this.checklists.forEach(function(val) {
              if (val.isChecked) {
               sum += val.number * val.price; //累计总价
            }
          });
        }
        this.totalPrice = sum;
        console.log(this.orderlists);
        console.log(this.checklists);
      },

      onClickEditAddress(){},
      onSubmit(){
        console.log(this.orderlists)
      }
}
}
</script>

<style lang="less" scoped>
@import '../style/mixin';

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
.orderlist{
  margin-bottom: 2.5rem;
}
.van-card{
  border-bottom:1px solid rgb(39, 90, 201);
  .van-card__title{
    font-size:0.3rem;
  }
  .van-card__desc{
    margin-left: 2.2rem;
    font-size:0.6rem;
    max-height:1rem;
    line-height:1rem;
    color: red;
  }
}

.shopitem{
   position: relative;
}
    #check{
      margin-top: 1rem;
      margin-left: 0.2rem;
      z-index: 1;
      position: absolute;
    }
 
</style>