//  用于表单验证用
import Vue from 'vue'
/**
 * created by wangjun
 * 2019-06-18
 * 配置验证规则
 * ---------------------------
 * name属性要与v-model属性同名  *
 * ---------------------------
 */
let config = [
  {
    name: 'user_name',
    must: true,
    maxlength: 16,
    title: '用户名'
  },
  {
    name: 'password',
    must: true,
    maxlength: 16,
    title: '密码'
  },
  {
    name: 'ensure_password',
    must: true,
    maxlength: 16,
    same: 'password',
    title: '确认密码'
  },
  {
    name: 'password',
    must: true,
    maxlength: 16,
    title: '密码'
  },
  {
    name: 'phone',
    must: false,
    maxlength: 16,
    title: '电话号码'
  }
]
//  标记 节点是否绑定相应事件
let bindFlag = false

//  检查需要验证的参数
function check (form, error) {
  //  重置所有报错信息
  error = {}
  config.map(c => {
    if (c.must) {
      if (!form[c.name]) Vue.set(error, c.name, '必填')
    }
    if (form[c.name] && c.maxlength && form[c.name].length > c.maxlength) Vue.set(error, c.name, `长度不可超过${c.maxlength}`)
    if (c.same && form[c.name] !== form[c.same]) Vue.set(error, c.name, `请与${c.same}值保持一致`)
  })
  if (!bindFlag) {
    bindValidate(form, error)
    //  改变节点绑定事件标记
    bindFlag = true
  }
  return error
}

//  为节点绑定相应监听事件
function bindValidate (form, error) {
  config.map(c => {
    let dom = document.querySelector(`[name=${c.name}]`)
    if (dom) {
      dom.onkeyup = debounce(checkItem, c)
    }
  })
  //  进行正在输入的输入框数据验证
  function checkItem (c) {
    let val = form[c.name]
    //  重置单个报错信息
    error[c.name] = ''
    if (c.must) {
      if (!val) Vue.set(error, c.name, '必填')
    }
    if (val && c.maxlength && val.length > c.maxlength) Vue.set(error, c.name, `长度不能超过${c.maxlength}`)
    if (c.same && val !== form[c.same]) {
      Vue.set(error, c.name, `请与${c.same}值保持一致`)
    }
  }
}

//  函数防抖
function debounce (func, args, wait = 300) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func && func.call(this, args)
    }, wait)
  }
}

const validate = {
  config: config,
  bindValidate: bindValidate,
  check: check
}

export default validate
