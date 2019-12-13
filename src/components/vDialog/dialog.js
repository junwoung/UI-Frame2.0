/**
* @author: wangjun
* @date: 2019-12-02 12:25:34
* @desc: 定义打开弹窗事件
*/
import inner from './inner'
import './template.css'

class Dialog {
  //  确认弹窗
  static confirm (obj) {
    if (!inner.utils.check(obj)) return
    inner.currentType = 'confirm'
    let dialog = inner.dealModal(obj)
    inner.dealConfirm(obj, dialog)
    return dialog.id
  }
  //  失败提示信息
  static error (msg, timing, fn) {
    if (!inner.utils.checkTips(timing, fn)) return
    inner.currentType = 'error'
    let tip = inner.dealTips('error', msg, timing, fn)
    return tip.id
  }
  //  成功提示信息
  static success (msg, timing = 3000, fn) {
    if (!inner.utils.checkTips(timing, fn)) return
    inner.currentType = 'success'
    let tip = inner.dealTips('success', msg, timing, fn)
    return tip.id
  }
  //  普通提示信息
  static msg (msg, timing = 3000, fn) {
    if (!inner.utils.checkTips(timing, fn)) return
    inner.currentType = 'msg'
    let tip = inner.dealTips('msg', msg, timing, fn)
    return tip.id
  }
  //  加载弹窗
  static loading (msg = 'Loading...') {
    inner.currentType = 'loading'
    let dialog = inner.dealModal({modalFn: false})
    inner.dealLoading(msg, dialog)
    return dialog.id
  }
  //  输入弹窗
  static prompt (obj) {
    inner.currentType = 'prompt'
    let dialog = inner.dealModal(obj)
    inner.dealPrompt(obj, dialog)
    return dialog.id
  }
  //  关闭
  static close (id) {
    let dom = document.querySelector(`#${id}`)
    if (dom) {
      inner.close(dom)
    }
  }
  static closeType (type) {
    if (!inner.utils.checkType(type)) return
    let doms = document.querySelectorAll(`[data-type="${type}"]`)
    doms = [...doms]
    doms.forEach(dom => {
      inner.close(dom)
    })
  }
  static closeAll () {
    let doms = document.querySelectorAll('[data-dialog="1"]')
    doms = [...doms]
    doms.forEach(async dom => {
      inner.close(dom)
    })
  }
}

export default Dialog
