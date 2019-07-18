<!-- created by wangjun on 2019-07-10 -->
<template>
  <table class="v-table">
    <!-- 列表加载数据动画显示 -->
    <div v-if="loading" class="v-data-loading">
      <svg viewBox="25 25 50 50" class="cirular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
      <span>加载中</span>
    </div>
    <!-- 列表标题 -->
    <caption>
      <slot name="caption"></slot>
    </caption>
    <!-- 列表各列标题 -->
    <thead ref="tableHead">
      <slot></slot>
    </thead>
    <!-- 列表展示数据 -->
    <tbody class="v-tbody">
      <!-- 空列表数据情况 -->
      <tr class="v-tbody-null" v-if='!data || !data.length'>
        <td :colspan="cols">
          <img src="./imgs/empty.png" width="160px" height="154px">
        </td>
      </tr>
      <tr
      v-for="(item, idx) in data"
      :key="item.id || idx">
        <td
        v-for="h in header"
        :key="h + idx">
          <!-- 将要替换的显示信息包含在slot插槽闭口内，可以被替换 -->
          <!-- 过滤掉default插槽，避免参数名为default而引入匿名插槽 -->
          <slot :name="h === 'default' ? '' : h" :item="item">
            <span>{{item[h]}}</span>
          </slot>
        </td>
      </tr>
      <!-- 如果有需要固定底部，可以在这配置 -->
      <tr>
        <slot name="footerRow"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      cols: 0
    }
  },
  props: {
    //  表格标题
    caption: {
      type: [String, Number],
      default: ''
    },
    //  表格要展示的数据
    data: {
      type: Array,
      default: null
    },
    //  表头
    header: {
      type: Array,
      default: null
    },
    //  表格数据是否在加载
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init: function () {
    },
    //  获取列表总列数
    getCols () {
      let nodes = this.$refs.tableHead.children
      let newNodes = [].slice.call(nodes)
      let i = 0
      newNodes.map(node => {
        if (node.nodeName === 'TH') i++
      })
      this.cols = i
    }
  },
  mounted () {
    this.getCols()
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
.v-table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  position: relative;
}
.v-table > caption {
  text-align: left;
  font-size: 16px;
  color: #333;
  /* height: 50px;
  line-height: 50px; */
}
.v-table th {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
  background-color: #f5f7fa;
}
.v-tbody-null > td {
  background-position: center;
  height: 300px!important;
  text-align: center;
}
.v-table .v-tbody {
  font-size: 14px;
  color: #666;
}
.v-table .v-tbody > tr > td {
  box-sizing: border-box;
  height: 60px;
  padding: 5px 10px;
}
.v-table .v-tbody > tr {
  transition: background-color .3s;
}
.v-table .v-tbody > tr:nth-child(even) {
  background-color: #F5F9FD;
}
.v-table .v-tbody > tr:hover {
  background-color: #efefef;
}
.v-data-loading {
  position: absolute;
  box-sizing: border-box;
  padding-top: 150px;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(254, 254, 254, 0.5);
  z-index: 9999;
}
.v-data-loading > span {
  position: absolute;
  transform: translate(-100%, 250%);
  color: #3896f8;
}
.cirular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}
.path {
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
