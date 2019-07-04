<!-- created by wangjun on 2019-06-30 -->
<template lang="html">
  <component :options='this.$data' :is="getIs()"></component>
</template>

<script>
import framew from './frame.vue'
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {
    framew
  },
  methods: {
    init: function () {

    },
    getIs: function () {
      return 'framew'
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
