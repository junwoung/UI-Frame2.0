// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//  导入框架组件和公用组件
import utils from './frame/common/utils'
import vFrame from './frame/frame/frame.js'
import vSelect from './components/vSelect/select.js'
import vCheckbox from './components/vCheckbox/checkbox.js'
import vRadio from './components/vRadio/radio.js'
import vTab from './components/vTab/tab.js'

Vue.config.productionTip = false

//  引入自定义公用方法
Vue.prototype.$utils = utils

//  导入框架组件和公用组件
Vue.use(vFrame)
Vue.use(vSelect)
Vue.use(vCheckbox)
Vue.use(vRadio)
Vue.use(vTab)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
