<!-- created by wangjun on 2019-03-06 -->
<template>
  <div>
    <!-- <baidu-map style="width:500px;height:250px;" :center="{lng:116,lat:29}" :zoom="12">
      <bm-navigation anchor='BMAP_ANCHOR_TOP_RIGHT'></bm-navigation>
    </baidu-map> -->
    <div class="div">
      <v-select :select='select' @callback='getSelect'></v-select>
      <button class="btn btn-default btn-small" @click="change">change</button>
      <button class="btn btn-danger btn-small" @click="clear">clear</button>
    </div>
    <div class="form-control clearfix" style="margin: 20px 0;">
      <label class="label">使用</label>
      <textarea class="textarea" style="width:450px;height:50px;" disabled><v-select :select='select' @callback='getSelect'></v-select></textarea>
      <span class="tips">select对象包含如下列表参数；callback选择触发回调(非必须)</span>
    </div>
    <div class="form-control clearfix">
      <label class="label">使用说明</label>
      <div>
        开发者可以利用 this.select.selected 获取选中选项id<br>
        也可以通过回调函数返回的参数获取选中项详细信息
      </div>
    </div>
    <table class="table">
      <caption>select对应属性</caption>
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
import theader from './config/table.js'
import data from './config/array.js'
export default {
  name: '',
  data () {
    return {
      theader: theader,
      tbody: [],
      select: {
        style: {
          'border-color': '#ccc',
          width: '200px',
          height: '32px',
          color: '#666',
          'border-radius': '2px',
          'background-color': '#fff'
        },
        data: data.unnormal,
        selected: undefined,
        placeholder: '请选择字母',
        disable: false,
        config: {
          id: 'idx',
          name: 'namex'
        },
        query: true
      }
    }
  },
  methods: {
    init: function () {
      this.defineBody()
    },
    getSelect: function (item) {
      console.log(item)
    },
    clear: function () {
      this.select.selected = 0
    },
    change: function () {
      // this.select.disable = true
      this.select.data.push({
        idx: '56',
        namex: '这是新增加的'
      })
      // this.select.selected = '56'
      // this.config = null
      // this.select.data = data.normal
    },
    defineBody: function () {
      this.tbody = [
        {
          arg: 'style',
          type: 'Object',
          desc: '定义插件样式',
          must: false,
          exp: `style: {
            'border-color': '#ccc',
            width: '200px',
            height: '32px',
            color: '#666',
            'border-radius': '2px',
            'background-color': '#fff'
          }`,
          default: '有默认样式，200*34'
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
          type: 'Number/String',
          desc: '已选项',
          must: false,
          exp: '1',
          default: '无'
        },
        {
          arg: 'placeholder',
          type: 'string',
          desc: '底字',
          must: false,
          exp: '请选择~',
          default: '请选择'
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
        },
        {
          arg: 'query',
          type: 'Boolean',
          desc: '是否显示过滤框',
          must: false,
          exp: 'true',
          default: 'false'
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
/* .div{width: 200px;height: 40px;} */
</style>
