//  注册里程碑组件
import vLandmark from './landmark.vue'

const landmark = {
  name: 'v-landmark',
  install: function (Vue) {
    Vue.component('v-landmark', vLandmark)
  }
}

export default landmark
