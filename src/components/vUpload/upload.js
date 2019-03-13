/**
* @author: wangjun
* @date: 2019-03-12 09:26:01
* @desc: 注册upload组件
*/

import vUpload from './upload.vue'

const upload = {
  name: 'vUpload',
  install: function (Vue) {
    Vue.component('v-upload', vUpload)
  }
}

export default upload
