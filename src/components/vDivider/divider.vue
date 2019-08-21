<!-- created by wangjun on 2019-08-07 -->
<template>
  <div class="v-divider" :style="getDividerStyle">
    <div class="v-divider-content" :style="getContentStyle">
      <slot></slot>
    </div>
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
    align: {
      type: String,
      default: () => 'left',
      validator: (val) => {
        return ['left', 'center', 'right'].includes(val)
      }
    },
    color: {
      type: String,
      default: () => '#dddddd'
    }
  },
  computed: {
    getDividerStyle: {
      get: function () {
        let style = {}
        if (this.align) {
          style['text-align'] = this.align
        }
        if (this.color) {
          style['background-color'] = this.color
        }
        return style
      }
    },
    getContentStyle: {
      get: function () {
        let style = {}
        if (this.align === 'left') {
          style.transform = 'translate(10px, -50%)'
        }
        if (this.align === 'right') {
          style.position = 'relative'
          style.transform = 'translate(-10px, -50%)'
        }
        return style
      }
    }
  },
  methods: {
    init: function () {

    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-divider {
  height: 1px;
  background-color: #ddd;
  position: relative;
  text-align: center;
  color: #333;
}
.v-divider-content {
  position: absolute;
  display: inline-block;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 0 5px;
  z-index: 1;
}
</style>
