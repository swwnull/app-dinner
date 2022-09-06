import axios from '@/api/axios'

const pathconfig={
    banner:"banner", ///第三方登录,
    position:"position", ///第三方注册,
    index_entry:"index_entry", ///第三方注册,
    goodlists:"goodlists",///注册聊天通道,
    users:"users",///获取用户个人信息  [login可用],
    orderlists:"orderlists",///发送数据
    restaurants:"restaurants",///获取历史记录,
    alipay:"alipay",///图片上传地址,
}

export const getBannerData = ()=>{
    return axios.request({
        url:pathconfig.banner,
        method:'get'
    })
}

export const getPosiData = (params) =>{
    return axios.request({
        url:pathconfig.position,
        method:"get",
        params
    })
}

export const getIndexEntryData = (params) =>{
    return axios.request({
        url:pathconfig.index_entry,
        method:"get",
        params
    })
}

export const getGoodLists = (params)=>{
    return axios.request({
        url:pathconfig.goodlists,
        method:'get',
        params
    })
}

export const login = (data)=>{
    return axios.request({
        url:pathconfig.users,
        method:'post',
        data
    })
}

export const orderlists = (params)=>{
    return axios.request({
        url:pathconfig.orderlists,
        method:'get',
        params
    })
}

export const getRestaurantsData = () =>{
    return axios.request({
        url:pathconfig.restaurants,
        method:"get"
    })
}

export const getAlipay = (data) =>{
    return axios.request({
        url:pathconfig.alipay,
        method:"post",
        data
    })
}

export function pay(data) {
    return request({
      url: pathconfig.alipay,
      method: 'post',
      data
    })
  }