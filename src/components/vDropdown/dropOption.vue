<!-- created by wangjun on 2019-07-25 -->
<template>
  <li
    @click="getOptionVal"
    :data-id='id'
    :class="getClassName">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      item: {
        id: this.id,
        name: this.name
      }
    }
  },
  props: {
    id: [String, Number],
    name: [String, Number],
    disable: Boolean,
    prevent: Boolean
  },
  computed: {
    getClassName: {
      get: function () {
        if (!this.id || !this.name) return {'v-dropd-label': true}
        let cname = {'v-dropd-show': true, 'v-dropd-normal': true, 'v-dropd-diy': true}
        //  禁用、选中、预选中、过滤不显示
        let p = this.$parent
        if (this.disable || p.disable.includes(this.id)) {
          cname['v-dropd-option-disable'] = true
          cname['v-dropd-normal'] = false
        }
        if (p.current === this.id) cname['v-dropd-option-selected'] = true
        if (p.flags.idx === (this.id + '')) cname['v-dropd-option-hover'] = true
        if (p.flags.onfilter) {
          if (!(this.name + '').includes(p.currentVal)) {
            cname['v-dropd-hidden'] = true
            cname['v-dropd-normal'] = false
            cname['v-dropd-show'] = false
          }
        }
        return cname
      }
    }
  },
  methods: {
    init: function () {
    },
    //  点击自定义选项，出发dropdown内部相关操作
    getOptionVal () {
      //  不可选择直接返回
      if (this.disable || this.prevent) return
      this.$parent.current = this.id
      this.$parent.currentVal = this.name
      //  触发绑定的v-model改变
      this.$parent.change()
      this.$emit('callback', {
        id: this.id,
        name: this.name
      })
    }
  },
  async mounted () {
    this.init()
    if (!this.id || !this.name) return
    //  标记选项不显示
    let item = {flag: false}
    let pconf = this.$parent.config
    if (pconf) {
      if (pconf.id) {
        item[pconf.id] = this.item.id
      } else {
        item.id = this.item.id
      }
      if (pconf.name) {
        item[pconf.name] = this.item.name
      } else {
        item.name = this.item.name
      }
    }
    let idx = this.$parent.copyData.findIndex(pitem => pitem[pconf.id || 'id'] === this.id)
    if (idx >= 0) return
    this.$parent.copyData.unshift(item)
    this.$parent.data.unshift(item)
  }
}
</script>

<style scoped>
.v-dropd-label {
  color: #bbb!important;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  background-color: #fff!important;
  cursor: not-allowed!important;
}
</style>
