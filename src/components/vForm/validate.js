/**
* @author: wangjun
* @date: 2019-07-10 15:26:38
* @desc: 表单验证类
*/

export default class validate {
  /**
   * @desc 按传入的规则检查传入的参数
   * @param {Object} vals 必传 待验证的表单参数
   * @param {Object} rules 必传 验证规则对象集合，每一个key都要与vals里面key相对应，表示配置该属性值校验规则
   *                       然后再在每条验证规则里面，配置具体需要验证的东西，具体规则见分割线下
   * @param {Object} scope 必传 作用域（一般传入this），当表单数据依赖于其他数据时传入
   * @example this.form.time 依赖于 this.time.selected 则传入scope = this作用域，验证规则配置bind = 'time.selected'
   * @param {Array} some 非必传，只校验指定字段，为空则全部校验，默认为空
   * -------------- 具体验证规则支持配置 -----------------------------------------------------------------------
   * @title 配置字段中文名
   * @must 必填校验
   * @maxLength 最大长度校验
   * @minLength 最短长度校验
   * @max 最大值校验（传入的值类型决定是字符串还是数值比较）
   * @min 最小值校验（传入的值类型决定是字符串还是数值比较）
   * @same 该值与指定属性值保持一致
   * @bind 该值校验依赖于其他值
   * @reg 传入正则表达式，校验属性值是否满足正则规则（非正则表达式无效）
   */
  static check (vals, rules, scope, some = []) {
    //  是否通过验证标签
    let flag = true
    let keys = []
    if (some && some.length) keys = some
    else keys = Object.keys(rules)
    validate.clearError(rules, keys)
    keys.map(key => {
      let rule = rules[key]
      let val = vals[key]
      //  如果有依赖于其他值，则将依赖值赋予val做校验
      if (rule.bind) {
        let arr = rule.bind.split('.')
        val = scope
        arr.map(item => {
          val = val[item]
        })
      }
      if (rule.must && !val) {
        flag = false
        scope.$set(rule, 'error', `${rule.title}必填`)
      }
      if (val) {
        //  长度校验
        if (rule.maxLength && val.length > rule.maxLength) {
          flag = false
          scope.$set(rule, 'error', `${rule.title}长度不能大于${rule.maxLength}`)
        }
        if (rule.minLength && val.length < rule.minLength) {
          flag = false
          scope.$set(rule, 'error', `${rule.title}长度不能小于${rule.minLength}`)
        }
        //  大小校验
        if (rule.max || rule.min) {
          //  判断是数值比较还是字符串比较
          let type = rule.max ? (typeof rule.max) : (typeof rule.min)
          if (type === 'number') val = +val
          else if (type === 'string') val = val + ''
          if (rule.max !== undefined && val > rule.max) {
            flag = false
            scope.$set(rule, 'error', `${rule.title}值不能大于${rule.max}`)
          }
          if (rule.min !== undefined && val < rule.min) {
            flag = false
            scope.$set(rule, 'error', `${rule.title}值不能小于${rule.min}`)
          }
        }
        //  校验正则
        if (rule.reg && {}.toString.call(rule.reg) === '[object RegExp]' && !rule.reg.test(val)) {
          flag = false
          scope.$set(rule, 'error', `${rule.title}值不满足规则`)
        }
      }
      //  一致性校验
      if (rule.same && val !== vals[rule.same]) {
        flag = false
        scope.$set(rule, 'error', `${rule.title}值要与${rules[rule.same].title}保持一致`)
      }
    })
    //  给当前校验增加当前时间戳，便于通知子组件验证结果已经更新
    scope.$set(rules, 'rules_timestamp', +new Date())
    return flag
  }

  /**
   * @desc 重置验证规则里面的报错信息
   * @param {Object} rules
   * @param {Array} kyes
   */
  static clearError (rules, kyes = []) {
    kyes.map(key => {
      if (rules[key].error !== undefined) delete rules[key].error
    })
  }
}
