<template>
  <div>
    <div v-if="!showLoading"  id="home" class="home" ref="scroll">
    <van-search
      v-model="value"
      show-action
      label="地址"
      placeholder="请输入"
      @click-input="goSearch"
      @search="goSearch"
    >
      <template #action>
        <div @click="goSearch">搜索</div>
      </template>
    </van-search>
    
    <!-- 轮播 -->
     <Swiper :list="images"></Swiper>

    <swipe class="my-swipe" :loop="false" indicator-color="grey" :show-indicators="true">
      <Swipe-item>
        <grid :column-num="4">
          <Grid-item  v-for="(item,index) in swiperList1" :key="index">
            <van-image width="0.84rem" height="0.84rem" fit="cover" :src="'https://fuss10.elemecdn.com/'+item.image_url"/>
            <span>{{item.title}}</span>
          </Grid-item>
        </grid>
      </Swipe-item>
      <span v-if="!swiperList2">加载中</span>
      <Swipe-item>
        <grid>
          <Grid-item v-for="(item,index) in swiperList2" :key="index">
            <van-image width="0.84rem" height="0.84rem" fit="cover" :src="'https://fuss10.elemecdn.com/'+item.image_url"/>
            <span>{{item.title}}</span>
          </Grid-item>
        </grid>
      </Swipe-item>
    </swipe>

    <ShopList  @scroll="boxScroll" :shopListArr="shopListArr"></ShopList>
    <p v-if="loading" class="empty_data">加载中</p>
    <p v-else class="empty_data">没有更多了</p>
  </div>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
  </div> 
</template>

<script>

import {getPosiData,getIndexEntryData,getRestaurantsData} from '@/api/data'
import {Icon,Search,Swipe, SwipeItem,Grid, GridItem,Image} from 'vant';
import config from '@/config/index'
import ShopList from '@/components/ShopList.vue'
import  Swiper  from '@/components/Swiper.vue'
import loading from '@/components/loading.vue'

export default {
  name: 'Home',
  data(){
    return {
      titlePosition:"",
      swiperList1:[],
      swiperList2:[],
      shopListArr:[],
      shopListArr1:[],
      showLoading: true, //显示加载动画
      loading: true, //没有更多数据
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
        'https://img01.yzcdn.cn/vant/apple-3.jpg'
      ],
    }
  },
  components: {
    Search,Icon,Swipe, SwipeItem,Grid, GridItem,vanImage:Image,ShopList,Swiper,loading
  },
  mounted(){
      this.init(),
      this.$nextTick(() => {
       window.addEventListener("scroll", this.handleScroll); // 监听（绑定）滚轮滚动事件
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
 
  methods:{
    init(){  
      let P1 =getPosiData().then((res)=>{
      console.log(res);
      this.titlePosition = res.name;
    });
    
      let P2 =getIndexEntryData().then((res)=>{
      this.swiperList1 = res.slice(0,8);
      this.swiperList2 = res.slice(8,16);
    });
    
      let P3 =getRestaurantsData().then((res)=>{
      this.shopListArr1 = res
      this.shopListArr = res.slice(0,9);
    })

      Promise.all([P1,P2,P3]).then((result) => {
           this.showLoading = false;
         }).catch((error) => {

         console.log(error)      // 失败了，打出 '失败'
         })
     },
      handleScroll() {
      let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
      let boxHeight = 0;
      boxHeight = document.documentElement.clientHeight || document.body.clientHeight; //可视高度
      if (boxHeight/2>scrollHeight) {
        console.log("不加载")
        console.log(boxHeight)
        console.log(scrollHeight)
      } else {
       setTimeout(() => {
        // 加载状态结束
        this.loading=false
        this.shopListArr=this.shopListArr1
      }, 2000);
      }
},
    goSearch(){ 
      this.$router.push({ path:'/search' })
     },
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';
#home{
  .van-search__content{
    border-radius: 0.53333rem;
  }
  .van-search__action{
    color: white;
  }
  .h1{
    width :3.75rem;
    height: 1rem;
    background: skyblue;
    font-size: 0.5rem;
    line-height: 1rem;
  }
  .my-swipe{
    height: 3.6rem;
  }

}
.loader_more{
		.font(0.12rem, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		.sc(0.1rem, #666);
		text-align: center;
		line-height: 0.5rem;
    margin-bottom: 1rem;
	}
	.return_top{
		position: fixed;
		bottom: 0.5rem;
		right: 0.4rem;
		.back_top_svg{
			.wh(0.4rem, 0.4rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>
