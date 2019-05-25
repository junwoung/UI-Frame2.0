<!-- created by wangjun on 2019-05-25 -->
<template>
  <div class="container">
    <div style="background-color: #fff;">
      <div class="form-control">
        <span v-top='".bottom"'>go bottom</span>
      </div>
      <div class="form-control">
        <label class="label">使用</label>
        <textarea class="textarea" disabled><span v-top>go top</span></textarea>
      </div>
      <div class="form-control">
        <label class="label">使用说明</label>
        <div>
          v-top指令可以单独使用，也可以接收参数。<br/>
          参数形式可以是数值/字符串
        </div>
        <table class="table">
          <caption>v-top接收参数说明</caption>
          <thead class="thead">
            <th>接收参数示例</th>
            <th>参数类型</th>
            <th>参数说明</th>
          </thead>
          <tbody class="tbody">
            <tr v-for="item in tbody" :key="item.type">
              <td>{{item.name}}</td>
              <td>{{item.type}}</td>
              <td>{{item.desc}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div><span v-top='1000'>go down 1000px</span></div>
    <div class="div-3">div3</div>
    <div><span v-top>go top</span></div>
    <div><span v-top='".div-3"'>go div-3</span></div>
    <div><span class="bottom" v-top='-500'>go up 500px</span></div>
    <span class="top" v-top>Top</span>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tbody: []
    }
  },
  methods: {
    init: function () {
      this.tbody = [
        {
          name: 'undefined',
          type: 'undefined',
          desc: '默认滑动到顶部'
        },
        {
          name: '1000',
          type: 'Number',
          desc: '滑动指定像素距离，向上滑动传入负值，向下滑动传入正值'
        },
        {
          name: '.className',
          type: 'String',
          desc: '节点选择器，表示当前节点滑动传入的选择器指定的节点的距离'
        }
      ]
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.container > div {
  background-color: #ddd;
  height: 900px;
  margin-bottom: 30px;
}
.top {
  display: inline-block;
  position: fixed;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  right: 100px;
  bottom: 100px;
  background-color: #fff;
  box-shadow: 0 0 5px 1px #3896f8;
  border-radius: 50%;
  z-index: 9999;
}
</style>
