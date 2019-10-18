<!-- created by wangjun on 2019-10-12 -->
<template>
  <div>
    <v-row :colWidth='100'>
      <v-col style="position:relative;height: 60px;">
        <v-loading :loading='true'></v-loading>
      </v-col>
      <v-col style="position:relative;height: 60px;">
        <v-loading :color='"rgba(0,0,0,0.5)"' :size='50' :loading='true' :text="'加载中'"></v-loading>
      </v-col>
      <v-col style="position:relative;height: 60px;">
        <v-loading :color='"#bbbbbb"' :size='50' :loading='true' :text="'加载中'"></v-loading>
      </v-col>
      <v-col style="position:relative;height: 60px;">
        <v-loading :color='"#3896f8"' :size='30' :loading='true' :text="'loading...'"></v-loading>
      </v-col>
    </v-row>

    <v-row>
      <label class="label" style="float:left;">使用</label>
      <textarea class="textarea" disabled style="margin-left:10px;width: 350px;height: 100px;">
        <v-loading :color='"#bbbbbb"' :size='50' :loading='true' :text="'加载中'"></v-loading>
      </textarea>
    </v-row>

    <v-row>
      <label class="label">提示</label>
      <span>v-loading 组件采用的是绝对定位。正式使用的时候，为了方便控制定位，开发者可以外层嵌套一层div（定位非staic）</span>
    </v-row>

    <v-table :data='table.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">v-loading 使用介绍</p></template>
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
            arg: ':size',
            type: 'Number',
            desc: '加载圈的直径尺寸',
            must: 'false',
            exp: 50,
            default: 42
          },
          {
            arg: ':color',
            type: 'String',
            desc: '加载圈的颜色，请传入标准的颜色值（16进制，rgb，rgba）',
            must: 'false',
            exp: '#bbbbbb',
            default: '#3896f8'
          },
          {
            arg: ':loading',
            type: 'Boolean',
            desc: '控制显示',
            must: 'false',
            exp: true,
            default: false
          },
          {
            arg: ':text',
            type: 'String',
            desc: '提示文本',
            must: 'false',
            exp: '加载中',
            default: '无'
          }
        ]
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
