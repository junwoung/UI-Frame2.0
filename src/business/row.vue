<!-- created by wangjun on 2019-07-25 -->
<template>
  <div>
    <v-row class="row" :height='80' style="opacity: 0.75;" flex='center space-around'>
      <v-col>
        <label class="label label-require">姓名</label>
        <v-input placeholder="姓名"></v-input>
      </v-col>
      <v-col>2222</v-col>
      <v-col>3333</v-col>
    </v-row>
    <v-row :colWidth='300' :height='50' style="margin-top: 50px;">
      <v-col>444</v-col>
      <v-col>555</v-col>
      <v-col>666</v-col>
    </v-row>
    <v-row :width='"300px"' :top='30' :left='0' :right='30' :bottom='20'>
      <v-col :width='"33%"' :top='30'>777</v-col>
      <v-col :width='"33%"'>888</v-col>
      <v-col :width='"33%"'>999</v-col>
    </v-row>
    <v-row :width='"80%"'>
      <v-col flex='none space-around' :width='700'>
        <label class="label label-require">姓名</label>
        <v-input placeholder="姓名"></v-input>
      </v-col>
      <v-col>bbb</v-col>
      <v-col>ccc</v-col>
    </v-row>

    <v-row style="background-color: #fff;">
      <label class="label" style="float: left;">使用</label>
      <textarea class="textarea" style="width: 600px;height: 160px;">
        <v-row class="row" :height='80' style="opacity: 0.75;" flex='center space-around'>
          <v-col>
            <label class="label label-require">姓名</label>
            <v-input placeholder="姓名"></v-input>
          </v-col>
        </v-row>
      </textarea>
    </v-row>
    <v-row style="background-color: #fff;">
      <label class="label">提示</label>
      <span>可以通过设置v-row组件的:colWidth属性，达到对其内部v-col组件的宽度设置</span>
    </v-row>
    <v-table :data='table.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">v-row/v-col 使用介绍</p></template>
      <v-thead-col v-for="(title, idx) in table.titles" :key="idx" :width='title.width'>{{title.name}}</v-thead-col>
    </v-table>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
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
            arg: ':height',
            type: 'String | Number',
            desc: '高度',
            must: 'false',
            exp: `20 | '20px' | '20%'`,
            default: '-'
          },
          {
            arg: ':width',
            type: 'String | Number',
            desc: '宽度',
            must: 'false',
            exp: `20 | '20px' | '20%'`,
            default: '-'
          },
          {
            arg: ':top',
            type: 'String | Number',
            desc: '距离上边距（相当于margin-top，下同）',
            must: 'false',
            exp: `20 | '20px' | '20%'`,
            default: '-'
          },
          {
            arg: ':bottom',
            type: 'String | Number',
            desc: '距离下边距',
            must: 'false',
            exp: `20 | '20px' | '20%'`,
            default: '-'
          },
          {
            arg: ':right',
            type: 'String | Number',
            desc: '距离右边距',
            must: 'false',
            exp: `20 | '20px' | '20%'`,
            default: '-'
          },
          {
            arg: ':left',
            type: 'String | Number',
            desc: '距离左边距',
            must: 'false',
            exp: `20 | '20px' | '20%'`,
            default: '-'
          },
          {
            arg: ':colWidth',
            type: 'String | Number',
            desc: `row组件内的col宽度设置<br/><span style='color: #3896f8;'>只有v-row插件有此属性</span>`,
            must: 'false',
            exp: `20 | '20px' | '20%'`,
            default: '-'
          },
          {
            arg: 'flex',
            type: 'String',
            desc: '行/列组件内布局为弹性布局，接收两个值，空格分隔，第一个值表示垂直布局，第二个值表示水平布局',
            must: 'false',
            exp: `center center`,
            default: '-'
          }
        ]
      }
    }
  },
  methods: {
    init: function () {

    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.row {
  width: 90%;
  /* justify-content: space-around; */
}
.v-row {
  background-color: #e5e9f2;
}
</style>
