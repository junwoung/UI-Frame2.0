/**
 * Created by wangjun on 2018-8-24.javascript
 * * * * * * * * * 方法一览 * * * * * * * * *
 * {[参数前面有!表示非必填]}
 * @getUrlParam {[!参数名, !链接]} @desc 获取url后面的指定参数
 * @getFormatDate {[!日期参数, !输出格式, !日期连接符]} @desc 获取指定的日期格式
 * @setLocal {[键名, 键值, !过期时间]} @desc 设置localStorage
 * @removeLocal {[键名]} @desc 移除localStorage
 * @getLocal {[键名]} @desc 获取localStorage
 * @removeDuplicate {[数组]} @desc 数组去重
 * @getCookie {[键名]} @desc 获取指定cookie
 * @setCookie {[键名, 键值, !过期时间]} @desc 设置指定cookie
 * @removeCookie {[键名]} @desc 删除指定cookie
 * @ajax {[请求类型, 请求链接, !请求参数, !成功回调函数, !失败回调函数]} @desc 发送ajax
 * @checkSign {[传入的url, 校验的参数列表, 加签算法, 盐值]} @desc 指定方法加签
 * @test {[校验的类型, 要校验的值]} @desc 正则表达式校验
 * @debounce {[回调函数, !等待时间]} @desc 函数防抖
 * @throttle {[回调函数, !等待时间]} @desc 函数节流
 * @deepClone {[克隆的对象]} @desc 对象深拷贝
 * @getType {[对象参数]} @desc 获取数据类型
 * @sleep {[毫秒数]} @desc 睡眠指定毫秒数
 * @flatten {[数组]} @desc 数组扁平化
 */

export default class utils {
  /**
  1、判断url参数个数，为空则直接返回空；
  2、判断传入的参数是否为空，
  为空：判断url参数个数，个数为1，则返回参数值；个数不为1，则返回空；
  不为空：判断url参数个数，
  个数为1，且对应参数无参数名只有参数值，则直接返回参数值；如果对应参数包含参数名则比对参数名，一致则返回参数值，否则返回空
  个数不为1，则遍历参数数组，寻找与参数名对应的参数值，找到则返回相应的参数值，否则返回空
  */
  static getUrlParam (name = undefined, url) {
    let str = ''
    url = url || location.href
    let paramStr = url.split('?')[1]
    if (!paramStr) return
    let keyValue = paramStr.split('&')
    if (name === undefined) {
      if (keyValue.length === 1) {
        if (keyValue[0].indexOf('=') === -1) {
          return keyValue[0]
        } else {
          return keyValue[0].split('=')[1]
        }
      }
      return
    } else {
      str = arguments[0].toString()
    }
    if (!keyValue || keyValue.length <= 0) return
    if (keyValue.length === 1) {
      if (keyValue[0].indexOf('=') === -1) {
        return keyValue[0]
      } else if (keyValue[0].split('=').length === 2) {
        if (keyValue[0].split('=')[0] === str) {
          return keyValue[0].split('=')[1]
        } else {

        }
      }
    } else {
      for (let i = 0; i < keyValue.length; i++) {
        let param = keyValue[i].split('=')
        if (param[0] === str) {
          return param[1]
        }
      }
    }
  }

  /*
  1、参数1代表传进来的日期格式，可以是日期对象，也可以是日期的value数值
  2、参数2代表最终返回结果，year、month、day、hour、minute、second 分表表示精确到对应位，week表示输出星期几
  3、参数1不传表示默认当前日期；参数2不传默认输出精确到秒
  */
  static getFormatDate (date = new Date(), type = 'second', join = '-') {
    let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    if (!date) {
      date = new Date()
    } else {
      if (typeof date !== 'object') {
        date = new Date(date)
      }
    }
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let week = date.getDay()
    month = month > 9 ? month : ('0' + month)
    day = day > 9 ? day : ('0' + day)
    hour = hour > 9 ? hour : ('0' + hour)
    minute = minute > 9 ? minute : ('0' + minute)
    second = second > 9 ? second : ('0' + second)
    switch (type) {
      case 'year':
        return year
      case 'month':
        return year + join + month
      case 'day':
        return year + join + month + join + day
      case 'hour':
        return year + join + month + join + day + ' ' + hour
      case 'minute':
        return year + join + month + join + day + ' ' + hour + ':' + minute
      case 'second':
        return year + join + month + join + day + ' ' + hour + ':' + minute + ':' + second
      case 'week':
        return weeks[week]
      default:
        return year + join + month + join + day + ' ' + hour + ':' + minute + ':' + second
    }
  }

  //  设置本地存储localStorage
  static setLocal (key, value, expire) {
    let keyTimestamp = key + 'TimeStamp'
    let nowTimestamp = (new Date()).valueOf()
    let time = expire ? (nowTimestamp + expire * 24 * 60 * 60 * 1000) : (nowTimestamp + 24 * 60 * 60 * 1000)
    window.localStorage[key] = value
    window.localStorage[keyTimestamp] = time
  }

  //  移除本地存储
  static removeLocal (key) {
    window.localStorage.removeItem(key)
    window.localStorage.removeItem(key + 'TimeStamp')
  }

  //  获取本地存储
  static getLocal (key) {
    let nowTimestamp = (new Date()).valueOf()
    let keyTimestamp = window.localStorage[key + 'TimeStamp']
    if (nowTimestamp > keyTimestamp) {
      this.removeLocal(key)
      return undefined
    } else {
      return window.localStorage[key]
    }
  }

  //  数组去重
  static removeDuplicate (arr) {
    if (!arr || arr.length < 2) return arr
    let obj = {}
    let data = []
    for (let i = 0, len = arr.length; i < len; i++) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = true
        data.push(arr[i])
      }
    }
    return data
  }

  //  获取cookie操作
  static getCookie (name) {
    // 获取name在Cookie中起止位置
    let start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      //  获取value的终止位置
      let end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      // 截获cookie的value值,并返回
      return unescape(document.cookie.substring(start, end))
    }
    return ''
  }

  //  设置cookie操作
  static setCookie (name, value, expdays) {
    let expdate = new Date()
    //  设置Cookie过期日期
    expdate.setDate(expdate.getDate() + expdays)
    //  添加Cookie
    document.cookie = name + '=' + escape(value) + ';expires=' + expdate.toUTCString() + ';path=/'
  }

  //  删除cookie操作
  static removeCookie (name) {
    this.setCookie(name, '', -1)
  }

  //  原生ajax封装
  static ajax (method, url, data, success, error) {
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      // 兼容多种格式传参
      let send = arguments[0]
      method = send.method || 'get'
      url = send.url
      data = send.param
      success = send.success
      error = send.error
      var ContentType = send.ContentType || 'application/x-www-form-urlencoded'
    }
    if (!url) return
    let request = null
    // 创建ajax请求，兼容ie
    if (XMLHttpRequest) {
      request = new XMLHttpRequest()
    } else {
      return
      // request = new ActiveXObject()
    }
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          success(JSON.parse(request.responseText))
        } else {
          error('请求失败')
        }
      }
    }
    if (method.toUpperCase() === 'GET') {
      // 拼接get请求参数
      let param = ''
      for (let key in data) {
        param += key + '=' + data[key] + '&'
      }
      if (param) param = param.substr(0, param.length - 1)
      if (url.indexOf('?') !== -1) {
        url += '&' + param
      } else {
        url += '?' + param
      }
    }
    request.onprogress = function (event) {
      if (event.lengthComputable) {
        // console.log(event.position,event.totalSize);
      }
    }
    request.open(method, url)
    if (method.toUpperCase() === 'POST') {
      /**
       * 当请求为post时，需设置请求类型为application/x-www-form-urlencoded,而不能设置为application/json
       * 原因：PHP后台识别不了请求类型为application/json
       */
      if (ContentType !== 'multipart/form-data') {
        if (typeof data === 'object') {
          data = JSON.stringify(data)
        }
        request.setRequestHeader('Content-Type', ContentType)
      }
    }
    request.send(data)
    request.timeout = 3000
    request.ontimeout = function () {
      console.log('请求超时')
    }
  }

  /**
   * 验签方法
   * @param url 传入的url
   * @param params 要校验的字段,数组,可以传入指定字段数组，也可以传空数组（表示sign字段以外的字段需要加密）
   * @param md5fn 加签方法（前提是前端需要引入md5算法）
   * @param salt 加密盐值
   */
  static checkSign (url, params, md5fn, salt) {
    if (!url || !params || !md5fn) return
    if (url.indexOf('?') === -1) return
    if (!(params instanceof Array)) return
    var arr = []
    var obj = {}
    url = url.split('?')[1]
    arr = url.split('&')
    for (var i = 0, len = arr.length; i < len; i++) {
      var itemArr = arr[i].split('=')
      if (itemArr[0] && itemArr[1]) {
        obj[itemArr[0]] = itemArr[1]
      }
    }
    arr = {}
    if (params.length === 0) {
      arr = JSON.parse(JSON.stringify(obj))
      delete arr['sign']
    } else {
      for (var j = 0, len2 = params.length; j < len2; j++) {
        arr[params[j]] = obj[params[j]]
      }
    }
    var result = md5fn(arr, salt)
    if (result === obj['sign'].toUpperCase()) {
      return true
    } else {
      console.log(result)
      return false
    }
  }

  /**
  * @author: wangjun
  * @date: 2019-04-08 15:38:44
  * @desc: 校验各种值类型
  * @desc: 只收集一些常规参数的校验，特殊需求还需另外整理
  */
  static test (type, val) {
    /**
    * @param[type]: 校验类型，必须输入以下枚举类型
    * @param[val]: 要校验的参数值
    */
    let check = {
      num: /^[0-9]*$/, //  数字
      str: /^[A-Za-z]+$/, //  字母
      strNum: /^[A-Za-z0-9]+$/, //  数字+字母
      chinese: /^[\u4e00-\u9fa5],{0,}$/, //  验证汉字
      password: /^[a-zA-Z]\w{5,17}$/, //  以字母开头，长度在6-18之间，只能包含字符、数字和下划线
      email: /^(\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, //  验证邮箱
      url: /^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/, //  验证url
      phone: /^(\d3,4|\d{3,4}-)?\d{7,8}$/, //  验证电话号码，正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX
      id: /^\d{15}|\d{}18$/ //  验证身份证号
    }
    if (!type || !check[type]) {
      return console.log('请输入有效的参数校验类型')
    }
    let reg = new RegExp(check[type])
    return reg.test(val)
  }

  /**
   * @name 函数防抖
   * @desc 一段时间内，最近一次操作会覆盖上一次操作
   * @param fn: 要防抖的函数；wait: 等待的时间
   * @date 2019-04-24
   */
  static debounce (fn, wait = 20) {
    var timer = null
    return function () {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, arguments)
      }, wait)
    }
  }

  /**
   * @name 函数节流
   * @desc 一段时间内，该事件只能被触发一次
   * @param fn: 要节流的函数；wait: 等待的时间
   * @date 2019-04-24
   */
  static throttle (fn, wait = 20) {
    var timer = null
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          fn.call(this, arguments)
          timer = null
        }, wait)
      }
    }
  }

  //  深拷贝数组/对象
  static deepClone (obj) {
    if (typeof obj !== 'object') return obj
    if (!obj) return null
    if (Object.prototype.toString.call(obj) === '[object Date]') return new Date(obj.valueOf())
    if ({}.toString.call(obj) === '[object RegExp]') return new RegExp(obj)
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
      if (typeof obj[key] !== 'object') newObj[key] = obj[key]
      else newObj[key] = this.deepClone(obj[key])
    }
    return newObj
  }

  //  获取数据类型
  static getType (obj) {
    //  等价于 {}.toString.call(obj)
    let initType = Object.prototype.toString.call(obj)
    let type = initType.split(' ')[1]
    return type.slice(0, type.length - 1)
  }

  //  延时函数
  static sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  //  数组扁平化
  static flatten (arr) {
    if (!arr || !(arr instanceof Array) || !arr.length) return
    let newArr = []
    flat(arr)
    return newArr
    function flat (arr) {
      arr.forEach(item => {
        if (item instanceof Array) {
          flat(item)
        } else {
          newArr.push(item)
        }
      })
    }
  }

  // 去除字符串中的空隔
  static trim (str) {
    if (typeof str !== 'string') return str
    return str.replace(/\s/g, '')
  }
}
