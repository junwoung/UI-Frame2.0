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
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      msg: 'alert ok!'
    }
  },
  methods: {
    init: function () {

    },
    openAlert: function () {
      this.$dialog.alert('该选项已不存在，请知悉！', () => {
        console.log(this.msg)
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
      this.$dialog.success('该选项已不存在，请知悉！')
    },
    openError: function () {
      this.$dialog.error('该选项已不存在，请知悉！')
    },
    openMsg: function () {
      this.$dialog.msg('该选项已不存在，请知悉！')
    },
    openPrompt: function () {
      this.$dialog.prompt()
    },
    openProgress: function () {
      this.$dialog.progress()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
