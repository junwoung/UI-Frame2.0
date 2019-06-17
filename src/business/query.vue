<!-- created by wangjun on 2019-03-18 -->
<template>
  <div>
    <v-query :query="query" @callback='getOptions'></v-query>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      query: {
        // src: 'http://172.20.4.230:8080/web-services/dimension/initCondition.do',
        src: 'http://172.20.4.230:8080/web-services/dimension/initCondition4YIUI7ConfigPower.do',
        params: {
          // businessid: '711000',
          businessid: '612000',
          // beanid: ''
          beanid: '200'
        },
        disable: false
      }
    }
  },
  methods: {
    init: function () {

    },
    getOptions: function (options) {
      console.log(options)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
