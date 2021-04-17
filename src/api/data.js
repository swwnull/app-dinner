import axios from '@/api/axios'

export const getBannerData = ()=>{
    return axios.request({
        url:"banner",
        method:'get'
    })
}



export const getPosiData = (params) =>{
    return axios.request({
        url:"posi",
        method:"get",
        params
    })
}

export const getIndexEntryData = (params) =>{
    return axios.request({
        url:"index_entry",
        method:"get",
        params
    })
}

export const getGoodLists = (data)=>{
    return axios.request({
        url:"goodlists",
        method:'get',
        data
    })
}

export const login = (data)=>{
    return axios.request({
        url:"users",
        method:'post',
        data
    })
}

export const orderlists = (data)=>{
    return axios.request({
        url:"orderlists",
        method:'get',
        data
    })
}

export const getRestaurantsData = () =>{
    return axios.request({
        url:"restaurants",
        method:"get"
    })
}