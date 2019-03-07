<!-- created by wangjun on 2019-03-07 -->
<template>
  <div>
    <div>
      <v-checkbox :checkbox='checkbox' @callback='getCheckbox'></v-checkbox>
      <button
      @click="change"
      class="btn btn-default btn-small">change</button>
    </div>
    <div>
      <v-radio :radio='radio' @callback='getRadio'></v-radio>
      <button
      @click="changeRadio"
      class="btn btn-default btn-small">change</button>
    </div>
    <div class="form-control clearfix" style="margin-top: 30px;">
      <label class="label">使用</label>
      <textarea class="textarea" disabled><v-checkbox :checkbox='checkbox' @callback='getCheckbox'></v-checkbox></textarea>
      <textarea class="textarea" disabled><v-radio :radio='radio' @callback='getRadio'></v-radio></textarea>
      <span class="tips">checkbox/radio对象包含如下属性，callback选择触发回调(非必传)</span>
    </div>
    <table class="table">
      <caption>checkbox/radio对象对应属性</caption>
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
  </div>
</template>

<script>
import data from './config/array.js'
import theader from './config/table.js'
export default {
  name: '',
  data () {
    return {
      theader: theader,
      tbody: [],
      checkbox: {
        data: data.unnormal,
        selected: [1, 2],
        disable: 'part',
        config: {
          id: 'idx',
          name: 'namex'
        }
      },
      radio: {
        data: data.normal,
        selected: 1,
        disable: false,
        config: {
          id: 'id',
          name: 'name'
        }
      }
    }
  },
  methods: {
    init: function () {
      this.defineBody()
    },
    change: function () {
      this.checkbox.data.push({
        idx: '5h',
        namex: '新增'
      })
      // this.checkbox.disable = 'all'
      // this.checkbox.data.splice(1,1)
    },
    changeRadio: function () {
      this.radio.data.push({
        id: '5h',
        name: '新增'
      })
    },
    getCheckbox: function (array) {
      console.log(array)
    },
    getRadio: function (item) {
      console.log(item)
    },
    defineBody: function () {
      this.tbody = [
        {
          arg: 'data',
          type: 'Array',
          desc: '选项列表',
          must: false,
          exp: `[
            {
              idx: 0,
              namex: 'QQ邮箱'
            },
            {
              idx: 1,
              namex: 'WIFI万能钥匙'
            },
            {
              idx: 4,
              namex: '百度贴吧'
            },
            {
              idx: 2,
              namex: '支付宝'
            }
          ]`,
          default: '无'
        },
        {
          arg: 'selected',
          type: 'Array/Number/String',
          desc: 'checkbox插件传入Array类型参数，radio插件传入Number/String类型参数',
          must: false,
          exp: `[1,2]/1`,
          default: '无'
        },
        {
          arg: 'disable',
          type: 'Boolean/String',
          desc: '是否禁用',
          must: false,
          exp: `all / part / true / false`,
          default: 'false'
        },
        {
          arg: 'config',
          type: 'Object',
          desc: '配置id，name映射',
          must: false,
          exp: `config: {
            id: 'idx',
            name: 'namex'
          }`,
          default: '无'
        }
      ]
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
