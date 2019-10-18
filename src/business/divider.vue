<!-- created by wangjun on 2019-07-28 -->
<template>
  <div>
    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row>
      <v-divider :align='"left"' :color="'#ddd'">
        <span style="color: #f56c6c;">分割线</span>
      </v-divider>
    </v-row>

    <v-row>
      <v-divider :align='"right"' :color="'#ddd'">
        <span>分割线</span>
      </v-divider>
    </v-row>

    <v-row>
      <v-divider :align='"center"' :color="'#3896f8'">
        <span>分割线2</span>
      </v-divider>
    </v-row>

    <v-row>
      <label class="label" style="float:left;">使用</label>
      <textarea class="textarea" disabled style="margin-left:10px;width: 450px;height: 100px;">
        <v-divider :align='"left"' :color="'#ddd'">
          <span style="color: #f56c6c;">分割线</span>
        </v-divider>
      </textarea>
    </v-row>

    <v-row>
      <label class="label">提示</label>
      <span>v-divider 组件的提示信息交由开发者任意定义</span>
    </v-row>

    <v-table :data='table.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">v-divider 使用介绍</p></template>
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
            arg: ':align',
            type: 'String',
            desc: '提示文本处在分割线位置：[ left | center | right ]',
            must: 'false',
            exp: 'right',
            default: 'left'
          },
          {
            arg: ':color',
            type: 'String',
            desc: '分割线的颜色，请传入标准的颜色值（16进制，rgb，rgba）',
            must: 'false',
            exp: '#bbbbbb',
            default: '#3896f8'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
