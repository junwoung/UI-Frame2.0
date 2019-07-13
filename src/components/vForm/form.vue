<!-- created by wangjun on 2019-07-09 -->
<template>
  <form class="v-form" onsubmit='return false' autocomplete="off">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      scope: null
    }
  },
  props: {
    model: {
      type: Object,
      default: null
    },
    rules: {
      type: Object,
      default: null
    }
  },
  methods: {
    init: function () {

    }
  },
  mounted () {
    this.init()
    //  传入父级作用域，方便后面组件调用
    this.scope = this.$parent
  }
}
</script>

<style scoped>
.v-form > .v-form-control {
  /* margin-bottom: 30px; */
}
.v-form > .v-form-control:last-child {
  margin-bottom: 0;
}
</style>
