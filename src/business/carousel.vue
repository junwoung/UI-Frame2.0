<!-- created by wangJun on 2019-04-19 -->
<template>
  <div>
    <div class="form-control">
      <v-carousel :carousel='carousel'></v-carousel>
    </div>
    <div class="form-control">
      <label class="label">使用</label>
      <textarea class="textarea" disabled><v-carousel :carousel='carousel'></v-carousel></textarea>
    </div>
    <table class="table">
      <caption>carousel对象参数说明</caption>
      <thead class="thead">
        <th v-for="item in theader" :key="item.name" :style="{width: item.width}">{{item.name}}</th>
      </thead>
      <tbody class="tbody">
        <tr v-for="item in tbody" :key="item.arg">
          <td>{{item.arg}}</td>
          <td>{{item.type}}</td>
          <td>{{item.desc}}</td>
          <td>{{item.must}}</td>
          <td>{{item.exp}}</td>
          <td>{{item.default}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import theader from './config/table.js'
export default {
  name: 'carousel',
  data () {
    return {
      theader: theader,
      tbody: [],
      carousel: {
        // data: [require('../assets/carousel/xinfei.jpg'), require('../assets/carousel/xueyuan.jpg'), require('../assets/carousel/bingxiang.jpg')],
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
            name: '双开门十字冰箱双开门十字冰箱双开门十字冰箱',
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
  },
  methods: {
    init: function () {
      this.defineBody()
    },
    defineBody: function () {
      this.tbody = [
        {
          arg: 'style',
          type: 'Object',
          desc: '定义插件样式',
          must: false,
          exp: `style: {
           'width': '800px',
           'height': '220px'
          }`,
          default: ''
        },
        {
          arg: 'data',
          type: 'Array',
          desc: '轮播图数组，数组单条记录可以是object也可以为一条图片src；object必须包含src属性，表示图片地址，可以包含name和url属性表示图片的名称和点击跳转的地址',
          must: true,
          exp: `data: [
            {
              name: '康佳',
              src: 'https://www.konka.com/public/images/53/2a/3e/ff4cd6c5938554319b9e6a5f537fc821451e45ba.jpg?00085_OW1920_OH500',
              url: 'https://www.konka.com'
            },
            {
              name: '康佳',
              src: 'https://www.konka.com/public/images/53/2a/3e/ff4cd6c5938554319b9e6a5f537fc821451e45ba.jpg?00085_OW1920_OH500',
              url: 'https://www.konka.com'
            },
            {
              name: '康佳',
              src: 'https://www.konka.com/public/images/53/2a/3e/ff4cd6c5938554319b9e6a5f537fc821451e45ba.jpg?00085_OW1920_OH500',
              url: 'https://www.konka.com'
            }
          ]`,
          default: '无'
        }
      ]
    }
  },
  created () {
    this.init()
  }
}
</script>
