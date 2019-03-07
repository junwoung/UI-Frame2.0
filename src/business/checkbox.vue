<!-- created by wangjun on 2019-03-07 -->
<template>
  <div>
    <div>
      <v-checkbox :checkbox='checkbox' @callback='getCheckbox'></v-checkbox>
      <button
      @click="change"
      class="btn btn-default btn-small">change</button>
    </div>
    <div>
      <v-radio :radio='radio' @callback='getRadio'></v-radio>
      <button
      @click="changeRadio"
      class="btn btn-default btn-small">change</button>
    </div>
  </div>
</template>

<script>
import data from './config/array.js'
export default {
  name: '',
  data () {
    return {
      checkbox: {
        data: data.unnormal,
        selected: [1, 2],
        disable: 'part',
        config: {
          id: 'idx',
          name: 'namex'
        }
      },
      radio: {
        data: data.normal,
        selected: 1,
        disable: false,
        config: {
          id: 'id',
          name: 'name'
        }
      }
    }
  },
  methods: {
    init: function () {

    },
    change: function () {
      this.checkbox.data.push({
        idx: '5h',
        namex: '新增'
      })
      // this.checkbox.disable = 'all'
      // this.checkbox.data.splice(1,1)
    },
    changeRadio: function () {
      this.radio.data.push({
        id: '5h',
        name: '新增'
      })
    },
    getCheckbox: function (array) {
      console.log(array)
    },
    getRadio: function (item) {
      console.log(item)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
