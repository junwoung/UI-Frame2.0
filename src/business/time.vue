<!-- created by wangjun on 2019-03-13 -->
<template>
  <div>
    <v-time :time="time" @callback='getTime'></v-time>
    <v-time :time="time2" @callback='getTime'></v-time>
    <button class="btn btn-default btn-small" @click="change">change</button>
    <div class="form-control clearfix" style="margin: 20px 0;">
      <label class="label">使用</label>
      <textarea class="textarea" style="width:500px;height:80px;" disabled><v-time :time="time" @callback='getTime'></v-time></textarea>
      <span class="tips">time对象包含如下列表参数；callback选择触发回调(非必须)</span>
    </div>
    <div class="form-control clearfix">
      <label class="label">使用说明</label>
      <div>
        开始时间和结束时间相互制约，可以通过改变this.time.max / min 来达到控制日期范围效果<br>
        支持多精度时间选择，也支持多种形式时间初始化等；可以通过 this.time.selected 或者 callback回调函数返回的参数来获取已选时间
      </div>
    </div>
    <table class="table">
      <caption>time对应属性</caption>
      <thead class="thead">
        <tr>
          <th v-for="(item,index) in theader" :key="index" :style="{'width': item.width}">
            {{item.name}}
          </th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="(item,index) in tbody" :key="index">
          <td>{{item.arg}}</td>
          <td>{{item.type}}</td>
          <td>{{item.desc}}</td>
          <td>{{item.must}}</td>
          <td>{{item.exp}}</td>
          <td>{{item.default}}</td>
        </tr>
      </tbody>
    </table>
    <v-time :time="time2" @callback='getTime'></v-time>
  </div>
</template>

<script>
import theader from './config/table.js'
export default {
  name: '',
  data () {
    return {
      theader: theader,
      tbody: [],
      time: {
        // style: {
        //   width: '250px',
        //   height: '40px',
        //   'line-height': '40px',
        //   'background-color': '#efefef',
        //   color: '#bbb',
        //   cursor: 'not-allowed'
        // },
        placeholder: '请选择开始时间',
        selected: '',
        format: 'hour',
        // max: 'tomorrow',
        // min: 'yesterday',
        disable: false
      },
      time2: {
        // style: {
        //   width: '250px',
        //   height: '40px',
        //   'line-height': '40px',
        //   'background-color': '#efefef',
        //   color: '#bbb',
        //   cursor: 'not-allowed'
        // },
        placeholder: '请选择开始时间',
        selected: 20,
        format: 'second',
        // max: '2019-04-12',
        // min: '2019-02-28',
        disable: false
      }
    }
  },
  methods: {
    init: function () {
      this.defineBody()
    },
    getTime: function (time) {
      console.log(time)
      // this.change()
    },
    change: function () {
      // this.time.max = '2019-04-01'
      // this.time2.min = '2019-03-16'
      // this.time.selected = '2018-02-05'
      this.time.max = this.time2.selected
      this.time2.min = this.time.selected
    },
    defineBody: function () {
      this.tbody = [
        {
          arg: 'style',
          type: 'Object',
          desc: '时间插件外形控制',
          must: false,
          exp: `style: {
            width: '250px',
            height: '40px',
            'line-height': '40px',
            'background-color': '#efefef',
            color: '#bbb',
            cursor: 'not-allowed'
          }`,
          default: '无'
        },
        {
          arg: 'placeholder',
          type: 'String',
          desc: '文本框未选择时间时展示的底字',
          must: false,
          exp: `请选择开始时间`,
          default: '请选择时间'
        },
        {
          arg: 'selected',
          type: 'String / Number / Object',
          desc: `已选择时间；
          支持[yeaterday,today,tomorrow]初始化；
          支持输入小于100*365的数值（表示100年内的日期初始化）；
          支持时间戳初始化（大于100*365的数值也会被当成时间戳）；
          支持日期对象初始化；
          注意：传入空字符串会被初始化为当前日期（不初始化可以传入undefined或者不设置selected属性）`,
          must: false,
          exp: `2019-03-15`,
          default: 'undefined'
        },
        {
          arg: 'format',
          type: 'String',
          desc: `输出的日期格式；
          支持[year, month, day, hour, minute, second]六种格式；
          不传，或者其他未被识别的格式，会被统一转为day格式`,
          must: false,
          exp: `second`,
          default: 'day'
        },
        {
          arg: 'max',
          type: 'String / Number / Object',
          desc: `最大可选时间控制；
          初始化值的格式参考 selected 属性`,
          must: false,
          exp: 10,
          default: '无'
        },
        {
          arg: 'min',
          type: 'String / Number / Object',
          desc: '最小可选时间控制（类比 max 属性）',
          must: false,
          exp: -10,
          default: '无'
        },
        {
          arg: 'disable',
          type: 'Boolean',
          desc: '是否禁用插件',
          must: false,
          exp: `true`,
          default: 'false'
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'time.selected': function (val) {
      this.time2.min = val
    },
    'time2.selected': function (val) {
      this.time.max = val
    }
  }
}
</script>

<style scoped>

</style>
