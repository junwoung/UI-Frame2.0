<!-- created by wangjun on 2019-07-10 -->
<template>
  <div class="v-form-control v-clearfix">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      name: 'form-control',
      model: null,
      rules: null,
      scope: null
    }
  },
  methods: {
    init: function () {
      this.model = this.$parent.model
      this.rules = this.$parent.rules
      this.scope = this.$parent.scope
    }
  },
  mounted () {
    //  避免先于父组件先初始化赋值
    setTimeout(() => {
      this.init()
    }, 0)
  }
}
</script>

<style scoped>
.v-form-control {
  display: block;
  margin-bottom: 20px;
}
.v-clearfix {
  zoom: 1;
}
.v-clearfix::after {
  content: '';
  clear: both;
  display: block;
}
.v-form-item-error {
  position: absolute;
  font-size: 12px;
  color: #f56c6c;
}
</style>
