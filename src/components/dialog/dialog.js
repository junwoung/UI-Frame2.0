/**
* @author: wangjun
* @date: 2019-03-26 09:59:00
* @desc: 生成各对话框
*/

//  导入对话框模板
import template from './template.js'
import './dialog.css'

//  接收外部调用方法
const outer = {
  alert: (msg, ensure, close = true) => {
    let id = inner.create('alert', msg)
    ensure && inner.addEnsureHandler(id, ensure)
    !close && inner.removeClose(id)
    close && inner.addCloseHandler(id)
    return id
  },
  confirm: (msg, ensure, cancel, close = true) => {
    let id = inner.create('confirm', msg)
    ensure && inner.addEnsureHandler(id, ensure)
    cancel && inner.addCancelHandler(id, cancel)
    !close && inner.removeClose(id)
    close && inner.addCloseHandler(id)
    return id
  },
  loading: (msg, close = false, callback) => {
    let id = inner.create('loading', msg)
    close && callback && inner.addCloseHandler(id, callback)
    return id
  },
  success: (msg, time = 3000, callback) => {
    if (time === '') time = 3000
    let id = inner.create('success', msg)
    return id
  },
  error: (msg, time, callback) => {
    let id = inner.create('error', msg)
    return id
  },
  msg: (msg, time, callback) => {
    let id = inner.create('msg', msg)
    return id
  },
  prompt: (msg) => {
    let id = inner.create('prompt', msg)
    return id
  },
  progress: (msg) => {
    let id = inner.create('progress', msg)
    return id
  },
  close: (id) => {
    //  关闭指定对话框
    inner.removeAllHandler(id)
    let dom = document.querySelector(`#${id}`)
    if (dom) {
      dom.firstChild.style.opacity = 0
      dom.firstChild.firstChild.nextSibling.style.transform = 'scale(0.3)'
      // console.log(dom.firstChild)
      // return
      setTimeout(() => {
        dom.parentNode.removeChild(dom)
      }, 100)
    }
  }
}

//  定义内部调用方法
const inner = {
  addEnsureHandler: function (id, func) {
    //  绑定确定按钮事件
    let selector = `#${id} .v-dialog-ensure`
    function func2 () {
      func()
      outer.close(id)
    }
    this.bindDom(selector, func2)
  },
  addCancelHandler: function (id, func) {
    //  绑定取消按钮事件
    let selector = `#${id} .v-dialog-cancel`
    function func2 () {
      func()
      outer.close(id)
    }
    this.bindDom(selector, func2)
  },
  addCloseHandler: function (id, callback) {
    //  给旁白、关闭按钮添加点击关闭事件
    let doms = {
      // cancel: document.querySelector(`#${id} .v-dialog-cancel`),
      close: document.querySelector(`#${id} .v-dialog-close`),
      modal: document.querySelector(`#${id} .v-modal`)
    }
    for (let key in doms) {
      if (doms[key]) {
        this.bindDom(doms[key], () => {
          //  移除对话框
          if (doms.modal) {
            // doms.modal.style.top = '-1000px'
            doms.modal.style.opacity = 0
            doms.modal.firstChild.nextSibling.style.transform = 'scale(0.3)'
          }
          setTimeout(() => {
            callback && callback()
            doms[key].parentNode.removeChild(doms[key])
          }, 100)
        })
      }
    }
  },
  removeAllHandler: function (id) {
    //  移除元素节点前，先移除绑定的事件
    let doms = {
      ensure: document.querySelector(`#${id} .v-dialog-ensure`),
      cancel: document.querySelector(`#${id} .v-dialog-cancel`),
      close: document.querySelector(`#${id} .v-dialog-close`),
      modal: document.querySelector(`#${id} .v-modal`)
    }
    for (let key in doms) {
      if (doms[key]) {
        doms[key].onclick = null
      }
    }
  },
  create: function (type, msg) {
    //  生成指定类型对话框
    let temp = template[type](msg)
    let id = this.generateId(type)
    let dom = document.createElement('div')
    dom.id = id
    dom.innerHTML = temp
    document.body.appendChild(dom)
    let modal = dom.firstChild
    let interval = setInterval(() => {
      if (!modal) {
        modal = dom.firstChild
      } else {
        clearInterval(interval)
        modal.style.opacity = 1
        modal.style.top = 0
      }
    }, 100)
    return id
  },
  generateId: function (type) {
    //  生成一个唯一的随机id
    let id = null
    let dom = null
    do {
      id = `${type}${this.getRandom()}`
      dom = document.querySelector(`#${id}`)
    } while (dom)
    return id
  },
  getRandom: function () {
    //  随机返回0-100000的随机整数
    return Math.round(Math.random() * 100000)
  },
  bindDom: function (selector, func) {
    //  统一绑定节点和方法
    let closeName = ['v-modal', 'v-dialog-close', 'v-dialog-ensure', 'v-dialog-cancel']
    function func2 (event) {
      event = event || window.event
      let className = event.target.className
      //  过滤掉点击对话框其他部分，而关闭对话框的可能性
      if (closeName.indexOf(className) === -1) return null
      func()
    }
    let dom = null
    if (typeof selector === 'object') {
      dom = selector
    } else dom = document.querySelector(selector)
    let interval = setInterval(() => {
      if (!dom) document.querySelector(selector)
      else {
        clearInterval(interval)
        dom.onclick = func2
        // dom.addEventListener('click', func2, false)
      }
    }, 30)
  },
  removeClose: function (id) {
    //  如果不支持点击旁白关闭对话框，则去除关闭按钮
    let dom = document.querySelector(`#${id} .v-dialog-close`)
    if (dom) {
      dom.parentNode.removeChild(dom)
    }
  }
}

export default outer
