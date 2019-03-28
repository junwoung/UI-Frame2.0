// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//  导入框架组件和公用组件
import utils from './frame/common/utils'
import dialog from './components/dialog/dialog.js'
import vFrame from './frame/frame/frame.js'
import vSelect from './components/vSelect/select.js'
import vCheckbox from './components/vCheckbox/checkbox.js'
import vRadio from './components/vRadio/radio.js'
import vTab from './components/vTab/tab.js'
import vPagination from './components/vPagination/pagination.js'
import vUpload from './components/vUpload/upload.js'
import vTime from './components/vTime/time.js'

//  引入query插件
import vQuery from './components/vQuery/query'
Vue.use(vQuery)

Vue.config.productionTip = false

//  引入自定义对话框
Vue.prototype.$dialog = dialog
console.log(Vue.prototype.$dialog)
//  引入自定义公用方法
Vue.prototype.$utils = utils

//  导入框架组件和公用组件
Vue.use(vFrame)
Vue.use(vSelect)
Vue.use(vCheckbox)
Vue.use(vRadio)
Vue.use(vTab)
Vue.use(vPagination)
Vue.use(vUpload)
Vue.use(vTime)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
