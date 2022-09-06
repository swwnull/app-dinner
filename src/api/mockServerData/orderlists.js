const orderlists ={
      user_id: "u101",
      id:101,
      username: 'Suger',
      code: 0,
      roles: ['admin'],
      introduction: '我是超级管理员',
      picture: 'https://img01.yzcdn.cn/vant/cat.jpeg',   
      orderlists:[{"name": "南瓜饭","id":"a32","number":2,"price":9,"image": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"}]
    }
  
  
  
    export default function (res){
     function getvl(uid) {
      var reg = new RegExp("(^|\\?|&)"+ uid +"=([^&]*)(\\s|&|$)", "i");
      if (reg.test(res.url)) return unescape(RegExp.$2.replace(/\+/g, " "));
      return "";
      };
      let uid = getvl("uid");
    if(uid===orderlists.user_id){
      return orderlists
    }
    else{
      return alert("登录过期")
    }
    
  };
  
