<!-- created by wangjun on 2019-05-20 -->
<template>
  <div>
    <div class="form-control">
      <input type="text" class="input" v-focus v-number v-model="val">
      <span v-focus v-number></span>
      <button class="btn btn-medium btn-default" @click="getVal">获取输入框值</button>
    </div>
    <div class="form-control">
      <label class="label">使用</label>
      <textarea class="textarea" disabled><input type="text" class="input" v-focus v-number='[10, 4, false]' v-model="val"></textarea>
    </div>
    <div class="form-control">
      <label class="label">使用说明</label>
      <div>
        v-number指令可以单独使用，也可以接收参数。<br/>
        参数形式可以是数值/数组/对象
      </div>
    </div>
    <table class="table">
      <caption>v-number接收参数类型说明</caption>
      <thead class="thead">
        <th>接收参数示例</th>
        <th>参数类型</th>
        <th>参数说明</th>
      </thead>
      <tbody class="tbody">
        <tr v-for="item in data" :key="item.type">
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td>{{item.desc}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      data: [],
      model: {
        type: 'number',
        max: 99999,
        maxLength: 6,
        value: '',
        decimal: undefined,
        placeholder: '请输入整数'
      },
      model2: {
        type: 'number',
        value: '',
        decimal: 2,
        placeholder: '小数点后不能超过2'
      },
      val: 111,
      // num: [2, 1, true]
      num: {
        maxLength: 0,
        points: 10,
        minusFlag: false
      }
    }
  },
  methods: {
    init: function () {
      this.getData()
    },
    getVal: function () {
      console.log(this.val)
    },
    getData: function () {
      this.data = [
        {
          name: '空',
          type: 'undefined / null / 0 / 空字符串 / 不传参',
          desc: '表示只控制输入数值型数据，不做过多限制'
        },
        {
          name: '10',
          type: 'String / Number',
          desc: '值要能够转化成数值类型，表示控制输入数值的长度'
        },
        {
          name: '[10, 4, false]',
          type: 'Array',
          desc: '参数一表示输入长度限制；参数二表示输入小数点限制；参数三表示是否可以输入-号'
        },
        {
          name: '{maxLength: 10, points: 4, minusFlag: true}',
          type: 'Object',
          desc: 'maxLength属性表示输入长度限制；points属性表示输入的小数点限制；minusFlag属性表示是否可以输入-号'
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

</style>
