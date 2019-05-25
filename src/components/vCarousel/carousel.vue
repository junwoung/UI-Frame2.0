<!-- created by wangjun on 2019-04-19 -->
<template>
  <div v-if="carousel" class="v-carousel" :style="carousel.style">
    <div @mouseenter="titleShow.flag = true" @mouseleave="titleShow.flag = false">
      <img class="v-carousel-img"
       v-for="(item, index) in carousel.data"
       @click="goLocation(item.url)"
       :class="getClass(index)"
       :key="index"
       :src="item.src"
       :style="{cursor: item.url ? 'pointer' : ''}"
       :alt="item.name">
       <div class="v-carousel-points">
         <span
          v-for="(item, index) in carousel.data"
          @click="setIndex(index)"
          :title="item.name"
          :class="{'v-carousel-point-active': currentIdx === index}"
          :key="index"></span>
       </div>
       <div v-show="!arrow.left && this.carousel.data[currentIdx].name" class="v-carousel-title-mask" :style="{'opacity': titleShow.flag ? '1' : '0'}">
         <span :title="this.carousel.data[currentIdx].name" class="width-control v-carousel-title">{{this.carousel.data[currentIdx].name}}</span>
       </div>
       <div class="v-carousel-arrow-left-container" @mouseenter="arrow.left = true" @mouseleave="arrow.left = false">
         <div @click="switchShow(-1)" :style="{left: arrow.left ? '0' : '-100px'}" class="v-carousel-arrow v-carousel-arrow-left"></div>
       </div>
       <div class="v-carousel-arrow-right-container" @mouseenter="arrow.left = true" @mouseleave="arrow.left = false">
         <div @click="switchShow(1)" @mouseenter="arrow.right = true" @mouseleave="arrow.right = false" :style="{right: arrow.left ? '0' : '-100px'}" class="v-carousel-arrow v-carousel-arrow-right"></div>
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
      intervalFlag: null, //  存储定时器事件
      //  控制标题显示
      titleShow: {
        type: 'hover',
        flag: false
      },
      //  左右切换箭头显示控制
      arrow: {
        left: false,
        right: false
      }
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
      let c = this.carousel
      if (!c || !c.data || !c.data.length) return
      if (typeof c.data[0] === 'string') {
        let newData = c.data.map(item => {
          return {
            name: '',
            src: item,
            url: ''
          }
        })
        c.data = [...newData]
        console.log(c.data)
      }
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
    },
    goLocation: function (url) {
      //  点击图片跳转到对应链接
      if (!url) return
      window.open(url)
    },
    switchShow: function (num) {
      //  左右切换箭头
      let max = this.carousel.data.length
      let idx = this.currentIdx + num
      if (idx === max) idx = 0
      else if (idx < 0) idx = max - 1
      this.setIndex(idx)
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
.v-carousel-title-mask {
  position: absolute;
  width: 100%;
  height: 60px;
  color: #fff;
  /* text-align: center;
  line-height: 60px; */
  padding-left: 10px;
  line-height: 90px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
  bottom: 0;
  z-index: 20;
  opacity: 0;
  transition: opacity .5s;
}
.v-carousel-title {
  width: 150px;
}
.v-carousel-arrow {
  position: absolute;
  width: 100px;
  height: 100%;
  z-index: 19;
  cursor: pointer;
  transition: right .3s, left .3s;
}
.v-carousel-arrow::after {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #bbb;
  font-size: 30px;
}
.v-carousel-arrow-right::after {
  content: '>';
}
.v-carousel-arrow-right {
  background: linear-gradient(to left, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0));
  right: -100px;
}
.v-carousel-arrow-left::after {
  content: '<';
}
.v-carousel-arrow-left {
  background: linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0));
  left: -100px;
}
.v-carousel-arrow-left-container,.v-carousel-arrow-right-container {
  position: absolute;
  width: 100px;
  height: 100%;
  z-index: 18;
}
.v-carousel-arrow-right-container {
  right: 0;
}
</style>
