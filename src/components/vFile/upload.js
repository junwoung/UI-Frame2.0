/**
* @author: wangjun
* @date: 2019-07-28 11:13:40
* @desc: 注册文件上传组件
*/
import Vue from 'vue'
import vFile from './upload.vue'
import download from './download'

const file = {
  name: 'v-file',
  install: function (Vue) {
    Vue.component('v-file', vFile)
  }
}

Vue.use(file)
Vue.prototype.$download = download.downloadFile
