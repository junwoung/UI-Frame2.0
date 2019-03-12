<!-- created by wangjun on 2019-03-11 -->
<template>
  <div class="v-pagination" v-if="pagination">
    <span :class="{'v-pagination-disable': pagination.current === 1}" @click="go(1)">首页</span>
    <span :class="{'v-pagination-disable': pagination.current === 1}" @click="go(pagination.current-1)">&lt;</span>
    <span
     @click="go(item)"
     :class="{'v-pagination-selected': pagination.current == item}"
     v-for="(item,index) in pages"
     :key="index">{{item}}</span>
    <span :class="{'v-pagination-disable': pagination.current === totalPages}" @click="go(pagination.current+1)">&gt;</span>
    <span :class="{'v-pagination-disable': pagination.current === totalPages}" @click="go(totalPages)">尾页</span>
    <div class="v-pagination-size">
      <span
       @click="activeOptions"
       :class="{'v-pagination-size-active': flag.show}"
       ref="vPagesizeOptions">{{pagination.pagesize}}条</span>
      <input
       type="text"
       @focus='showOptions'
       @blur='hideOptions'
       ref="vPagesizeInput">
      <div
       class="v-pagination-size-options"
       v-if="flag.show"
       :style="{top: flag.position,visibility: flag.position ? 'visible' : 'hidden'}">
        <span
         :class="{'v-pagesize-selected': item === pagination.pagesize}"
         v-for="(item,index) in pagesizes"
         @click="changePagesize(item)"
         :key="index">{{item}}条</span>
      </div>
    </div>
    <div class="v-pagination-turn">
      跳至
      <input type="number" v-model="turnPage" @blur="turn()" @keyup="listen">
      /{{totalPages}}页
    </div>
    <div v-if="pagination.detail" class="v-pagination-detail">
      {{getDetail()}}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      totalPages: null, //  存储总页码数
      pages: [], // 存储当前展示的页码数组
      pagesizes: [10, 20, 50, 100], //  默认分页尺寸可选择数组列表
      flag: {
        position: null, //  记录pagesize选项相对偏移量
        show: false //  记录是否显示和隐藏pagesize选项
      },
      turnPage: null // 记录跳转页
    }
  },
  props: {
    pagination: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function () {
      //  初始化各参数
      let page = this.pagination
      if (!page || !page.total) return
      if (page.current === undefined || page.current <= 0) page.current = 1
      if (page.pagesize === undefined || page.pagesize <= 0) page.pagesize = 10
      if (page.showPages === undefined || page.showPages <= 0) page.showPages = 5
      if (page.detail === undefined) page.detail = true
      //  如果传入的分页尺寸不存在，则插入原数组末尾
      if (this.pagesizes.indexOf(page.pagesize) === -1) this.pagesizes.push(page.pagesize)
      this.turnPage = this.pagination.current
      this.getTotalPages()
      this.calculate()
    },
    getTotalPages: function () {
      //  计算总页数
      this.totalPages = Math.ceil(this.pagination.total / this.pagination.pagesize)
    },
    calculate: function () {
      /**
      * @author: wangjun
      * @date: 2019-03-11 11:43:54
      * @desc: 计算当前展示的分页码
      */
      let page = this.pagination
      if (this.totalPages <= page.showPages) this.pages = generatePages(1, this.totalPages)
      else {
        let start = 0
        let end = 0
        let floor = Math.floor(page.showPages / 2)
        let ceil = Math.ceil(page.showPages / 2)
        if (page.current <= ceil) {
          start = 1
          end = page.showPages
        } else if (page.current >= this.totalPages - floor) {
          start = this.totalPages - page.showPages + 1
          end = this.totalPages
        } else {
          start = page.current - floor
          end = page.current + floor
          //  如果显示的是双数页码数，则做相应的处理
          if (ceil === floor) start++
        }
        this.pages = generatePages(start, end)
      }
      this.$emit('callback', {current: this.pagination.current, pagesize: this.pagination.pagesize})
      function generatePages (start, end) {
        //  生成区间内页码
        let arr = []
        for (let i = start; i <= end; i++) {
          arr.push(i)
        }
        return arr
      }
    },
    go: function (num) {
      //  页数跳转
      if (num <= 0) num = 1
      if (num > this.totalPages) num = this.totalPages
      if (num === this.pagination.current) return
      this.pagination.current = num
      this.turnPage = this.pagination.current
      this.calculate()
    },
    activeOptions: function () {
      //  激活pagesize选项展示
      if (this.flag.show) return
      this.$refs.vPagesizeInput.focus()
      this.flag.show = true
    },
    showOptions: function () {
      let dom = this.$refs.vPagesizeOptions
      let rect = dom.getBoundingClientRect()
      let wHeight = window.innerHeight || document.documentElement.clientHeight
      setTimeout(() => {
        if (wHeight - rect.bottom > 120) this.flag.position = '35px'
        else {
          this.flag.position = `-${this.pagesizes.length * 25 + 5}px`
        }
      }, 10)
    },
    hideOptions: function () {
      setTimeout(() => {
        this.flag.position = null
        this.flag.show = false
      }, 200)
    },
    changePagesize: function (num) {
      //  改变分页尺寸
      this.pagination.pagesize = num
      this.pagination.current = 1
      // this.init()
    },
    getDetail: function () {
      //  获取具体分页展示信息
      let page = this.pagination
      let start = (page.current - 1) * page.pagesize + 1
      let end = page.current * page.pagesize
      if (page.current === this.totalPages) end = page.total
      return `第${start}-${end}条记录，共${page.total}条`
    },
    turn: function () {
      //  失焦跳转
      this.turnPage && this.go(parseInt(this.turnPage))
    },
    listen: function (event) {
      //  监听键盘enter事件
      event = event || window.event
      let key = event.keyCode
      if (key === 13 && this.turnPage) {
        this.turn()
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'pagination.pagesize': function (newVal, oldVal) {
      this.pagination.current = 1
      this.init()
    },
    'pagination.total': function () {
      this.pagination.current = 1
      this.init()
    }
  }
}
</script>

<style scoped>
.v-pagination{
  color: #333;
  background-color: #fff;
  font-size: 14px;
  user-select: none;
}
.v-pagination > span {
  display: inline-block;
  width: 45px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
}
.v-pagination > span:hover {
  border: 1px solid #3896f8;
  color: #3896f8;
}
.v-pagination-selected {
  color: #fff!important;
  background-color: #3896f8!important;
  border: 1px solid #3895f8!important;
}
.v-pagination-disable {
  color: #bbb!important;
  background-color: #efefef!important;
  border: 1px solid #ddd!important;
  cursor: not-allowed!important;
}
.v-pagination-size {
  position: relative;
  display: inline-block;
}
.v-pagination-size > span {
  position: relative;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 25px 0 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
}
.v-pagination-size > span::after {
  content: '';
  position: absolute;
  border-top: 5px solid #bbb;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  right: 5px;
  top: 13px;
  transform: rotate(0);
  transition: transform 0.2s;
}
.v-pagination-size-active::after{
  transform: rotate(180deg)!important;
}
.v-pagination-size > input {
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
  border: none;
  position: absolute;
}
.v-pagination-size-options {
  position: absolute;
  width: 100%;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  top: 45px;
  /* opacity: 0; */
  visibility: hidden;
  /* top: -105px; */
  transition: opacity .2s, top .2s;
}
.v-pagination-size-options > span {
  display: block;
  height: 25px;
  line-height: 25px;
  width: 100%;
  text-align: center;
}
.v-pagesize-selected {
  color: #3896f8;
}
.v-pagination-turn,.v-pagination-detail {
  display: inline-block;
  margin-left: 10px;
}
.v-pagination-turn > input {
  width: 35px;
  text-align: center;
  height: 28px;
  outline: none;
  border: 1px solid #ddd;
}
</style>
