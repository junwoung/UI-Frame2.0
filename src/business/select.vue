<!-- created by wangjun on 2019-03-06 -->
<template>
  <div>
    <div class="div">
      <v-select :select='select' @callback='getSelect'></v-select>
      <button class="btn btn-default btn-small" @click="change">change</button>
    </div>
    <table class="table">
      <thead class="thead">
        <tr>
          <th v-for="(item,index) in theader" :key="index">
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
        data: [
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
        ],
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
    change: function () {
      // this.select.disable = true
      this.select.data.push({
        idx: '56',
        namex: '哈哈哈A个多月就很烦会计师发货看的世界观'
      })
      this.select.selected = '56'
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
