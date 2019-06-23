// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//  导入vuex
import store from './vuex/vuex'
import router from './router'

//  引入apis并将axios挂载到Vue.prototype.$axios
import apis from './apis/apis'

//  批量引入并全局注册自定义组件
require('./router/componentRouter.js')
//  引入自定义指令
require('./directives/injection.js')

Vue.config.productionTip = false

//  挂载接口到原型上
Vue.prototype.$apis = apis
console.log(Vue.prototype.$apis)

//  判断登陆问题
require('./router/login')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
