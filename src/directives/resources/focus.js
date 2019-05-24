/**
* @author: wangjun
* @date: 2019-05-22 19:51:49
* @desc: 文本框获取焦点指令
*/

export default (Vue) => {
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
}
