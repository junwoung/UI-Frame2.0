<!-- created by wangjun on 2019-03-07 -->
<template>
  <div class="v-radio">
    <span
     v-for="(item,index) in radio.data"
     :key="index"
     @click="select(item)"
     :class="getClassName(item)"
     class="rd">{{item[name]}}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      id: 'id',
      name: 'name'
    }
  },
  props: {
    radio: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function () {
      //  映射id，name
      if (this.radio && this.radio.config) {
        this.id = this.radio.config.id
        this.name = this.radio.config.name
      }
    },
    select: function (item) {
      if (this.radio.disable) return
      this.radio.selected = item[this.id]
      this.$emit('callback', item)
    },
    getClassName: function (item) {
      let classN = ''
      if (this.radio.selected === item[this.id]) {
        if (this.radio.disable) classN = 'rd-checked-disable'
        else classN = 'rd-checked'
      } else if (this.radio.disable) classN = 'rd-disable'
      return classN
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-radio{
  display: inline-block;
}
</style>
