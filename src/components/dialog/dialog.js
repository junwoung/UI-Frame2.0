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
    inner.addTipsAutoCloseHandler(id, 'success', time, callback)
    return id
  },
  error: (msg, time = 3000, callback) => {
    if (time === '') time = 3000
    let id = inner.create('error', msg)
    inner.addTipsAutoCloseHandler(id, 'error', time, callback)
    return id
  },
  msg: (msg, time = 3000, callback) => {
    if (time === '') time = 3000
    let id = inner.create('msg', msg)
    inner.addTipsAutoCloseHandler(id, 'msg', time, callback)
    return id
  },
  prompt: (label, val, ensure, cancel) => {
    let id = inner.create('prompt', label, val)
    inner.addCloseHandler(id)
    ensure && inner.addEnsureHandler(id, ensure)
    cancel && inner.addCancelHandler(id, cancel)
    setTimeout(() => {
      let input = document.querySelector(`#${id} input`)
      input && input.focus()
    }, 300)
    return id
  },
  progress: (msg, total, current, callback) => {
    if (!total) {
      total = '100%'
      current = 0
    }
    let id = inner.create('progress', msg, total, current)
    callback && inner.addCloseHandler(id, callback)
    if (total === '100%') {
      let process = autoClose()
      let i = 0
      setTimeout(() => {
        while (process.length) {
          i++
          let item = process.shift()
          setTimeout(() => {
            outer.changeProgress(id, '100%', item, callback)
          }, 200 * i)
        }
      }, 300)
    }
    return id
    function autoClose () {
      /**
      * @author: wangjun
      * @date: 2019-04-16 17:23:04
      * @desc: 如果无法获取上传的总字节数，则表示模拟进度条事件
      */
      let t = 100
      let max = 20
      let arr = []
      let state = 0
      while (state < t) {
        state = inner.getRandom(state, state + max)
        if (state > t) state = t
        arr.push(state)
      }
      return arr
    }
  },
  changeProgress: (id, total, current, callback) => {
    let percent = 0
    if (total === '100%') {
      percent = current + '%'
      current += '%'
    } else {
      percent = (current / total * 100).toFixed(2) + '%'
    }
    let linePercent = parseFloat(percent) * 0.9 + '%'
    let totalDom = document.querySelector(`#${id} .v-progress-total`)
    let currentDom = document.querySelector(`#${id} .v-progress-current`)
    let percentDom = document.querySelector(`#${id} .v-progress-percent`)
    let lineDom = document.querySelector(`#${id} .v-progress-color`)
    lineDom && (lineDom.style.width = linePercent)
    totalDom && (totalDom.innerHTML = total)
    currentDom && (currentDom.innerHTML = current)
    percentDom && (percentDom.innerHTML = percent)
    if (percent === '100%' || percent === '100.00%') {
      setTimeout(() => {
        outer.close(id)
        callback && callback()
      }, 400)
    }
  },
  close: (id) => {
    //  关闭指定对话框
    inner.removeAllHandler(id)
    let dom = document.querySelector(`#${id}`)
    if (dom && dom.firstChild) {
      dom.firstChild.style.opacity = 0
      if (dom.firstChild.firstChild.nextSibling) {
        //  针对alert/confirm/loading/prompt/progress
        dom.firstChild.firstChild.nextSibling.style.transform = 'scale(0.3)'
      } else {
        //  针对success/error/msg
        dom.firstChild.style.margin = '15% auto'
      }
      setTimeout(() => {
        dom.parentNode && dom.parentNode.removeChild(dom)
      }, 100)
    }
  }
}

//  定义内部调用方法
const inner = {
  addEnsureHandler: function (id, func) {
    //  绑定确定按钮事件
    let selector = `#${id} .v-dialog-ensure`
    document.querySelector(selector).onclick = () => {
      let val = ''
      if (id.indexOf('prompt') !== -1) {
        //  如果是prompt则传入文本框值作为参数
        val = document.querySelector(`#${id} input`).value
      }
      func(val)
      outer.close(id)
    }
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
            outer.close(id)
            // doms[key].parentNode.removeChild(doms[key])
          }, 100)
        })
      }
    }
  },
  addTipsAutoCloseHandler: function (id, type, time, callback) {
    //  给成功/失败/普通信息提示框添加定时关闭功能
    let dom = document.querySelector(`#${id} .v-${type}`)
    let timeout = setTimeout(() => {
      callback && callback()
      outer.close(id)
      delete timeout[id]
    }, time)
    dom.onclick = () => {
      clearTimeout(timeout)
      callback && callback()
      outer.close(id)
    }
  },
  removeAllHandler: function (id) {
    //  移除元素节点前，先移除绑定的事件
    let doms = {
      ensure: document.querySelector(`#${id} .v-dialog-ensure`),
      cancel: document.querySelector(`#${id} .v-dialog-cancel`),
      close: document.querySelector(`#${id} .v-dialog-close`),
      modal: document.querySelector(`#${id} .v-modal`),
      success: document.querySelector(`#${id} .v-success`),
      error: document.querySelector(`#${id} .v-error`),
      msg: document.querySelector(`#${id} .v-msg`)
    }
    for (let key in doms) {
      if (doms[key]) {
        doms[key].onclick = null
      }
    }
  },
  create: function (type, msg, val, val2) {
    //  生成指定类型对话框
    let temp = template[type](msg, val, val2)
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
      id = `${type}${this.getRandom(0, 100000)}`
      dom = document.querySelector(`#${id}`)
    } while (dom)
    return id
  },
  getRandom: function (s = 0, e = 100000) {
    //  随机返回0-100000的随机整数
    return Math.round(Math.random() * (e - s) + s)
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
