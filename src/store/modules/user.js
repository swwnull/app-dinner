import { login,orderlists} from '@/api/data'
import getDefaultState from '@/store/state'
import { setToken,setIslogin,removeAll,setUserinfo,setshoplists} from '@/utils/auth'
import { addgoods,deletegood} from '@/utils/shop'



const state = getDefaultState

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
 
  SET_USERINFO: (state, info) => {
    state.userinfo = info
  },
  SET_SHOPLISTS: (state, list) => {
    state.shoplists.push(list)
  },
 
  SET_ISLOGIN: (state, is) => {
    state.islogin=is
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password.trim()}).then(response => {
        const info = process.env.NODE_ENV === 'development'? response:response.data.userInfo
        commit('SET_TOKEN', info.token)
        commit('SET_USERINFO', info)
        commit('SET_ISLOGIN',"true")
        setToken(info.token)
        setUserinfo(info)
        setIslogin("true")
        resolve()
      }).catch(error => {
        console.log("window.location")
        reject(error)
      })
    })
  },

  // get orderlists
  orderlists({ commit,state}) {
    return new Promise((resolve, reject) => {
      orderlists({uid:state.userinfo.id}).then(response => {
        if(state.shoplists.length!=0){
          console.log(state.shoplists)
          console.log("state.shoplists1")
          resolve(response)
        }
        console.log(state.shoplists)
        console.log("order.response")
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeAll() // must remove  
      commit('SET_ISLOGIN', "false")
      setIslogin("false")
      commit('RESET_STATE')
      resolve()
      
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  
      commit('SET_ISLOGIN', "false")
      setIslogin("false")
      commit('RESET_STATE')
      resolve()
    })
  },

  //shoplists
  addgood({commit,state},data){
     if(state.shoplists.length==0){
      commit('SET_SHOPLISTS', data)
      setshoplists(data)
    }
    else{
      addgoods(data)
    } 
  },

 deletegoods({commit,state},data){
    console.log(state.shoplists)
     if(state.shoplists){
      deletegood(data)
      console.log(state.shoplists)
        }
    // }
    else{
     console("没有购买任何商品")
    } 
  },
  
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}