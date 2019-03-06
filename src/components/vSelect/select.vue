<!-- created by wangjun on 2019-03-06 -->
<template>
  <div class="v-select"
   :style="select.style"
   @click="getFocus"
   :class="{'v-select-size': !select.style || !select.style.width,'v-select-disable': select.disable}">
   <input type="text"
    class="v-select-input-hide"
    @focus="showOptions"
    @blur="hideOptions"
    ref="input">
    <span class="v-select-text"
     :title="text"
     :class="{'v-select-active': flag}">
      <span class="ellipsis">{{text === null ? (select.placeholder || placeholder) : text}}</span>
    </span>
    <div class="v-select-options"
     v-show="flag"
     :style="{'border-color': select.style && select.style['border-color']}">
      <div style="padding: 2px;" v-if="select.query">
        <input type="text"
         class="v-select-search"
         placeholder="请输入过滤内容"
         @focus="showOptions(true)"
         @blur="hideOptions"
         v-model='query'
         ref="search">
        </div>
      <span class="v-select-option ellipsis"
       :title="item[name]"
       :class="{'v-select-option-checked': item[id] === select.selected}"
       v-for="(item,index) in select.data"
       @click.stop="selectOption(item)"
       v-if="item[name] && item[name].indexOf(query) !== -1"
       :key="index">{{item[name]}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      placeholder: '请选择',
      text: null, //  存放选中选项的文本
      flag: false, //  控制选项显示/隐藏
      id: 'id', //  id映射
      name: 'name', //  name映射
      timeout: null, //  用于记录定时器，方便清除
      query: '' //  绑定搜索框的值
    }
  },
  props: {
    select: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function () {
      //  配置映射关系
      if (this.select && this.select.config) {
        this.id = this.select.config.id || this.id
        this.name = this.select.config.name || this.name
      }
      //  初始化选项展示
      if (this.select && this.select.data && this.select.selected !== undefined) {
        this.select.data.map(item => {
          if (item[this.id] === this.select.selected) {
            this.text = item[this.name]
          }
        })
      }
    },
    selectOption: function (item) {
      //  点击具体选项，更改相应属性，触发回调
      if (this.select.disable) return
      this.query = ''
      this.text = item[this.name]
      this.select.selected = item[this.id]
      this.$emit('callback', item)
    },
    getFocus: function () {
      //  使文本框获取焦点，通过文本框获取和丢失焦点达到显示和隐藏选项
      this.$refs.input.focus()
      if (this.select.query) {
        setTimeout(() => {
          this.$refs.search.focus()
          clearTimeout(this.timeout)
        }, 100)
      }
    },
    showOptions: function (flag) {
      clearTimeout(this.timeout)
      if (flag) this.flag = true
      else this.flag = !this.flag
    },
    hideOptions: function () {
      this.timeout = setTimeout(() => {
        this.flag = false
      }, 200)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'select.selected': function () {
      this.init()
    }
  }
}
</script>

<style scoped>
.v-select{
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  min-width: 200px;
  min-height: 32px;
  border: 1px solid #bbb;
  font-size: 14px;
  border-radius: 2px;
  color: #666;
  cursor: pointer;
  background-color: #fff;
  user-select: none;
}
.v-select-disable{
  cursor: not-allowed;
  background-color: #eee!important;
}
.v-select-size{
  width: 200px;
  height: 34px;
}
.v-select-text::after{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-top: 5px solid #aaa;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  top: 45%;
  right: 10px;
  transform: rotate(0);
  transition: transform 0.1s;
}
.v-select-active::after{
  transform: rotate(180deg);
}
.v-select-text{
  display: flex;
  width: 80%;
  height: 100%;
  align-items: center;
  margin: 0 5%;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-select-options{
  position: absolute;
  /* box-sizing: border-box; */
  width: 100%;
  border: 1px solid #bbb;
  left: -1px;
  /* border-top: none; */
  background-color: #fff;
  max-height: 150px;
  overflow-y: auto;
}
.v-select-option{
  display: block;
  width: 100%;
  height: 25px;
  line-height: 25px;
  box-sizing: border-box;
  padding: 0 10px;
}
.v-select-option:hover{
  background-color: #edf0f5;
}
.v-select-option-checked{
  background-color: #ddd!important;
  color: #fff!important;
}
.v-select-input-hide{
  width: 0;
  height: 0;
  border: none;
  outline: none;
  overflow: hidden;
  position: absolute;
}
.v-select-search{
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  height: 28px;
  padding: 0 10px;
}
.v-select-search:focus{
  border: 1px solid #3896f8;
}
</style>
