<!-- created by wangjun on 2019-03-18 -->
<template>
  <div class="v-query" v-if="data">
    <div class="v-query-container" v-for="(item, index) in data.dimension" :key="index">
      <v-dimension :dimension='[item]' @callback='getSelected' :cancelCheck='cancelItems[index]' :index='index' :disable='query.disable'></v-dimension>
    </div>
    <div class="v-dimen-select-area clearfix" v-if="showText && showText.length">
      <label class="v-query-label">已选</label>
      <div class="v-dimen-slelected-options">
        <span
         v-for="(item, idx) in showText"
         @mouseover="showTextFlag = item.uuid"
         @mouseleave="showTextFlag = null"
         :key="idx">
          {{item.text}}
          <em
           class="v-query-cancel"
           @click="cancelSelected(item.uuid, item.index)"
           v-if="!query.disable && showTextFlag === item.uuid"></em>
        </span>
      </div>
      <span class="v-dimen-clearAll" @click="clearAll">清空</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vDimension from './dimension.js'
Vue.use(vDimension)
export default {
  name: 'vQuery',
  data () {
    return {
      //  获取到的ajax数组
      data: null,
      //  用于接收各个组件返回的选项
      checked: {},
      //  将上面的属性各个子数组拼接成一个并展示
      showText: [],
      //  存放对应checkedJson
      checkedJson: [],
      //  用于展示关闭选项用
      showTextFlag: false,
      //  存放每次取消的选项数据
      cancelItems: []
    }
  },
  props: {
    query: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function () {
      let q = this.query
      if (!q || !q.src) return
      // q.callback && q.callback()
      //  请求数据
      this.ajax(q.src, q.params)
    },
    ajax: function (src, params) {
      /**
      * @author: wangjun
      * @date: 2019-03-18 16:41:34
      * @desc: 封装ajax请求
      * @params: 1、src: 请求地址；2、params: 请求携带参数
      */
      //  拼接参数
      if (params) {
        let paramsStr = ''
        for (let key in params) {
          if (params[key]) {
            paramsStr += `${key}=${params[key]}&`
          }
        }
        if (paramsStr) {
          paramsStr = paramsStr.substr(0, paramsStr.length - 1)
          src += `?${paramsStr}`
        }
      }
      //  发送ajax请求
      let request = new XMLHttpRequest()
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            //  抛出结果
            this.data = JSON.parse(request.responseText)
            //  初始化节点完成后，执行初始化函数操作
            this.$nextTick(() => {
              if (this.query.init && typeof this.query.init === 'function') this.query.init()
            })
            console.log(this.data)
          }
        }
      }
      request.open('get', src)
      request.send()
    },
    getSelected: function (options) {
      /**
      * @author: wangjun
      * @date: 2019-03-22 18:42:05
      * @desc: 接收回调函数
      * @param: options 接收Array类型参数 [子组件index, 子组件选中的文本， 子组件选中的checkedJson]
      */
      this.checked[options[0]] = options[1]
      this.checkedJson[options[0]] = options[2]
      let jsonArr = JSON.parse(JSON.stringify(this.checkedJson))
      //  过滤掉空选项以及list为空数组的项
      for (let i = jsonArr.length - 1; i >= 0; i--) {
        if (!jsonArr[i] || !jsonArr[i].list.length) {
          jsonArr.splice(i, 1)
        }
      }
      //  拼接checkedJson字符串
      let checkedJsonStr = JSON.stringify(jsonArr)
      this.$emit('callback', checkedJsonStr)
      let arr = []
      for (let key in this.checked) {
        if (this.checked[key]) arr = arr.concat(this.checked[key])
      }
      this.showText = arr
    },
    cancelSelected: function (uuid, idx) {
      /**
      * @author: wangjun
      * @date: 2019-03-22 16:49:21
      * @desc: 取消一个已选择的选项
      * @desc: 因为不在一个组件内，所以需要通过props传值，watch监听调用子组件相关取消方法
      * @desc: 因为是监听值的变化，所以执行完成后将值默认设置为空，避免不能同时取消一项选项bug
      */
      if (this.query.disable) return
      this.cancelItems.splice(idx, 1, uuid)
      setTimeout(() => {
        this.cancelItems.splice(idx, 1, '')
      }, 10)
    },
    clearAll: function () {
      //  注释信息参考cancelSelected
      //  因为是清空所有选项，因此同时改变所有子组件相关属性值
      if (this.query.disable) return
      this.data.dimension.map((item, idx) => {
        this.cancelItems.splice(idx, 1, 'all')
      })
      setTimeout(() => {
        this.cancelItems.map((item, idx) => {
          this.cancelItems.splice(idx, 1, '')
        }, 10)
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
@import 'query.css'
</style>
