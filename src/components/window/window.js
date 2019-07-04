/**
* @author: wangjun
* @date: 2019-06-29 22:55:03
* @desc: 打开对话框插件
*/
import Vue from 'vue'

const wind = {
  open: function (options) {
    let id = inner.createId()
    //  require 引入模板文件，一定要在尾部加上default(或者其他抛出的模块名称)属性
    let FrameConstructor = Vue.extend(require('./window.vue').default)
    options.id = id
    let instance = new FrameConstructor({
      data: options
    })
    options.content.content = Vue.extend(options.content.content)
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    return id
  },
  close: function (id) {
    let dom = document.querySelector(`#${id}`)
    dom && dom.parentElement.removeChild(dom)
  },
  closeAll: function () {
    let doms = document.querySelectorAll('.v-wind')
    let newDoms = [].slice.call(doms)
    newDoms.forEach(newDom => newDom.parentElement.removeChild(newDom))
  }
}

const inner = {
  //  生成唯一ID
  createId: function () {
    let random = Math.round(Math.random() * 9000) + 1000
    let id = `open${random}`
    let dom = document.querySelector('#' + id)
    if (dom) this.createId()
    else return id
  },
  //  生成模态框
  createModal: function () {
    let dom = document.createElement('div')
    dom.id = this.createId()
    dom.innerHTML = this.defineModal()
    document.body.appendChild(dom)
    this.bindClose(dom.id)
    return dom.id
  },
  //  定义模态框
  defineModal: function () {
    let html = `<div class='v-window'><v-window></v-window></div>`
    this.banBodyScroll()
    return html
  },
  //  禁用正文文档滑动事件
  banBodyScroll: function () {
    document.body.style.overflow = 'hidden'
  },
  //  绑定旁白关闭事件
  bindClose: function (id) {
    let dom = document.querySelector('#' + id)
    if (dom) {
      dom.onclick = event => {
        let e = event || window.event
        let cname = e.target.className
        if (cname === 'v-window') dom.parentNode.removeChild(dom)
      }
    } else {
      setTimeout(() => this.bindClose(id), 1)
    }
  }
}

export default wind
