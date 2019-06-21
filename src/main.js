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
import vCarousel from './components/vCarousel/carousel.js'
import BaiduMap from 'vue-baidu-map'

//  引入axios
import apis from './apis/apis'

//  引入query插件
import vQuery from './components/vQuery/query'
Vue.use(vQuery)

//  引入地图
Vue.use(BaiduMap, {
  ak: 'WK3q5xVxKVXBDSgZ0gt8bmFkZbePNkKg'
})

//  引入自定义指令
require('./directives/injection.js')

Vue.config.productionTip = false

//  引入自定义对话框
Vue.prototype.$dialog = dialog

//  引入自定义公用方法
Vue.prototype.$utils = utils

//  挂载接口到原型上
Vue.prototype.$apis = apis
console.log(Vue.prototype.$apis)

//  判断登陆问题
require('./router/login')

//  导入框架组件和公用组件
Vue.use(vFrame)
Vue.use(vSelect)
Vue.use(vCheckbox)
Vue.use(vRadio)
Vue.use(vTab)
Vue.use(vPagination)
Vue.use(vUpload)
Vue.use(vTime)
Vue.use(vCarousel)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
