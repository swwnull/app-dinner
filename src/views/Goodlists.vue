<template>
  <div>
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
        <span>{{restaurantsName}}</span>
      </template>
    </nav-bar>
<!-- 轮播 -->
 <Swiper :list="images"></Swiper>

<!-- 地图 -->
<van-cell :title=address icon="location-o"  lat="22.574405" lng="114.095388" is-link :to="{name:'Map'}" />

 <div class="core-specified-content-container">
    <div class="scroll-wrapper cont-flex">
      <div class="goodMenu left" ref="goodMenu">
        <div>
          <div class="scroll-left" :class="{active: currentIndex === index}" @click="selectLeft(index)" v-for="(n,index) in category" :key="index">{{n.text}}</div>
        </div>
      </div>
      <div class="goodList right" ref="goodList">
        <div class="scroll-right">
            <div class="item" v-for="(items,index) in Object.values(good)" :key="index"> 
                <van-card  
                  v-for="(item, key) in items" :key="key"
                  :thumb="item.picture"
                  :price="item.price"
                  :desc="item.description"
                  :title="item.name"
                  >
                  <template slot="bottom">  
                     <div class="num">
                      <van-button size="normal" @click.stop.prevent="minusnum(item)" :disabled="goodCartNum(item.gid) <=0"><van-icon name="minus" /></van-button>
                        <span class="number">{{goodCartNum(item.gid)}}</span>
                      <van-button size="normal" @click.stop.prevent="addnum(item,1)"><van-icon name="plus" /></van-button>
                    </div>
                  </template>
                </van-card>
          </div>
          <div v-if="isPullUpLoad" >
              <span class="pullup-txt">加载中...</span>
          </div>
          <div v-else>
              <span class="pullup-txt">——到底了——</span>
          </div>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import Bscroll from '@better-scroll/core'
import {getGoodLists} from '@/api/data';
import { mapState } from 'vuex'; 
import  Swiper  from '@/components/Swiper.vue'
import { NavBar,Grid,Card,GridItem,Image,Icon,Swipe, SwipeItem,TreeSelect,PullRefresh,List,Tag,Button,Cell,SubmitBar } from 'vant';



export default {
  data(){
    return {
      restaurantsId:this.$route.query.id,
      restaurantsName:"",
      address:"",
      isbuy:false,
      count: 0,
      isPullUpLoad: true,
      good: [],
      cart:[],
      loading: false,
      finished: false,
      refreshing: false,
      active: 0,
      category: [],
      num: 0,
      total:0,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
        'https://img01.yzcdn.cn/vant/apple-3.jpg'
      ],
      scrollY: 0,//获取实时滚动位置
      heightList: []//获取每一个li的高度
    }
  },
  components: {
    Swiper,VanGrid:Grid,VanGridItem:GridItem, VanImage:Image,NavBar,Icon,VanSwipe:Swipe,VanPullRefresh:PullRefresh,
    VanSwipeItem:SwipeItem,VanTreeSelect:TreeSelect,VanList:List,VanCard:Card,VanTag:Tag,VanButton:Button,VanCell:Cell,VanSubmitBar:SubmitBar
  },
  created(){
      this.restaurantsinit()
  },
   computed:{
    ...mapState({islogin: state => state.user.islogin}),
    goodCartNum() {	//计算单个饮品添加到购物车的数量
			return (id) => this.cart.reduce((acc, cur) => {
					if(cur.id === id) {
						return acc += cur.number
					}
					return acc
				}, 0)
		},
    // totalprice() {
    //     let sum=0;
    //     if(this.$store.getters.shoplists.length!==0){
    //         let list=this.$store.getters.shoplists
    //         this.isbuy=true
    //         for (let i of list) {  
    //         sum+=i.price*i.num
    //        } 
    //         return sum;
    //       }
    //      else{
    //        this.isbuy=false
    //        return 0
    //      }
    //     },
    currentIndex(){
            const index = this.heightList.findIndex((item, index) =>{
                return this.scrollY >= this.heightList[index] && this.scrollY < this.heightList[index + 1]
            })
             return index > 0 ? index : 0
           },
   },
  
    methods:{
      restaurantsinit(){
        getGoodLists({id:this.restaurantsId}).then((res)=>{
        console.log("googlists")
        console.log(res)
        let data =process.env.NODE_ENV === 'development'? res:res.data.goodlists
        this.restaurantsName = data.restaurantsName
        this.address=data.address
        this.category=data.category
        this.good=data.good
        this.isPullUpLoad=false
           this.$nextTick(() => { 
                  this._scrollInit()
                  this.getHeight()
              }) 
        })

      },
       
      onClickLeft() {
         this.$router.go(-1);
      },
      onClickRight() {
        
       },
      onSubmit(){
          this.$router.push({ path:'/car' })
        },
      // totalprice() {
      //     let sum=0;
      //     for (let i of this.$store.getters.shoplists) {  
      //     sum+=i.price*i.num
      //     } 
      //     return console.log(sum);
      //     },
    
      addnum(good,num){
         if(this.islogin){
            const index = this.cart.findIndex(item => item.id === good.gid)
            if(index > -1) {
			    	this.cart[index].number += num
			    } else {
			    	this.cart.push({
			    		id: good.gid,
			    		cate_id: this.restaurantsId,
			    		name: good.name,
			    		price: good.price,
			    		number: num,
			    		image: good.picture,
			    		sellCount: good.sellCount,
              description:good.description
			    	})
			    }
        this.$store.dispatch('user/addgood',this.cart)
         }
         else{
           alert("请先登录")
           this.$router.push({ path:'/login' })
         }
        },

      minusnum(good){
            const index = this.cart.findIndex(item => item.id === good.gid)
			      this.cart[index].number -= 1
			      if(this.cart[index].number <= 0) {
			      	this.cart.splice(index, 1)
			      }
            this.$store.dispatch('user/deletegoods',this.cart)
           },

      _scrollInit(){
                this.menuList = new Bscroll(this.$refs.goodMenu, {
                    click:true,
                    probeType: 3,
                    disableMouse: false,
                    disableTouch: false
                })
                this.goodmenu = new Bscroll(this.$refs.goodList, {
                    probeType: 3,
                    disableMouse: false,
                    disableTouch: false,
                    pullUpLoad: true
                })
              this.goodmenu.on('scroll', (pos) =>{
                //获取实时滚动的距离 使用scrollY接收         
                this.scrollY = Math.abs(Math.round(pos.y))
            })
              
        },
        getHeight(){
            //获取每一个li的高度
            const lis = this.$refs.goodList.getElementsByClassName('item')
            console.log('GEtheight')
            //heightList的第一个元素为0
            let height = 0
            this.heightList.push(height)
            //之后的高度即为当前li的高度加上之前面li的高度和
            Array.prototype.slice.call(lis).forEach(item => {
              height += item.clientHeight
               this.heightList.push(height)
            });
           },
        selectLeft(index) {
            let rItem = this.$refs.goodList.getElementsByClassName("item")
            let el = rItem[index]
            this.goodmenu.scrollToElement(el, 1000)
            console.log(el)
    },
   },
  
}
</script>

<style lang="less" scoped>
  .van-nav-bar__title,.van-nav-bar__title,.van-nav-bar .van-icon,.van-nav-bar__right{
    color: #fff;
    font-size: 0.30rem;
  }
 
 .van-swipe__track{
   height: 4rem;
 }

  .van-swipe {
    color: #fff;
    font-size: 1rem;
    height: 4rem;
    text-align: center;
    background-color: #39a9ed;
  }
  .van-swipe img{
    width: 100%;
    height: 4rem;
  }
  .van-cell{
    
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .van-tree-select{
    margin-bottom: 1rem;
  }
.van-submit-bar{
  margin-bottom: 1rem;
}

.cont-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 500px;
     .left {
    flex:0 0 2rem
}
.right {
    background: skyblue;
    flex: 1;
}
}

.wrapper{
  overflow: hidden;
}


.core-specified-content-container{
  text-align:center;
  .scroll-wrapper{
    height:9.5rem;
    overflow:hidden;
    .goodMenu{
      height:9rem;
      padding:0.1rem;
      color:rgb(0, 0, 0);
      font-size:0.36rem;
      font-weight:bold;
      .scroll-left{
        margin: 0.4rem 0;
      }
      .active{
        color:#e02e24;
        background: #ffffff
        }
        .active::before { 
          content: '';
          background-color: #e02e24;
          width: 0.1rem;
          height: 0.5rem;
          position: absolute;
          left: 0;
          }
    }
    .goodList{
      height:9.5rem;
      line-height:0.4rem;
      font-size:0.4rem;
      font-weight:bold;
      border-bottom:0.02rem solid #eee;
      text-align:center;
      background-color:#f3f5f7;
      .item{
        margin-bottom: 0.1rem;
        .van-card{
        padding: 0;
        .van-card__title{
          text-align:left;
          font-size: 0.25rem;
          padding-bottom: 0.2rem;
        }
        .van-card__desc{
          text-align:left;
          color: #919293;
        }
        .number{
          margin: 0 0.26rem;
        }
        .van-button--normal{
          padding: 0;
        }
        .van-card__bottom{
            .van-card__price{
              float: left;
            }
            .num{
              float: right;
              margin-right: 0.2rem;
            }
        }
        .van-button{
          height: 0.44rem;
          width: 0.44rem;
          border: 0.02rem solid #919293;
          border-radius: 0.44rem;
          
        }
      }
    }
      
    }
     
  }
}
  

</style>