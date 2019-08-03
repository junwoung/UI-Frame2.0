<!-- created by wangjun on 2019-07-20 -->
<template>
  <div>
    <v-row>
      <v-col>
        <label class="label label-require">带禁用、可过滤</label>
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
      </v-col>
      <v-col>
        <button class="btn btn-default btn-small" @click="getVal">get val</button>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label class="label label-require">带配置映射、只读</label>
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
      </v-col>
      <v-col>
        <button class="btn btn-default btn-small" @click="getVal2">get val2</button>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label class="label label-require">必选、可清空所选</label>
        <v-dropdown
        v-model="form.val2"
        :data="dropdown.data1"
        :config="dropdown.config"
        :clearable='true'
        :require='true'
        @callback="getOption3"
        :placeholder="'请选择'"
        style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;"></v-dropdown>
      </v-col>
      <v-col>
        <button class="btn btn-default btn-small" @click="getVal3">get val3</button>
      </v-col>
    </v-row>
    <v-row>
      <label class="label label-require">禁用</label>
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
    </v-row>
    <v-row style="float: none;">
      <v-col>
        <label class="label label-require">自定义选项文本</label>
        <v-dropdown
        v-model="form.val4"
        :clearable='true'
        :require='true'
        :placeholder="'请选择'"
        :data='dropdown.data4'
        :config="dropdown.config2"
        :disable='[3]'
        @callback="getOption4"
        style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;">
          <v-drop-option>
            <span>状态</span>
          </v-drop-option>
          <v-drop-option @callback='getSelf' :id="123" :name='"我好饿"'>
            <span>我好饿</span><em style="float:right;font-size: 12px;">hhhhh</em>
          </v-drop-option>
          <v-drop-option @callback='getSelf' :id="234" :name="'车厘子'" :disable='true'>
          </v-drop-option>
          <v-drop-option @callback='getSelf' :id="345" :name='"纸飞机"'>
            <span>纸飞机(自定义)</span>
          </v-drop-option>
          <v-drop-option style="border-bottom: 1px dashed #ddd;">
            <span>组件</span>
          </v-drop-option>
        </v-dropdown>
      </v-col>
      <v-col>
        <button class="btn btn-default btn-small" @click="getVal4">get val4</button>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label class="label" style="float: left;">使用1</label>
        <textarea class="textarea" readonly style="width: 400px;height: 300px;">
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
      </v-col>
      <v-col>
        <label class="label" style="float: left;">使用5</label>
        <textarea class="textarea" readonly style="width: 800px;height: 600px;">
          <v-dropdown
            v-model="form.val4"
            :clearable='true'
            :require='true'
            :placeholder="'请选择'"
            :data='dropdown.data4'
            :config="dropdown.config2"
            :disable='[3]'
            @callback="getOption4"
            style="width: 200px;height: 40px;border-color: #999;border-radius: 10px;">
              <v-drop-option>
                <span>状态</span>
              </v-drop-option>
              <v-drop-option @callback='getSelf' :id="123" :name='"我好饿"'>
                <span>我好饿</span><em style="float:right;font-size: 12px;">hhhhh</em>
              </v-drop-option>
              <v-drop-option @callback='getSelf' :id="234" :name="'车厘子'" :disable='true'>
                车厘子
              </v-drop-option>
              <v-drop-option @callback='getSelf' :id="345" :name='"纸飞机"'>
                <span>纸飞机</span>
              </v-drop-option>
              <v-drop-option style="border-bottom: 1px dashed #ddd;">
                <span>组件</span>
              </v-drop-option>
            </v-dropdown>
            <!-- 对应例5 -->
        </textarea>
      </v-col>
    </v-row>
    <v-row style="float:none;">
      <p><label class="label" style="margin-right: 30px;">提示1</label>可以通过设置@callback回调函数来具体定义触发事件，如果只想单纯的获取选中值的<a class='a'>id</a>则不必配置callback，配置v-model选项可以方便双向获取数据</p>
      <p><label class="label" style="margin-right: 30px;">提示2</label>可以通过键盘上下和enter键来切换和选中选项</p>
      <p><label class="label" style="margin-right: 30px;">提示3</label>组件本身支持自定义选项（<a class="a">见第五个例子</a>）和传入数组选项两种方式。两种方式也可以并存，（自定义选项通过slot默认插槽始终排列在传入数组选项之前）</p>
      <p><label class="label" style="margin-right: 30px;">提示4</label>不建议两种方式混合使用，以免造成逻辑混乱</p>
    </v-row>
    <v-table :data="table.data" :header="table.header">
      <template slot="caption">
        <p style="font-size: 20px;height: 50px;line-height: 50px;text-align: center;"><a class="a" style="font-size: 20px;">v-dropdown</a> 参数介绍</p>
      </template>
      <v-thead-col v-for="title in table.titles" :key="title.name" :width='title.width'>
        {{title.name}}
      </v-thead-col>
    </v-table>
    <v-table :data="table.data2" :header="table.header">
      <template slot="caption">
        <p style="font-size: 20px;height: 50px;line-height: 50px;text-align: center;"><a class="a" style="font-size: 20px;">v-drop-option</a> 参数介绍</p>
        <p style="text-align: center;padding-bottom: 10px;color: #f56c6c;">v-drop-option组件 只能内置于v-dropdown组件内使用，用于自定义选项模板</p>
      </template>
      <v-thead-col v-for="title in table.titles" :key="title.name" :width='title.width'>
        {{title.name}}
      </v-thead-col>
      <tr slot="footerRow">
        <td colspan="6">
          使用该组件，不指定id或者name，选项将不被视为一个可选择项，组件内部有内置的样式进行控制，自己改写样式的时候可能需要用<a class="a">!important</a>修饰符覆盖内置样式<br/>
          选项组件默认展示name的值，支持自定义选项内容
        </td>
      </tr>
    </v-table>
    <v-row style="float:none;">
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
    </v-row>
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
        config4: {
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
        ],
        data4: [
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
    getVal4 () {
      console.log(this.form.val4)
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
    getOption4 (op) {
      console.log(op)
      // console.log(this.form.val4)
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
        {arg: 'readonly', type: 'Boolean', desc: '输入框是否只读（控件原生属性）', must: 'false', exp: 'readonly', default: 'null'},
        {arg: '@callback', type: 'Function', desc: '选项被点击触发回调，会携带一个Object参数，方便自定义操作', must: 'false', exp: ``, default: ''}
      ],
      this.table.data2 = [
        {arg: ':id', type: 'String / Number', desc: '选项ID，当不设置该项的时候，该项将不被视为可选项，配合自己定义的样式可以达到特殊效果展示', must: 'false', exp: '10086', default: 'undefined'},
        {arg: ':name', type: 'String / Number', desc: '选项选中展示的文本，当不设置该项的时候，该项将不被视为可选项，配合自己定义的样式可以达到特殊效果展示', must: 'false', exp: "车厘子", default: 'undefined'},
        {arg: ':disable', type: 'Boolean', desc: '选项是否禁用', must: 'false', exp: 'true', default: 'false'},
        {arg: '@callback', type: 'Function', desc: '选项被点击触发回调，会携带一个Object参数，方便自定义操作（当自定义选项和传入数组选项混合使用的情况下，自定义选项被选中不会触发传入数组定义的callback，反之亦然）', must: 'false', exp: ``, default: ''}
      ]
    },
    getSelf (op) {
      console.log(op)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-col {
  margin-right: 30px;
}
.v-row {
  float: left;
}
</style>
