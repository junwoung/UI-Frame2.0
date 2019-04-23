/**
* @author: wangjun
* @date: 2019-04-19 14:24:39
* @desc: 注册轮播组件
*/
import vCarousel from './carousel.vue'

const carousel = {
  name: 'vCarousel',
  install: function (Vue) {
    Vue.component('v-carousel', vCarousel)
  }
}

export default carousel
