<template>
  <div>
    <v-landmark :landmark="landmark" :width='220'>
      <div slot="1">
        <p>测试人员 <a style="cursor:pointer;" class="a" @click="hello" v-tips="'click me'">催一下</a></p>
        <p>建议成本则是广告投放量（下单数据）、第三方监测机构IES数据、投放系统的量三者取最小。</p>
      </div>
      <div slot="2">
        aaa
        <p>建议成本则是广告投放量（下单数据）、第三方监测机构IES数据、投放系统的量三者取最小。</p>
      </div>
      <div slot="3">
        cc
        <p>建议成本则是广告投放量（下单数据）、第三方监测机构IES数据、投放系统的量三者取最小。</p>
      </div>
    </v-landmark>

    <v-step style="margin-top: 50px;" :step="step" :width='200'>
      <div slot="1">
        <p>待生成投放</p>
        <p>待投放启动</p>
        <p>投放中</p>
      </div>
      <div slot="2">
        <p>商务确认数据中</p>
        <p>合作方确认数据中</p>
        <div style="color: red;">对账不通过
          <p class='error-msg'>
            建议成本则是广告投放量（下单数据）、第三方监测机构IES数据。
          </p>
        </div>
      </div>
      <div slot="3">
        <p style="color: #3896f8;">商务生成电子结算函</p>
        <p>合作方确认电子结算函</p>
        <p>商务等待确认结算函</p>
        <p>财务确认结算</p>
        <p>财务等待收款</p>
      </div>
    </v-step>
  </div>
</template>

<script>
export default {
  name: 'landmark',
  data () {
    return {
      landmark: [
        // {idx: 1, status: 'on', title: '新建'},
        // {idx: 2, status: 'success', title: '排期'},
        // {idx: 3, status: 'error', title: '审核'},
        // {idx: 4, status: 'normal', title: '完成'}
        {idx: 1, status: 'success', title: '<span style="color:#777">新建项目</span>'},
        {idx: 2, status: 'error', title: '新建排期'},
        {idx: 3, status: 'normal', title: '提交审核'}
      ],
      step: [
        {title: '投放', status: 'success'},
        {title: '对账', status: 'on'},
        {title: '结算', status: 'error'},
        {title: '完成', status: 'normal'}
      ]
    }
  },
  methods: {
    init () {
      console.log(111)
    },
    hello () {
      console.log('hello')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.error-msg {
  box-sizing: border-box;
  padding: 3px 5px;
  color: #777;
  border: 1px solid rgba(255, 163, 158, 1);
  background-color: rgba(255, 242, 241, 1);
  border-radius: 4px;
}
</style>
