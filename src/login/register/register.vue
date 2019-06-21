<template>
  <div>
    <div class="register-header">欢迎您加入！请注册</div>
    <p class="p-login"><a class="a-login" href="#/login">&lt;&lt;返回登陆</a></p>
    <div class="register-body">
      <div class="register-content">
        <p class="p">必填部分</p>
        <div>
          <div class="form-control clearfix">
            <label class="label label-require">用户名</label>
            <input class="input" v-model="form.user_name" name="user_name" type="text" placeholder="请输入用户名" maxlength="16" autocomplete="new-name">
            <span class="tips-error" v-if="error.user_name">{{error.user_name}}</span>
          </div>
          <div class="form-control clearfix">
            <label class="label label-require">密码</label>
            <input class="input" v-model="form.password" name="password" type="password" placeholder="请输入密码" maxlength="16" autocomplete="new-password">
            <span class="tips-error" v-if="error.password">{{error.password}}</span>
          </div>
          <div class="form-control clearfix">
            <label class="label label-require">确认密码</label>
            <input class="input" v-model="form.ensure_password" name="ensure_password" type="password" placeholder="请输入确认密码" maxlength="16" autocomplete="new-password">
            <span class="tips-error" v-if="error.ensure_password">{{error.ensure_password}}</span>
          </div>
        </div>
        <p class="p">
          选填部分
          <span class="register-operate" :title="flag.operate ? '展开' : '收起'" @click="flag.operate = !flag.operate">
            <span v-if="flag.operate">+</span>
            <span v-if="!flag.operate">-</span>
          </span>
        </p>
        <div class="register-unnecessery" :class="{'register-hide': flag.operate}">
          <div class="form-control clearfix" style="margin-bottom:0;">
            <label class="label">定义头像</label>
            <v-upload :upload="avatar"></v-upload>
          </div>
          <div class="form-control clearfix">
            <label class="label">中文名</label>
            <input class="input" v-model="form.nick_name" type="text" placeholder="请输入中文名" maxlength="16" autocomplete="new-name">
          </div>
          <div class="form-control clearfix">
            <label class="label">性别</label>
            <v-radio :radio="gender"></v-radio>
          </div>
          <div class="form-control clearfix">
            <label class="label">出生日期</label>
            <v-time :time="birth"></v-time>
          </div>
          <div class="form-control clearfix">
            <label class="label">电话号码</label>
            <input class="input" v-model="form.phone" type="text" name="phone" placeholder="请输入电话号码" maxlength="16" v-number>
            <span class="tips-error" v-if="error.phone">{{error.phone}}</span>
          </div>
          <div class="form-control clearfix">
            <label class="label">邮箱</label>
            <input class="input" v-model="form.email" type="text" placeholder="请输入邮箱" maxlength="32">
          </div>
          <div class="form-control clearfix">
            <label class="label">所在地</label>
            <input class="input" v-model="form.addr" type="text" placeholder="请输入地址" maxlength="32">
          </div>
          <div class="form-control clearfix">
            <label class="label">个人主页</label>
            <input class="input" v-model="form.personal_page" type="text" placeholder="请输入个人主页url" maxlength="32">
          </div>
        </div>
        <div class="form-control clearfix">
          <button class="btn btn-default btn-medium" @click="register">注册</button>
          <button class="btn btn-gray btn-medium" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validate from './validate'
export default {
  name: 'register',
  data () {
    return {
      //  表单各元素
      form: {

      },
      //  错误信息
      error: {

      },
      //  头像
      avatar: {
        suffix: ['png', 'jpg', 'gif']
      },
      //  生日
      birth: {},
      gender: {
        data: [
          {id: 1, name: '男'},
          {id: 2, name: '女'},
          {id: 0, name: '保密'}
        ],
        selected: 0
      },
      flag: {
        //  展示/隐藏 非必填选项
        operate: true
      }
    }
  },
  methods: {
    init () {
      console.log('register...')
    },
    cancel () {
      location.href = '#/login'
    },
    //  提交注册
    async register () {
      //  验证需要校验的参数是否合法,返回的是未通过验证的字段信息
      this.error = validate.check(this.form, this.error)
      let errorArr = Object.keys(this.error)
      //  验证通过则继续，否则输出报错信息
      if (!errorArr.length) {
        //  收集性别、生日、头像信息
        this.form.gender = this.gender.selected
        this.form.birth = this.birth.selected
        let loadingId = this.$dialog.loading('正在提交表单信息')
        if (this.avatar.file && this.avatar.file[0]) {
          let form = new FormData()
          form.append('file', this.avatar.file[0])
          //  上传头像图片
          await this.$apis.upload.img(form).then(res => {
            if (res.addr) {
              this.form.avatar = res.addr
            }
          })
        }
        let para = JSON.parse(JSON.stringify(this.form))
        //  删除确认密码
        delete para.ensure_password
        //  提交用户注册
        this.$apis.user.register(JSON.stringify(para)).then(res => {
          this.$dialog.close(loadingId)
          this.$dialog.success('用户注册成功！', 2000, () => {
            location.href = '#/login'
          })
          console.log(res)
        })
      } else {
        console.error(this.error)
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.register-header {
  height: 60px;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  background-color: #6699cf;
  color: #fff;
}
.register-body {
  padding: 30px 0;
}
.register-content {
  padding: 30px 50px;
  width: 800px;
  margin: auto;
  box-shadow: 0 0 3px 0 #bbb;
}
.p {
  font-size: 20px;
  font-weight: 600;
  color: #555;
  text-shadow: 4px 2px 2px #bbb;
  border-bottom: 1px dashed #ddd;
  margin-bottom: 40px;
  user-select: none;
}
.form-control {
  padding-left: 200px;
}
.input {
  border: none;
  border-bottom: 1px solid #bbb;
}
.label {
  min-width: 120px;
}
.btn {
  margin-top: 20px;
}
.btn-default {
  margin-left: 100px;
}
.btn-gray {
  margin-left: 30px;
  background-color: #ddd;
}
.p-login {
  height: 30px;
  line-height: 60px;
  margin: auto;
  width: 900px;
  text-align: right;
}
.a-login {
  color: #3896f8;
  font-size: 14px;
  text-decoration: underline;
  margin-left: 20px;
}
.register-operate {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 14px;
  text-align: center;
  border: 1px dashed #3896f8;
  text-shadow: none;
  font-weight: 400;
  color: #3896f8;
  cursor: pointer;
  margin-left: 10px;
}
.register-unnecessery {
  max-height: 1000px;
  transition: max-height .3s;
}
.register-hide {
  max-height: 0;
  overflow: hidden;
}
</style>
