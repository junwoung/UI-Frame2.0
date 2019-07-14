/**
* @author: wangjun
* @date: 2019-07-14 10:23:11
* @desc: 注册按钮组
*/

import vBtnGroup from './btnGroup.vue'

const btnGroup = {
  name: 'v-btn-group',
  install: function (Vue) {
    Vue.component('v-btn-group', vBtnGroup)
  }
}

export {btnGroup}
