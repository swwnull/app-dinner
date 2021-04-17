import Cookies from 'js-cookie'

const TokenKey = 'jwttoken'//token秘钥
const Username = ""
const Avatar = ""


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return Cookies.get(Username)
}
export function setUsername(username) {
  return Cookies.set(Username,username)
}
export function getAvatar() {
  return Cookies.get(Avatar)
}
export function setAvatar(avatar) {
  return Cookies.set(Avatar,avatar)
}
