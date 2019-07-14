<!-- created by wangjun on 2019-07-14 -->
<template>
  <!-- <div v-if="btnGroup && btnGroup.data && btnGroup.data.length" class="v-btn-g">
    <button
    :class="calculateClass()"
    :style="btnGroup.style"
    v-for="(btn, idx) in btnGroup.data"
    :key="idx">{{btn}}</button>
  </div> -->
  <div class="v-btn-g" :class="getClass()">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      btnStyle: {}
    }
  },
  props: {
    btnGroup: {
      type: Object,
      default: null
    }
  },
  methods: {
    init: function () {

    },
    calculateClass () {
      //  过滤外部传入的样式，只允许重写指定的部分样式
      // let allows = ['color', 'border-color', 'background-color', 'border',]
      if (this.btnGroup && this.btnGroup.style) {
        let bgColor = this.btnGroup.style['background-color']
        if (bgColor === '#fff' || bgColor === '#ffffff') {
          return 'v-btn-g-tiny'
        } else {
          return 'v-btn-g-loose'
        }
      } else {
        return 'v-btn-g-tiny'
      }
    },
    getClass () {
      if (this.$attrs.tiny === 'true') {
        return 'v-btn-g-tiny'
      } else {
        return 'v-btn-g-loose'
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-btn-g {
  display: inline-block;
  background-color: #fff;
  font-size: 0;
}
.v-btn-g > button {
  border-radius: 0;
}
.v-btn-g > button:last-child {
  border-top-right-radius: 4px!important;
  border-bottom-right-radius: 4px!important;
}
.v-btn-g > button:first-child {
  border-top-left-radius: 4px!important;
  border-bottom-left-radius: 4px!important;
}
.v-btn-g-tiny > button:not(:last-child) {
  border-right: none;
}

.v-btn-g-loose > button:not(:last-child) {
  margin-right: 1px;
}
/* .v-btn-g > button {
  width: 60px;
  height: 36px;
  background-color: #409eff;
  color: #fff;
  border-style: solid;
  border-color: #409eff;
  cursor: pointer;
  transition: background-color 0.1s;
}
.v-btn-g > button:last-child {
  margin-right: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.v-btn-g > button:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.v-btn-g > button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}
.v-btn-g > button:focus {
  background-color: #c6e2ff!important;
  border-color: #c6e2ff!important;
  color: #3896f8!important;
}
.v-btn-g > button:active {
  background-color: #3896f8!important;
  border-color: #3896f8!important;
  color: #fff!important;
}
.v-btn-g-tiny {
  border-right-width: 0;
}
.v-btn-g-tiny:last-child {
  border-right-width: 1px;
}
.v-btn-g-loose {
  margin-right: 1px;
  border-width: 1px;
} */
</style>
