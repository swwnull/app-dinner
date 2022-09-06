<template>
<div>
    <nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
      
    >
     <template #left>
        <Icon name="revoke" size="18" />
      </template>
      <template #right>
         <Icon name="star-o" size="18" />
      </template>

      <template #title>
        <span>关于我</span>
      </template>
    </nav-bar>
    <div class="about">
    <s-header :name="'关于我们'"></s-header>
    <div class="content">
        <span>关于我</span>
    </div>
  </div>
</div>
  
</template>

<script>
import { NavBar,Icon,} from 'vant';

export default {
 components: {
  NavBar,Icon,
  },
   methods:{
      onClickLeft() {
       this.$router.go(-1);
      },
   }
}

</script>

<style lang="less" scoped>
  .about {
    box-sizing: border-box;
    padding: 0.4rem;
    .content {
      margin-top: 0.88rem;
      font-size: 0.36rem;
      a {
        color: #007fff;
      }
    }
  }
</style>
