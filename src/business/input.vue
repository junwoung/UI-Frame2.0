<!-- created by wangjun on 2019-05-20 -->
<template>
  <div>
    <input type="text" class="input" v-focus v-number='[10, 4, false]' v-model="val">
    <span v-focus v-number></span>
    <button class="btn btn-medium btn-default" @click="getVal">获取输入框值</button>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      model: {
        type: 'number',
        max: 99999,
        maxLength: 6,
        value: '',
        decimal: undefined,
        placeholder: '请输入整数'
      },
      model2: {
        type: 'number',
        value: '',
        decimal: 2,
        placeholder: '小数点后不能超过2'
      },
      val: 111,
      // num: [2, 1, true]
      num: {
        maxLength: 0,
        points: 10,
        minusFlag: false
      }
    }
  },
  methods: {
    init: function () {

    },
    getVal: function () {
      console.log(this.val)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
