<template>
    <div>
     <van-card  
        :num="foodlists.sellCount"
        :thumb="foodlists.picture"
        :price="foodlists.price"
        :desc="itemtotal"
        :title="foodlists.name"
        >
        <template slot="bottom">  <!-- 自定义底部，为了实现商品数量功能 -->
          <div class="num">
              <van-button size="normal" @click.stop.prevent="minusnum(foodlists.gid,foodlists.price,foodlists.name,foodlists.picture)" :disabled="foodlists.count <=0">-</van-button> <!-- 数量小于1时禁用按钮 -->
              {{foodlists.count||0}}
              <van-button size="normal" @click.stop.prevent="addnum(foodlists.gid,foodlists.price,foodlists.name,foodlists.picture)">+</van-button>
          </div>
        </template>
      </van-card>
    </div>
</template>

<script>
import { Card,Button,Cell} from 'vant';


export default{
     data(){
    return {
      itemtotal:0,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
        'https://img01.yzcdn.cn/vant/apple-3.jpg'
      ],
    }
  },
    props: {
    foodlists: Array
  },
   components: {
   VanCard:Card,VanButton:Button,VanCell:Cell
  },
  computed:{
    
  },
  methods:{
      addnum(id,price,name,picture){
         if(this.$store.getters.token){
             if (!this.foodlists.count) {
        Vue.set(this.foodlists, 'count', 0)
      }
           this.foodlists.count++;
           var data={
               "id":id,
               "name":name,
               "picture":picture,
               "price":price,
               "num": this.foodlists.count
             }
        this.$store.dispatch('user/addgood',data)
        console.log("123123123123")
        this.$store.dispatch('user/setshopnum')
         console.log(this.$store.getters.shopnumber)
         }
         else{
           alert("请先登录")
           this.$router.push({ path:'/login' })
         }
        },

        minusnum(id,price,name,picture){
         this.foodlists.count--;
        var data={
               "id":id,
               "name":name,
               "picture":picture,
               "price":price,
               "num": this.foodlists.count
             }
         this.$store.dispatch('user/deletegoods',data)
        }
  },
}
</script>
