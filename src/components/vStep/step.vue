<!-- created by wangjun on 2019-06-28 -->
<template>
  <div class="v-step clearfix">
    <ul class="v-steps clearfix">
      <li
      v-for="(item, index) in step"
      :key="index">
      <div>
        <em class="v-step-circle" :class="getStatus(item.status)">
          <span v-html="item.title"></span>
        </em>
        <em class="v-step-stick" :style="{width: `${width}px`}"></em>
      </div>
      <div class="v-step-slot" :style="{width: `${width}px`,'margin-top': item.title ? '30px' : '10px'}">
        <slot :name="item.idx || (index + 1)"></slot>
      </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: {
    step: {
      type: Array,
      default: null
    },
    width: {
      type: Number,
      default: 100
    }
  },
  methods: {
    init: function () {

    },
    getStatus (status) {
      switch (status) {
        case 'on': return 'v-step-status-on'
        case 'success': return 'v-step-status-success'
        case 'error': return 'v-step-status-error'
        default: return ''
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
ul {
  float: left;
  margin: auto;
  list-style: none;
  color: #777;
}
li {
  float: left;
}
.clearfix {
  zoom: 1;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
.v-step {
  display: flex;
  justify-content: center;
}
.v-steps > li:last-child .v-step-stick {
  display: none;
  width: 0!important;
}
.v-step-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #bbb;
  float: left;
  position: relative;
}
.v-step-circle > span {
  position: absolute;
  white-space: nowrap;
  top: 10px;
}
.v-step-stick {
  float: left;
  height: 1px;
  background-color: #bbb;
  margin-top: 3.5px;
}
.v-step-status-on, .v-step-status-success {
  background-color: #3896f8;
  color: #222;
  font-weight: bold;
}
.v-step-status-on + .v-step-stick, .v-step-status-success + .v-step-stick {
  background-color: #3896f8;
}
.v-step-status-error {
  background-color: #ee4000;
  color: #ee4000;
}
.v-step-slot > * {
  max-width: 85%;
  font-size: 12px;
}
</style>
