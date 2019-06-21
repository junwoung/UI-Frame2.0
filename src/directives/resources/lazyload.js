/**
* @author: wangjun
* @date: 2019-05-28 20:13:44
* @desc: 图片懒加载指令
*/

export default (Vue) => {
  //  存放元素节点
  let items = []
  //  scroll事件绑定标志
  let bindFlag = false
  Vue.directive('lazyload', {
    inserted: function (el, binding) {
      //  收集所有绑定懒加载指令的节点
      bindSrc(el, binding.value)
      //  初始化首屏
      setImgUrl()
    }
  })

  function bindSrc (el, src) {
    //  将元素节点添加进数组里
    items.push({
      dom: el,
      src: src
    })
    //  使用addEventListener而不是onscroll是防止覆盖window其他scroll事件
    //  需要注意防止重复绑定scroll事件，以免影响性能
    if (!bindFlag) {
      window.addEventListener('scroll', throttle(setImgUrl))
      bindFlag = true
    }
  }
  //  判断图片是否滚动到浏览器视口，是则展示图片，数组删除相关节点
  function setImgUrl () {
    console.log('throttle')
    let newItems = []
    //  获取浏览器视口高度
    let browserHeight = window.innerHeight
    newItems = items.filter(item => {
      if (isInBrowserView(item.dom)) {
        item.dom.setAttribute('src', item.src)
      } else {
        return item
      }
    })
    items = [...newItems]
    function isInBrowserView (dom) {
      if (!dom) return
      let rect = dom.getBoundingClientRect()
      let [bottom, height] = [rect.bottom, rect.height]
      //  视口上面图片和图片完全处于视口下方均判断为不可见
      if (bottom > 0 && bottom < browserHeight + height) return true
    }
  }
  //  函数节流，避免频繁触发该事件
  function throttle (fn, wait = 100) {
    let timer = null
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, arguments)
          timer = null
        }, wait)
      }
    }
  }
}
