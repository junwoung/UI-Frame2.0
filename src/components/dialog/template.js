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
    return `<div class='v-modal' style='background-color: rgba(255, 255, 255, .1);'>
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
    return `<div class='v-msg'><span class='v-words'><span>${words}</span></span></div>`
  },
  prompt: (label = '请输入:', value = '') => {
    return `<div class='v-modal'>
    <div class='v-dialog-body v-prompt'>
    <div class='v-dialog-close'></div>
    <div class='v-prompt-label'><span class='v-words'>${label}</span></div>
    <div class='v-prompt-input'><input type='text' value = ${value}></div>
    <div class='v-dialog-control'><button class='v-dialog-ensure'>确定</button><button class='v-dialog-cancel'>取消</button></div>
    </div>
    </div>`
  },
  progress: (words = '当前进度', total = 0, current = 0) => {
    //  *90 因为进度条长度为对话框宽度的90%
    return `<div class='v-modal'>
    <div class='v-dialog-body v-progress'>
    <div class='v-progress-msg'><span class='v-words'>${words}</span></div>
    <div class='v-progress-line'><span></span><span class='v-progress-color' style='width: ${current * 90 / parseFloat(total)}%'></span></div>
    <div class='v-progress-detail'>total:<span class='v-progress-total'>${total}</span>,current:<span class='v-progress-current'>${current}</span>,percentage:<span class='v-progress-percent'>${total ? (current * 100 / parseFloat(total)).toFixed(2) + '%' : '0'}</span></div>
    </div>
    </div>`
  }
}

export default template
