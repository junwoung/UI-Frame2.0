/**
* @author: wangjun
* @date: 2019-07-25 10:14:19
* @desc: 注册行组件和单元组件
*/

import vRow from './row.vue'
import vCol from './col.vue'

const row = {
  name: 'v-row',
  install: function (Vue) {
    Vue.component('v-row', vRow)
  }
}

export {row}

const col = {
  name: 'v-col',
  install: function (Vue) {
    Vue.component('v-col', vCol)
  }
}

export {col}
