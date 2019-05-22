<!-- created by wangjun on 2019-03-13 -->
<template>
  <div class="v-time" v-if="time">
    <span
     class="v-time-txt"
     @click="activeInput"
     :class="{'v-time-disable-whole': time.disable}"
     :style="time.style">{{time.selected || time.placeholder || '请选择时间'}}</span>
    <input type="text"
     ref="vTimeInput"
     @focus="showTimeOption"
     @blur="hideTimeOption(true)">
    <div @click="cancelHide" class="v-time-options" ref="vTimeBody" v-if="flag.show">
      <!-- 头部 -->
      <div class="v-time-header">
        <div class="v-time-arrow-left" v-if="flag.type !== 'times'">
          <span title="年份-1" @click="changeOptions(-1,'y')">&lt;&lt;</span>&nbsp;
          <span v-if="flag.type === 'dates'" title="月份-1" @click="changeOptions(-1,'m')">&lt;</span>
        </div>
        <div class="v-time-year-month" v-if="flag.type !== 'times'">
          <span @click="calculateYears" title="选择年份">{{selected.year}}年</span>&nbsp;
          <span v-show='flag.type !== "years"' @click="flag.type = 'monthes'" title="选择月份">{{selected.month}}月</span>
        </div>
        <div class="v-time-arrow-right" v-if="flag.type !== 'times'">
          <span v-if="flag.type === 'dates'" title="月份+1" @click="changeOptions(1,'m')">&gt;</span>&nbsp;
          <span title="年份+1" @click="changeOptions(1,'y')">&gt;&gt;</span>
        </div>
        <div style="width: 100%;" v-if="flag.type === 'times'">选择具体时间</div>
      </div>
      <!-- 具体选择部分 -->
      <div class="v-time-body">
        <!-- 日期面板选择 -->
        <div v-if="flag.type === 'dates'">
          <div class="v-time-weekdays">
            <span v-for="(day,index) in weekdays" :key="index">{{day}}</span>
          </div>
          <div class="v-time-dates">
            <span
            v-for="(date,index) in dates"
            @click="setDate(date)"
            :class="{'v-time-date-selected': selected.date === date.date ,'v-time-disable': (time.max && date.date > dealDate(time.max)) || (time.min && date.date < dealDate(time.min)),'v-time-date-gray': !date.flag,'v-time-date-today': today === date.date}"
            :key="index">
              {{date.day}}
            </span>
          </div>
        </div>
        <!-- 年份面板选择 -->
        <div v-if="flag.type === 'years'">
          <div class="v-time-years">
            <span
             @click="setYear(year)"
             :class="{'v-time-date-selected': year == selected.year}"
             v-for="(year,index) in years"
             :key="index">{{year}}年</span>
          </div>
        </div>
        <!-- 月份面板选择 -->
        <div v-if="flag.type === 'monthes'">
          <div class="v-time-monthes">
            <span
             v-for="(month,index) in monthes"
             @click="setMonth(index + 1)"
             :class="{'v-time-date-selected': (index + 1) === parseInt(selected.month)}"
             :key="index">{{month}}月</span>
          </div>
        </div>
        <!-- 时分秒面板选择 -->
        <div v-if="flag.type === 'times'">
          <div class="v-time-times-title">
            <span>时</span>
            <span>分</span>
            <span>秒</span>
          </div>
          <div class="v-time-times-options" ref="vTimeOptions">
            <div>
              <span
               @click="setTimes(hour,'h')"
               v-for="(hour,index) in hours"
               :class="{'v-time-date-selected': selected.hour == hour}"
               :key="index">{{hour}}</span>
            </div>
            <div>
              <span
               @click="setTimes(minute,'m')"
               v-for="(minute,index) in minSec"
               :class="{'v-time-date-selected': selected.minute == minute}"
               :key="index">{{minute}}</span>
            </div>
            <div>
              <span
               @click="setTimes(second,'s')"
               v-for="(second,index) in minSec"
               :class="{'v-time-date-selected': selected.second == second}"
               :key="index">{{second}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 脚部 -->
      <div class="v-time-footer">
        <label
         @click="generateHMS"
         :class="{'v-time-disable': !this.time.format || flag.timesCan.indexOf(time.format) === -1}">{{flag.type === 'times' ? '返回日期':'选择时分秒'}}</label>
        <span @click="doFunc('ensure')">确定</span>
        <span
         @click="doFunc('now')"
         :class="{'v-time-disable': !flag.canToday}">现在</span>
        <span @click="doFunc('clear')">清空</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      today: this.getDate(), //  今天日期
      selected: {
        date: '', //  日历面板选中的当前日期
        year: '', //  年
        month: '', // 月
        day: '', // 日
        hour: '00', //  时
        minute: '00', //  分
        second: '00' // 秒
      },
      weekdays: ['日', '一', '二', '三', '四', '五', '六'], //  一周
      dates: [], //  当前日历面板展示的各日期选项
      years: [], //  当前日历面板展示的各年份选项
      monthes: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'], //  当前日历面板展示的各月份选项
      hours: [], // 小时选项
      minSec: [], //  分秒选项
      flag: {
        show: false, //  控制日历面板选择
        timeout: null, //  定时器，控制日历面板隐藏时用（动画效果和取消隐藏）
        imediate: false, //  是否立即隐藏
        timesCan: ['hour', 'minute', 'second'], //  可以选择具体时分秒的条件
        type: 'dates', //  日历面板展示的选项类型[ 具体日期 / 年份 / 月份 / 时分秒]
        canToday: true // 今天是否可用
      },
      timeCtrl: {
        //  起始时间控制，全格式，只用于内部逻辑判断
        max: null,
        min: null
      }
    }
  },
  props: {
    time: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function () {
      let formats = ['year', 'month', 'day', 'hour', 'minute', 'second']
      if (!this.time) return
      //  初始化format
      if (!this.time.format || formats.indexOf(this.time.format) === -1) this.time.format = 'day'
      //  标准化max / min
      if (this.time.max) {
        this.time.max = this.getRegularDate(this.time.max, false)
      }
      if (this.time.min) {
        this.time.min = this.getRegularDate(this.time.min, false)
      }
      //  初始化today是否可用
      if ((this.time.max && this.time.max < this.today) || (this.time.min && this.time.min > this.today)) this.flag.canToday = false
      //  初始化日历面板选择时间、展示时间；如果未传入初始化时间，则只初始化日历面板选择时间
      if (this.time.selected === undefined) {
        //  未传入selected属性，表示不初始化展示
        this.selected.date = this.getDate('')
        this.calculateDates()
      } else {
        if (!this.time.selected) {
          //  传入空，表示初始化为当前日期
          this.selected.date = this.getDate('')
          this.time.selected = this.getDate('', this.time.format)
        } else {
          this.time.selected = this.getRegularDate(this.time.selected)
          //  传入具体值，做相应的初始化
          if (this.time.format === 'year') {
            //  如果仅仅传入年份，在转换的时候会有问题，故人为将其转为yyyy-01-01
            this.selected.date = this.time.selected.toString().split('-')[0] + '-01-01'
          } else this.selected.date = this.getDate(this.time.selected)
          //  初始化时分秒
          let d = this.getDate(this.time.selected, this.time.format)
          if (this.time.format && this.flag.timesCan.indexOf(this.time.format) !== -1 && d.indexOf(' ') !== -1) {
            let arr = d.split(' ')[1].split(':')
            this.selected.hour = arr[0] || '00'
            this.selected.minute = arr[1] || '00'
            this.selected.second = arr[2] || '00'
          }
        }
      }
      this.initCalender(this.time.format)
      this.setYmd(this.selected.date)
    },
    initCalender: function (format = 'day') {
      /**
      * @author: wangjun
      * @date: 2019-03-15 12:09:28
      * @desc: 根据传入的格式来初始化日历
      * @param: year 初始化为年份选择；month 初始化为月份选择； 其他 均初始化成日期选择
      */
      switch (format) {
        case 'year': {
          this.calculateYears()
          break
        }
        case 'month': {
          this.flag.type = 'monthes'
          break
        }
        default: {
          this.calculateDates(this.selected.date)
        }
      }
    },
    calculateDates: function (obj = undefined) {
      //  计算日历面板当前展示日期选项
      if (!obj) obj = new Date()
      if (typeof obj === 'number') obj = new Date(obj)
      if (typeof obj === 'string') obj = new Date(obj)
      //  获取当月的第一天
      let first = `${obj.getFullYear()}-${obj.getMonth() + 1}-01`
      first = new Date(first)
      let day = first.getDay()
      let month = first.getMonth()
      //  如果是周日则往前推7天，非周日就一直往前推到周日
      day = day || 7
      let start = first.valueOf() - day * 24 * 3600 * 1000
      let arr = []
      //  42: 日期选择一次展示42个选项
      for (let i = 0; i < 42; i++) {
        let item = start + i * 24 * 3600 * 1000
        let current = new Date(item)
        arr.push({
          date: this.getDate(current, 'day'),
          timestamp: item,
          day: current.getDate(),
          flag: month === current.getMonth()
        })
      }
      this.dates = arr
    },
    getDate: function (obj = undefined, format = 'day') {
      //  获取指定格式的日期
      if (!obj) obj = new Date()
      if (typeof obj === 'number') obj = new Date(obj)
      if (typeof obj === 'string') obj = new Date(this.dealDate(obj, true))
      let year = obj.getFullYear()
      let month = obj.getMonth() + 1
      let day = obj.getDate()
      let hour = obj.getHours()
      let minute = obj.getMinutes()
      let second = obj.getSeconds()
      month = month > 9 ? month : ('0' + month)
      day = day > 9 ? day : ('0' + day)
      hour = hour > 9 ? hour : ('0' + hour)
      minute = minute > 9 ? minute : ('0' + minute)
      second = second > 9 ? second : ('0' + second)
      let date = ''
      switch (format) {
        case 'year': date = year; break
        case 'month': date = `${year}-${month}`; break
        case 'day': date = `${year}-${month}-${day}`; break
        case 'hour': date = `${year}-${month}-${day} ${hour}`; break
        case 'minute': date = `${year}-${month}-${day} ${hour}:${minute}`; break
        case 'second': date = `${year}-${month}-${day} ${hour}:${minute}:${second}`; break
      }
      return date
    },
    setDate: function (date) {
      //  点击日历某个日期触发
      if ((this.time.max && this.time.max < date.date) || (this.time.min && this.time.min > date.date)) return
      if (!date.flag) {
        this.calculateDates(date.date)
      }
      this.setYmd(date.date)
      if (date.flag && (!this.time.format || this.time.format === 'day')) {
        this.doFunc('ensure')
      }
    },
    setYmd: function (date) {
      //  设置年月日等，date: yyyy-mm-dd
      let arr = date.split('-')
      this.selected.year = arr[0]
      this.selected.month = arr[1]
      this.selected.day = arr[2]
      this.selected.date = date
    },
    changeOptions: function (num, type) {
      //  切换头部箭头按钮，更改日历选择面板选项
      //  num:[-1,1]表示减增操作；type:['y','m']表示操作类型为年月
      num = parseInt(num)
      switch (type) {
        case 'y': {
          /**
          * @author: wangjun
          * @date: 2019-03-14 12:30:31
          * @desc: 针对不同日历面板赋予不同切换功能
          * dates、monthes: 增减年份; years: 改变年份面板选择
          */
          if (this.flag.type === 'dates' || this.flag.type === 'monthes') {
            this.selected.year = parseInt(this.selected.year) + num
            if (this.selected.year < 0) this.selected.year = 0
          } else if (this.flag.type === 'years') {
            let year = null
            if (num === 1) year = this.years[14] + 8
            else year = this.years[0] - 8
            this.calculateYears(year)
          }
          break
        }
        case 'm': {
          this.selected.month = parseInt(this.selected.month) + num
          if (this.selected.month > 12) {
            this.selected.year++
            this.selected.month = 1
          }
          if (this.selected.month < 1) {
            this.selected.year--
            this.selected.month = 12
            if (this.selected.year < 0) this.selected.year = 0
          }
          this.selected.month = this.selected.month > 9 ? this.selected.month : ('0' + this.selected.month)
          break
        }
        default: {}
      }
      //  切换整年整月时，重置日期为01,（偷个懒，因为不同年月每个月的天数不同，但是都会有1号）
      this.selected.day = '01'
      this.selected.date = `${this.selected.year}-${this.selected.month}-01`
      this.calculateDates(this.selected.date)
    },
    calculateYears: function (year = undefined) {
      this.flag.type = 'years'
      if (typeof year === 'object' || !year) year = this.selected.year
      year = parseInt(year)
      let arr = []
      for (let i = year - 7; i <= year + 7; i++) {
        arr.push(i)
      }
      this.years = arr
    },
    setYear: function (year) {
      //  设置年份
      this.selected.year = year
      this.selected.date = `${year}-${this.selected.month}-01`
      this.calculateDates(this.selected.date)
      //  如果精确到年，则直接关闭日历
      if (this.time.format === 'year') {
        this.doFunc('ensure')
      } else if (this.time.format === 'month') {
        //  如果精确到月，则选完年份之后选月份
        this.flag.type = 'monthes'
      } else {
        this.flag.type = 'dates'
      }
    },
    setMonth: function (month) {
      //  设置月份
      this.selected.month = month > 9 ? month : ('0' + month)
      this.selected.date = `${this.selected.year}-${this.selected.month}-01`
      this.calculateDates(this.selected.date)
      if (this.time.format === 'month') {
        //  如果是精确到月份则直接关闭日历
        this.doFunc('ensure')
      } else this.flag.type = 'dates'
    },
    generateHMS: function () {
      if (this.flag.timesCan.indexOf(this.time.format) === -1) return
      this.flag.type = this.flag.type === 'times' ? 'dates' : 'times'
      setTimeout(() => {
        this.triggerScroll()
      }, 10)
      //  程序生成时分秒选项数据
      if (this.hours.length) return
      let h = []
      let ms = []
      for (let i = 0; i < 24; i++) {
        h.push(i > 9 ? i : ('0' + i))
      }
      ms = JSON.parse(JSON.stringify(h))
      for (let i = 24; i < 60; i++) {
        ms.push(i)
      }
      this.hours = h
      this.minSec = ms
    },
    setTimes: function (num, type) {
      //  设置具体时分秒
      switch (type) {
        case 'h': this.selected.hour = num; break
        case 'm': this.selected.minute = num; break
        case 's': this.selected.second = num; break
        default: {}
      }
    },
    triggerScroll: function () {
      //  选择具体时分秒的时候，将已选中的选项滚动到视图窗口内
      let parent = this.$refs.vTimeOptions
      if (!parent) return
      //  获取对应节点
      let hour = parent.children[0]
      let minute = parent.children[1]
      let second = parent.children[2]
      //  计算偏移量
      let hScroll = this.selected.hour ? parseInt(this.selected.hour) * 30 : 0
      let mScroll = this.selected.minute ? parseInt(this.selected.minute) * 30 : 0
      let sScroll = this.selected.second ? parseInt(this.selected.second) * 30 : 0
      scroll(hour, hScroll)
      scroll(minute, mScroll)
      scroll(second, sScroll)
      function scroll (dom, space) {
        space = space - 60
        dom.scroll(0, space)
      }
    },
    doFunc: function (type) {
      //  按钮组不同按钮功能定义
      const getEnsureable = () => {
        //  判断确定按钮是否可用
        // if (this.flag.canToday) {
        let selected = `${this.selected.date} ${this.selected.hour}:${this.selected.minute}:${this.selected.second}`
        selected = this.getDate(selected, this.time.format)
        if ((!this.time.max || (this.time.max >= selected)) && (!this.time.min || (this.time.min <= selected))) {
          return true
        }
      }
      // }
      switch (type) {
        case 'clear': {
          this.time.selected = undefined
          this.$emit('callback', this.time.selected)
          break
        }
        case 'now': {
          if (this.flag.canToday) {
            this.time.selected = this.getDate('', this.time.format)
            this.$emit('callback', this.time.selected)
          }
          break
        }
        case 'ensure': {
          // if (!this.flag.canToday && ((this.time.max && this.time.max < this.selected.date) || (this.time.min && this.time.min > this.selected.date))) {
          if (!getEnsureable()) {
            return
          } else {
            this.time.selected = this.getFormatValue(this.time.format)
            this.$emit('callback', this.time.selected)
            break
          }
        }
      }
      this.calculateDates(this.time.selected)
      this.hide()
    },
    getFormatValue: function (format = 'day') {
      //  获取当前选中的日期
      let date = ''
      switch (format) {
        case 'year': date = this.selected.year; break
        case 'month': date = `${this.selected.year}-${this.selected.month}`; break
        case 'day': date = `${this.selected.year}-${this.selected.month}-${this.selected.day}`; break
        case 'hour': date = `${this.selected.year}-${this.selected.month}-${this.selected.day} ${this.selected.hour}`; break
        case 'minute': date = `${this.selected.year}-${this.selected.month}-${this.selected.day} ${this.selected.hour}:${this.selected.minute}`; break
        case 'second': date = `${this.selected.year}-${this.selected.month}-${this.selected.day} ${this.selected.hour}:${this.selected.minute}:${this.selected.second}`; break
      }
      return date
    },
    activeInput: function () {
      //  激活文本框，显示日历选择
      if (this.time.disable) return
      if (this.flag.timeout) return
      this.$refs.vTimeInput.focus()
      this.init()
    },
    showTimeOption: function () {
      //  显示日历选择面板
      this.flag.show = true
      setTimeout(() => {
        //  当日期插件位于页面底部则点击触发显示在文本框上方
        let dom = this.$refs.vTimeBody
        let rect = this.$refs.vTimeInput.getBoundingClientRect()
        let h = dom.getBoundingClientRect().height
        let wh = window.innerHeight || document.documentElement.clientHeight
        if (dom) {
          if (wh - rect.top <= h) dom.style.top = '-330px'
          else dom.style.top = '120%'
          dom.style.opacity = '1'
        }
      }, 10)
    },
    hideTimeOption: function (flag) {
      //  隐藏日历选择面板
      this.flag.timeout = setTimeout(() => {
        let dom = this.$refs.vTimeBody
        if (dom) {
          dom.style.top = '250%'
          dom.style.opacity = '0'
        }
        setTimeout(() => {
          this.flag.show = false
          this.backScene()
        }, 300)
        this.flag.timeout = null
      }, 200)
    },
    cancelHide: function () {
      //  取消隐藏
      clearTimeout(this.flag.timeout)
      if (!this.flag.imediate) this.$refs.vTimeInput.focus()
    },
    hide: function () {
      //  直接隐藏
      this.flag.imediate = true
      let dom = this.$refs.vTimeBody
      if (dom) {
        dom.style.top = '250%'
        dom.style.opacity = '0'
      }
      setTimeout(() => {
        this.flag.show = false
        this.backScene()
      }, 300)
      this.flag.timeout = null
    },
    backScene: function () {
      //  关闭日历，还原各变量值
      this.flag.type = 'dates'
      this.flag.imediate = false
    },
    getRegularDate: function (date = undefined, flag = false) {
      //  当传入日期不符合期望时，主动将其转化为可接受标准日期
      if (!date) return
      let type = typeof date
      let str = ''
      switch (type) {
        case 'string': {
          if (isNaN(parseInt(date))) {
            /**
            * @author: wangjun
            * @date: 2019-03-15 18:13:35
            * @desc: 特殊日期英文转化为日期字符串
            */
            if (date === 'today') {
              str = this.getDate('', this.time.format)
            }
            if (date === 'yesterday') {
              str = this.getDate((new Date()).valueOf() - 24 * 3600 * 1000, this.time.format)
            }
            if (date === 'tomorrow') {
              str = this.getDate((new Date()).valueOf() + 24 * 3600 * 1000, this.time.format)
            }
          } else {
            str = date
          }
          break
        }
        case 'number': {
          /**
          * @author: wangjun
          * @date: 2019-03-15 18:14:17
          * @desc: 支持100 * 365（10年内数字日期转化）；
          * 超过 100 * 365 ；当时间戳处理，转化为日期字符串
          */
          if (date < 100 * 365) {
            str = this.getDate((new Date()).valueOf() + date * 24 * 3600 * 1000, this.time.format)
          } else {
            str = this.getDate(date, this.time.format)
          }
          break
        }
        case 'object': {
          //  支持日期对象转化为日期字符串
          str = this.getDate(date, this.time.format)
          break
        }
      }
      if (flag) {
        let arr = JSON.parse(JSON.stringify(str.split(' ')))
        str = arr[0]
      }
      return str
    },
    dealDate: function (date, full = false) {
      if (!full) return date.split(' ')[0]
      else {
        let times = date.split(' ')[1]
        if (times) {
          let len = times.split(':').length
          switch (len) {
            case 3: return date
            case 2: return date + ':00'
            case 1: return date + ':00:00'
            default: break
          }
        } else {
          return date + ' 00:00:00'
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'time.max': function (newVal) {
      this.time.max = this.getRegularDate(newVal, false)
    },
    'time.min': function (newVal) {
      this.time.min = this.getRegularDate(newVal, false)
    }
  }
}
</script>

<style scoped>
.v-time {
  display: inline-block;
  position: relative;
  font-size: 14px;
  user-select: none;
  background-color: #fff;
}
.v-time-txt {
  display: inline-block;
  box-sizing: border-box;
  width: 200px;
  min-width: 180px;
  height: 34px;
  min-height: 30px;
  line-height: 32px;
  padding: 0 10px;
  color: #555;
  border: 1px solid #ccc;
  background-image: url(./imgs/date.png);
  background-repeat: no-repeat;
  background-position: 98% center;
  background-size: 28px 28px;
  cursor: pointer;
}
.v-time > input {
  width: 0;
  height: 0;
  border: none;
  outline: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
}
.v-time-options {
  position: absolute;
  width: 270px;
  height: 320px;
  box-shadow: 0 0 5px 0 #ccc;
  top: 250%;
  border-radius: 1px;
  opacity: 0;
  transition: top .2s,opacity 0.2s;
  background-color: #fff;
  z-index: 9999999;
}
.v-time-header {
  height: 40px;
  line-height: 40px;
  background-color: #5896f8;
  color: #fff;
  text-align: center;
}
.v-time-header > div {
  float: left;
}
.v-time-header > div > span {
  cursor: pointer;
}
.v-time-arrow-left,.v-time-arrow-right {
  box-sizing: border-box;
  width: 30%;
  padding: 0 10px;
  text-align: left;
}
.v-time-arrow-right {
  text-align: right;
}
.v-time-year-month {
  width: 40%;
  text-align: center;
}
.v-time-body {
  padding: 5px;
  height: 224px;
  color: #666;
}
.v-time-weekdays {
  margin-top: 10px;
  color: #111;
}
.v-time-dates {
  margin-top: 3px;
  color: #666;
}
.v-time-weekdays > span,.v-time-dates > span {
  display: inline-block;
  width: 14.28%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.v-time-dates > span {
  cursor: pointer;
  background-color: #fff;
  transition:  background-color .2s;
}
.v-time-dates > span:hover,
.v-time-years > span:hover,
.v-time-times-options > div > span:hover,
.v-time-monthes > span:hover {
  background-color: #ddd;
  color: #555;
}
.v-time-date-gray {
  color: #d2d2d2;
}
.v-time-date-today {
  color: #5896f8;
  background-color: #efefef!important;
}
.v-time-date-selected {
  color: #fff!important;
  background-color: #5896f8!important;
}
.v-time-years > span,.v-time-monthes > span {
  display: inline-block;
  width: 33.33%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
}
.v-time-monthes > span {
  height: 56px;
  line-height: 56px;
}
.v-time-footer {
  margin-top: 3px;
  border-top: 1px solid #eee;
  padding: 8px;
  color: #666;
}
.v-time-footer > * {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: #5896f8;
  cursor: pointer;
}
.v-time-footer > span {
  float: right;
  width: 46px;
  text-align: center;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  color: #666;
}
.v-time-footer > span:nth-child(2) {
  border-right: 1px solid #ddd;
}
.v-time-footer > span:hover {
  color: #5cb85c;
}
.v-time-times-title > span {
  display: inline-block;
  width: 32.2%;
  height: 38px;
  line-height: 38px;
  text-align: center;
}
.v-time-times-options > div {
  width: 32.8%;
  float: left;
  height: 180px;
  border: 1px solid #ddd;
  border-left: none;
  overflow: hidden;
}
.v-time-times-options > div:hover {
  overflow-y: auto;
}
.v-time-times-options > div:nth-child(1) {
  border-left: 1px solid #ddd;
}
.v-time-times-options > div > span {
  display: block;
  height: 30px;
  line-height: 30px;
  padding-left: 30px;
  cursor: pointer;
}
.v-time-disable {
  color: #d2d2d2 !important;
  cursor: not-allowed !important;
  background-color: #fff!important;
}
.v-time-disable-whole {
  color: #bbb !important;
  cursor: not-allowed !important;
  background-color: #efefef!important;
}
</style>
