<template>
  <div>
      <nav-bar id=content
      title="用户登陆"
      left-text="返回"
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="revoke" size="20"/>
      </template>
    </nav-bar>
<van-form @submit="onSubmit" style="margin-top:1rem;">
  <van-field
    v-model="username"
    name="username"
    label="用户名"
    placeholder="用户名"
    style="height:1rem"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { NavBar,Icon,Form,Button,Field } from 'vant';
export default {
 data() {
    return {
      username: 'admin',
      password: '123456',
    };
  },
  components: {
   NavBar,VanIcon:Icon,VanForm:Form,VanButton:Button,VanField:Field
    },
  methods: { 
    onSubmit(values) {
     this.$store.dispatch('user/login', values).then(() => {
       console.log(this.$store.getters.username)
            this.$router.push({ path:'/mine' })
          }).catch((err) => {
            console.log(err)
          
          })
    },
     onClickLeft() {
     this.$router.go(-1);
    },
  },
}
</script>

<style>

</style>