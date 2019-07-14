<!-- created by wangjun on 2019-07-14 -->
<template>
  <div>
    <v-btn-group tiny='true'>
      <button
      style="height: 40px;width: 60px;"
      class="btn btn-minor btn-medium"
      :class="{'btn-selected': idx === btnGroup.selected}"
      v-for="(btn, idx) in btnGroup.data"
      @click="setSelect(idx)"
      :key="idx">{{btn}}</button>
    </v-btn-group>

    <v-btn-group>
      <button
      style="height: 40px;width: 60px;"
      class="btn btn-default btn-medium"
      :class="{'btn-selected2': idx === btnGroup.selected}"
      v-for="(btn, idx) in btnGroup.data"
      @click="setSelect(idx)"
      :key="idx"><span>{{btn}}</span></button>
    </v-btn-group>

    <v-btn-group tiny='false'>
      <button class="btn btn-danger">apple</button>
      <button class="btn btn-danger">orange</button>
      <button class="btn btn-danger">banana</button>
      <button class="btn btn-danger">melon</button>
    </v-btn-group>

    <div class="form-control" style="margin-top: 30px;">
      <label class="label">使用</label>
      <textarea class="textarea" style="width: 450px;height: 220px;" disabled>
        <v-btn-group tiny='true'>
          <button
          style="height: 40px;width: 60px;"
          class="btn btn-minor btn-medium"
          :class="{'btn-selected': idx === btnGroup.selected}"
          v-for="(btn, idx) in btnGroup.data"
          @click="setSelect(idx)"
          :key="idx">这里定义要现实的内容</button>
        </v-btn-group>
      </textarea>
    </div>

    <v-table :data="table.data" :header="table.header">
      <template slot="caption">
        <p style="text-align: center;">v-btn-group 使用介绍</p>
      </template>
      <v-thead-col width="10%">参数</v-thead-col>
      <v-thead-col width="10%">类型</v-thead-col>
      <v-thead-col width="50%">说明</v-thead-col>
      <v-thead-col width="10%">必填项</v-thead-col>
      <v-thead-col width="10%">样例值</v-thead-col>
      <v-thead-col width="10%">默认值</v-thead-col>
    </v-table>
    <p><span class="tips">v-btn-group 组件本身提供功能有限，只支持按钮组合显示类型;使用需要注意：组件只有直接包含button才会有效</span></p>

  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      btnGroup: {
        data: [1111, 22222, 33333, 4444, 5555],
        selected: ''
      },
      table: {
        header: ['arg', 'type', 'desc', 'must', 'exp', 'default'],
        data: [
          {arg: 'tiny', type: 'String', desc: '按钮组分布是什么类型；为“true”说明是紧凑型，否则默认为松散型', must: false, exp: 'tiny="true"', default: 1}
        ]
      }
    }
  },
  methods: {
    init: function () {

    },
    setSelect (idx) {
      console.log(idx)
      this.btnGroup.selected = idx
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
/* .btn-default-minor {
  background-color: #fff;
  border-color: #3896f8;
}
.btn-default-minor:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
} */
.btn-selected {
  background-color: #3896f8;
  border-color: #3896f8;
  color: #fff;
}
.btn-selected2 {
  background-color: #66b1ff;
  border-color: #66b1ff;
}
.span {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: inherit;
}
</style>
