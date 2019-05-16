/**
 * Created by wangjun on 2018-8-24.javascript
 */
function getUrlParam () {
  /**
   1、判断url参数个数，为空则直接返回空；
   2、判断传入的参数是否为空，
   为空：判断url参数个数，个数为1，则返回参数值；个数不为1，则返回空；
   不为空：判断url参数个数，
   个数为1，且对应参数无参数名只有参数值，则直接返回参数值；如果对应参数包含参数名则比对参数名，一致则返回参数值，否则返回空
   个数不为1，则遍历参数数组，寻找与参数名对应的参数值，找到则返回相应的参数值，否则返回空
   */
  let str = ''
  let url = location.href
  let paramStr = url.split('?')[1]
  if (!paramStr) return
  let keyValue = paramStr.split('&')
  let arg = arguments
  if (!arg || arg.length === 0) {
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

function getFormatDate () {
  /*
   1、参数1代表传进来的日期格式，可以是日期对象，也可以是日期的value数值
   2、参数2代表最终返回结果，year、month、day、hour、minute、second 分表表示精确到对应位，week表示输出星期几
   3、参数1不传表示默认当前日期；参数2不传默认输出精确到秒
   */
  let arg = arguments[0]
  let str = arguments[1]
  let date = null
  let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  if (!arg) {
    date = new Date()
  } else {
    if (typeof arg === 'object') {
      date = arg
    } else {
      date = new Date(arg)
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
  switch (str) {
    case 'year':
      return year
    case 'month':
      return year + '-' + month
    case 'day':
      return year + '-' + month + '-' + day
    case 'hour':
      return year + '-' + month + '-' + day + ' ' + hour
    case 'minute':
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    case 'second':
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    case 'week':
      return weeks[week]
    default:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  }
}

function setLocal (key, value, expire) {
  let keyTimestamp = key + 'TimeStamp'
  let nowTimestamp = (new Date()).valueOf()
  let time = expire ? (nowTimestamp + expire * 24 * 60 * 60 * 1000) : (nowTimestamp + 24 * 60 * 60 * 1000)
  window.localStorage[key] = value
  window.localStorage[keyTimestamp] = time
}

function removeLocal (key) {
  window.localStorage.removeItem(key)
  window.localStorage.removeItem(key + 'TimeStamp')
}

function getLocal (key) {
  let nowTimestamp = (new Date()).valueOf()
  let keyTimestamp = window.localStorage[key + 'TimeStamp']
  if (nowTimestamp > keyTimestamp) {
    removeLocal(key)
    return undefined
  } else {
    return window.localStorage[key]
  }
}

function removeDuplicate (arr) {
  /**
   * 利用对象的特性达到数组去重，性能很好
   * */
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

function sort (arr) {
  /**
   * 数值数组的排序
   * */
  if (!arr || arr.length < 2) return arr
  arr.sort(compare)
  return arr
}

function compare (val1, val2) {
  return val1 - val2
}

function flattenStr (arr) {
  /**
   * 先将数组转化为字符串，再将字符串分割
   * */
  let str = arr.join(',')
  return str.split(',')
}

function flatten (arr) {
  /**
   * 一个个出栈数组的元素
   * 判断元素是否是数组
   * ... 是es6的运算符：将一个数组转为用逗号分隔的参数序列。
   * */
  if (!arr || arr.length < 1) return arr
  let arr2 = [...arr].reverse()
  let data = []
  while (arr2.length) {
    let item = arr2.pop()
    if (Array.isArray(item)) {
      arr2.push(...item.reverse())
    } else {
      data.push(item)
    }
  }
  return data
}

function copy (arr) {
  /*
   *深拷贝数组
   */
  return JSON.parse(JSON.stringify(arr))
}

function getRandom (num1, num2) {
  /**
   * 返回num1、num2之间的随机整数
   **/
  let n1 = num1
  let n2 = num2
  if (num1 > num2) {
    n1 = num2
    n2 = num1
  }
  return Math.round(Math.random() * (n2 - n1) + n1)
}

function getCookie (name) {
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

function setCookie (name, value, expdays) {
  let expdate = new Date()
  //  设置Cookie过期日期
  expdate.setDate(expdate.getDate() + expdays)
  //  添加Cookie
  document.cookie = name + '=' + escape(value) + ';expires=' + expdate.toUTCString() + ';path=/'
}

function delCookie (name) {
  this.setCookie(name, '', -1)
}

/**
 * 封装原生ajax
 */
function ajax (method, url, data, success, error) {
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
window.ajax = ajax // 赋值给全局变量ajax

/**
 * 验签方法
 * @param url 传入的url
 * @param params 要校验的字段,数组,可以传入指定字段数组，也可以传空数组（表示sign字段以外的字段需要加密）
 * @param md5fn 加签方法（前提是前端需要引入md5算法）
 * @param salt 加密盐值
 */
function checkSign (url, params, md5fn, salt) {
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
function test (type, val) {
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
    console.log('请输入有效的参数校验类型')
    return
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
function debouncing (fn, wait = 20) {
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
function throttling (fn, wait = 20) {
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

const util = {
  'A_tips': {
    getUrlParam: '获取url链接后的参数',
    getFormatDate: '获取指定格式日期',
    getLocal: '从localstorage获取指定参数值',
    setLocal: '将指定参数值存到localstorage',
    removeLocal: '将指定参数从localstorage移除',
    removeDuplicate: '数组去重',
    sort: '数组排序',
    flatten: '扁平化多维数组',
    flattenStr: '扁平化多维数组，输出string类型',
    copy: '数组拷贝',
    getRandom: '获取指定范围的随机整数',
    checkSign: '参数校验',
    ajax: '原生ajax',
    test: '正则表达式校验，[num / str / strNum / chinese / password / email / url / phone / id]'
  },
  'getUrlParam': getUrlParam,
  'getFormatDate': getFormatDate,
  'setLocal': setLocal,
  'getLocal': getLocal,
  'removeLocal': removeLocal,
  'removeDuplicate': removeDuplicate,
  'sort': sort,
  'flatten': flatten,
  'flattenStr': flattenStr,
  'copy': copy,
  'getRandom': getRandom,
  'getCookie': getCookie,
  'setCookie': setCookie,
  'delCookie': delCookie,
  'checkSign': checkSign,
  'ajax': ajax,
  'test': test,
  'debouncing': debouncing,
  'throttling': throttling
}
export default util
