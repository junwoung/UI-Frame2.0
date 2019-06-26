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
  let doms = []
  //  设置tip隐藏定时器
  let timer = null
  Vue.directive('tips', {
    inserted: function (el, bingding) {
      let msg = bingding.value
      //  绑定该指令的节点，如果定位无特殊要求（static），则会被替换为relative定位
      let style = window.getComputedStyle(el)
      console.log(style.position)
      if (el.style.position === '' && style.position === 'static') el.style.position = 'relative'
      init(el, msg)
      // console.log(style.position)
    }
  })
  //  初始化绑定指令
  function init (el, msg) {
    let dom = createModal(msg)
    doms.push(el)
    el.appendChild(dom)
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
      let e = event || window.event
      //  判断当前操作节点是否是绑定指令节点
      if (doms.some(dom => dom === e.target)) {
        //  获取文档节点宽度
        let docW = document.documentElement.clientWidth
        //  获取节点现对于浏览器视口位置
        let rect = e.target.getBoundingClientRect()
        let [left, width] = []
        if (docW - rect.left < 150) {
          //  如果文本节点左边开始位置离视口右边距小于150px，则提示节点向左展示信息
          left = rect.left - rect.width
          width = rect.left * 0.8
          tip.style.left = `${-left}px`
          //  更改提示节点`三角形`显示位置
          tip.className = 'v-direc-tip-right'
        } else {
          width = (docW - rect.left) * 0.8
        }
        //  设置提示节点最大宽度，避免显示错乱或者不美观
        tip.style['max-width'] = `${width}px`
        //  计算文本节点大概宽度，按14px计算
        let text = tip.childNodes[0]
        let textW = text.length * 14
        //  如果计算得到的宽度大于提示最大允许宽度，则允许其换行显示
        if (textW > width) {
          tip.style['white-space'] = 'normal'
          tip.style.width = `${width}px`
          //  文本节点靠右 计算提示左偏移量
          if (docW - rect.left < 150) {
            left = width - (rect.width) / 2
            tip.style.left = `${-left}px`
          }
        }
      }
      tip.style.opacity = 1
      if (timer) return clearTimeout(timer)
      tip.style.display = 'block'
    }

    //  隐藏tip信息
    function hideTip () {
      if (showFlag) return
      tip.style.opacity = 0
      timer = setTimeout(() => {
        timer = null
        tip.style.display = 'none'
      }, 300)
    }
  }
}
