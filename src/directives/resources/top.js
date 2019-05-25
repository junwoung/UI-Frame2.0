/**
* @author: wangjun
* @date: 2019-05-25 19:28:02
* @desc: 返回顶部指令
*/

export default (Vue) => {
  Vue.directive('top', {
    inserted: function (el, binding) {
      let title = el.getAttribute('title')
      let cursor = el.style.cursor
      let val = binding.value
      let type = typeof val
      let goHeight
      if (!title) {
        el.setAttribute('title', '点我滑动到指定位置')
      }
      if (!cursor) {
        el.style.cursor = 'pointer'
      }
      switch (type) {
        case 'undefined': goHeight = 0; break
        case 'number': goHeight = val; break
        case 'string': {
          let dom = document.querySelector(val)
          if (!dom) return
          goHeight = getDistance(el, dom)
          break
        }
        default: return
      }
      el.addEventListener('click', () => {
        sroll(goHeight)
      })
    }
  })
  function sroll (height) {
    //  滑动具体像素
    if (height === undefined) return
    //  回到顶部
    if (height === 0) {
      height = document.scrollTop || document.documentElement.scrollTop
      height = -height
    }
    //  设置总滑动时间为200ms
    let last = 300
    //  设置定时器执行频率为16.7ms：和屏幕的赫兹相持平，最舒服的动画间隔时间
    let step = 16.7
    //  计算步数
    let times = Math.round(last / step)
    //  计算每一步移动的距离
    let stepHeight = (height / times).toFixed(3)
    //  计数器
    let i = 0
    let timer = setInterval(() => {
      if (i < times) {
        i++
        window.scrollBy(0, stepHeight)
      } else {
        clearInterval(timer)
      }
    }, step)
  }
  function getDistance (from, to) {
    //  计算两个节点之间的距离
    //  获取节点距浏览器视口各属性
    let fromRect = from.getBoundingClientRect()
    if (to) {
      let toRect = to.getBoundingClientRect()
      return -fromRect.top + toRect.top
    }
  }
}
