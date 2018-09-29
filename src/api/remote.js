import request from '@/utils/index'

// 用户名密码登录
var qs = require('qs')
export function login () {
  return request({
    url: 'userInfo',
    method: 'post',
    data: qs.stringify()
  })
}

// export function Login ({account, password}) {
//   const _url = url + 'login/loginIn'
//   return post(_url, {account, password})
// }
// // 退出登录
// export function LoginOut (token) {
//   const _url = url + 'login/loginOut'
//   return post(_url, token)
// }

// // 获取用户的组织机构树
// export function userTree () {
//   const _url = url + 'org/list'
//   return post(_url)
// }
// // 获取个人信息
// export function getSelfInfo () {
//   const _url = url + 'login/selfInfo'
//   return post(_url)
// }
// /// 用户的区块列表
// export function areaData () {
//   const _url = url + 'block/list'
//   return post(_url)
// }
// export function getBaseInformation ({blockId}) {
//   const _url = url + 'block/listData'
//   return post(_url, {blockId})
// }
