<!-- created by wangjun on 2019-07-09 -->
<template>
  <div>
    <v-form ref="form" :model="form" :rules="rules" >
      <v-form-control>
        <v-form-item prop='name' trigger='blur'>
          <label class="label label-require">姓名</label>
          <input type="text" class="input" v-model="form.name">
        </v-form-item>
        <v-form-item prop='time'>
          <label class="label label-require">时间</label>
          <v-time :time='time'></v-time>
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item prop='age' trigger="keyup">
          <label class="label">年龄</label>
          <input type="number" class="input" v-model="form.age">
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item prop='phone' trigger='change'>
          <label class="label">电话</label>
          <input type="number" class="input" v-model="form.phone">
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item prop='pwd' trigger='blur'>
           <label class="label label-require">密码</label>
           <input type="password" autocomplete="new-password" class="input" v-model="form.pwd">
        </v-form-item>
        <v-form-item prop='repPwd' trigger='blur'>
           <label class="label label-require">确认密码</label>
           <input type="password" autocomplete="new-password" class="input" v-model="form.repPwd">
        </v-form-item>
      </v-form-control>

      <v-form-control>
        <v-form-item>
          <button class="btn btn-default btn-large btn-small" @click="getForm">提交</button>
        </v-form-item>
      </v-form-control>
    </v-form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      time: {
        selected: ''
      },
      form: {
        name: '',
        age: '',
        time: '',
        phone: '',
        pwd: '',
        repPwd: ''
      },
      rules: {
        name: {must: true, maxLength: 10, minLength: 4, title: '姓名'},
        age: {max: 100, min: 0, title: '年龄'},
        time: {must: true, bind: 'time.selected', title: '时间', min: '2019-07-09', max: '2019-07-20'},
        phone: {length: 11, title: '电话', reg: /^1[3|5|8|7](\d){9,9}$/},
        pwd: {must: true, minLength: 2, maxLength: 16, title: '密码'},
        repPwd: {must: true, same: 'pwd', title: '确认密码'}
      }
    }
  },
  methods: {
    init: function () {

    },
    getD (str) {
      console.log(str)
    },
    getForm () {
      let res = this.$validate.check(this.form, this.rules, this)
      console.log('这是validate验证类定义的函数验证的：' + res)
      console.log(this.form)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.label {width: 120px;}
</style>
