/**
* @author: wangjun
* @date: 2019-03-07 18:21:03
* @desc: 注册tab组件
*/
import vTab from './tab.vue'

const tab = {
  name: 'vTab',
  install: function (Vue) {
    Vue.component('v-tab', vTab)
  }
}

export default tab
