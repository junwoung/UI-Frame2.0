<template>
  <div>
    <div class="div-bg-img">
        <img class="background-img" src="./bg.jpeg">
        <div class="div-login">
          <div class="div-login-item" style="text-align: center;color: #bbb;">
            <span>请登录</span>
          </div>
          <div class="div-login-item">
            <label for="username">用户名</label>
            <input type="text" id="username" name="username" maxlength="16" placeholder="username">
            <span class="tip"></span>
          </div>
          <div class="div-login-item">
            <label for="pwd">密码</label>
            <input type="password" id="pwd" name="pwd" maxlength="16" placeholder="password">
            <span class="tip"></span>
          </div>
          <p class="p-error-tip">账户名或密码错误</p>
          <div class="div-login-item">
            <span class="no-content"></span>
            <button id="submit" class="btn-login">Login</button>
          </div>
          <div>
            <a href="#/register" class="a a-register">用户注册>></a>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {

    }
  },
  methods: {
    init: function () {
      let url = '/user/login/login'
      //  控制请求不被多次提交
      let timer = null
      // let _this = this
      // console.log(_this)
      document.querySelector('#submit').onclick = function () {
        if (timer) return
        let doms = {
          name: document.querySelector('#username'),
          pwd: document.querySelector('#pwd')
        }
        let para = {
          username: doms.name.value,
          password: doms.pwd.value
        }
        let flag = false
        for (let key in doms) {
          let tip = doms[key].nextElementSibling
          if (!doms[key].value) {
            flag = true
            tip.innerText = '必填'
            tip.className = 'tip tip-error'
            //  给未输入的输入框添加抖动效果
            doms[key].style = 'animation: tremble .3s'
            setTimeout(() => {
              doms[key].style = ''
            }, 300)
          } else {
            tip.innerText = ''
            tip.className = 'tip'
          }
        }
        if (flag) return
        send(url, JSON.stringify(para))
        let e = event || window.event
        let errorTip = document.querySelector('.p-error-tip')
        //  改变按钮样式和状态，提醒用户请求已发送
        e.target.style = 'background-color: #999;cursor: not-allowed;'
        e.target.innerText = 'Sending...'
        //  发送ajax
        function send (url, para) {
          let xml = new XMLHttpRequest()
          xml.onreadystatechange = function () {
            if (xml.readyState === 4) {
              if (xml.status === 200) {
                //  当次请求已经完成，将页面元素状态恢复成请求未发送状态
                timer = false
                e.target.innerText = 'Login'
                e.target.style = ''
                let res = JSON.parse(xml.responseText)
                if (res.code === 0) {
                  //  登陆成功
                  e.target.innerText = 'Success'
                  errorTip.style = ''
                  //  将登陆信息写入会话缓存
                  // _this.$store.commit({
                  //   type: 'setName',
                  //   username: res.data.user_name,
                  //   nickname: res.data.nick_name,
                  //   usertype: res.data.type
                  // })
                  sessionStorage.USERNAME = res.data.user_name
                  sessionStorage.NICKNAME = res.data.nick_name
                  sessionStorage.USERTYPE = res.data.type
                  sessionStorage.USERAVATAR = res.data.avatar
                  location.href = '#/index'
                } else {
                  //  登陆失败
                  errorTip.innerText = res.msg
                  errorTip.style = 'display:block;'
                }
              }
            }
          }
          xml.onerror = function () {
            timer = false
            e.target.innerText = 'Login'
          }
          xml.open('post', url)
          xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          xml.send(para)
          timer = true
        }
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.div-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
.background-img {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  filter: blur(8px);
  z-index: 9;
}
.div-login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 450px;
  height: 300px;
  margin: auto;
  padding: 30px;
  border-radius: 3px;
  /* box-shadow: 0 0 5px 0 #000000; */
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.div-login-item {
  margin-bottom: 30px;
  font-size: 26px;
}
.div-login-item label {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: right;
  font-size: 18px;
  color: #bbb;
  margin-right: 10px;
  letter-spacing: 3px;
}
.div-login-item label::after {
  content: ':';
  position: relative;
  left: 3px;
}
.no-content {
  display: inline-block;
  width: 110px;
}
.div-login-item input {
  position: relative;
  width: 250px;
  height: 50px;
  outline: none;
  padding: 0 10px;
  background-color: transparent;
  border: none;
  box-shadow: 0 0 5px 0 #999;
  border-radius: 3px;
  font-size: 18px;
  color: #bbb;
}
.btn-login {
  outline: none;
  width: 270px;
  height: 50px;
  font-size: 20px;
  background-color: #ccc;
  color: #666;
  border-radius: 3px;
  cursor: pointer;
}
.btn-login:hover {
  background-color: #fff;
}
.tip {
  font-size: 14px;
  margin-left: 10px;
}
.tip-success {
  color: green;
}
.tip-error,.p-error-tip {
  color: #ee4000;
}
.a-register {
  position: relative;
  left: 120px;
  top: -30px;
  cursor: pointer;
}
.a-register:hover {
  text-decoration: underline;
}
.p-error-tip {
  padding-left: 120px;
  font-size: 14px;
  margin: 0;
  height: 30px;
  display: none;
}
@keyframes tremble {
  0% {right: 5px;}
  10% {right: 0;}
  20% {right: -5px;}
  30% {right: 0;}
  40% {right: 5px;}
  50% {right: 0;}
  60% {right: -5px;}
  70% {right: 0;}
  80% {right: 5px;}
  90% {right: 0;}
  100% {right: -5px;}
}
</style>
