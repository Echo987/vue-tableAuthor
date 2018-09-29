import axios from 'axios'
import {Message} from 'element-ui'
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000// 请求超时时间
})
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['userToken'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 2 * 1000
    })

    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    // if (res.code === 401 || res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    // }
    // return Promise.reject('error')
  } else {
    if (res.msg) {
      Message({
        message: res.msg,
        type: 'success',
        duration: 2 * 1000
      })
    }
    return response.data
  }
},
error => {
  console.log('err1111' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
})
export default service
