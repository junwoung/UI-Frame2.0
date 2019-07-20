<!-- created by wangjun on 2019-07-17 -->
<template>
  <div>
    <div class="form-control clearfix">
      <label class="label">输入框使用(属性设置)</label>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'user'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'email'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input :require='true' v-model="value" :prefix="'www.'" :placeholder="'请输入网址'" :icon="'url'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :error="error" :placeholder="'请输入网址'" :icon="'password'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :tail="'.com'" :icon="'number'"></v-input>
      <v-input v-model="value" :prefix="'www.'" :tail="'.com'" :placeholder="'请输入网址'" :icon="'search'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'date'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'time'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'tel'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'phone'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'addr'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input v-model="value" :placeholder="'请输入网址'" :icon="'dropdown'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
      <v-input readonly v-model="value" :placeholder="'请输入网址'" :icon="'dropdown'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
    </div>
    <div class="form-control clearfix">
      <label class="label">输入框使用(slot自定义)</label>
      <v-input v-model="value" type="number" :min="20" :max="500" :require='true' :icon="'number'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}">
        <em slot="icon" class="tips">500</em>
      </v-input>
      <v-input disabled v-model="hello" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}">
        <em slot="icon" class="tips">128字</em>
      </v-input>
      <v-input :require='true' maxlength="4" :minLen='4' v-model="value" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}">
        <em slot="icon" class="tips">128字</em>
      </v-input>
    </div>
    <button @click="getVal" class="btn btn-default btn-small">获取值</button>
    <div style="margin-top: 30px;" class="form-control clearfix">
      <label class="label">使用</label>
      <textarea disabled class="textarea" style="width: 400px;height: 160px;">
        <v-input :require='true' v-model="value" :prefix="'www.'" :placeholder="'请输入网址'" :icon="'url'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}"></v-input>
        <!-- 对应第一栏第6个输入框 -->
      </textarea>
      <textarea disabled class="textarea exp2" style="width: 400px;height: 160px;">
        <v-input v-model="value" type="number" :min="20" :max="500" :require='true' :icon="'number'" :style="{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}">
          <em slot="icon" class="tips">500</em>
        </v-input>
        <!-- 对应第二栏第1个输入框 -->
      </textarea>
    </div>
    <v-table :data="table.data" :header="table.header">
      <template slot="caption">
        <p style="height: 50px;line-height: 50px;text-align: center;">v-input 参数介绍</p>
      </template>
      <v-thead-col v-for="title in table.titles" :key="title.name" :width='title.width'>
        {{title.name}}
      </v-thead-col>
    </v-table>
    <p>除了以上属性值外，还支持一系列文本框支持的原生方法（click、blur、focus、change等事件）</p>
    <p>内置icon样式不够用的情况，不建议直接修改插件，而是直接利用slot改写icon，参见<span @click="go" class="a a-link">“使用2”</span></p>
    <p><span class="tips">输入框进行简单配置可以达到一定数据校验需求。但是，特殊数据格式要求，还是建议自己在业务层面进行控制，未达到要求的则通过设置<span class="a">:error</span>属性值，来提醒用户非法</span></p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      value: '',
      hello: 'hello world!',
      error: false,
      table: {
        /* eslint-disable */
        titles: [{name: '参数',width: '10%'},{name: '类型',width: '10%'},{name: '说明',width: '30%'},{name: '必填项',width: '10%'},{name: '样例值',width: '30%'},{name: '默认值', width: '10%'}],
        header: ['arg', 'type', 'desc', 'must', 'exp', 'default'],
        data: []
      }
    }
  },
  methods: {
    init: function () {
      this.getData()
    },
    getVal () {
      console.log(this.value)
      if (this.value) this.error = false
      else this.error = true
    },
    getData () {
      this.table.data = [
        {arg: 'v-model', type: 'String', desc: '接收一个用于获取值的参数名', must: 'false', exp: 'form.username', default: 'null'},
        {arg: ':placeholder', type: 'String', desc: '输入框底字', must: 'false', exp: '请输入用户名', default: 'null'},
        {arg: ':icon', type: 'String', desc: '输入框底图呈现（可以用slot重新设定），内部预设样式：user/email/url/password/number/search/date/time/phone/tel/addr/dropdown', must: 'false', exp: 'user', default: 'null'},
        {arg: ':style', type: 'Object', desc: '定义样式，暂支持定义输入框宽高、圆角、边框颜色', must: 'false', exp: `{width: '260px', height: '40px', 'border-radius': '4px', 'border-color': '#ddd'}`, default: 'null'},
        {arg: ':prefix', type: 'String', desc: '设定输入框前缀', must: 'false', exp: 'www.', default: 'null'},
        {arg: ':tail', type: 'String', desc: '设定输入框尾缀', must: 'false', exp: '.com', default: 'null'},
        {arg: ':require', type: 'Boolean', desc: '输入框是否必填（未填写时，给予报错提示）', must: 'false', exp: 'true', default: 'false'},
        {arg: ':error', type: 'Boolean', desc: '文本框是否处于报错状态（给外部方便控制输入框状态）', must: 'false', exp: 'true', default: 'false'},
        {arg: ':max', type: 'Number', desc: '文本框支持输入的最大值', must: 'false', exp: '500', default: 'null'},
        {arg: ':min', type: 'Number', desc: '文本框支持输入的最小值', must: 'false', exp: '20', default: 'null'},
        {arg: ':minLen', type: 'Number', desc: '文本框输入最小长度控制', must: 'false', exp: '4', default: 'null'},
        {arg: 'maxlength', type: 'Number', desc: '文本框输入的最大长度控制（控件原生属性）', must: 'false', exp: '4', default: 'null'},
        {arg: 'disabled', type: 'Boolean', desc: '文本框是否被禁用（控件原生属性）', must: 'false', exp: 'disabled', default: 'null'},
        {arg: 'readonly', type: 'Boolean', desc: '文本框是否只读（控件原生属性）', must: 'false', exp: 'readonly', default: 'null'},
        {arg: 'type', type: 'String', desc: '文本框类型（控件原生属性）', must: 'false', exp: 'number', default: 'text'}
      ]
    },
    go () {
      let exp = document.querySelector('.exp2')
      if (!exp) return
      let expRect = exp.getBoundingClientRect()
      let wh = window.innerHeight
      let distance = wh * 0.5 - expRect.top - expRect.height * 0.5
      scroll()
      setTimeout(() => bling(), 260)
      setTimeout(() => clear(), 1260)
      setTimeout(() => bling(), 1800)
      setTimeout(() => clear(), 2800)
      setTimeout(() => bling(), 3260)
      setTimeout(() => clear(), 4260)
      function scroll () {
        let timeGap = 16.7
        let totalTime = 260
        let steps = Math.ceil(totalTime / timeGap)
        let step = distance / steps
        let i = 0
        let interval = setInterval(() => {
          i++
          if (i >= steps) clearInterval(interval)
          else window.scrollBy(0, -step)
        })
      }
      function bling () {
        exp.style.transition = 'border-color 1s, box-shadow 1s'
        exp.style.borderColor = '#f56c6c'
        exp.style.boxShadow = '0 0 15px 0 #f56c6c'
      }
      function clear () {
        exp.style.borderColor = ''
        exp.style.boxShadow = ''
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
