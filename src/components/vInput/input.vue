<!-- created by wangjun on 2019-07-09 -->
<template>
  <div class="v-input">
    <input
     :type="type"
     :value="current"
     :disabled="disabled"
     :readonly="readonly"
     :autocomplete='autocomplete'
     v-bind="$attrs"
     ref="input"
     @input="input"
     @click="click"
     @focus="focus"
     @blur="blur"
     @change="change"
     @select="select"
     >
  </div>
  <!--
     @mousedown="mousedown"
     @mousewheel="mousewheel"
     @mouseenter="mouseenter"
     @mouseout="mouseout"
     @mouseup="mouseup"
     @mouseleave="mouseleave"
     @mousemove="mousemove"
     @mouseover="mouseover"
     @keyup="keyup"
     @keydown="keydown"
     @keypress="keypress"
     @dblclick="dbclick"
  -->
</template>

<script>
export default {
  name: '',
  data () {
    return {
      current: this.value
    }
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    readonly: Boolean,
    autocomplete: {
      type: String,
      default: 'on'
    }
  },
  methods: {
    init: function () {

    },
    input (event) {
      event = event || window.event
      let val = event.target.value
      //  触发父组件的input事件，更新值
      this.$emit('input', val)
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
    },
    blur (event) {
      this.$emit('blur')
    },
    change (event) {
      this.$emit('change')
    },
    select (event) {
      this.$emit('select')
    }
  },
  mounted () {
    this.init()
    console.log(this.$attrs)
    console.log(this.$refs)
  }
}
</script>

<style scoped>
.v-input {
  display: inline-block;
}
.v-input > input {
  width: 200px;
  height: 36px;
  border-width: 1px;
  border-style: solid;
  border-color: #bbb;
  border-radius: 2px;
  outline: none;
  padding: 0 5px;
  transition: border-color .3s;
}
.v-input > input:disabled {
  background-color: #efefef;
  border-color: #bbb!important;
  cursor: not-allowed;
}
.v-input > input:hover {
  border-color: #b3d8ff;
}
.v-input > input:focus {
  border-color: #409eff;
}
.v-input-error {
  border-color: #f56c6c!important;
}
</style>
