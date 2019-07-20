<!-- created by wangjun on 2019-07-09 -->
<template>
  <div class="v-input" ref="vInput">
    <div v-if="flag" class="v-input-inner" :style="justWidth()">
      <!-- 前缀 -->
      <span v-if="prefix" :title="prefix" :style="justPreStyle()" class="v-input-pre"><input readonly v-model="prefix"></span>
      <!-- 输入框 -->
      <input
      :class="{'v-input-error': error || errorFlag}"
      :style="justStyle()"
      :type="type"
      :value="current"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete='autocomplete'
      :placeholder="placeholder"
      v-bind="$attrs"
      ref="input"
      @click="click"
      @focus="focus"
      @blur="blur"
      @change="change"
      @select="select"
      @keydown="keydown"
      @input="input"
      @mousedown="mousedown"
      @mousewheel="mousewheel"
      @mouseenter="mouseenter"
      @mouseout="mouseout"
      @mouseup="mouseup"
      @mouseleave="mouseleave"
      @mousemove="mousemove"
      @mouseover="mouseover"
      @keyup="keyup"
      @keypress="keypress"
      @dblclick="dbclick"
      >
      <!-- 图标，当自定义图标的时候隐藏 -->
      <i v-if="!$slots.icon" @click="$refs.input.focus()" ref="icon" :class="iconStatus" class="v-input-icon" :style="setIcon()"></i>
      <!-- 自定义图标 -->
      <i v-if="$slots.icon" @click="$refs.input.focus()" ref='diyIcon'  class="v-input-icon-diy" :style="setIcon(1)">
        <slot name="icon" class="v-input-slot-icon">
        </slot>
      </i>
      <!-- 尾缀 -->
      <span v-if="tail" :title="tail" :style="justTailStyle()" class="v-input-tail"><input readonly v-model="tail"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      //  输入框的值
      current: this.value,
      //  延迟加载组件，避免无法更新样式问题
      types: ['number', 'user', 'search', 'email', 'password', 'url', 'date', 'time', 'dropdown', 'phone', 'tel', 'addr'],
      flag: false,
      //  针对下拉列表，选中和未选中状态
      iconStatus: '',
      //  记录前一次输入框的值，当输入值不符合规定的时候还原到这个值
      previousVal: '',
      errorFlag: false
    }
  },
  props: {
    value: [String, Number],
    disabled: Boolean,
    readonly: Boolean,
    autocomplete: {
      type: String,
      default: 'on'
    },
    //  前缀
    prefix: {
      type: String,
      default: null
    },
    //  尾缀
    tail: {
      type: String,
      default: null
    },
    //  字底
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    //  输入框类型
    type: {
      type: String,
      default: ''
    },
    //  输入框icon
    icon: {
      type: String,
      default: ''
    },
    //  输入框最大输入值
    max: {
      type: [Number, String],
      default: null
    },
    //  最小值
    min: {
      type: [Number, String],
      default: null
    },
    //  最小长度
    minLen: {
      type: Number,
      default: null
    },
    //  是否必填
    require: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    //  调整输入框宽度
    justWidth () {
      return () => {
        let style = {}
        if (this.prefix) {
          style['padding-left'] = '20%'
        }
        if (this.tail) {
          style['padding-right'] = '20%'
        }
        return style
      }
    },
    //  调整输入框样式
    justStyle () {
      return () => {
        let style = {}
        let rd = this.borderRadius || (4 + 'px')
        //  圆角
        if (!this.prefix) {
          style['border-top-left-radius'] = rd
          style['border-bottom-left-radius'] = rd
        }
        if (!this.tail) {
          style['border-top-right-radius'] = rd
          style['border-bottom-right-radius'] = rd
        }
        //  边框颜色
        if (this.borderColor) {
          style['border-color'] = this.borderColor
        }
        //  输入框底图icon
        if ((this.icon && this.types.includes(this.icon)) || this.$slots.icon) {
          style['padding-right'] = '40px'
          if (!this.$slots.icon) return style
          /* eslint-disable */
          //  当自定义icon的时候，计算icon的尺寸再设置padding-right的长度
          setTimeout(() => {
            let ic = this.$refs.diyIcon
            this.$refs.input.style['padding-right'] = ic.getBoundingClientRect().width + 10 + 'px'
          }, 30)
        }
        return style
      }
    },
    //  调整前缀样式
    justPreStyle () {
      return () => {
        let style = {}
        let rd = this.borderRadius || (4 + 'px')
        if (this.prefix) {
          style['border-top-left-radius'] = rd
          style['border-bottom-left-radius'] = rd
        }
        if (this.borderColor) {
          style['border-color'] = this.borderColor
        }
        return style
      }
    },
    //  调整尾缀样式
    justTailStyle () {
      return () => {
        let style = {}
        let rd = this.borderRadius || (4 + 'px')
        if (this.tail) {
          style['border-top-right-radius'] = rd
          style['border-bottom-right-radius'] = rd
        }
        if (this.borderColor) {
          style['border-color'] = this.borderColor
        }
        return style
      }
    },
    //  设置背景图片
    setIcon (n) {
      return (n) => {
        let style = {}
        //  输入框底图icon
        if (this.icon && this.types.includes(this.icon) && !n) {
          let url = require(`./icons/${this.icon}.png`)
          style['background-image'] = `url(${url})`
        }
        if (this.icon === 'dropdown') {
          style['background-position'] = 'center center'
        }
        if (this.tail) {
          style.right = '21%'
        }
        if (n) {
          /* eslint-disable */
          setTimeout(() => {
            this.$refs.input.style['padding-right'] = '40px'
          }, 10)
        }
        return style
      }
    }
  },
  methods: {
    init: function () {
      this.getStyle()
    },
    //  输入事件
    input (event) {
      event = event || window.event
      let val = event.target.value
      if (this.max) {
        if (this.max < val) return event.target.value = this.previousVal
      }
      //  必须要将值赋给current
      this.current = val
      //  触发父组件的input事件，更新值
      this.$emit('input', val)
      this.previousVal = val
      //  判断是否必填
      if (!this.min && this.require) this.isRequire()
      !this.min && this.isMinLen(val)
    },
    click (event) {
      this.$emit('click')
    },
    mouseover (event) {
      this.$emit('mouseover')
    },
    mousedown (event) {
      this.$emit('mousedown')
    },
    mouseleave (event) {
      this.$emit('mouseleave')
    },
    mouseup (event) {
      this.$emit('mouseup')
    },
    mouseenter (event) {
      this.$emit('mouseenter')
    },
    mousemove (event) {
      this.$emit('mousemove')
    },
    mousewheel (event) {
      this.$emit('mousewheel')
    },
    mouseout (event) {
      this.$emit('mouseout')
    },
    keyup (event) {
      this.$emit('keyup')
    },
    keydown (event) {
      this.$emit('keydown')
    },
    keypress (event) {
      this.$emit('keypress')
    },
    dbclick (event) {
      this.$emit('dbclick')
    },
    focus (event) {
      this.$emit('focus')
      let icon = this.$refs.icon
      if (icon && this.icon === 'dropdown') {
        this.iconStatus = 'v-input-icon-active'
      }
    },
    blur (event) {
      this.$emit('blur')
      let icon = this.$refs.icon
      if (icon && this.icon === 'dropdown') {
        this.iconStatus = ''
      }
      // this.isRequire(val)
      //  最小值控制只能在失焦的时候判断
      event = event || window.event
      let val = event.target.value
      let newVal = null
      if (this.min !== null && this.current !== '') {
        if (this.min > val) {
          newVal = this.min
          this.showTip()
          //  负值转正之后再与最小值做判断
          if (-val >= this.min && (-val <= this.max || !this.max)) {
            event.target.value = val
            //  必须要将值赋给current
            this.current = -val
            newVal = -val
          } else {
            event.target.value = this.min
            this.current = this.min
          }
          //  触发父组件的input事件，更新值
          this.$emit('input', newVal)
          this.previousVal = newVal
        }
      }
      //  没有做最小值判断才校验非必填，因为有最小值约束，值总会被转成合适的值
      !newVal && this.isRequire(val)
      !this.min && this.isMinLen(val)
    },
    change (event) {
      this.$emit('change')
    },
    select (event) {
      this.$emit('select')
    },
    //  计算自定义样式中的边框颜色和圆角
    getStyle () {
      let style = this.$refs.vInput.style
      this.borderColor = style.borderColor
      this.borderRadius = style.borderRadius
      this.flag = true
    },
    //  提示用户，输入错误，已被程序自动修正
    showTip (time = 3000, auto = true) {
      this.errorFlag = true
      auto && setTimeout(() => this.errorFlag = false, time)
    },
    //  清空错误提示
    clearTip () {
      this.errorFlag = false
    },
    //  判断是否必填
    isRequire (val) {
      if (this.require && val === '') {
        this.errorFlag = true
      } else {
        this.errorFlag = false
      }
    },
    //  判断输入长度是否小于最小长度
    isMinLen (val) {
      val += ''
      let minLen = Math.abs(this.minLen)
      if (minLen && val.length < minLen) {
        this.errorFlag = true
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-input {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 260px;
  height: 40px;
  line-height: 38px;
  border-radius: 4px;
  font-size: 14px;
}
.v-input-inner {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.v-input-inner > input {
  box-sizing: border-box;
  float: left;
  width: 100%;
  font-size: 14px;
  border: none;
  border-width: 1px;
  border-style: solid;
  border-color: #dcdcdc;
  color: #333;
  outline: none;
  padding: 0 10px;
  height: 100%;
  transition: border-color .3s, box-shadow 0.3s;
}
.v-input-inner > input:disabled,.v-input-inner > input:disabled:hover {
  background-color: #efefef;
  border-color: #ccc!important;
  cursor: not-allowed;
}
.v-input-error,.v-input-error:hover {
  border-color: #f56c6c!important;
  /* box-shadow: 0 0 4px 0 #f56c6c; */
}
.v-input-inner > input:hover {
  border-color: #409eff!important;
}
.v-input-inner > input:focus {
  border-color: #3896f8!important;
}
.v-input-pre {
  position: absolute;
  left: 0%;
  float: left;
  text-align: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: none!important;
}
.v-input-tail {
  position: absolute;
  right: 0;
  float: right;
  text-align: center;
  border-left: none!important;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.v-input-inner > span {
  color: #999;
  display: inline-block;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #dcdcdc;
  padding: 0 5px;
  background-color: #f5f7fa;
}
.v-input-inner > span > input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  color: #999;
  user-select: none;
  background-color: transparent;
}
.v-input-icon,.v-input-icon-diy {
  display: inline-block;
  position: absolute;
  text-align: right;
  right: 2%;
  color: #dcdcdc;
  max-width: 40px;
  overflow: hidden;
  height: 100%;
  font-style: normal;
  font-size: 12px!important;
  background-repeat: no-repeat;
  background-position: center center;
  transform: rotate(0deg);
  transition: transform 0.3s;
}
.v-input-icon {
  width: 40px;
}
.v-input-icon-active {
  transform: rotate(180deg);
}
.v-input-icon-diy * {
  font-size: 12px;
  user-select: none;
}
.v-input-slot-icon {
  color: #222;
}
</style>
