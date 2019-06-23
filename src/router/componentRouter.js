//  批量引入组件并注册
import Vue from 'vue'

import utils from '../frame/common/utils'
import dialog from '../components/dialog/dialog.js'
import vFrame from '../frame/frame/frame.js'
import vSelect from '../components/vSelect/select.js'
import vCheckbox from '../components/vCheckbox/checkbox.js'
import vRadio from '../components/vRadio/radio.js'
import vTab from '../components/vTab/tab.js'
import vPagination from '../components/vPagination/pagination.js'
import vUpload from '../components/vUpload/upload.js'
import vTime from '../components/vTime/time.js'
import vCarousel from '../components/vCarousel/carousel.js'

import BaiduMap from 'vue-baidu-map'
//  引入query插件
import vQuery from '../components/vQuery/query'
Vue.use(vQuery)

//  引入地图
Vue.use(BaiduMap, {
  ak: 'WK3q5xVxKVXBDSgZ0gt8bmFkZbePNkKg'
})

//  引入自定义对话框
Vue.prototype.$dialog = dialog

//  引入自定义公用方法
Vue.prototype.$utils = utils

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
