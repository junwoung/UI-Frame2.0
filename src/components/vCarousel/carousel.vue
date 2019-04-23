<!-- created by wangjun on 2019-04-19 -->
<template>
  <div v-if="carousel" class="v-carousel" :style="carousel.style">
    <div>
      <img class="v-carousel-img"
       v-for="(item, index) in carousel.data"
       :class="getClass(index)"
       :key="index"
       :src="item.src"
       :alt="item.name">
       <div class="v-carousel-points">
         <span
          v-for="(item, index) in carousel.data"
          @click="setIndex(index)"
          :class="{'v-carousel-point-active': currentIdx === index}"
          :key="index"></span>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      currentIdx: 0,
      clickFlag: null, //  函数节流，防止操作过快
      last: null, //  存储上一次展示的轮播图索引
      flag: false, //  轮播开始的标记 解决初始化轮播最后一帧问题
      intervalFlag: null //  存储定时器事件
    }
  },
  props: {
    carousel: {
      type: Object,
      default: null
    }
  },
  methods: {
    init: function () {
      this.play()
    },
    play: function () {
      //  开始轮播
      let total = this.carousel.data.length
      this.intervalFlag = setInterval(() => {
        this.flag = true
        this.last = this.currentIdx
        if (this.currentIdx === total - 1) {
          this.currentIdx = 0
        } else {
          this.currentIdx++
        }
      }, 4000)
    },
    getClass: function (idx) {
      //  返回当前图片的样式名，达到切换的效果
      let doms = document.querySelectorAll('.v-carousel-img')
      //  将dom伪数组转化成数组
      doms = Array.prototype.slice.call(doms)
      let current = 'v-carousel-img-current'
      let prev = 'v-carousel-img-prev'
      if (idx === this.currentIdx) {
        return current
      } else {
        if (idx === this.last) {
          //  动效完成之后复原图片初始样式，保证图片切换都是从一个边到另一边（避免频繁切换两张图片造成切换动画效果不一致）
          setTimeout(() => {
            doms[idx].className = 'v-carousel-img'
          }, 410)
          return prev
        }
      }
    },
    setIndex: function (idx) {
      //  手动切换展示图片触发
      if (idx === this.currentIdx) return
      if (this.clickFlag) return
      this.clickFlag = setTimeout(() => {
        //  函数节流，避免频繁触发
        this.clickFlag = null
      }, 600)
      let doms = document.querySelectorAll('.v-carousel-img')
      //  将dom伪数组转化成数组
      doms = Array.prototype.slice.call(doms)
      if (idx === this.last) {
        this.clickFlag = idx
        doms[this.last].className = 'v-carousel-img v-carousel-img-prev-right'
      }
      this.last = this.currentIdx
      this.currentIdx = idx
      clearInterval(this.intervalFlag)
      this.play()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-carousel {
  position: relative;
  overflow: hidden;
}
.v-carousel > div {
  position: relative;
  width: 100%;
  height: 100%;
}
.v-carousel-img {
  position: absolute;
  max-width: 100%;
  height: 100%;
  transform: translate(100%, 0);
  transition: transform .4s;
}
.v-carousel-img-current {
  transform: translate(0, 0);
  z-index: 10;
  opacity: 1;
}
.v-carousel-img-prev {
  transform: translate(-100%, 0);
  z-index: 5;
}
.v-carousel-points {
  position: absolute;
  display: inline-block;
  bottom: 0px;
  z-index: 100;
  padding: 0 20px;
  height: 18px;
  line-height: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 9px;
}
.v-carousel-points > span {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #efefef;
  border-radius: 50%;
  cursor: pointer;
}
.v-carousel-point-active {
  background-color: #CA910D!important;
}
</style>
