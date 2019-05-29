/**
* @author: wangjun
* @date: 2019-05-22 19:54:11
* @desc: 全局注册各指令
*/

import Vue from 'vue'
import focus from './resources/focus'
import number from './resources/number'
import top from './resources/top'
import lazyload from './resources/lazyload'

focus(Vue)
number(Vue)
top(Vue)
lazyload(Vue)
