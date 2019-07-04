<!-- created by wangjun on 2019-07-02 -->
<template lang="html">
  <div v-if='form'>
    <div class="form-control">
      <label class="label label-require">姓名</label>
      <input class='input' type="text" v-model='form.name'>
    </div>
    <div class="form-control">
      <label class="label label-require">电话</label>
      <input class='input' type="text" v-model='form.phone'>
    </div>
    <div class="form-control">
      <label class="label label-require">时间</label>
      <v-time :time='time'></v-time>
    </div>
    <div class="form-control">
      <button class="btn btn-small btn-default" @click='ok'>确定</button>
      <button class="btn btn-small btn-minor" @click='cancel'>取消</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //  这边定义传入的变量
    //  表单id
    windowId: {
      type: String,
      default: null
    },
    form: {
      type: Object,
      default: () => {}
    },
    time: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ok () {
      if (this.form.name === '') return this.$dialog.msg('姓名不可为空')
      this.$EventBus.$emit('testFormOk', {
        form: this.form,
        time: this.time.selected
      })
    },
    cancel () {
      this.$window.close(this.windowId)
    }
  },
  mounted () {
    console.log(this.time)
  }
}
</script>

<style scoped>
.form-control {
  margin-bottom: 20px;
}
</style>
