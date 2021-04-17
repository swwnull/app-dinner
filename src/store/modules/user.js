import { login,orderlists} from '@/api/data'
import { getToken, setToken,removeToken,setUsername,setAvatar} from '@/utils/auth'


const getDefaultState = () => {
  return {
    token: getToken(),
    username: "",
    avatar:""

  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_USERAVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
   
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log(response)
        commit('SET_USERNAME', response.username)//提交 mutation
        commit('SET_TOKEN', response.token)
        commit('SET_USERAVATAR', response.avatar)
        setToken(response.token)
        setUsername(response.username)
        setAvatar(response.avatar)
        console.log("51"+state.username)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get orderlists
  orderlists({ commit, state }) {
    console.log("51"+state.avatar)
    return new Promise((resolve, reject) => {
      orderlists(state.username).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      
        removeToken() // must remove  token  first
        commit('RESET_STATE')
        resolve()
      
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}