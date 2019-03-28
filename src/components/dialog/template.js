/**
* @author: wangjun
* @date: 2019-03-26 09:57:54
* @desc: 定义各对话框模板
*/

const template = {
  alert: (words = '警告提示信息') => {
    return `<div class='v-modal'>
    <div class='v-dialog-body v-alert'>
    <div class='v-dialog-close'></div>
    <div class='v-alert-msg'><span class='v-words'>${words}</span></div>
    <div class='v-dialog-control'><button class='v-dialog-ensure'>确定</button></div>
    </div>
    </div>`
  },
  confirm: (words = '确认提示信息') => {
    return `<div class='v-modal'>
    <div class='v-dialog-body v-confirm'>
    <div class='v-dialog-close'></div>
    <div class='v-alert-msg'><span class='v-words'>${words}</span></div>
    <div class='v-dialog-control'><button class='v-dialog-ensure'>确定</button><button class='v-dialog-cancel'>取消</button></div>
    </div>
    </div>`
  },
  loading: (words = 'loading...') => {
    return `<div class='v-modal' style='background-color: transparent;'>
    <div class='v-dialog-body v-loading'>
    <div class='v-loading-container'>
    <span></span><span></span><span></span>
    </div>
    <div class='v-loading-msg'><span class='v-words'>${words}</span></div>
    </div>
    </div>`
  },
  success: (words = 'scuccess') => {
    return `<div class='v-success'><span class='v-words'>${words}</span></div>`
  },
  error: (words = 'error') => {
    return `<div class='v-error'><span class='v-words'>${words}</span></div>`
  },
  msg: (words = 'error') => {
    return `<div class='v-msg'><span class='v-words'>${words}</span></div>`
  }
}

export default template
