<!-- created by wangjun on 2019-03-07 -->
<template>
  <div class="v-checkbox">
    <span
     v-for="(item,index) in checkbox.data"
     :class="getClassName(item)"
     class="ck"
     @click="check(item)"
     :key="index">{{item[name]}}</span>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: '',
  data () {
    return {
      id: 'id',
      name: 'name',
      selected: [],
      part: []
    }
  },
  props: {
    checkbox: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function (flag) {
      //  初始化已选项
      if (this.checkbox && this.checkbox.selected) {
        if (!(this.checkbox.selected instanceof Array)) {
          this.selected.push(this.checkbox.selected)
        } else {
          this.selected = this.checkbox.selected
        }
        //  存储已选中且不可更改的选项
        if (this.checkbox.disable === 'part' && flag) {
          this.part = JSON.parse(JSON.stringify(this.selected))
        }
      }
      //  映射id，name
      if (this.checkbox && this.checkbox.config) {
        this.id = this.checkbox.config.id
        this.name = this.checkbox.config.name
      }
    },
    check: function (item) {
      if (this.checkbox.disable === 'all') return
      let id = item[this.id]
      let idx = this.selected.indexOf(id)
      if (this.checkbox.disable === 'part' && this.part.indexOf(id) !== -1) return
      if (idx === -1) {
        this.selected.push(id)
      } else {
        this.selected.splice(idx, 1)
      }
      this.checkbox.selected = this.selected
      this.$emit('callback', this.selected)
    },
    getClassName: function (item) {
      if (!this.checkbox || !this.selected) return
      let id = item[this.id]
      let classN = ''
      let idx = this.selected.indexOf(id)
      if (idx !== -1) {
        classN = 'ck-checked'
      }
      if (this.checkbox.disable === 'all') {
        if (idx === -1) classN += ' ck-disable'
        else classN += ' ck-checked-disable'
      }
      if (this.checkbox.disable === 'part') {
        if (this.part.indexOf(id) !== -1) {
          classN += ' ck-checked-disable'
        }
      }
      return classN
    }
  },
  created () {
    this.init(true)
  },
  watch: {
    'checkbox.selected': function () {
      this.init()
    }
  }
}
</script>

<style scoped>
.v-checkbox{
  display: inline-block;
}
</style>
