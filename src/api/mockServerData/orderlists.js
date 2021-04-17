const orderlists ={
      uid:101,
      username: 'Suger',
      code: 0,
      roles: ['admin'],
      introduction: '我是超级管理员',
      picture: 'https://img01.yzcdn.cn/vant/cat.jpeg',   
      orderlists:[{"name": "南瓜饭","gid":"a312","num":2,"price":9,"picture": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"}]
    }
  
  
  
    export default function (data){
      console.log(data)
    if(data.body){
      return orderlists
    }
    return alert("登录过期")
  };
  
