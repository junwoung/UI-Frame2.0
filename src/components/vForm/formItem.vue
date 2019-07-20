<!-- created by wangjun on 2019-07-09 -->
<template>
  <div ref="formItem" class="v-form-item v-clearfix" v-bind="$attrs">
    <slot></slot>
    <span v-if="errorMsg" class="v-form-item-error" :style="{left: computePosition()}">{{errorMsg}}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      model: null,
      rules: null,
      scope: null,
      errorMsg: ''
    }
  },
  methods: {
    init: function () {
      let prop = this.$attrs.prop
      if (this.rules && prop !== undefined && prop !== null) {
        this.errorMsg = this.rules[prop] && this.rules[prop].error
      }
      let dom = this.$refs.formItem.children[1]
      let type = this.$attrs.trigger
      if (dom && type) this.bindEvent(dom, type)
    },
    //  计算报错信息提示偏移量
    computePosition () {
      //  一般情况下，表单每一部分都是标题 + 文本框/选择框等输入控件组成
      //  所以报错信息一般都是对齐第二个节点，如果不存在的话就对齐标题
      let container = this.$refs.formItem
      let inputEle = this.$refs.formItem.children[1]
      if (inputEle && container) {
        let inputRect = inputEle.getBoundingClientRect()
        let containerRect = container.getBoundingClientRect()
        return `${inputRect.left - containerRect.left}px`
      }
    },
    bindEvent (dom, type) {
      //  定义允许绑定的事件类型
      let allowsType = ['blur', 'focus', 'input', 'keydown', 'keyup', 'keypress', 'change', 'click']
      if (allowsType.includes(type)) {
        if (dom) {
          //  bind延迟执行（注意第一传入参数是作用域对象）
          // dom['on' + type] = debounce(this.scope.$validate.check.bind(this.scope, this.model, this.rules, this.scope, [this.$attrs.prop]), 300)
          dom.addEventListener(type, debounce(this.scope.$validate.check.bind(this.scope, this.model, this.rules, this.scope, [this.$attrs.prop]), 300))
        }
      }
      //  防抖函数，默认500ms
      function debounce (fn, wait = 500) {
        let timer = null
        return function () {
          if (timer) return clearTimeout(timer)
          timer = setTimeout(() => {
            fn && fn.call(this, ...arguments)
            timer = null
          }, wait)
        }
      }
    }
  },
  mounted () {
    //  延迟执行，避免先于父组件（formControl)先赋值，而造成值为null情况
    setTimeout(() => {
      this.model = this.$parent.model
      this.rules = this.$parent.rules
      this.scope = this.$parent.scope
      this.init()
    }, 10)
  },
  watch: {
    //  监听error变化，及时呈现报错信息
    '$parent.rules.rules_timestamp': function (val) {
      let prop = this.$attrs.prop
      if (prop !== undefined && prop !== null) {
        this.errorMsg = this.$parent.rules[prop] && this.$parent.rules[prop].error
      }
    },
    'errorMsg': function (val) {
      let input = this.$refs.formItem.children[1]
      if (!input || input.nodeName !== 'INPUT') return
      if (val) {
        input.style = 'border-color: #f56c6c!important;'
      } else {
        input.style = ''
      }
    }
  }
}
</script>

<style scoped>
.v-form-item {
  float: left;
  position: relative;
}
.v-clearfix {
  zoom: 1;
}
.v-clearfix::after {
  content: '';
  clear: both;
  display: block;
}
.v-form-item-error {
  position: absolute;
  font-size: 12px;
  color: #f56c6c;
}
</style>
