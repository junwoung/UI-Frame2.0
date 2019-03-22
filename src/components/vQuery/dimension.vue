<!-- created by wangjun on 2019-03-18 -->
<template>
  <div v-if="dimens.length" ref="vDimenTmp">
    <div class="v-dimen clearfix"
     v-for="(dimen, idx) in dimens"
     v-if="dimen && flags[idx] && parents[idx]"
     :style="{'background-color': colors[idx].bg}"
     :key="idx">
      <label class="v-query-label">{{dimen[parents[idx]].code_title}}</label>
      <div
       class="v-query-options"
       :class="{'v-query-less': !flags[idx].more}">
        <span
         :style="getStyle(item, index, idx)"
         @mouseover="flags[idx].uuid = item.uuid"
         @mouseleave="flags[idx].uuid = null"
         :title="item.uuid"
         v-for="(item, index) in dimen[parents[idx]].particleList"
         @click="select(item, index, idx)"
          :key="index">
          {{item.title}}
          <em
           v-if="item.checked == '1' && flags[idx].uuid === item.uuid"
           class="v-query-cancel"
           @click.stop="cancelItem(item, index, idx)"></em>
        </span>
      </div>
      <span
       class="v-query-more"
       @click="flags[idx].more = !flags[idx].more">{{flags[idx].more ? '收起':'更多'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vDimension',
  data () {
    return {
      initData: null,
      //  总层级
      deep: 0,
      //  每层级对应的code
      codes: [],
      //  是否多选
      multiple: true,
      //  循环展示维度信息依据
      dimens: [],
      //  更多/收起，显示取消按钮用
      flags: [],
      //  每一层级对应的父层级的uuid，第一次默认为'0'
      parents: [],
      //  存储每一步的信息
      step: [],
      //  存储总信息
      steps: [],
      //  配置底色、边框色、字色等
      colors: [
        {
          bg: '#fff',
          color: '#fff',
          back: '#88cdfa',
          bd: '#88cdfa'
        },
        {
          bg: '#f4f9fb',
          color: '#88cdfa',
          back: '#e0f3ff',
          bd: '#88cdfa'
        },
        {
          bg: '#ffe8f1',
          color: '#d47d9f',
          back: '#f7dfe9',
          bd: '#e4a1bc'
        },
        {
          bg: '#fbf7f4',
          color: '#dc8442',
          back: '#f5e7de',
          bd: '#dab79d'
        }
      ],
      //  最近一次选择状态记录
      last: {
        //  层级
        state: undefined,
        //  父节点UUID
        pid: null,
        item: null
      },
      //  存放选中的选项
      checked: [],
      //  存放要展示的选项
      showText: [],
      //  已选中选项当前hover对象
      showTextFlag: null
    }
  },
  props: {
    dimension: {
      default: null,
      type: Array
    },
    index: {
      default: null,
      type: Number
    },
    cancelCheck: {
      default: null
    },
    disable: {
      default: false
    }
  },
  methods: {
    init: function () {
      //  存储原始数据
      this.initData = JSON.parse(JSON.stringify(this.dimension))
      //  设置层级深度 和 是否是多选 以及维度的code码
      this.deep = this.getDeep(this.initData)
      console.log(this.codes)
      this.multiple = this.initData[0].multiple === '1'
      //  初始化dimens数组和flags数组
      this.dimens.push({
        '0': this.dimension[0]
      })
      this.parents.push('0')
      this.flags.push({
        more: false,
        uuid: null
      })
    },
    getDeep: function (dimen) {
      //  获取维度层级 及 每层对应的code
      let _this = this
      let i = 1
      this.codes.push(dimen[0].code)
      if (dimen[0].finalDimension === '1') return
      run(dimen[0].particleList[0])
      function run (dimen) {
        i++
        _this.codes.push(dimen.dimension.code)
        if (dimen.dimension.finalDimension !== '1') {
          run(dimen.dimension.particleList[0])
        }
      }
      return i
    },
    select: function (item, index, pidx) {
      /**
      * @author: wangjun
      * @date: 2019-03-19 09:23:58
      * @desc: 重置this.dimens数组，达到联动效果
      * @params: item: 选择的选项对象；index: 当前item在当前子数组中的索引；pidx: 当前子数组在父数组中的索引
      */
      if (this.disable) return
      //  判断当前层级节点选项是否与之前同层级节点选项互斥
      //  记录选中的节点数据
      this.justifySelectType(item, pidx)
      this.storeChecked(item, pidx)
      if (!item.dimension) {
        //  选择到最后一级节点
        if (item.checked === '0') {
          this.step[pidx] = item.title
          this.steps.push(JSON.parse(JSON.stringify(this.step)))
          this.getSelected()
        }
        //  清除之前的操作信息
        this.last.state = undefined
        this.last.item = null
      } else {
        //  选择该级节点仍然包含子级节点
        //  判断当前操作的节点是否继承于上一次操作
        if (this.last.state !== undefined && pidx <= this.last.state) {
          this.justifySelectStatus(pidx)
        }
        if (this.dimens[pidx + 1]) {
          //  对应层级已有相关对象
          this.dimens[pidx + 1][item.uuid] = item.dimension
          this.parents.splice(pidx + 1, 1, item.uuid)
          this.step.splice(pidx, 1, item.title)
          //  移除对应层级子级以下层级的信息展示，避免干扰正常操作
          let len = this.dimens.length - pidx - 2
          if (len) {
            this.parents.splice(pidx + 2, len)
          }
        } else {
          //  尚未有对应层级的对象
          this.dimens[pidx + 1] = {}
          this.dimens[pidx + 1][item.uuid] = item.dimension
          this.parents.push(item.uuid)
          this.flags.push({
            more: false,
            uuid: null
          })
          this.step.push(item.title)
        }
        //  存储之前操作的信息
        this.recordLast(item, pidx)
      }
      //  更改选中状态
      item.checked = '1'
    },
    getStyle: function (item, index, pidx) {
      //  实时计算每个选项对应的样式
      if (item.checked === '1') {
        return {
          color: `${this.colors[pidx].color}`,
          'background-color': `${this.colors[pidx].back}`,
          border: `1px solid ${this.colors[pidx].bd}`
        }
      }
    },
    storeChecked: function (item, pidx) {
      //  存放选中的选项
      if (item.checked === '1') return
      switch (this.multiple) {
        case true: {
          if (this.checked[pidx]) {
            this.checked[pidx].push(item)
          } else {
            this.checked[pidx] = [item]
          }
          break
        }
        default: {
          if (this.checked[pidx] && this.checked[pidx].length) this.cancelItem(this.checked[pidx][0], 0, pidx)
          this.checked[pidx] = [item]
        }
      }
    },
    recordLast: function (item, pid) {
      //  记录上一次操作的相关信息
      this.last.state = pid
      this.last.item = item
    },
    resetLast: function () {
      //  重置上一次操作信息
      this.last.state = undefined
      this.last.item = null
    },
    justifySelectStatus: function (pidx) {
      // console.log(JSON.parse(JSON.stringify(this.checked)))
      //  判断是否已经选择到最底层，如果最底层没选择而选择其他层级选项，则取消之前操作的选中状态
      this.checked.map((item, idx0) => {
        item.map((sitem, idx1) => {
          if (sitem.dimension) {
            let sons = this.checked[idx0 + 1]
            if (!sons || !sons.length) {
              //  当前选项不是最近一次选择的选项，则取消选中状态
              if (sitem.uuid !== this.last.item.uuid) this.cancel(sitem, pidx)
              return
            }
            let res = false
            sons.some(sitem2 => {
              if (sitem2.uuid.indexOf(sitem.uuid) !== -1) {
                res = true
              }
            })
            // if (!res) sitem.checked = '0'
            // if (!res) this.cancel(sitem, idx0)
            if (!res) this.cancel(sitem, pidx)
          } else {
            this.cancel(sitem, pidx)
          }
        })
      })
      // console.log(JSON.parse(JSON.stringify(this.checked)))
    },
    justifySelectType: function (item, pidx) {
      //  校验选项的类型；全部 和 其他 选项互斥
      let uuid = item.uuid.split('%')
      let flag = uuid.pop() === '-1'
      let uuidPre = uuid.join('%')
      if (flag && this.checked[pidx]) {
        let idxArr = this.checked[pidx].filter(item2 => {
          return item2.uuid.indexOf(uuidPre) !== -1
        })
        while (idxArr.length) {
          this.cancelItem(idxArr.pop(), 0, pidx)
        }
      } else {
        uuidPre += '%-1'
        if (!this.checked[pidx]) return
        this.checked[pidx].map(item2 => {
          if (item2.uuid === uuidPre) {
            this.cancelItem(item2, 0, pidx)
          }
        })
      }
    },
    cancel: function (item, pidx) {
      //  取消一系列相关选项
      let results = this.checked[this.deep - 1]
      //  存储取消的索引对象，（避免边删除边循环造成相互影响）
      if (!results || !results.length) {
        //  如果最后层级没有任何一项选中，则取消之前选项的所有选中状态
        this.checked.map((item1, idx) => item1.map((item2, idx2) => {
          if (idx < pidx) return
          item2.checked = '0'
          item1.splice(idx2, 1)
        }))
      } else {
        //  先根据最后选项，得到它之前每一层级的父节点的UUID前缀
        let uuidPre = []
        for (let i = 1; i < this.deep; i++) {
          uuidPre.push(results.map((item) => {
            let uuidArr = item.uuid.split('%')
            uuidArr.splice(i + 1, this.deep)
            return uuidArr.join('%')
          }))
        }
        //  判断选中项是否包含节点前缀，没有就取消选中状态
        this.checked.map((item1, idx1) => {
          //  保证当前操作不会影响到上级节点的选中状态，只会影响本级及以下层级的节点状态
          if (idx1 < pidx) return
          let arr = uuidPre[idx1]
          if (!arr) return
          item1.map((item2, idx2) => {
            if (arr.indexOf(item2.uuid) === -1) {
              //  重置选中状态
              item2.checked = '0'
              //  将item从checked相关位置移除
              // item1.splice(idx2, 1)
            }
          })
        })
      }
      if (this.checked[0] && this.checked[0].length) this.getSelected()
    },
    cancelItem: function (item, index, pidx) {
      //  取消某个选项
      //  存储取消的索引对象，（避免边删除边循环造成相互影响）
      if (this.disable) return
      let arr = []
      this.checked.map((item1, idx1) => {
        if (idx1 < pidx) return
        item1.map((item2, idx2) => {
          if (item2.uuid.indexOf(item.uuid) !== -1) {
            item2.checked = '0'
            // item1.splice(idx2, 1)
            arr.push({
              p: idx1,
              s: idx2
            })
          }
        })
      })
      //  在取消选择后，再从checked数组中删除对应节点（注意，为了避免前一次删除对后一次删除造成影响，采取倒序删除）
      while (arr.length) {
        let one = arr.pop()
        this.checked[one.p].splice(one.s, 1)
      }
      item.checked = '0'
      //  重置上一次操作选项
      this.resetLast()
      // this.justifySelectStatus()
      this.getSelected()
    },
    canceSelected: function (uuid, idx) {
      //  在已选区域取消已选项
      let arr = this.checked[0]
      if (!arr) return
      arr.map(item => {
        if (item.uuid === uuid) {
          this.showText.splice(idx, 1)
          this.cancelItem(item, 0)
        }
      })
    },
    clearAll: function () {
      //  清空所选
      if (!this.showText || !this.showText.length) return
      let arr = JSON.parse(JSON.stringify(this.showText))
      arr.map((item, idx) => this.canceSelected(item.uuid, idx))
    },
    getSelected: function () {
      if (this.deep > 1) {
        //  如果层级深度大于1
        setTimeout(() => {
          this.getSelectedFun()
        }, 10)
      } else {
        //  层级为1
        let arr = this.checked[0].map(item => {
          return {
            uuid: item.uuid,
            text: item.title,
            index: this.index
          }
        })
        //  抛出相关信息
        this.$emit('callback', [this.index, arr, this.getCheckedJson()])
        this.showText = arr
      }
    },
    getSelectedFun: function () {
      //  获取选中选项的文本信息
      //  先将选中的选项聚合
      //  先将无效数据剔除
      this.removeError()
      /**
      * @author: wangjun
      * @date: 2019-03-21 18:15:43
      * @desc: resultArr 将checked数据转化成以父级uuid为key的对象数组
      */
      let resultArr = []
      for (let i = this.deep - 1; i >= 0; i--) {
        let currentArr = this.checked[i]
        if (!currentArr) break
        let resultObj = {}
        currentArr.map(item => {
          let uuidPre = item.uuid.split('%').splice(0, i + 1).join('%')
          if (resultObj[uuidPre]) {
            resultObj[uuidPre].push({
              uuid: item.uuid,
              title: item.title
            })
          } else {
            resultObj[uuidPre] = [{
              uuid: item.uuid,
              title: item.title
            }]
          }
          resultArr[i] = resultObj
        })
      }
      /**
      * @author: wangjun
      * @date: 2019-03-21 18:17:43
      * @desc: 倒序一步步把选中的文本拼成所需格式
      */
      let textArr = []
      for (let i = this.deep - 1; i >= 0; i--) {
        let currentTextObj = resultArr[i]
        let resultObj = {}
        if (i === this.deep - 1) {
          //  如果是最后一级，则直接将同一父级uuid的节点对象拼成文本数组格式
          for (let key in currentTextObj) {
            let arr = []
            arr = currentTextObj[key].map(item => {
              if (item.title) {
                return item.title
              }
            })
            let str = `[ ${arr.join('， ')} ]`
            resultObj[key] = str
            textArr[i] = resultObj
          }
        } else if (i < this.deep - 1 && i > 0) {
          //  倒序，每一级的uuid的文本都是自身title与子节点拥有相同父级uuid的文本拼接而成
          for (let key in currentTextObj) {
            let arr = []
            arr = currentTextObj[key].map(item => {
              if (textArr[i + 1] && textArr[i + 1][item.uuid]) {
                return `${item.title}： ${textArr[i + 1][item.uuid]}`
              }
            })
            let newArr = removeNull(arr)
            if (newArr && newArr.length) {
              resultObj[key] = `[ ${newArr.join('， ')} ]`
              textArr[i] = resultObj
            }
          }
        } else {
          //  第一层，主要返回展示用，处理成自己需要的格式，过滤掉不需要的数据
          for (let key in currentTextObj) {
            let arr = []
            arr = currentTextObj[key].map(item => {
              if (textArr[i + 1] && textArr[i + 1][item.uuid]) {
                let obj = {
                  uuid: item.uuid,
                  text: `${item.title}： ${textArr[i + 1][item.uuid]}`,
                  index: this.index
                }
                return obj
              } else return null
            })
            let newArr = removeNull(arr)
            textArr[i] = newArr
          }
        }
      }
      //  将第一项文本赋值给展示已选数据
      this.showText = textArr[0]
      //  抛出相关已选信息
      this.$emit('callback', [this.index, textArr[0], this.getCheckedJson()])
      function removeNull (arr) {
        //  去除数组中空的部分
        return arr.filter(item => {
          return item
        })
      }
    },
    getCheckedJson: function () {
      //  获取checkedJson
      let code = Number(this.codes[this.deep - 1])
      if (!this.checked[this.deep - 1]) return
      let list = this.checked[this.deep - 1].map(item => {
        return {
          uuid: item.uuid
        }
      })
      return {
        code: code,
        list: list
      }
    },
    removeError: function () {
      //  获取选中文本前，先过滤一下数据
      let arr = []
      this.checked.map((item1, idx1) => {
        item1.map((item2, idx2) => {
          if (item2.checked === '0') {
            arr.push({
              p: idx1,
              s: idx2
            })
          }
        })
      })
      while (arr.length) {
        //  倒序删除，避免之前删除操作对后来操作产生影响
        let one = arr.pop()
        this.checked[one.p].splice(one.s, 1)
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'cancelCheck': function (newVal, oldVal) {
      //  监听取消选项操作
      if (newVal) {
        if (newVal === 'all') {
          this.clearAll()
        } else this.canceSelected(newVal)
      }
    }
  }
}
</script>

<style scoped>
@import './query.css'
</style>
