<!-- created by wangjun on 2019-07-09 -->
<template>
  <div>
    <v-form :model="form" :rules="rules" >
      <v-form-control>
        <v-form-item prop='name'>
          <label class="label label-require">姓名</label>
          <input type="text" class="input" v-model="form.name">
        </v-form-item>
        <v-form-item prop='time'>
          <label class="label label-require">时间</label>
          <v-time :time='time'></v-time>
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item prop='age'>
          <label class="label">年龄</label>
          <input type="number" class="input" v-model="form.age">
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item prop='phone'>
          <label class="label">电话</label>
          <input type="number" class="input" v-model="form.phone">
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item prop='pwd'>
           <label class="label label-require">密码</label>
           <input type="password" autocomplete="new-password" class="input" v-model="form.pwd">
        </v-form-item>
        <v-form-item prop='repPwd'>
           <label class="label label-require">确认密码</label>
           <input type="password" autocomplete="new-password" class="input" v-model="form.repPwd">
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item>
          <button class="btn btn-default btn-large btn-small" @click="getForm">提交</button>
        </v-form-item>
      </v-form-control>
    </v-form>

    <v-row :top='30'>
      <label class="label" style="float: left;">使用</label>
      <textarea class="textarea" style="width:500px;height: 300px;">
        <v-form :model="form" :rules="rules" >
          <v-form-control>
            <v-form-item prop='name'>
              <label class="label label-require">姓名</label>
              <input type="text" class="input" v-model="form.name">
            </v-form-item>
            <v-form-item prop='time'>
              <label class="label label-require">时间</label>
              <v-time :time='time'></v-time>
            </v-form-item>
          </v-form-control>
        </v-form>
      </textarea>
    </v-row>
    <v-row>
      <p><label class="label">提示1</label><span>插件内置validate方法，已经默认挂载到vue原型中，可直接通过 <span style="color: #3896f8;">this.$validate.check(this.form, this.rules, this)</span> 调用。 可以控制表单各模块报错，具体使用见下表</span></p>
      <p><label class="label">提示2</label><span>验证规则，需自行配置。配置规律见下表</span></p>
      <p><label class="label">提示3</label><span>表单插件使用需严格遵循设计思路，分三层，v-form层表示整个表单，配置整个表单参数以及验证规则；v-form-control层表示每一行单位，用以控制布局；v-form-item层表示最小控制单位，用以定义具体每一单元的属性。</span></p>
      <p><label class="label">提示4</label><span>v-form-item内容最好为label + 具体元素，否则报错信息显示会偏移,即使是不显示标题，也最好弄个空标签占位</span></p>
      <p><label class="label">提示5</label><span>v-form搭配v-input/v-dropdown组件可以达到更好的交互体验（因为可以利用组件内部的报错机制），当然不会强制开发者去使用</span></p>
    </v-row>

    <v-table :data='table.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">v-form 使用介绍</p></template>
      <v-thead-col v-for="(title, idx) in table.titles" :key="idx" :width='title.width'>{{title.name}}</v-thead-col>
    </v-table>
    <v-divider style="margin: 30px 0;"></v-divider>
    <p style="text-align:center;">v-form-control无具体配置，仅仅用来控制布局</p>
    <v-divider style="margin: 30px 0;"></v-divider>
    <v-table :data='table2.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">v-form-item 使用介绍</p></template>
      <v-thead-col v-for="(title, idx) in table.titles" :key="idx" :width='title.width'>{{title.name}}</v-thead-col>
    </v-table>
    <v-divider style="margin: 30px 0;"></v-divider>
    <v-table :data='table3.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">validate 方法参数及返回值介绍</p></template>
      <v-thead-col v-for="(title, idx) in table.titles" :key="idx" :width='title.width'>{{title.name}}</v-thead-col>
    </v-table>
    <v-divider style="margin: 30px 0;"></v-divider>
    <v-table :data='table4.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">rules 对象属性介绍（配置规则）</p></template>
      <v-thead-col v-for="(title, idx) in table.titles" :key="idx" :width='title.width'>{{title.name}}</v-thead-col>
    </v-table>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      time: {
        selected: ''
      },
      form: {
        name: '',
        age: '',
        time: '',
        phone: '',
        pwd: '',
        repPwd: ''
      },
      rules: {
        name: {must: true, maxLength: 10, minLength: 4, title: '姓名'},
        age: {max: 100, min: 0, title: '年龄'},
        time: {must: true, bind: 'time.selected', title: '时间', min: '2019-07-09', max: '2019-07-20'},
        phone: {length: 11, title: '电话', reg: /^1[3|5|8|7](\d){9,9}$/},
        pwd: {must: true, minLength: 2, maxLength: 16, title: '密码'},
        repPwd: {must: true, same: 'pwd', title: '确认密码'}
      },
      table: {
        headers: ['arg', 'type', 'desc', 'must', 'exp', 'default'],
        titles: [
          {name: '参数', width: '10%'},
          {name: '类型', width: '10%'},
          {name: '说明', width: '30%'},
          {name: '必填项', width: '10%'},
          {name: '样例值', width: '30%'},
          {name: '默认值', width: '10%'}
        ],
        data: [
          {
            arg: ':model',
            type: 'Object',
            desc: '表单各控件属性集合对象',
            must: 'true',
            exp: `{name: '', age: ''}`,
            default: '{}'
          },
          {
            arg: ':rules',
            type: 'Object',
            desc: '配置的验证规则，具体配置见下表',
            must: 'true',
            //  eslint-disabled
            exp: `{
              name: {must: true, maxLength: 10, minLength: 4, title: '姓名'},
              age: {max: 100, min: 0, title: '年龄'},
              time: {must: true, bind: 'time.selected', title: '时间', min: '2019-07-09', max: '2019-07-20'},
              phone: {length: 11, title: '电话', reg: /^1[3|5|8|7](d){9,9}$/},
              pwd: {must: true, minLength: 2, maxLength: 16, title: '密码'},
              repPwd: {must: true, same: 'pwd', title: '确认密码'}
            }`,
            default: '{}'
          }
        ]
      },
      table2: {
        data: [
          {
            arg: 'prop',
            type: 'String',
            desc: '具体表单单元所包含的元素属性',
            must: 'true',
            exp: `name`,
            default: '-'
          }
        ]
      },
      table3: {
        data: [
          {
            arg: '参数1: this.form',
            type: 'Object',
            desc: '表单元素集合对象',
            must: 'true',
            exp: `{name: 'test', age: 18}`,
            default: '{}'
          },
          {
            arg: '参数2: this.rules',
            type: 'Object',
            desc: '验证规则，配置见下表',
            must: 'true',
            exp: `同 <span style="color: #3896f8;">表1 :rules</span> 属性 `,
            default: '{}'
          },
          {
            arg: '参数1: this',
            type: 'Object',
            desc: '当前组件作用环境',
            must: 'true',
            exp: `-`,
            default: '-'
          },
          {
            arg: '返回值',
            type: 'Boolean',
            desc: '用于描述是否通过验证，true: 通过，false: 未通过',
            must: '-',
            exp: `true`,
            default: '-'
          },
          {
            arg: '校验后的rules参数',
            type: 'Object',
            desc: '未通过校验的参数，验证规则对象会新增error描述',
            must: '-',
            exp: `-`,
            default: '-'
          }
        ]
      },
      table4: {
        data: [
          {
            arg: 'must',
            type: 'Boolean',
            desc: '是否必填',
            must: 'false',
            exp: `true`,
            default: 'false'
          },
          {
            arg: 'maxLength',
            type: 'Number',
            desc: '属性值最大长度',
            must: 'false',
            exp: `10`,
            default: '-'
          },
          {
            arg: 'minLength',
            type: 'Number',
            desc: '属性值最小长度',
            must: 'false',
            exp: `5`,
            default: '-'
          },
          {
            arg: 'max',
            type: 'Number | String',
            desc: '最大值',
            must: 'false',
            exp: `999`,
            default: '-'
          },
          {
            arg: 'min',
            type: 'Number | String',
            desc: '最小值',
            must: 'false',
            exp: `10`,
            default: '-'
          },
          {
            arg: 'same',
            type: 'String',
            desc: '值与表单另一值保持一致（确认密码用）',
            must: 'false',
            exp: `password`,
            default: '-'
          },
          {
            arg: 'bind',
            type: 'Any',
            desc: '值是否校验依赖于该值是否为true',
            must: 'false',
            exp: `this.selected = 1`,
            default: '-'
          },
          {
            arg: 'in',
            type: 'Array',
            desc: '值取值于该枚举数组',
            must: 'false',
            exp: `[0, 1, 2]`,
            default: '-'
          },
          {
            arg: 'title',
            type: 'String',
            desc: '属性名中文描述',
            must: 'true',
            exp: `姓名`,
            default: '-'
          }
        ]
      }
    }
  },
  methods: {
    init: function () {

    },
    getD (str) {
      console.log(str)
    },
    getForm () {
      let res = this.$validate.check(this.form, this.rules, this)
      console.log('这是validate验证类定义的函数验证的：' + res)
      console.log(this.form)
      setTimeout(() => {
        this.$set(this.rules.name, 'error', '')
        this.$validate.clearError(this.rules, ['name'], this)
      }, 3000)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
/* .label {width: 120px;} */
</style>
