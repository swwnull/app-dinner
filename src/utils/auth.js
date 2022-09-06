const TokenKey = 'jwttoken'//token秘钥
const Userinfo = 'Userinfo'
const Orderlist = 'Orderlist'
const Islogin = 'Islogin'


export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeAll() {
  return localStorage.clear()
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function setshoplists(data) {
  return localStorage.setItem(Orderlist,JSON.stringify(data))
}

export function getshoplists() {
  let list =JSON.parse(localStorage.getItem('Orderlist'))
  return list
}
// export function setUsername(username) {
//   return Cookies.set(Username,username)
// }

export function getUserinfo() {
  let uinfo =JSON.parse(localStorage.getItem('Userinfo'))
  return uinfo
}
export function setUserinfo(info) {
  return localStorage.setItem(Userinfo,JSON.stringify(info))
}

export function setIslogin(is) {
  return localStorage.setItem(Islogin,is)
}
export function getIslogin() {
  return localStorage.getItem(Islogin)
}