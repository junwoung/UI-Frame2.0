/**
* @author: wangjun
* @date: 2019-12-02 15:25:56
* @desc: 创建和处理弹窗内部用对象
*/
import template from './template'

const inner = {
  //  记录当前弹窗处于第几个打开
  index: 0,
  //  记录当前创建弹窗类型
  currentType: '',
  //  处理模态框问题
  dealModal (obj) {
    this.index++
    let modal = null
    modal = document.createElement('div')
    modal.className = 'js-dialog-modal'
    modal.id = `js-dialog-${this.index}`
    modal.setAttribute('data-type', this.currentType)
    modal.setAttribute('data-dialog', 1)
    document.body.appendChild(modal)
    //  判断模态是否可以点击关闭
    //  如果不允许点击关闭，则需明确指明modalFn为false
    //  modalFn传值是function的话，则点击模态关闭时触发该回调
    if (obj.modalFn !== false) {
      modal.addEventListener('click', () => {
        if (this.utils.getType(obj.modalFn) === 'function') {
          obj.modalFn()
        }
        document.body.removeChild(modal)
      })
    }
    return modal
  },
  //  处理确认对话框
  dealConfirm (obj, dialog) {
    dialog.innerHTML = template.confirm(obj)
    let confirm
    let interval = setInterval(() => {
      if (!confirm) {
        //  弹窗已生成，添加过渡动画效果
        confirm = dialog.querySelector('.js-dialog-confirm')
        this.addTransition(confirm)
        //  阻止事件冒泡，避免触发模态框点击事件
        confirm.addEventListener('click', () => {
          event.cancelBubble = true
        })
        //  处理关闭、确认、取消按钮事件
        this.dealEvents(obj, dialog, confirm)
      } else {
        clearInterval(interval)
      }
    }, 1)
  },
  //  处理三类信息提示对话框
  dealTips (type, msg, timing, fn) {
    this.index++
    let tip = document.createElement('div')
    tip.className = `js-dialog-tips`
    tip.id = `js-dialog-${this.index}`
    tip.setAttribute('data-type', type)
    tip.setAttribute('data-dialog', 1)
    tip.innerHTML = template[type](msg)
    document.body.appendChild(tip)
    let createTip, timeout
    let interval = setInterval(() => {
      if (!createTip) {
        createTip = tip.querySelector(`.js-dialog-${type}`)
        this.addTransition(createTip)
        //  添加回调函数
        createTip.addEventListener('click', async () => {
          //  避免节点通过其他途径移除造成错误
          fn && fn()
          this.reTransition(createTip)
          await this.utils.sleep(300)
          clearTimeout(timeout)
          if (!tip.parentNode) return
          document.body.removeChild(tip)
        })
        //  添加计时关闭
        if (timing) {
          timeout = setTimeout(() => {
            createTip.click()
          }, timing)
        }
      } else {
        clearInterval(interval)
      }
    }, 1)
    return tip
  },
  //  处理加载弹窗
  dealLoading (msg, dialog) {
    dialog.innerHTML = template.loading(msg)
    let loading
    let interval = setInterval(() => {
      if (!loading) {
        loading = dialog.querySelector('.js-dialog-loading')
        this.addTransition(loading)
        loading.addEventListener('click', (event) => {
          event.cancelBubble = true
        })
      } else {
        clearInterval(interval)
      }
    }, 1)
  },
  //  处理输入弹窗
  dealPrompt (obj, dialog) {
    dialog.innerHTML = template.prompt(obj)
    let prompt
    let interval = setInterval(() => {
      if (!prompt) {
        //  弹窗已生成，添加过渡动画效果
        prompt = dialog.querySelector('.js-dialog-prompt')
        this.addTransition(prompt)
        //  阻止事件冒泡，避免触发模态框点击事件
        prompt.addEventListener('click', () => {
          event.cancelBubble = true
        })
        //  处理关闭、确认、取消按钮事件
        this.dealEvents(obj, dialog, prompt)
      } else {
        clearInterval(interval)
      }
    }, 1)
  },
  addTransition (dom) {
    dom.style.transform = 'translateY(0)'
    dom.style.opacity = '1'
  },
  reTransition (dom) {
    dom.style.transform = 'translateY(-30px)'
    dom.style.opacity = '0'
  },
  dealEvents (obj, dialog, confirm) {
    //  给点击关闭绑定事件
    let close = dialog.querySelector('.js-dialog-close')
    if (obj.closeFn !== false) {
      close.addEventListener('click', async () => {
        if (!dialog.parentNode) return
        if (this.utils.getType(obj.closeFn) === 'function') {
          obj.closeFn()
        }
        this.reTransition(confirm)
        await this.utils.sleep(300)
        document.body.removeChild(dialog)
      })
    }
    //  给确认按钮绑定事件
    let ensure = dialog.querySelector('.js-dialog-btn-ensure')
    if (obj.ensureFn !== false) {
      ensure.addEventListener('click', async () => {
        if (!dialog.parentNode) return
        if (this.utils.getType(obj.ensureFn) === 'function') {
          //  判断当前操作窗口是否是输入弹窗
          if (dialog.getAttribute('data-type') === 'prompt') {
            let input = dialog.querySelector('input')
            if (obj.type === 'textarea') {
              input = dialog.querySelector('textarea')
            }
            let val = input.value
            obj.ensureFn(val)
          } else {
            obj.ensureFn()
          }
        }
        //  如果配置默认阻止关闭，则点击确认和取消按钮不会主动关闭弹窗，需开发人员自行控制关闭
        if (obj.preventClose === true) return
        this.reTransition(confirm)
        await this.utils.sleep(300)
        document.body.removeChild(dialog)
      })
    }
    //  给取消按钮绑定事件
    let cancel = dialog.querySelector('.js-dialog-btn-cancel')
    if (obj.cancelFn !== false) {
      cancel.addEventListener('click', async () => {
        if (!dialog.parentNode) return
        if (this.utils.getType(obj.cancelFn) === 'function') {
          //  判断当前操作窗口是否是输入弹窗
          if (dialog.getAttribute('data-type') === 'prompt') {
            let input = dialog.querySelector('input')
            if (obj.type === 'textarea') {
              input = dialog.querySelector('textarea')
            }
            let val = input.value
            obj.cancelFn(val)
          } else {
            obj.cancelFn()
          }
        }
        //  如果配置默认阻止关闭，则点击确认和取消按钮不会主动关闭弹窗，需开发人员自行控制关闭
        if (obj.preventClose === true) return
        this.reTransition(confirm)
        await this.utils.sleep(300)
        dialog && document.body.removeChild(dialog)
      })
    }
  },
  //  移除弹窗
  async close (dom) {
    let dialogBody = dom.children[0]
    inner.reTransition(dialogBody)
    await inner.utils.sleep(300)
    dom.parentNode.removeChild(dom)
  },
  // 工具函数集合
  utils: {
    //  获取参数类型
    getType (obj) {
      let type = {}.toString.call(obj)
      type = type.split(' ')[1].split(']')[0].toLowerCase()
      return type
    },
    check (obj) {
      if (inner.utils.getType(obj) === 'Object') {
        throw new Error('传参类型错误，必须为object')
      }
      // if (obj.modal === undefined) {
      //   throw new Error('请指定模态框是否需要')
      // }
      return true
    },
    checkTips (timing, fn) {
      if (timing !== undefined) {
        if (timing !== false) {
          if (isNaN(+timing)) throw new Error('请传入合法的计时或者false')
        }
      }
      if (fn !== undefined) {
        if (this.getType(fn) !== 'function') throw new Error('请传入正确的回调函数')
      }
      return true
    },
    checkType (type) {
      let types = ['confirm', 'success', 'error', 'msg', 'loading']
      if (!types.includes(type)) throw new Error('参数类型错误，请传入 ' + types.join(', ') + ' 中的一个')
      return true
    },
    sleep (timing = 30) {
      return new Promise(resolve => setTimeout(resolve, timing))
    }
  }
}
export default inner
