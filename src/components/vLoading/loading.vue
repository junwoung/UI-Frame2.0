<!-- created by wangjun on 2019-08-05 -->
<template>
  <div v-if="loading" class="v-data-loading">
    <svg viewBox="25 25 50 50" class="v-data-loading-cirular" :style="getSize">
      <circle cx="50" cy="50" r="20" fill="none" class="v-data-loading-cpath" :style="{stroke: color}"></circle>
    </svg>
    <span v-if="text" :style="getTextStyle">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    //  是否可见
    loading: {
      type: Boolean,
      default: false
    },
    //  文本提示
    text: {
      type: String,
      default: ''
    },
    //  颜色
    color: {
      type: String,
      default: '#3896f8'
    },
    //  尺寸
    size: {
      type: Number,
      default: 42
    }
  },
  computed: {
    getSize: {
      get: function () {
        if (this.size) {
          return {
            width: this.size + 'px',
            height: this.size + 'px'
          }
        }
      }
    },
    getTextStyle: {
      get: function () {
        let style = {}
        if (this.color) style.color = this.color
        if (this.size) style.top = this.size + 'px'
        return style
      }
    }
  }
}
</script>

<style scoped>
.v-data-loading {
  position: absolute;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
.v-data-loading > span {
  position: absolute;
  top: 42px;
  color: #3896f8;
}
.v-data-loading-cirular {
  position: absolute;
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}
.v-data-loading-cpath {
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #3896f8;
  stroke-linecap: round;
  animation: loading-inner-rotate 1.5s ease-in-out infinite;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(1turn);
  }
}
@keyframes loading-inner-rotate {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
}
</style>
