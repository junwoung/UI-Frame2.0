<!-- created by wangjun on 2019-07-10 -->
<template>
  <th>
    <slot></slot>
  </th>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      styleObj: {}
    }
  },
  methods: {
    init: function () {
    }
  },
  mounted () {
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>

</style>
