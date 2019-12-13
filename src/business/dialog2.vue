<!-- created by wangjun on 2019-12-02 -->
<template>
  <div>
    <v-row>
      <button @click="confirm" class="btn btn-default">confirm</button>
      <button @click="confirm0" class="btn btn-default">confirm（无模态事件）</button>
      <button @click="confirm1" class="btn btn-default">confirm（无关闭按钮）</button>
      <button @click="confirm2" class="btn btn-default">confirm（无确认按钮）</button>
      <button @click="confirm3" class="btn btn-default">confirm（无取消按钮）</button>
      <button @click="confirm4" class="btn btn-default">confirm（无按钮）</button>
    </v-row>
    <v-row>
      <button @click="tipError" class="btn btn-default">error</button>
      <button @click="tipSuccess" class="btn btn-default">success</button>
      <button @click="tipSuccess2" class="btn btn-default">success（3s后关闭）</button>
      <button @click="tipMsg" class="btn btn-default">msg</button>
      <button @click="tipMsg2" class="btn btn-default">msg（5s后关闭）</button>
    </v-row>
    <v-row>
      <button @click="loading" class="btn btn-default">loading（不会关闭）</button>
      <button @click="loading2" class="btn btn-default">loading（通过程序关闭）</button>
    </v-row>
    <v-row>
      <button @click="prompt" class="btn btn-default">prompt（输入框）</button>
      <button @click="prompt2" class="btn btn-default">prompt（输入域）</button>
    </v-row>
    <v-row>
      <button @click="close" class="btn btn-default">close</button>
      <button @click="closeType" class="btn btn-default">closeType</button>
      <button @click="closeAll" class="btn btn-default">closeAll</button>
    </v-row>
  </div>
</template>

<script>
import Dialog from '@/components/vDialog/dialog.js'
export default {
  name: '',
  data () {
    return {
      msg: 'hello',
      id: ''
    }
  },
  methods: {
    init: function () {

    },
    confirm () {
      let id = Dialog.confirm({
        title: '常规的确认弹窗',
        msg: 'hello, 这是一个常规的确认弹窗。',
        modal: true,
        modalFn: this.getMsg,
        preventClose: true,
        closeFn: () => {
          console.log('点击close关闭')
        },
        ensureFn: () => {
          this.setMsg()
          this.getMsg()
          Dialog.close(id)
        },
        cancelFn: () => {
          console.log('您已取消')
          Dialog.close(id)
        }
      })
    },
    confirm0 () {
      Dialog.confirm({
        msg: '这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。这是一个无法通过模态点击关闭的弹窗。',
        modal: true,
        modalFn: false,
        // modalScroll: false
        // closeFn: () => {
        //   console.log('点击close关闭')
        // },
        ensureFn: () => {
          this.setMsg()
          this.getMsg()
        },
        cancelFn: () => {
          console.log('您已取消')
        }
      })
    },
    confirm1 () {
      Dialog.confirm({
        msg: 'This dialog is not has "close" button.',
        title: 'hello world',
        ensure: 'ensure',
        cancel: 'cancel',
        modal: true,
        // modalFn: false,
        modalFn: this.getMsg,
        // modalScroll: false
        closeFn: false,
        ensureFn: () => {
          this.setMsg()
          this.getMsg()
        }
        // cancelFn: () => {
        //   console.log('您已取消')
        // }
      })
    },
    confirm2 () {
      Dialog.confirm({
        msg: '这个弹窗没有确定按钮。',
        modal: true,
        // modalFn: false,
        modalFn: this.getMsg,
        // modalScroll: false
        closeFn: () => {
          console.log('点击close关闭')
        },
        ensureFn: false,
        cancelFn: () => {
          console.log('您已取消')
        }
      })
    },
    confirm3 () {
      Dialog.confirm({
        msg: '这个弹窗没有取消按钮。',
        modal: true,
        // modalFn: false,
        modalFn: this.getMsg,
        // modalScroll: false
        closeFn: () => {
          console.log('点击close关闭')
        },
        ensureFn: () => {
          this.setMsg()
          this.getMsg()
        },
        cancelFn: false
      })
    },
    confirm4 () {
      Dialog.confirm({
        msg: '这个弹窗没有按钮组。',
        modal: true,
        // modalFn: false,
        modalFn: this.getMsg,
        // modalScroll: false
        closeFn: () => {
          console.log('点击close关闭')
        },
        ensureFn: false,
        cancelFn: false
      })
    },
    tipError () {
      Dialog.error('这是一个错误提醒的弹窗。', false, () => {
        console.log('error tip')
      })
    },
    tipSuccess () {
      Dialog.success('这是一个成功提醒的弹窗。', false, () => {
        console.log('success tip')
      })
    },
    tipSuccess2 () {
      Dialog.success('点击我或者3s后自动消失')
    },
    tipMsg () {
      this.id = Dialog.msg('这是一个普通提醒的弹窗。这是一个普通提醒的弹窗。', false, () => {
        console.log('normal tip')
      })
    },
    tipMsg2 () {
      Dialog.msg('点击我或者5s后消失', 5000, () => {
        console.log('normal tip')
      })
    },
    loading () {
      Dialog.loading()
    },
    loading2 () {
      let id = Dialog.loading('正在提交表单数据，5s后程序触发关闭...')
      setTimeout(() => {
        Dialog.close(id)
      }, 5000)
    },
    prompt () {
      Dialog.prompt({
        title: '',
        val: this.msg,
        type: '',
        modalFn: false,
        closeFn: false,
        ensureFn: (val) => {
          Dialog.msg('您输入的值是：' + val)
        }
      })
    },
    prompt2 () {
      let id = Dialog.prompt({
        title: '',
        val: '这是一个初始化值',
        type: 'textarea',
        modalFn: false,
        closeFn: false,
        preventClose: true,
        ensureFn: (val) => {
          if (val.length < 10) {
            Dialog.error('输入的值长度不能小于10！')
          } else {
            Dialog.msg(val)
            Dialog.close(id)
          }
        },
        cancelFn: () => {
          Dialog.confirm({
            msg: '确认取消输入？',
            ensureFn: () => {
              Dialog.close(id)
              Dialog.success('已关闭')
            }
          })
        }
      })
    },
    close () {
      this.tipMsg()
      setTimeout(() => {
        Dialog.close(this.id)
      }, 3000)
    },
    closeType () {
      this.tipSuccess()
      this.tipError()
      setTimeout(() => {
        Dialog.closeType('success')
        Dialog.closeType('error')
      }, 2000)
    },
    closeAll () {
      this.tipSuccess()
      this.tipError()
      this.tipMsg()
      this.loading()
      this.confirm()
      setTimeout(() => {
        Dialog.closeAll()
      }, 3000)
    },
    getMsg () {
      console.log(this.msg)
    },
    setMsg () {
      this.msg = 'set msg'
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
