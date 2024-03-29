import axios from 'axios'
import config from '@/config'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

//console.log(process.env.NODE_ENV)
class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig(){
        const config = {
            baseURL:this.baseUrl,
            header:{
                // 'content-type': 'application/json',
            }
        }
        return config
    }
    
    interceptors(instance,url){
      instance.interceptors.request.use(
        config => {
          // do something before request is sent
          if (store.getters.token) {
            config.headers['X-Token'] = getToken()
          }
          return config
        },
        error => {
          // do something with request error
          // for debug
          
          return Promise.reject(error)
        }
      )

instance.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      alert(response.message || 'Error')
      
      router.push('/login')
      return Promise.reject(new Error(config.message || 'Error'))
    } else {
      if(window.location.hash=="#/login"){
        checkAuth(res)
      }
      return res
    }
  },
  error => {
    console.log("这是错误："+error)
    console.log('err' + error) // for debug
    alert(error.message)
    return Promise.reject(error)
  }
)
}
    request(options){
        const instance = axios.create()//创造实例对象
        options = Object.assign(this.getInsideConfig(),options)
        this.interceptors(instance,options.url)
        return instance(options)
    }
    
}
function checkAuth(res){
  if(res.error == 'JWT校验失败'){
    alert('请重新登陆')
    router.push('/login')
  }else if(res.token){
    setToken(res.token)
  }
  return res
}

const axiosObj = new HttpRequest(baseUrl)
export default axiosObj