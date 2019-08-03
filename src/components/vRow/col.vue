<!-- created by wangjun on 2019-07-25 -->
<template>
  <div class="v-col v-col-clear" :style="styleObject">
    <slot></slot>
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
    width: [Number, String],
    height: [Number, String],
    top: [Number, String],
    left: [Number, String],
    right: [Number, String],
    bottom: [Number, String]
  },
  computed: {
    styleObject: {
      get: function () {
        //  只接受和布局相关属性接收自定义；宽高、上下左右、浮动、flex布局
        let obj = {}
        if (this.width) {
          let width = this.width
          if (typeof width === 'number') width += 'px'
          obj.width = width
        }
        if (this.height) {
          let height = this.height
          if (typeof height === 'number') height += 'px'
          obj.height = height
        }
        if (this.top) {
          let top = this.top
          if (typeof top === 'number') top += 'px'
          obj.marginTop = top
        }
        if (this.left) {
          let left = this.left
          if (typeof left === 'number') left += 'px'
          obj.marginLeft = left
        }
        if (this.right) {
          let right = this.right
          if (typeof right === 'number') right += 'px'
          obj.marginRight = right
        }
        if (this.bottom) {
          let bottom = this.bottom
          if (typeof bottom === 'number') bottom += 'px'
          obj.marginBottom = bottom
        }
        //  处理指定为flex布局的情况
        let flex = this.$attrs.flex
        if (flex !== undefined) {
          obj.display = 'flex'
          if (flex) {
            let arr = flex.split(' ')
            if (arr[0] && arr[0] !== 'none') {
              obj.alignItems = arr[0]
            }
            if (arr[1] && arr[1] !== 'none') {
              obj.justifyContent = arr[1]
            }
          }
        }
        //  处理父节点定义每列宽度的情况，优先级小于直接在自身节点定义的长度
        if (this.width === undefined && this.$parent.colWidth !== undefined) {
          let width = this.$parent.colWidth
          if (typeof width === 'number') width += 'px'
          obj.width = width
        }
        return obj
      }
    }
  }
}
</script>

<style scoped>
.v-col {
  /* float: left; */
  display: inline-block;
  /* vertical-align: middle; */
  box-sizing: border-box;
}
.v-col-clear {
  zoom: 1;
}
.v-col-clear::after {
  content: '';
  clear: both;
  display: block;
}
</style>
