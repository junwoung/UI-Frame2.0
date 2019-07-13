/**
* @author: wangjun
* @date: 2019-07-09 16:19:12
* @desc: 注册表单组件
*/

import vForm from './form.vue'
import vFormItem from './formItem.vue'
import vFormControl from './formControl.vue'

const form = {
  name: 'v-form',
  install: function (Vue) {
    Vue.component('v-form', vForm)
  }
}

export {form}

const formItem = {
  name: 'v-form-item',
  install: function (Vue) {
    Vue.component('v-form-item', vFormItem)
  }
}

export {formItem}

const formControl = {
  name: 'v-form-control',
  install: function (Vue) {
    Vue.component('v-form-control', vFormControl)
  }
}

export {formControl}
