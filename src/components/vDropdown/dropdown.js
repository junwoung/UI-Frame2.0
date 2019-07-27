/**
* @author: wangjun
* @date: 2019-07-20 16:38:39
* @desc: 注册下拉选择组件
*/

import vDropdown from './dropdown.vue'
import vDropOption from './dropOption.vue'

const dropdown = {
  name: 'v-dropdown',
  install: function (Vue) {
    Vue.component('v-dropdown', vDropdown)
  }
}

export {dropdown}

const dropOption = {
  name: 'v-drop-option',
  install: function (Vue) {
    Vue.component('v-drop-option', vDropOption)
  }
}

export {dropOption}
