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
<van-swipe  :autoplay="3000">
  <van-swipe-item  v-for="(image, index) in images" :key="index">
    <img v-lazy="image" />
  </van-swipe-item>
</van-swipe>
<!-- 商品列表 -->
<van-tree-select height=auto :items="items" :main-active-index.sync="active">
  <template #content>
    <van-pull-refresh  v-if="active === 0" v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-card v-for="item in goodlists.A" :key="item.name"
        :num="item.sellCount"
        :thumb="item.picture"
        :price="item.price"
        :desc="item.description"
        :title="item.name"
        >
        <template slot="bottom">  <!-- 自定义底部，为了实现商品数量功能 -->
          <div class="num">
              <van-button size="normal" @click="minusnum(item.name,num)" :disabled="num <=1">-</van-button> <!-- 数量小于1时禁用按钮 -->
              {{num}}
              <van-button size="normal" @click="addnum(num)">+</van-button>
          </div>
        </template>
      </van-card>
      
       
     </van-list>
    </van-pull-refresh>
    <van-pull-refresh  v-if="active === 1" v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-card v-for="item in goodlists.B" :key="item.name"
        :num="item.sellCount"
        :thumb="item.picture"
        :price="item.price"
        :desc="item.description"
        :title="item.name"
        >
        <template #footer>
        <van-button size="normal"><icon name="plus" /></van-button>
        <van-button size="normal"><icon name="minus" /></van-button>
        </template>
      </van-card>
      
       
     </van-list>
    </van-pull-refresh>
    <van-pull-refresh  v-if="active === 2" v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-card v-for="item in goodlists.C" :key="item.name"
        :num="item.sellCount"
        :thumb="item.picture"
        :price="item.price"
        :desc="item.description"
        :title="item.name"
        >
        <template #footer>
        <van-button size="normal"><icon name="plus" /></van-button>
        <van-button size="normal"><icon name="minus" /></van-button>
        </template>
      </van-card>  
     </van-list>
    </van-pull-refresh>
    <van-pull-refresh  v-if="active === 3" v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-card v-for="item in goodlists.D" :key="item.name"
        :num="item.sellCount"
        :thumb="item.picture"
        :price="item.price"
        :desc="item.description"
        :title="item.name"
        >
        <template #footer>
        <van-button size="normal"><icon name="plus" /></van-button>
        <van-button size="normal"><icon name="minus" /></van-button>
        </template>
      </van-card>
      
       
     </van-list>
    </van-pull-refresh>
    <van-pull-refresh  v-if="active === 4" v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-card v-for="item in goodlists.E" :key="item.name"
        :num="item.sellCount"
        :thumb="item.picture"
        :price="item.price"
        :desc="item.description"
        :title="item.name"
        >
        <template #footer>
        <van-button size="normal"><icon name="plus" /></van-button>
        <van-button size="normal"><icon name="minus" /></van-button>
        </template>
      </van-card>   
     </van-list>
    </van-pull-refresh>
  </template>
</van-tree-select>
  </div>
</template>


<script>
import {getGoodLists} from '@/api/data';
import { NavBar,Grid, GridItem,Image,Icon,Swipe, SwipeItem,TreeSelect,PullRefresh,List,Card,Tag,Button } from 'vant';

export default {
  data(){
    return {
      restaurantsId:this.$route.query.id,
      restaurantsName:"",
      count: 0,
      isLoading: false,
      list: [],
      goodlists: [],
      loading: false,
      finished: false,
      refreshing: false,
      active: 0,
      items: [],
      num: 0,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
        'https://img01.yzcdn.cn/vant/apple-3.jpg'
      ],
    }
  },
  components: {
    VanGrid:Grid, VanGridItem:GridItem, VanImage:Image,NavBar,Icon,VanSwipe:Swipe,VanPullRefresh:PullRefresh,
    VanSwipeItem:SwipeItem,VanTreeSelect:TreeSelect,VanList:List,VanCard:Card,VanTag:Tag,VanButton:Button
  },
  methods:{
     onClickLeft() {
     this.$router.go(-1);
    },
    onClickRight() {
       console.log("right");
    },
    addnum(num){
           this.num = num + 1
        },
        minusnum(num){
          this.num = num - 1
        },
     onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
      onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  mounted(){
    getGoodLists(this.restaurantsId).then((res)=>{
      this.restaurantsName = res.name
      this.items=res.category
      this.goodlists=res.good
      console.log(this.goodlists)
    })
  }
}
</script>

<style lang="less">



  .van-nav-bar{
    background: #3190e8;
  }
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

</style>