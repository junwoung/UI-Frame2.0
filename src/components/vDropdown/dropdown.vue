<!-- created by wangjun on 2019-07-20 -->
<template>
  <div class="v-dropdown">
    <!-- 存放选中选项ID数据 页面不可见 -->
    <input :value="current" disabled class="v-dropd-hidden-input">
    <!-- 页面可见输入框 -->
    <input
      :title="currentVal"
      :value="currentVal"
      ref="input"
      @input="input"
      @change="change"
      @focus="activeOptions"
      @blur="hideOptions"
      @click="setActive"
      @mouseenter="hoverInput"
      @mouseleave="leaveInput"
      @keyup.down="keyEvent('down')"
      @keyup.up="keyEvent('up')"
      @keyup.enter="keyEvent('enter')"
      type="text"
      class="v-dropd-input"
      :class="{'v-dropd-input-error': copyError}"
      v-bind="$attrs">
    <!-- 下拉icon -->
    <i class="v-dropd-icon"
      :class="{'v-drop-icon-active': flags.active}"
      :style="{cursor: $attrs.disabled !== undefined ? 'not-allowed' : ''}"
      @click="triggerInputClick"
      @mouseenter="hoverInput"
      @mouseleave="leaveInput"></i>
    <!-- 清除标记icon -->
    <i v-if="showClear()"
      @mouseenter="hoverInput"
      @mouseleave="leaveInput"
      class="v-dropd-clear">
      <i @click="clearSelected" class="v-dropd-clear-inner"></i>
    </i>
    <!-- 选项数据展示部分 -->
    <em class="v-dropd-options-tri" v-if="flags.active"></em>
    <ul class="v-dropd-options" :class="{'v-dropd-options-active': flags.active}" ref="options">
      <li
        :class="{'v-dropd-option-selected': isOptionSelected(option), 'v-dropd-option-disable': isOptionDisable(option), 'v-dropd-option-hover': isOptionHover(idx)}"
        @click="setOption(option, idx)"
        @mouseenter="flags.idx = -1"
        v-for="(option, idx) in copyData"
        :style="{display: getFilterResult(option)}"
        :title="getOption(option)"
        :key="idx">{{getOption(option)}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      //  存放选中的ID
      current: this.value,
      //  存放选中的文本
      currentVal: '',
      //  选项副本，可能是转换后的
      copyData: [],
      flags: {
        //  激活状态标识
        active: false,
        //  防止点击事件将focus事件结果给覆盖
        onfocus: false,
        //  控制选项是否处于过滤状态
        onfilter: false,
        //  控制清除按钮的显示和隐藏
        hover: false,
        //  和hover搭配
        timer: null,
        //  配合键盘事件
        idx: -1
      },
      copyError: this.error
    }
  },
  props: {
    //  获取父组件传入的值
    value: [String, Number],
    //  存放选中值的id
    selected: [String, Number],
    //  是否处于错误状态
    error: {
      type: [Boolean, String, Number],
      default: false
    },
    //  选项数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    //  选项配置
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 禁用部分选项
    disable: {
      type: Array,
      default: () => {
        return []
      }
    },
    //  是否支持清空已选
    clearable: {
      type: Boolean,
      default: false
    },
    //  是否必须
    require: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    //  获取选项展示数据
    getOption (op) {
      return (op) => {
        let key = this.config.name || 'name'
        return op[key]
      }
    },
    //  判断选项是否被选中
    isOptionSelected (op) {
      return (op) => {
        let id = this.config.id || 'id'
        if (op[id] === this.current) {
          return true
        }
      }
    },
    //  判断选项是否被禁用
    isOptionDisable (op) {
      return (op) => {
        let id = this.config.id || 'id'
        if (this.disable.includes(op[id])) return true
      }
    },
    //  判断选项是否处于hover状态
    isOptionHover (idx) {
      return (idx) => {
        if (idx === this.flags.idx) return true
      }
    },
    //  过滤掉不符合输入的选项
    getFilterResult (op) {
      return (op) => {
        //  如果是非过滤情况下，则展示全部选项
        if (this.$attrs.readonly !== undefined || !this.flags.onfilter) return 'block'
        //  输入数据只要命中name部分，就返回block，否则返回none
        let name = this.config.name || 'name'
        if ((op[name] + '').includes(this.currentVal)) return 'block'
        return 'none'
      }
    },
    //  控制清空选项是否展示
    showClear () {
      return () => {
        if (this.$attrs.disabled !== undefined) return false
        if (!this.clearable) return false
        if (!this.currentVal) return false
        if (this.flags.hover) return true
        return false
      }
    }
  },
  methods: {
    init: function () {
      this.dealData()
      this.initCurrentVal()
    },
    //  工具函数，延迟指定时间执行
    sleep (time = 300) {
      return new Promise(resolve => setTimeout(() => resolve(), time))
    },
    //  预先将传入的简单数组数据处理为程序想要的
    dealData () {
      //  如果传入的数据单条不是对象类型
      if (typeof this.data[0] !== 'object') {
        this.copyData = this.data.map((item, idx) => {
          return {
            id: idx,
            name: item
          }
        })
      } else {
        this.copyData = this.data
      }
    },
    //  初始化选中文本
    initCurrentVal () {
      let id = this.config.id || 'id'
      let name = this.config.name || 'name'
      this.currentVal = ''
      if (this.current !== undefined && this.current !== null) {
        this.copyData.some(item => {
          if (item[id] === this.current) {
            this.currentVal = item[name]
            return true
          }
        })
      }
    },
    //  点击图标出发激活选项操作
    async triggerInputClick () {
      if (this.$attrs.disabled !== undefined) return
      this.flags.active = !this.flags.active
      if (this.flags.active) this.$refs.input.focus()
    },
    //  监听输入事件，触发选项过滤
    input (event) {
      event = event || window.event
      let val = event.target.value
      this.currentVal = val
      // this.$emit('input', val)
      //  进入过滤状态
      this.flags.onfilter = true
    },
    //  当值改变，触发输入事件，将值实时传回父组件
    change () {
      this.$emit('input', this.current)
    },
    //  激活选项
    async activeOptions (event) {
      event = event || window.event
      this.flags.onfocus = true
      this.flags.active = true
      //  防止click事件将focus事件结果给覆盖
      await this.sleep(200)
      this.flags.onfocus = false
    },
    //  隐藏选项
    async hideOptions () {
      //  防止隐藏的过快，导致click事件未被触发
      await this.sleep(150)
      this.flags.active = false
      this.justifyIllegal()
      // await this.sleep(300)
      this.flags.onfilter = false
      //  失焦的时候判断输入框状态
      if (this.require && !this.currentVal) this.copyError = true
      else this.copyError = false
    },
    //  优化选项的显示和隐藏（再次点击输入框关闭）
    setActive () {
      if (this.flags.onfocus) return
      this.flags.active = !this.flags.active
    },
    //  选中选项，将值实时显现出来
    async setOption (op, idx) {
      let id = this.config.id || 'id'
      let name = this.config.name || 'name'
      if (this.disable.includes(op[id])) return
      this.current = op[id]
      this.currentVal = op[name]
      this.change()
      this.$emit('callback', {
        '$index': idx,
        'item': this.data[idx],
        'error': this.copyError
      })
      //  取消过滤状态
      await this.sleep(300)
      this.flags.onfilter = false
    },
    //  失焦状态将判断输入框的值是否非法，若非法则清空
    async justifyIllegal () {
      //  如果输入框处于不可输入状态直接跳过
      if (this.$attrs.readonly !== undefined) return
      this.initCurrentVal()
    },
    hoverInput () {
      this.flags.hover = true
      clearTimeout(this.flags.timer)
      this.flags.timer = null
    },
    leaveInput () {
      if (this.flags.timer) return
      this.flags.timer = setTimeout(() => {
        this.flags.hover = false
        this.flags.timer = null
      }, 30)
    },
    //  清除已选
    clearSelected () {
      this.currentVal = ''
      this.current = undefined
      this.change()
      if (this.require) this.copyError = true
    },
    //  监听键盘事件
    keyEvent (type) {
      let _this = this
      let ops = this.$refs.options
      let len = this.copyData.length - 1
      if (!this.flags.active) return
      switch (type) {
        case 'up': {
          scroll(ops, -1)
          break
        }
        case 'down': {
          scroll(ops, 1)
          break
        }
        case 'enter': {
          let id = this.config.id || 'id'
          let sid = null
          let op = this.copyData[this.flags.idx]
          if (op) sid = op[id]
          if (sid !== null && !this.disable.includes(sid)) {
            this.setOption(op, this.flags.idx)
            this.flags.active = false
          }
          break
        }
        default: return false
      }
      function scroll (dom, direc) {
        //  单个选项的高度,direc为1表示向下滚动，否则向上滚动
        let h = direc === 1 ? 34 : -34
        _this.flags.idx += direc
        if (_this.flags.idx < 0) {
          _this.flags.idx = len
          h = 34 * len
        }
        if (_this.flags.idx < 4) return
        if (_this.flags.idx > len) {
          _this.flags.idx = 0
          h = -34 * len
        }
        let op = _this.copyData[_this.flags.idx]
        let name = _this.config.name || 'name'
        if (_this.flags.onfilter && !op[name].includes(_this.currentVal)) {
          scroll(dom, direc)
        }
        dom.scrollBy(0, h)
      }
    }
  },
  mounted () {
    if (!this.data || !this.data.length) return
    this.init()
  },
  watch: {
    'data': function () {
      //  监听data数据，且当是处理后的数据，则在变化的时候重新处理数据
      if (this.data !== this.copyData) {
        this.dealData()
      }
    },
    'value': function (val) {
      //  当选项值非手动触发修改，监听相关变化
      this.current = val
      this.initCurrentVal()
      if (this.require && !this.currentVal) this.copyError = true
    },
    'error': function (val) {
      this.copyError = val
    }
  }
}
</script>

<style scoped>
input{outline: none;}
li {list-style: none;}
.v-dropdown {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 260px;
  height: 40px;
  border-radius: 4px;
}
.v-dropd-input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 14px;
  outline: none;
  border-radius: 4px;
  padding: 0 40px 0 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #dcdcdc;
  color: #555;
  cursor: pointer;
  transition: border-color 0.3s;
}
.v-dropd-input:hover {
  border-color: #bbbbbb;
}
.v-dropd-input:focus {
  border-color: #3896f8;
}
.v-dropd-input-error {
  border-color: #f56c6c!important;
}
.v-dropd-input:disabled {
  border-color: #cccccc!important;
  background-color: #efefef!important;
  cursor: not-allowed!important;
}
.v-dropd-icon {
  position: absolute;
  display: inline-block;
  width: 40px;
  height: 100%;
  background-image: url('./icons/dropdown.png');
  background-position: center center;
  background-repeat: no-repeat;
  top: 0;
  right: 0;
  cursor: pointer;
  transition: transform 0.3s;
}
.v-drop-icon-active {
  transform: rotate(180deg);
}
.v-dropd-options-tri {
  position: absolute;
  display: inline-block;
  border-bottom: 6px solid #dcdcdc;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  bottom: -22%;
  left: 20px;
}
.v-dropd-options-tri::before {
  content: '';
  position: absolute;
  display: inline-block;
  border-bottom: 6px solid #FFFFFF;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  top: 1px;
  right: -6px;
  z-index: 101;
}
.v-dropd-options {
  position: absolute;
  box-sizing: border-box;
  padding: 5px 0;
  border-style: solid;
  border-width: 1px;
  border-color: #dcdcdc;
  color: #666666;
  background-color: #ffffff;
  box-shadow: 0 0 5px 0 #dcdcdc;
  border-radius: 4px;
  min-width: 100%;
  width: 100%;
  top: 120%;
  z-index: 100;
  max-height: 250px;
  overflow-y: scroll;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.2s, opacity 0.3s;
}
.v-dropd-options-active {
  opacity: 1;
  transform: scaleY(1);
}
.v-dropd-options > li {
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  line-height: 34px;
  padding: 0 15px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  transition: color 0.3s;
}
.v-dropd-options > li:hover,.v-dropd-option-hover {
  background-color: #edf0f5;
}
.v-dropd-option-selected {
  color: #409eff!important;
}
.v-dropd-option-disable {
  color: #cccccc;
  background-color: #fff!important;
  cursor: not-allowed!important;
}
.v-dropd-hidden-input {
  width: 0;
  height: 0;
  border: none;
  overflow: hidden;
  position: absolute!important;
}
.v-dropd-clear {
  position: absolute;
  display: inline-block;
  text-align: center;
  color: #aaa;
  font-weight: 400;
  background-color: #fff;
  width: 38px;
  height: 94%;
  top: 1px;
  right: 3%;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s;
}
.v-dropd-clear-inner:hover::after {
  border: 1px solid #409eff;
  color: #409eff;
}
.v-dropd-clear-inner::after {
  content: 'x';
  position: absolute;
  display: inline-block;
  font-style: normal;
  font-size: 12px;
  height: 12px;
  width: 12px;
  border: 1px solid #dcdcdc;
  line-height: 10px;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  transition: border 0.2s;
}
</style>
