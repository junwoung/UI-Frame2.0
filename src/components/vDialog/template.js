/**
* @author: wangjun
* @date: 2019-12-02 12:18:44
* @desc: 弹窗模板
*/

class Template {
  static confirm (obj) {
    let {title, msg, ensure, cancel} = obj
    title = title || '确认信息'
    ensure = ensure || '确认'
    cancel = cancel || '取消'
    return `
    <div class='js-dialog-confirm'>
      <div class='js-dialog-header-wrap'>
        <span class='js-dialog-header'>${title}</span>
        <span class='js-dialog-close' style="display: ${obj.closeFn === false ? 'none' : ''}">x</span>
      </div>
      <div class='js-dialog-body'>
        <span>${msg}</span>
      </div>
      <div class='js-dialog-footer' style="display: ${(obj.ensureFn === false && obj.cancelFn === false) ? 'none' : ''}">
        <button class='js-dialog-btn js-dialog-btn-cancel' style="display: ${obj.cancelFn === false ? 'none' : ''}">${cancel}</button>
        <button class='js-dialog-btn js-dialog-btn-ensure' style="display: ${obj.ensureFn === false ? 'none' : ''}">${ensure}</button>
      </div>
    </div>
    `
  }
  static error (msg) {
    return `
    <div class='js-dialog-error js-dialog-tips-content'>
      <div class='js-dialog-tips-content-wrap'>
        <span>${msg}</span>
      </div>
    </div>
    `
  }
  static success (msg) {
    return `
    <div class='js-dialog-success js-dialog-tips-content'>
      <div class='js-dialog-tips-content-wrap'>
        <span>${msg}</span>
      </div>
    </div>
    `
  }
  static msg (msg) {
    return `
    <div class='js-dialog-msg js-dialog-tips-content'>
      <div class='js-dialog-tips-content-wrap'>
        <span>${msg}</span>
      </div>
    </div>
    `
  }
  static loading (msg) {
    return `
    <div class='js-dialog-loading'>
      <span>${msg}</span>
    </div>
    `
  }
  static prompt (obj) {
    let {title, val, ensure, cancel} = obj
    val = val || ''
    title = title || '请输入'
    ensure = ensure || '确认'
    cancel = cancel || '取消'
    let isArea = obj.type === 'textarea'
    return `
    <div class='js-dialog-prompt'>
      <div class='js-dialog-header-wrap'>
        <span class='js-dialog-header'>${title}</span>
        <span class='js-dialog-close' style="display: ${obj.closeFn === false ? 'none' : ''}">x</span>
      </div>
      <div class='js-dialog-body'>
        <input value='${val}' style="display: ${isArea ? 'none' : ''}" class='js-dialog-input' placeholder='请输入...'/>
        <textarea style="display: ${isArea ? '' : 'none'}" class='js-dialog-textarea' placeholder='请输入...'>${val}</textarea>
      </div>
      <div class='js-dialog-footer' style="display: ${(obj.ensureFn === false && obj.cancelFn === false) ? 'none' : ''}">
        <button class='js-dialog-btn js-dialog-btn-cancel' style="display: ${obj.cancelFn === false ? 'none' : ''}">${cancel}</button>
        <button class='js-dialog-btn js-dialog-btn-ensure' style="display: ${obj.ensureFn === false ? 'none' : ''}">${ensure}</button>
      </div>
    </div>
    `
  }
}

export default Template
