<!-- created by wangjun on 2019-03-07 -->
<template>
  <div>
    <div style="width: 1000px;">
       <v-tab :tab="tab" @callback = 'getSelected'></v-tab>
       <button @click="change" class="btn btn-default btn-small">change</button>
    </div>
    <div class="form-control clearfix" style="margin: 20px 0;">
      <label class="label">使用</label>
      <textarea class="textarea" style="width:450px;height:50px;" disabled><v-tab :tab="tab" @callback = 'getSelected'></v-tab></textarea>
      <span class="tips">tab对象包含如下列表参数；callback选择触发回调(非必须)</span>
    </div>
    <div class="form-control clearfix">
      <label class="label">使用说明</label>
      <div>
        开发者可以利用 this.tab.selected 获取选中选项id列表<br>
        也可以通过回调函数返回的参数获取选中项详细信息列表
      </div>
    </div>
    <table class="table">
      <caption>tab对应属性</caption>
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
      tab: {
        style: {
          width: '1200px',
          'background-color': '#fff'
        },
        data: data.unnormal,
        config: {
          id: 'idx',
          name: 'namex'
        },
        selected: [7, 30],
        // disable: true,
        showSelected: true
      }
    }
  },
  methods: {
    init: function () {
      this.defineBody()
    },
    getSelected: function (ret) {
      console.log(ret)
    },
    change: function () {
      // this.tab.disable = true
      this.tab.data.push({
        idx: '56',
        namex: '这是新增加的'
      })
      this.tab.selected = [2, 13, 23]
      // this.tab.data = data.normal
    },
    defineBody: function () {
      this.tbody = [
        {
          arg: 'style',
          type: 'Object',
          desc: '定义插件样式',
          must: false,
          exp: `style: {
            width: '1200px',
           'background-color': '#fff'
          }`,
          default: '默认背景#fff'
        },
        {
          arg: 'data',
          type: 'Array',
          desc: '选项数组',
          must: false,
          exp: `data: [
            {
              idx: 0,
              namex: 'AAAA'
            },
            {
              idx: 1,
              namex: 'BBBB'
            },
            {
              idx: 4,
              namex: 'EEEE'
            },
            {
              idx: 2,
              namex: 'CCCC'
            }
          ]`,
          default: '无'
        },
        {
          arg: 'selected',
          type: 'Array',
          desc: '已选项',
          must: false,
          exp: '[1,2]',
          default: '无'
        },
        {
          arg: 'showSelected',
          type: 'Boolean',
          desc: '是否单独一栏显示已选项',
          must: false,
          exp: 'true',
          default: 'false'
        },
        {
          arg: 'disable',
          type: 'Boolean',
          desc: '是否禁用',
          must: false,
          exp: 'true',
          default: 'false'
        },
        {
          arg: 'config',
          type: 'Object',
          desc: '配置id,name映射，插件默认按照id，name属性工作',
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
