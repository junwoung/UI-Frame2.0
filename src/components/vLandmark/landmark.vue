<!-- created by wangjun on 2019-06-27 -->
<template>
  <div>
    <ul class="v-landmarks">
      <li
      v-for="(item, index) in landmark"
      :key="index">
        <div class="v-landmark-step">
          <em
          class="v-landmark-circle"
          :class="getStatus(item.status)">{{getIdx(item, index)}}</em>
          <span v-html="item.title"></span>
          <em class="v-landmark-stick" :style="{width: `${width}px`}"></em>
        </div>
        <div class="v-landmark-slot" :name="'slot' + item.idx || (index + 1)">
          <slot :name="item.idx || (index + 1)"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'v-landmark',
  data () {
    return {

    }
  },
  props: {
    landmark: {
      type: Array,
      default: null
    },
    width: {
      type: Number,
      default: 220
    }
  },
  computed: {
  },
  methods: {
    init () {
      setTimeout(() => {
        this.computeWidth()
      })
    },
    //  获取相应状态样式
    getStatus (status) {
      switch (status) {
        case 'on': return 'v-landmark-status-on'
        case 'success': return 'v-landmark-status-success'
        case 'error': return 'v-landmark-status-error'
        default: return ''
      }
    },
    //  获取相应状态显示索引结果
    getIdx (item, idx) {
      switch (item.status) {
        case 'on': return item.idx || idx + 1
        case 'success': return ''
        case 'error': return ''
        default: return item.idx || idx + 1
      }
    },
    //  计算插槽最大宽度，避免过长造成布局错乱
    computeWidth (idx) {
      let sels = document.querySelectorAll(`div.v-landmark-slot[name]`)
      let newSels = [].slice.call(sels)
      newSels.map(newSel => {
        let pre = newSel.previousElementSibling.children[1]
        let rect = pre.getBoundingClientRect()
        let max = rect.width + this.width + 10
        newSel.style = `max-width: ${max}px;`
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
li {
  float: left;
}
.v-landmarks {
  display: flex;
  justify-content: center;
  color: #777;
  font-size: 14px;
}
.v-landmarks > li {
  display: flex;
  position: relative;
  flex-direction: column;
}
.v-landmark-circle {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  font-weight: bolder;
  color: #bbb;
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  margin-right: 10px;
}
.v-landmark-stick {
  display: inline-block;
  width: 220px;
  height: 1px;
  background-color: #bbb;
  margin: 0 10px;
}
.v-landmarks > li:last-child .v-landmark-stick {
  display: none;
}
.v-landmark-status-success {
  background-image: url('./icons/right-blue.png');
  border: 1px solid #49baf6;
}
.v-landmark-status-error {
  background-image: url('./icons/error-white.png');
  border: 1px solid #ee4000;
  background-color: #ee4000;
}
.v-landmark-status-on {
  border: 1px solid #49baf6;
  background-color: #49baf6;
  color: #fff;
}
.v-landmark-status-on + span,.v-landmark-status-error + span {
  color: #222;
  font-weight: bold;
}
.v-landmark-status-success ~ .v-landmark-stick {
  background-color: #49baf6;
}
.v-landmark-step {
  display: flex;
  align-items: center;
}
.v-landmark-slot {
  padding-left: 42px;
}
.v-landmark-slot * {
  font-size: 12px!important;
}
</style>
