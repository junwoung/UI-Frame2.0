<!-- created by wangjun on 2019-03-26 -->
<template>
  <div>
    <div>
      <button class="btn btn-small btn-default" @click="openAlert">alert</button>
      <button class="btn btn-small btn-default" @click="openConfirm">confirm</button>
      <button class="btn btn-small btn-default" @click="openLoading">loading</button>
      <button class="btn btn-small btn-default" @click="openSuccess">success</button>
      <button class="btn btn-small btn-default" @click="openError">error</button>
      <button class="btn btn-small btn-default" @click="openMsg">msg</button>
      <button class="btn btn-small btn-default" @click="openPrompt">prompt</button>
      <button class="btn btn-small btn-default" @click="openProgress">progress</button>
      <button class="btn btn-small btn-default" @click="open">$open</button>
    </div>
    <div class="form-control clearfix" style="margin: 20px 0;">
      <label class="label">使用</label>
      <textarea class="textarea" style="width:500px;height:80px;" disabled>this.$dialog[type] 或者 this.$dialog.open(object)</textarea>
    </div>
    <div class="form-control clearfix">
      <label class="label">使用说明</label>
      <div>
        参数均为非必填，填入相应参数能够产生更好的交互<br>
        所有打开的弹窗均会返回一个唯一id，可以通过id关闭指定弹窗
      </div>
    </div>
    <table class="table">
      <caption>弹窗类型及使用</caption>
      <thead class="thead">
        <tr>
          <th style="width: 15%;">弹窗类型</th>
          <th style="width: 25%;">调用</th>
          <th style="width: 60%;">参数解析</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="(item,index) in tbody" :key="index">
          <td>{{item.type}}</td>
          <td>{{item.use}}</td>
          <td>{{item.desc}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table">
      <caption>this.$dialog对象其他方法</caption>
      <thead class="thead">
        <tr>
          <th style="width: 15%;">方法调用</th>
          <th style="width: 25%;">说明</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="(item,index) in tbody2" :key="index">
          <td>{{item.use}}</td>
          <td>{{item.desc}}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-small btn-default" @click="open">$open</button>
  </div>
</template>

<script>
import theader from './config/table.js'
import temp from './dialogs/test.vue'
export default {
  name: '',
  data () {
    return {
      msg: 'alert ok!',
      theader: theader,
      tbody: [],
      tbody2: [],
      openForm: {
        form: {
          name: 'wangjun8',
          phone: '15013890200'
        },
        time: {
          style: {
            'border': '1px solid #bbb',
            'border-radius': '2px',
            'height': '36px'
          },
          selected: 1,
          max: 10,
          min: -2
        }
      },
      id: null
    }
  },
  components: {
    'base-form': temp
  },
  methods: {
    init: function () {
      this.generateBody()
    },
    open: function () {
      this.id = this.$window.open({
        //  弹窗打开的具体内容
        content: {
          //  模板文件
          content: temp,
          //  父作用域
          parent: this,
          //  传入的数据
          data: this.openForm,
          cancel: () => {
            console.log('hhhh')
            return this.$dialog.confirm.bind(this, '确认要关闭弹窗吗？')
          }
        },
        //  设置弹窗标题
        title: '请填写表单',
        // title: null,
        //  设置弹窗基本样式
        style: {
          // 'height': '400px',
          'width': '600px',
          // 'background-color': '#efefef',
          'font-size': '14px'
        },
        //  modal是否显示
        modal: false,
        //  打开弹窗是否允许父级页面滑动
        scroll: true
      })
    },
    openAlert: function () {
      this.openForm.form.name = 'wj9876'
      this.$dialog.alert('该选项已不存在，请知悉！', () => {
        console.log(this.msg)
        console.log(this.openForm)
      })
    },
    openConfirm: function () {
      this.$dialog.confirm('你确定要删除这个元素吗？删除之后无法找回，请三思', () => {
        console.log('confirm ok')
      }, () => {
        console.log('confirm cancel')
      }, false)
    },
    openLoading: function () {
      this.$dialog.loading('loading...', true, () => {
        console.log('loading over')
      })
    },
    openSuccess: function () {
      this.$dialog.success('该选项已不存在，请知悉！', 4000, () => {
        console.log('success')
      })
    },
    openError: function () {
      this.$dialog.error('该选项已不存在，请知悉！该选项已不存在，请知悉！', 8000, () => {
        console.log('error')
      })
    },
    openMsg: function () {
      this.$dialog.msg('该选项已不存在，请知悉！', 2000, () => {
        console.log('msg')
      })
    },
    openPrompt: function () {
      this.$dialog.prompt('请输入姓名:', 'wj', (val) => {
        console.log(val)
      }, () => {
        console.log('prompt cancel')
      })
    },
    openProgress: function () {
      let id = this.$dialog.progress('当前上传进度', 0, 2, () => {
        console.log('progress over')
      })
      console.log(id)
      // setTimeout(() => {
      //   this.$dialog.changeProgress(id, 192, 12)
      //   this.$dialog.closeAll()
      // }, 1000)
      // this.$dialog.open({
      //   type: 'progress',
      //   msg: 'open打开的',
      //   val: 'hhhhhaaaaa',
      //   time: 4000,
      //   close: true,
      //   total: 29,
      //   current: 17,
      //   callback: () => {
      //     console.log('open dakai de ')
      //   },
      //   ensure: () => {
      //     console.log('open ensure pressed')
      //   },
      //   cancel: () => {
      //     console.log('open cancel pressed')
      //   }
      // })
    },
    generateBody: function () {
      this.tbody = [
        {
          type: 'alert(警告)',
          use: 'this.$dialog.alert(msg, ensure, close)',
          desc: 'msg(String)：提示信息；ensure(Function)：确认按钮触发的回调函数；close(Boolean)：是否支持点击模态关闭'
        },
        {
          type: 'confirm(确认)',
          use: 'this.$dialog.confirm(msg, ensure, cancel, close)',
          desc: 'msg(String)：提示信息；ensure(Function)：确认按钮触发的回调函数；cancel(Function)：取消按钮触发回调；close(Boolean)：是否支持点击模态关闭'
        },
        {
          type: 'loading(加载)',
          use: 'this.$dialog.loading(msg, close, callback)',
          desc: 'msg(String)：提示信息；close(Boolean)：是否支持点击模态关闭；callback(Function)：关闭loading触发的回调函数'
        },
        {
          type: 'success(成功)',
          use: 'this.$dialog.success(msg, time, callback)',
          desc: 'msg(String)：提示信息；time(Number)：一定时间后关闭提示框，单位ms，默认3000；callback(Function)：关闭触发的回调函数'
        },
        {
          type: 'error(失败)',
          use: 'this.$dialog.error(msg, time, callback)',
          desc: 'msg(String)：提示信息；time(Number)：一定时间后关闭提示框，单位ms，默认3000；callback(Function)：关闭触发的回调函数'
        },
        {
          type: 'msg(普通提示)',
          use: 'this.$dialog.msg(msg, time, callback)',
          desc: 'msg(String)：提示信息；time(Number)：一定时间后关闭提示框，单位ms，默认3000；callback(Function)：关闭触发的回调函数'
        },
        {
          type: 'prompt(输入框)',
          use: 'this.$dialog.prompt(msg, val, ensure, cancel)',
          desc: 'msg(String)：提示信息；val(String)：初始化文本框参数；ensure(Function)：确认按钮触发的回调函数；cancel(Function)：取消按钮触发的回调函数'
        },
        {
          type: 'progress(进度条)',
          use: 'this.$dialog.progress(msg, total, current, close, callback)',
          desc: 'msg(String)：提示信息；total([Number | false])：总进度，当为具体值的时候表明可以获取到相应的进度事件，当值为false、null、undefined、0、""等表示否定意思的值，表示不能准确获取进度事件，系统会自动模拟进度事件，一定时间后会关闭进度事件并触发回调；current(Number)：当前上传进度；close(Boolean)：是否支持点击模态关闭；callback(Function)：关闭触发回调'
        }
      ]
      this.tbody2 = [
        {
          use: 'this.$dialog.open(object)',
          desc: "通过open方法打开指定弹窗，object是参数对象，必须包含type（合法参数包含上表弹窗类型）属性，可以包含以上表格方法调用中出现的参数，使用到什么就传什么。例：this.$dialog.open({type: 'progress',msg: 'open打开的',val: 'hhhhhaaaaa',time: 4000,close: true,total: 29,current: 17,callback: () => {console.log('open dakai de ')},ensure: () => {console.log('open ensure pressed')},cancel: () => {console.log('open cancel pressed')}})"
        },
        {
          use: 'this.$dialog.close(id)',
          desc: '所有打开的弹窗均会返回一个唯一id，可以通过close id关闭指定弹窗，不会触发任何回调'
        },
        {
          use: 'this.$dialog.closeAll()',
          desc: '关闭所有打开的弹窗，不会触发任何回调'
        },
        {
          use: 'this.$dialog.changeProgress(id, total, current, callback)',
          desc: '改变进度条进度，id为进度条唯一id，total：总进度；current：当前进度；callback：回调函数'
        }
      ]
    }
  },
  mounted () {
    this.init()
    this.$EventBus.$on(`testFormOk`, (obj) => {
      console.log(obj)
      console.log(this.openForm)
      this.$window.close(this.id)
    })
  }
}
</script>

<style scoped>

</style>
