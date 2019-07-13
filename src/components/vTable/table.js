/**
* @author: wangjun
* @date: 2019-07-10 21:02:32
* @desc: 注册table组件
*/

import vTable from './table.vue'
import vTheadCol from './theadCol.vue'

const table = {
  name: 'vTable',
  install: function (Vue) {
    Vue.component('v-table', vTable)
  }
}

export {table}

const theadCol = {
  name: 'vTheadCol',
  install: function (Vue) {
    Vue.component('v-thead-col', vTheadCol)
  }
}

export {theadCol}
