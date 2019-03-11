<!-- created by wangjun on 2019-03-11 -->
<template>
  <div>
    <v-pagination :pagination='pagination' @callback='getList'></v-pagination>
    <button @click="change" class="btn btn-default btn-small">change</button>
    <div style="height: 700px;">
      <div class="form-control clearfix" style="margin: 20px 0;">
      <label class="label">使用</label>
      <textarea class="textarea" style="width:500px;height:80px;" disabled><v-pagination :pagination='pagination' @callback='getList'></v-pagination></textarea>
      <span class="tips">pagination对象包含如下列表参数；callback选择触发回调(非必须)</span>
    </div>
    <table class="table">
      <caption>pagination对应属性</caption>
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
    <v-pagination :pagination='pagination2'></v-pagination>
  </div>
</template>

<script>
import theader from './config/table.js'
export default {
  name: '',
  data () {
    return {
      theader: theader,
      tbody: null,
      pagination: {
        current: 3, //  当前页
        pagesize: 10, //  每页展示条目数
        total: 128, //  总页数
        showPages: 5, //  显示分页页码数目
        detail: false // 是否显示详细的分页信息
      },
      pagination2: {
        current: 1, //  当前页
        pagesize: 7, //  每页展示条目数
        total: 151, //  总页数
        showPages: 6, //  显示分页页码数目
        detail: true // 是否显示详细的分页信息
      }
    }
  },
  methods: {
    init: function () {
      this.defineBody()
    },
    change: function () {
      // this.pagination.current = 10
      this.pagination.pagesize = 8
      this.pagination.total = 398
    },
    getList: function (page) {
      console.log(page)
    },
    defineBody: function () {
      this.tbody = [
        {
          arg: 'current',
          type: 'Number',
          desc: '当前页',
          must: 'false',
          exp: 1,
          default: 1
        },
        {
          arg: 'pagesize',
          type: 'Number',
          desc: '每页展示条目数',
          must: 'false',
          exp: 10,
          default: 10
        },
        {
          arg: 'total',
          type: 'Number',
          desc: '总条目数',
          must: 'true',
          exp: 120,
          default: '无'
        },
        {
          arg: 'showPages',
          type: 'Number',
          desc: '分页中间显示分页个数',
          must: 'false',
          exp: 5,
          default: 5
        },
        {
          arg: 'detail',
          type: 'Boolean',
          desc: '是否展示详细分页信息',
          must: 'false',
          exp: true,
          default: true
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
