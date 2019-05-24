/**
* @author: wangjun
* @date: 2019-05-22 20:01:37
* @desc: 文本框只能输入数值指令
*
* 中文字符问题在keydown事件中阻止不了，通过直接改变输入框值，v-model监听不到变化，只能借助type = number
* 因为数值文本框获取到的值并不是肉眼看到的文本框显示的值
* 所以在处理.号结尾的数据有问题，所以目前做不到控制最大值
* 中文-号问题解决不了
* @func 目前只做到长度、精度、负号输入控制，期待以后完善
*/
export default (Vue) => {
  //  键盘keydown事件中文字符衡返229,无法解决。。。
  //  + - e 负号keycode码
  let notAllows = [187, 107, 109, 16, 69, 229]
  //  小数点
  let dots = [110, 190]
  //  回退 -号
  let [back, minus] = [8, 189]
  //  初始化小数点和最大值
  let [points, maxLength, minusFlag] = [0, undefined, true]
  //  记录上一次按键操作
  let lastCode = null
  const filter = () => {
    let e = event || window.event
    let keyCode = e.keyCode
    let val = e.target.value
    let exp = null
    //  判断是否可以输入负号
    if (justify(keyCode, val)) {
      e.preventDefault()
    }
    lastCode = keyCode
    function justify (code, val) {
      //  无论什么时候，都不会屏蔽退格键
      if (code === back) return
      //  判断输入总长度
      if (maxLength) {
        if (val.toString().length >= maxLength) return true
      }
      if (points === 0) {
        //  如果points为0，则输入整数
        if (dots.indexOf(code) !== -1) return true
      }
      //  不为0，则判断负号可不可以输入
      if (minusFlag) {
        //  只有首部可以输入负号
        if (code === minus && lastCode === minus) return true
        exp = new RegExp(`^-?\\d*[.]\\d{${-points}}$`)
      } else {
        if (code === minus) return true
        exp = new RegExp(`^\\d*[.]\\d{${points}}$`)
      }
      //  判断当前按下的键盘值能不能正确返回
      if (notAllows.indexOf(code) !== -1) return true
      /**
       * 处理小数点后几位
       * 首先判断当前数据是否已经满足限制要求，已满足则直接返回true
       * 判断小数点是否已经有输入，有就返回true
       */
      if (exp.test(val)) return true
    }
  }
  Vue.directive('number', {
    inserted: function (el, binding) {
      let val = binding.value
      let type = typeof val
      switch (type) {
        case 'number': maxLength = val; break
        case 'string': {
          maxLength = Number(val)
          if (isNaN(maxLength)) maxLength = 0
          break
        }
        case 'object': {
          if (val instanceof Array) {
            maxLength = Number(val[0])
            points = Number(val[1] || 0)
            minusFlag = val[2] === undefined ? minusFlag : val[2]
          } else {
            points = Number(val.points) || 0
            maxLength = Number(val.maxLength)
            minusFlag = val.minusFlag === undefined ? minusFlag : val.minusFlag
          }
          break
        }
        default: break
      }
      if (el.getAttribute('type') !== 'number') el.setAttribute('type', 'number')
      // el.onkeydown = filter
      el.addEventListener('keydown', filter)
    }
  })
}
