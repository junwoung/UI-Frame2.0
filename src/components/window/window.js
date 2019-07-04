/**
* @author: wangjun
* @date: 2019-06-29 22:55:03
* @desc: 以对话框的方式打开指定文件
*/
import Vue from 'vue'

export default class wind {
  /**
  * @author: wangjun
  * @date: 2019-07-04 11:41:52
  * @desc: 打开指定表单弹窗
  */
  static open (options) {
    let id = this.createId()
    //  require 引入模板文件，一定要在尾部加上default(或者其他抛出的模块名称)属性
    let FrameConstructor = Vue.extend(require('./window.vue').default)
    options.id = id
    //  传入数据到打开组件
    let instance = new FrameConstructor({
      data: options
    })
    //  注册组件
    options.content.content = Vue.extend(options.content.content)
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    return id
  }
  //  关闭指定弹窗
  static close (id) {
    let dom = document.querySelector(`#${id}`)
    dom && dom.parentElement.removeChild(dom)
  }
  //  关闭所有弹窗
  static closeAll () {
    let doms = document.querySelectorAll('.v-wind')
    let newDoms = [].slice.call(doms)
    newDoms.forEach(newDom => newDom.parentElement.removeChild(newDom))
  }
  //  内部方法，生成唯一id
  static createId () {
    let random = Math.round(Math.random() * 9000) + 1000
    let id = `open${random}`
    let dom = document.querySelector('#' + id)
    if (dom) this.createId()
    else return id
  }
}
