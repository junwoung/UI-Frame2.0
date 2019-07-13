/**
* @author: wangjun
* @date: 2019-07-09 16:49:34
* @desc: 全局注册form表单组件
*/

import Vue from 'vue'
import {form, formItem, formControl} from './form'
import validate from './validate'

Vue.use(form)
Vue.use(formItem)
Vue.use(formControl)
Vue.prototype.$validate = validate
