//  配置ajax请求
import axios from 'axios'
import Vue from 'vue'
import store from '../vuex/vuex'
Vue.prototype.$axios = axios

// let base = 'http://localhost:8080/public/index.php'
let apis = {
  //  获取初始化信息接口
  getInit: () => send('/index/index/getInit'),
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

//  获取初始化信息
async function getInit () {
  let res = await apis.getInit()
  if (res.ret.ret_code === 0) {
    store.commit('setConfig', res.data)
    console.log('获取初始化信息成功', res.data)
  } else {
    console.error('获取初始化信息失败')
  }
}
getInit()

export default apis
