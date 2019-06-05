/**
* @author: wangjun
* @date: 2019-05-29 19:26:02
* @desc: tip指令，自定义提示指令
*/

export default (Vue) => {
  //  引入tip样式
  require('./tip.css')
  //  缓存多个tips，避免频繁创建节点消耗性能
  //  需要注意的是，避免非必要的提示信息，以免缓存节点过多造成缓存泄露
  // let doms = []
  //  设置tip隐藏定时器
  let timer = null
  Vue.directive('tips', {
    inserted: function (el, bingding) {
      let msg = bingding.value
      init(el, msg)
    }
  })
  //  初始化绑定指令
  function init (el, msg) {
    let dom = createModal(msg)
    el.parentNode.appendChild(dom)
    bindMouseEvents(el, dom)
  }

  //  创建模态框
  function createModal (msg) {
    if (!msg) return
    let dom = document.createElement('div')
    dom.className = 'v-direc-tip'
    dom.innerHTML = msg
    return dom
  }

  //  绑定相关鼠标事件
  function bindMouseEvents (el, tip) {
    let showFlag = false
    el.addEventListener('mouseover', showTip)
    el.addEventListener('mouseleave', hideTip)
    el.addEventListener('click', stayShow)
    tip.addEventListener('mouseover', showTip)
    tip.addEventListener('mouseleave', hideTip)

    //  点击事件控制显示隐藏tip
    function stayShow () {
      showFlag = !showFlag
      if (showFlag) showTip()
      else hideTip()
    }

    //  显示tip信息
    function showTip () {
      tip.style.opacity = 1
      if (timer) return clearTimeout(timer)
      tip.style.visibility = 'visible'
    }

    //  隐藏tip信息
    function hideTip () {
      if (showFlag) return
      tip.style.opacity = 0
      timer = setTimeout(() => {
        timer = null
        tip.style.visibility = 'hidden'
      }, 300)
    }
  }

  //  调整tip显示位置
}
