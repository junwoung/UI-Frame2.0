<!-- created by wangjun on 2019-07-10 -->
<template>
  <div>
    <v-table :data='tableData' :header='tableHeader' :loading='status'>
      <template slot="caption">
        <span>表格测试</span>
      </template>
      <v-thead-col width='10%'>
        姓名
      </v-thead-col>
      <v-thead-col width='50%'>
        地址
        <span v-tips="{msg: `<a class='a'>hello</a> hhhh恭喜！你已经成功看到我了恭喜！你已经成功看到我了恭喜！你已经成功看到我了恭喜！你已经成功看到我了恭喜！你已经成功看到我了`, pos: 'top', bg: '#f56c6c', color: '#555', stay: true}">?</span>
      </v-thead-col>
      <v-thead-col width='15%'>
        联系电话
      </v-thead-col>
      <v-thead-col width='25%'>
        操作
      </v-thead-col>
      <!-- 特殊列可以自定义插槽,插槽名与字段名相对应 -->
      <template slot="name" slot-scope="item">
        <a class="a a-link" :src='item.item.name' @click="operate('go', item.item)">{{item.item.name}}</a>
      </template>
      <template slot="operations" slot-scope="item">
        <button @click="operate('edit', item.item)" class="btn btn-default">编辑</button>
        <button @click="operate('delete', item.item)" class="btn btn-danger-minor">删除</button>
      </template>
      <!-- <template slot='footerRow'>
        <td colspan="3" style="color: #000;font-size: 26px;">haode</td>
        <td style="color: #000;font-size: 26px;">emmmm</td>
      </template> -->
    </v-table>

    <v-table :data='table.data' :header='table.header' :loading='false'>
      <template slot="caption">
        <p style="text-align: center;">v-table 使用介绍</p>
      </template>
      <v-thead-col width="10%">参数</v-thead-col>
      <v-thead-col width="10%">类型</v-thead-col>
      <v-thead-col width="20%">说明</v-thead-col>
      <v-thead-col width="10%">必填项</v-thead-col>
      <v-thead-col width="40%">样例值</v-thead-col>
      <v-thead-col width="10%">默认值</v-thead-col>
    </v-table>
    <p><span class="tips">列表按照配置规则可以渲染常规列表。有特殊字段或者特殊操作的，可以通过配置slot并指定name(与要替换的列键名相同)，来自定义列显示；<br/>可以配置slot并指定name为caption/footerRow来设置表头和表尾</span></p>

    <v-table :data='table.data'>
      <template slot="caption">
        <p style="text-align: center;">v-thead-col 使用介绍</p>
      </template>
      <v-thead-col width="100%">设置列表标题项，可以指定列宽(width="10%")</v-thead-col>
    </v-table>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tableData: [],
      tableHeader: ['name', 'addr', 'phone', 'operations'],
      status: true,
      table: {
        header: ['arg', 'type', 'desc', 'must', 'exp', 'default'],
        data: [
          {arg: 'data', type: 'Array', desc: '要渲染的数组', must: 'true', exp: `[{id: 1, name: '王俊', addr: '安徽省合肥市', phone: 15013890200},{id: 2, name: 'WANGJUN', addr: '广东省深圳市', phone: 15271924481}]`, default: 'null'},
          {arg: 'header', type: 'Array', desc: '要渲染的键名', must: 'true', exp: `['name', 'addr', 'phone', 'operations']`, default: 'null'},
          {arg: 'loading', type: 'Boolean', desc: '列表内置加载状态', must: 'false', exp: 'true', default: 'false'}
        ]
      }
    }
  },
  methods: {
    init: function () {
      this.status = true
      setTimeout(() => {
        this.status = false
        this.getData()
      }, 3000)
      setTimeout(() => {
        this.status = true
        setTimeout(() => {
          this.getData()
          this.status = false
        }, 5000)
      }, 6000)
    },
    getData () {
      this.tableData = [
        {id: 1, name: '王俊', addr: '安徽省合肥市', phone: 15013890200},
        {id: 2, name: 'WANGJUN', addr: '广东省深圳市', phone: 15271924481},
        {id: 3, name: 'wangjun', addr: '安徽省合肥市', phone: 15013890200},
        {id: 4, name: 'junw', addr: '江苏省南京市', phone: 18790978543},
        {id: 5, name: 'junwoung', addr: '安徽省合肥市', phone: 15013890200},
        {id: 6, name: 'wangj', addr: '湖北省武汉市', phone: 15013890200}
      ]
    },
    operate (type, data) {
      console.log(type)
      console.log(data)
      if (type === 'delete') {
        this.$dialog.error('不可以删除' + data.name)
      }
      if (type === 'edit') {
        this.$dialog.confirm('确认编辑？')
      }
      if (type === 'go') {
        this.$dialog.msg('跳转成功')
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
