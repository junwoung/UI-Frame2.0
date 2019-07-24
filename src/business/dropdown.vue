<!-- created by wangjun on 2019-07-20 -->
<template>
  <div>
    <!--
      disabled
    -->
    <v-dropdown
    v-model="form.val"
    :loading='dropdown.loading'
    :data="dropdown.data"
    :config="dropdown.config"
    :disable='[1,3]'
    :error='dropdown.error'
    @callback="getOption"
    :placeholder="'请选择'"
    style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;"></v-dropdown>
    <button class="btn btn-default btn-small" @click="getVal">get val</button>
    <v-dropdown
    v-model="form.val1"
    :error='false'
    :data="dropdown.data2"
    :config="dropdown.config2"
    :clearable='false'
    readonly
    @callback="getOption2"
    :placeholder="'请选择'"
    style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;"></v-dropdown>
    <button class="btn btn-default btn-small" @click="getVal2">get val2</button>
    <v-dropdown
    v-model="form.val2"
    :data="dropdown.data1"
    :config="dropdown.config"
    :clearable='true'
    :require='true'
    @callback="getOption3"
    :placeholder="'请选择'"
    style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;"></v-dropdown>
    <button class="btn btn-default btn-small" @click="getVal3">get val3</button>

    <v-dropdown
    v-model="form.val2"
    :data="dropdown.data1"
    :config="dropdown.config"
    :clearable='true'
    :require='true'
    @callback="getOption3"
    disabled
    :placeholder="'请选择'"
    style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;"></v-dropdown>

    <div class="form-control clearfix" style="margin-top: 30px;">
      <label class="label">使用</label>
      <textarea class="textarea" readonly style="width: 400px;height: 250px;">
        <v-dropdown
          v-model="form.val"
          :data="dropdown.data"
          :config="dropdown.config"
          :disable='[1,3]'
          :error='dropdown.error'
          @callback="getOption"
          :placeholder="'请选择'"
          style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;"></v-dropdown>
          <!-- 对应例1 -->
      </textarea>
      <p>可以通过设置@callback回调函数来具体定义触发事件</p>
    </div>
    <v-table :data="table.data" :header="table.header">
      <template slot="caption">
        <p style="height: 50px;line-height: 50px;text-align: center;">v-dropdown 参数介绍</p>
      </template>
      <v-thead-col v-for="title in table.titles" :key="title.name" :width='title.width'>
        {{title.name}}
      </v-thead-col>
    </v-table>
    <span class="tips">可以通过设置style来改变输入框的外形</span>
    <v-dropdown
    v-model="form.val1"
    :error='false'
    :data="dropdown.data2"
    :config="dropdown.config2"
    :clearable='false'
    readonly
    @callback="getOption2"
    :placeholder="'请选择'"
    style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;"></v-dropdown>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      form: {
        val: '',
        val1: 5,
        val2: 1
      },
      dropdown: {
        loading: false,
        config: {
          id: 'id',
          name: 'name'
        },
        error: false,
        config2: {
          id: 'idx',
          name: 'namex'
        },
        data: [
          // {id: 1, name: '分页'},
          // {id: 2, name: '文件上传'},
          // {id: 3, name: '表格'},
          // {id: 5, name: '评分'},
          // {id: 4, name: '时间'},
          // {id: 51, name: '分页3'},
          // {id: 6, name: '里程碑'},
          // {id: 34, name: '分页2'},
          // {id: 8, name: '轮播'}
        ],
        data1: ['龙须面', '狮子头', '红烧乳鸽'],
        data2: [
          {idx: 1, namex: '分页'},
          {idx: 2, namex: 'wenjian'},
          {idx: 3, namex: '表格'},
          {idx: 4, namex: '时间'},
          {idx: 6, namex: '里程碑'},
          {idx: 5, namex: '评分'},
          {idx: 8, namex: '轮播'}
        ]
      },
      table: {
        /* eslint-disable */
        titles: [{name: '参数',width: '10%'},{name: '类型',width: '10%'},{name: '说明',width: '30%'},{name: '必填项',width: '10%'},{name: '样例值',width: '30%'},{name: '默认值', width: '10%'}],
        header: ['arg', 'type', 'desc', 'must', 'exp', 'default'],
        data: []
      }
    }
  },
  methods: {
    init: function () {
      this.addOne()
      this.getOptions()
      this.getData()
    },
    async getOptions () {
      this.dropdown.loading = true
      await this.$utils.sleep(2000)
      this.dropdown.loading = false
      this.dropdown.data = [
        {id: 1, name: '分页'},
        {id: 2, name: '文件上传'},
        {id: 3, name: '表格'},
        {id: 5, name: '评分'},
        {id: 4, name: '时间'},
        {id: 51, name: '分页3'},
        {id: 6, name: '里程碑'},
        {id: 34, name: '分页2'},
        {id: 8, name: '轮播'}
      ]
    },
    getVal () {
      console.log(this.form.val)
    },
    getVal2 () {
      console.log(this.form.val1)
    },
    getVal3 () {
      console.log(this.form.val2)
    },
    getOption (op) {
      console.log(op)
    },
    getOption2 (op) {
      console.log(op)
      this.form.val2 = ''
      if (!this.dropdown.data1.includes(op.item.namex)) {
        this.dropdown.data1.push(op.item.namex)
      }
      this.dropdown.error = !this.dropdown.error
    },
    getOption3 (op) {
      console.log(op)
    },
    async addOne () {
      await this.$utils.sleep(5000)
      this.dropdown.data.push({
        id: '10086',
        name: '当你'
      })
      this.dropdown.data2.unshift({
        idx: '10010',
        namex: '我想和你说'
      })
      this.dropdown.data1.unshift('双皮奶')
      this.dropdown.data1.pop()
      // this.form.val = 8
    },
    getData () {
      this.table.data = [
        {arg: 'v-model', type: 'String', desc: '接收一个用于获取选择值的参数名', must: 'false', exp: 'form.val', default: 'null'},
        {arg: ':data', type: 'Array', desc: '选项数据(支持简单数组类型，也支持数组每条是个对象)', must: 'false', exp: "['龙须面', '狮子头', '红烧乳鸽']", default: '[]'},
        {arg: ':config', type: 'Object', desc: '组件内部按照id、name来获取展示值和返回选项值的，当数组每条为对象且无id或name属性，通过配置id和name的映射来指定绑定关系', must: 'false', exp: '{id: "idx", name: "namex"}', default: '{}'},
        {arg: ':disable', type: 'Array', desc: '指定部分选项对应的id不可用', must: 'false', exp: `[1,3]`, default: '[]'},
        {arg: ':placeholder', type: 'String', desc: '未选择值时，展示的底文', must: 'false', exp: '请选择数据', default: ''},
        {arg: ':clearable', type: 'Boolean', desc: '选择值是否可以被清除', must: 'false', exp: 'true', default: 'false'},
        {arg: ':require', type: 'Boolean', desc: '是否必选（必选情况下，未选择值再失焦状态下，有报错提示）', must: 'false', exp: 'true', default: 'false'},
        {arg: ':error', type: 'Boolean', desc: '是否处于报错状态（给外部方便控制下拉框状态）', must: 'false', exp: 'true', default: 'false'},
        {arg: 'disabled', type: 'Boolean', desc: '输入框是否被禁用（控件原生属性）', must: 'false', exp: 'disabled', default: 'null'},
        {arg: 'readonly', type: 'Boolean', desc: '输入框是否只读（控件原生属性）', must: 'false', exp: 'readonly', default: 'null'}
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
