<!-- created by wangjun on 2019-05-28 -->
<template>
  <div class="clearfix">
    <div class="form-control">
      <button style="padding: 5px 10px;" class="btn btn-default" v-top='".imgs"'>滑动到懒加载处</button>
    </div>
    <div class="form-control">
      <label class="label">使用</label>
      <textarea class="textarea" disabled><img class="img" v-lazyload='src'></textarea>
    </div>
    <div class="form-control">
      <label class="label">使用说明</label>
      <div style="line-height: 36px;">
        v-lazyload指令接收一个图片地址
      </div>
    </div>
    <table></table>
    <div class="form-control imgs">
      <img class="img" v-for="img in imgs" :key="img.idx" v-lazyload='img.src'>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lazyload',
  data () {
    return {
      imgs: []
    }
  },
  methods: {
    init: function () {
      this.generateImgs()
    },
    generateImgs: function () {
      let urls = [require('../assets/carousel/aitv.jpg'), require('../assets/carousel/bingxiang.jpg'), require('../assets/carousel/migu.jpg'), require('../assets/carousel/xinfei.jpg'), require('../assets/carousel/xiyiji.jpg'), require('../assets/carousel/xueyuan.jpg')]
      for (let i = 0; i < 100; i++) {
        this.imgs.push({
          idx: i + 1,
          name: 'img' + (i + 1),
          src: urls[getRndom()]
        })
      }
      function getRndom () {
        return Math.round(Math.random() * 5)
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.img {
  width: 500px;
  height: 200px;
  box-shadow: 0 0 5px 0 #ddd;
}
</style>
