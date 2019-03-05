// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//  引入自定义公用方法
import utils from './frame/common/utils'
Vue.prototype.$utils = utils

//  导入具体业务
import vFrame from './frame/frame/frame.js'
Vue.use(vFrame)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
