<!-- created by wangJun on 2019-04-19 -->
<template>
  <div>
    <v-carousel :carousel='carousel'></v-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      carousel: {
        data: [
          {
            name: '学院奖',
            src: require('../assets/carousel/xueyuan.jpg'),
            url: 'https://www.konka.com/xyj/'
          },
          {
            name: '新飞冰箱',
            src: require('../assets/carousel/xinfei.jpg'),
            url: 'https://www.konka.com/BCD-286L8D.html'
          },
          {
            name: 'AI电视',
            src: require('../assets/carousel/aitv.jpg'),
            url: 'https://www.konka.com/LED55D6.html'
          },
          {
            name: '双开门十字冰箱',
            src: require('../assets/carousel/bingxiang.jpg'),
            url: 'https://www.konka.com/BCD-401BX4S.html'
          },
          {
            name: '超享咪咕特权',
            src: require('../assets/carousel/migu.jpg'),
            url: 'https://www.konka.com/hyj/'
          },
          {
            name: '滚筒洗衣机',
            src: require('../assets/carousel/xiyiji.jpg'),
            url: 'https://www.konka.com/XQG90-C12D03W.html'
          }
        ],
        style: {
          'width': '800px',
          'height': '220px'
        }
      }
    }
  }
}
</script>
