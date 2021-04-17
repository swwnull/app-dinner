import {jwt} from '@/config/config'
const jsonwebtoken = require('jsonwebtoken');

const userMap ={
      username:'admin',
      password:'123456',
      id:101
     }
const userindex ={
      id:101,
      username: 'Suger',
      code: 0,
      roles: ['admin'],
      introduction: '我是超级管理员',
      avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',   
      token:'null'
    }
  
  
    export default function (user) {
      let res=JSON.parse(user.body)
      if(res.username===userMap.username&&res.password===userMap.password){
        const userInfo = {
          name:userindex.username
        };
        // 获取jwt的配置信息
        console.log(res)
        const {secret,cookie,expire} =jwt
        const token = jsonwebtoken.sign(userInfo,secret,{expiresIn:expire});//签署expire小时期限的token:
        if(userMap.id===userindex.id)
        {userindex.token=token;
        return userindex;}
      }
      else{
        return alert("账号密码错误")
      }
     
  }

  
  
 