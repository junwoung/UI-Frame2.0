//  配置ajax请求
import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$axios = axios

// let base = 'http://localhost:8080/public/index.php'
let apis = {
  //  上传相关接口
  upload: {
    img: file => send('/upload/upload/img', 'post', file)
  },
  //  用户信息相关接口
  user: {
    register: data => send('/user/user/register', 'post', data)
  }
}

const send = function (url, method = 'get', data) {
  return new Promise((resolve, reject) => {
    axios[method](url, data).then(res => {
      resolve(res.data)
    }).catch(res => {
      console.log(`${url}请求失败`)
      reject(res)
    })
  })
}

export default apis
