<!-- created by wangjun on 2019-03-07 -->
<template>
  <div v-if="tab && tab.data && tab.data.length" :style="tab.style" :class="{'v-tab-disable': tab.disable}" class="v-tab clearfix" @click="hideAllOption">
    <div class="clearfix">
      <label class="v-tab-all" @click="selectAll">
        {{flag.all ? '全选':'反选'}}
        <em
        class="triangle"
        title="点击切换"
        @click.stop='switchAllOption'></em>
      </label>
      <div
      class="v-tab-all-options"
      v-show="!flag.allHide"
      :class="{'v-tab-all-options-show': flag.allShow}">
        <span @click="setAllOption(true)">全选</span>
        <span @click="setAllOption(false)">反选</span>
      </div>
      <div
      class="v-tab-options"
      :class="{'v-tab-options-hide': !flag.more}">
        <span
        v-for="(item,index) in tab.data"
        :class="{'v-tab-selected': selected && selected.indexOf(item[id]) !== -1}"
        @mouseover="setHoverIdx(item)"
        @mouseout="setHoverIdx(null)"
        @click="check(item)"
        :key="index">
          {{item[name]}}
          <em
          @mouseover="setHoverIdx(item,true)"
          @click.stop="check(item,false)"
          v-if="selected && selected.indexOf(item[id]) !== -1 && flag.idx === item[id]"
          class="v-tab-cancel">x</em>
        </span>
      </div>
      <label class="v-tab-more" @click="flag.more = !flag.more">
        {{flag.more ? '收起':'更多'}}
      </label>
    </div>
    <div v-if="tab && tab.showSelected && selectedWhole.length && selected.length" class="clearfix" style="background-color:#f4f9fb;">
      <label class="v-tab-is-selected" style="cursor:default;">已选</label>
      <div class="v-tab-selected-options">
        <span
         @mouseover="setHoverSelectedIdx(item)"
         @mouseout="setHoverSelectedIdx(null)"
         v-for="(item,index) in selectedWhole"
         :key="index">
          {{item && item[name]}}
          <em
            @mouseover="setHoverSelectedIdx(item,true)"
            @click.stop="check(item,false)"
            v-if="item && flag.selectedIdx === item[id]"
           class="v-tab-cancel">x</em>
        </span>
      </div>
      <label
       @click="clearAll"
       class="v-tab-clear"
       style="color:#fff;background-color:#d9534f;">清空</label>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      id: 'id',
      name: 'name',
      multiple: true,
      flag: {
        all: true,
        more: true,
        allShow: false,
        allHide: true,
        idx: null,
        timeout: null,
        selectedIdx: null,
        selectedTimeout: null
      },
      selected: null,
      selectedWhole: [] //  存放完整版选择项
    }
  },
  props: {
    tab: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function () {
      //  配置id，name映射
      if (this.tab && this.tab.config) {
        this.id = this.tab.config.id || this.id
        this.name = this.tab.config.name || this.name
      }
      //  初始化已选项
      if (this.tab && this.tab.data && this.tab.data.length && this.tab.selected) {
        if (this.tab.selected instanceof Array) {
          this.selected = this.tab.selected
          this.getWhole()
        }
      } else {
        this.selected = []
      }
    },
    switchAllOption: function () {
      /**
      * @author: wangjun
      * @date: 2019-03-08 18:40:53
      * @desc: 切换全选/反选按钮；为了添加过渡动画，引入定时器
      */
      if (this.tab.disable) return
      if (!this.flag.allShow) {
        this.flag.allHide = false
        setTimeout(() => {
          this.flag.allShow = true
        }, 10)
      } else {
        this.flag.allShow = false
        setTimeout(() => {
          this.flag.allHide = true
        }, 200)
      }
    },
    setAllOption: function (flag) {
      //  设置全选/反选
      this.flag.all = flag
      this.switchAllOption()
    },
    hideAllOption: function () {
      //  当插件点击其他地方，隐藏 全选/反选 下拉列表
      this.flag.allShow = false
      setTimeout(() => {
        this.flag.allHide = true
      }, 200)
    },
    setHoverIdx: function (item, flag) {
      /**
      * @author: wangjun
      * @date: 2019-03-08 18:43:27
      * @desc: 为了鼠标悬浮在已选项上能够出现关闭按钮
      */
      if (item) {
        this.flag.idx = item[this.id]
        clearTimeout(this.flag.timeout)
      } else {
        this.flag.timeout = setTimeout(() => {
          //  定时器引入，解决悬浮出现关闭按钮，不停闪烁问题
          this.flag.idx = null
        }, 10)
      }
    },
    setHoverSelectedIdx: function (item, flag) {
      /**
      * @author: wangjun
      * @date: 2019-03-08 18:43:27
      * @desc: 为了鼠标悬浮在已选项上能够出现关闭按钮
      * 单独显示已选项一栏
      */
      if (item) {
        this.flag.selectedIdx = item[this.id]
        clearTimeout(this.flag.selectedTimeout)
      } else {
        this.flag.selectedTimeout = setTimeout(() => {
          this.flag.selectedIdx = null
        }, 10)
      }
    },
    check: function (item, flag) {
      /**
      * @author: wangjun
      * @date: 2019-03-08 18:45:48
      * @desc: 真正进行选项选择/取消
      * @param: item  具体选则项
      * @param: flag  1、不为false表示选择 2、false表示取消选择
      * @callback: 触发回调
      */
      if (this.tab.disable) return
      let id = item[this.id]
      if (flag === false) {
        let idx = this.selected.indexOf(id)
        this.selected.splice(idx, 1)
        this.selectedWhole.splice(idx, 1)
      } else {
        if (this.selected.indexOf(id) === -1) {
          this.selected.push(id)
          this.selectedWhole.push(item)
        }
      }
      this.tab.selected = this.selected
      this.getWhole()
      this.$emit('callback', this.selectedWhole)
    },
    getWhole: function () {
      /**
      * @author: wangjun
      * @date: 2019-03-08 18:51:07
      * @desc: 根据已选项id，返回完整数据选项
      */
      let arr = []
      let len = this.tab.data.length
      arr = this.selected.map(item => {
        for (let i = 0; i < len; i++) {
          if (this.tab.data[i][this.id] === item) {
            return this.tab.data[i]
          }
        }
      })
      this.selectedWhole = arr
    },
    clearAll: function () {
      //  清除已选项
      if (this.tab.disable) return
      this.selected = []
      this.tab.selected = []
      this.selectedWhole = []
    },
    selectAll: function () {
      /**
      * @author: wangjun
      * @date: 2019-03-08 18:52:53
      * @desc: 全选/反选触发，相应回调
      * @return: 当为全选，回调返回参数结构为object，带有all属性且为true；其他情况返回完整已选数据项
      */
      if (this.tab.disable) return
      let ret = {}
      if (this.flag.all) {
        if (this.selected.length === this.tab.data.length) {
          this.selected = []
          this.selectedWhole = []
          this.$emit('callback', [])
          return
        }
        this.selectedWhole = this.tab.data
        this.selected = this.getIds(this.selectedWhole)
        ret.all = true
        ret.wholeSelected = this.selectedWhole
        this.$emit('callback', ret)
      } else {
        this.getOpposite()
        this.$emit('callback', this.selectedWhole)
      }
    },
    getOpposite: function () {
      /**
      * @author: wangjun
      * @date: 2019-03-08 18:54:38
      * @desc: 获取反选项
      */
      function sort (arr) {
        /**
         * 数值数组的排序
         */
        if (!arr || arr.length < 2) return arr
        arr.sort(compare)
        return arr
      }
      function compare (val1, val2) {
        return val2 - val1
      }
      let arr = JSON.parse(JSON.stringify(this.tab.data))
      let idxArr = []
      for (let i = 0, len = arr.length; i < len; i++) {
        if (this.selected.indexOf(arr[i][this.id]) !== -1) {
          idxArr.push(i)
        }
      }
      idxArr = sort(idxArr) //  先获取已选项的排序后（从大到小）的书序
      //  删除已选项就得到反选效果
      idxArr.map(item => {
        arr.splice(item, 1)
      })
      this.selectedWhole = arr
      this.selected = this.getIds(arr)
    },
    getIds: function (arr) {
      //  根据完整项获取id列表
      return arr.map(item => {
        return item[this.id]
      })
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'tab.selected': function (newVal, oldVal) {
      // this.selected = []
      this.init()
    //   console.log(newVal, oldVal)
    //   let arr = JSON.parse(JSON.stringify(this.tab.data))
    //   this.tab.data = null
    //   //  初始化已选项
    //   if (this.tab && this.tab.selected) {
    //     if (this.tab.selected instanceof Array) {
    //       this.selected = this.tab.selected
    //       this.tab.data = arr
    //       this.getWhole()
    //     }
    //   } else {
    //     this.selected = []
    //   }
    }
  }
}
</script>

<style scoped>
.v-tab{
  /* padding-top: 15px; */
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #555;
  min-width: 800px;
}
.v-tab-disable{
  background-color: #efefef;
}
.v-tab > div{
 padding: 0 15px 0 15px;
}
.v-tab-all, .v-tab-is-selected{
  float: left;
  position: relative;
  width: 60px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #efefef;
  color: #666;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;
  user-select: none;
  margin-top: 15px;
}
.v-tab-all > .triangle{
  display: inline-block;
  width: 12px;
  height: 12px;
  position: relative;
}
.v-tab-all > .triangle::after{
  top: 4px;
  left: 3px;
}
.v-tab-all-options{
  position: absolute;
  border-radius: 4px;
  top: 100px;
  background-color: #efefef;
  z-index: 10;
  opacity: 0;
  transition: top 0.2s, opacity 0.2s;
}
.v-tab-all-options-show{
  top: 70px;
  opacity: 1;
}
.v-tab-all-options > span{
  display: block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.v-tab-more, .v-tab-clear{
  float: right;
  width: 60px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #efefef;
  color: #666;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;
  user-select: none;
  margin-top: 15px;
}
.v-tab-clear:hover{
  opacity: 0.8;
}
.v-tab-options, .v-tab-selected-options{
  float: left;
  max-width: 80%;
  padding-top: 15px;
}
.v-tab-options-hide{
  height: 45px;
  overflow: hidden;
}
.v-tab-options > span, .v-tab-selected-options > span{
  display: inline-block;
  position: relative;
  border-radius: 3px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid #fff;
  cursor: pointer;
  margin: 0 10px 15px 0;
  background-color: #fff;
}
.v-tab-selected-options > span{
  border: 1px solid #88cdfa;
  background-color: #e0f3ff;
  color: #88cdfa;
}
.v-tab-options > span:hover{
  border: 1px solid #88cdfa;
  color: #88cdfa;
}
.v-tab-selected{
  color: #fff!important;
  border: 1px solid #88cdfa!important;
  background-color: #88cdfa!important;
}
.v-tab-cancel{
  display: inline-block;
  position: absolute;
  width: 16px;
  height: 16px;
  line-height: 14px;
  text-align: center;
  background-color: #F08080;
  top: -6px;
  right: -6px;
  border-radius: 50%;
  color: #fff;
}
/* .v-tab-cancel::after{
  content: 'x';
  display: inline-block;
  position: absolute;
  padding: 5px;
  background-color: #d9534f;

} */
</style>
