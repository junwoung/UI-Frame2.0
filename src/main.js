// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './frame/common/utils'
import vFrame from './frame/frame/frame.js'
import vSelect from './components/vSelect/select.js'

Vue.config.productionTip = false

//  引入自定义公用方法
Vue.prototype.$utils = utils

//  导入框架组件和公用组件

Vue.use(vFrame)
Vue.use(vSelect)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
