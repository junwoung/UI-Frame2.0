<!-- created by wangjun on 2019-03-04 -->
<template>
  <div>
    <div class="frame-contain">
      <!-- 头部 -->
      <div class="frame-header">
        <div class="frame-title">
          <img src="./imgs/logo.png">
          <span>组件框架2.0</span>
          <div class="frame-user">
            <img class="frame-avatar" :src="avatar">
            <span>{{name}}</span>
            <a href="#/login" @click="clearAll">退出</a>
          </div>
        </div>
      </div>
      <div class="frame-body">
        <!-- 导航栏 -->
        <ul class="frame-nav">
          <li class="frame-nav-parent"
              v-for="(item,index) in nav"
              :key="index">
            <a @click="setFlag(index)"
               :href="(item.son && item.son.length) ? null:('#/' + item.parent)"
               :class="{triangle:item.son && item.son.length,'triangle-select':flag[index],'frame-nav-active': isActive(item.parent)}">{{item.name}}</a>
            <ul v-if='item.son && item.son.length'
                v-show='flag[index]'>
              <li class="frame-nav-son"
                  v-for='(son,idx) in item.son' :key="idx">
                <a :href="'#/' + son.url"
                   :class="{'frame-nav-active': isActive(son.url,index)}">{{son.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- 面包屑 -->
        <p class="frame-crumb"><a :href="crumb.url ? '#/' + crumb.url : null"
             :class="{'crumb-hover': crumb.url}"
             v-for="(crumb,index) in currentCrumb" :key="index">{{crumb.name + (index === currentCrumb.length-1 ? '':' > ')}} </a></p>
        <!-- 各路由展示内容 -->
        <div class="frame-content" :style="setHeight()">
          <router-view />
        </div>
        <!-- 页脚 -->
        <div class="frame-footer">
          <p>&copy;copyright wangjun 2019</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
//  引入配置的相关资源
import navConfig from './navConfig.js'
export default {
  name: 'frame',
  data () {
    return {
      name: '未登录',
      defaultAvatar: './imgs/user.png',
      nav: null,
      map: null,
      crumbs: null,
      flag: [],
      isUpdate: false,
      currentCrumb: null
    }
  },
  computed: {
    // name () {
    //   console.log(this.$store.state)
    //   return this.$store.state.nickname || '未登录'
    // }
    avatar () {
      //  获取用户头像
      if (sessionStorage.USERAVATAR) return this.$store.state.config.pic_server + sessionStorage.USERAVATAR
      return this.defaultAvatar
    }
  },
  methods: {
    init: function () {
      //  初始化相关数据
      this.name = sessionStorage.NICKNAME
      this.nav = navConfig.list
      this.map = navConfig.activeMap
      this.crumbs = navConfig.crumbs
      this.getCrumb()
    },
    getCrumb: function () {
      //  获取当前页的面包屑
      let url = this.$route
      let hash = url.path.substr(1, url.path.length - 1)
      this.currentCrumb = this.crumbs[hash]
    },
    setFlag: function (idx) {
      //  显示/隐藏 导航列表子项
      let value = this.flag[idx]
      Vue.set(this.flag, idx, !value)
    },
    isActive: function (url, index = undefined) {
      //  判断当前hash是否为当前激活页hash
      let hash = dealHash()
      if (hash === '#/' + url) {
        if (index !== undefined && !this.isUpdate) {
          this.isUpdate = true
          Vue.set(this.flag, index, true)
        }
        return true
      }
      //  如果当前hash不在导航列表则去配置的映射关系表去查找
      return this.activeMap(hash, url, index)
      function dealHash () {
        //  处理hash不纯净的状况：1、携带参数?id=1；2、携带参数/1
        let pureHash = location.hash
        pureHash && (pureHash = pureHash.split('?')[0])
        /**
        * @author: wangjun
        * @date: 2019-05-16 20:48:40
        * @desc: 专门处理`#/detail/1`情形
        * @desc: 路由控制配合修改，需同时设置`/detail`和`/detail/:id`指向同一个组件。当然：如果只做详情展示只需设置后者
        */
        pureHash = pureHash.replace(/\/\d+$/g, '')
        return pureHash
      }
    },
    activeMap: function (hash, url, index) {
      /**
      * @author: wangjun
      * @date: 2019-03-05 17:17:17
      * @desc: 如果当前页面hash不在导航栏，则根据映射规则激活相应导航选项
      */
      hash = hash.substr(2, hash.length - 2)
      let mapping = this.map[hash]
      if (mapping === url) {
        if (index !== undefined && !this.isUpdate) {
          this.isUpdate = true
          Vue.set(this.flag, index, true)
        }
        return true
      }
    },
    clearAll: function () {
      sessionStorage.clear()
    },
    //  根据浏览器视口高度，计算页面高度，使其至少能够填充整个视口
    setHeight () {
      let height = window.innerHeight
      //  减去头部、脚部、面包屑的高度，得到content的高度
      return {'min-height': height - 60 - 40 - 50 + 'px'}
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$route': function (to, from) {
      this.getCrumb()
    }
  }
}
</script>

<style scoped>
.frame-contain {
  font-size: 14px;
  min-width: 1200px;
  background-color: #edf0f5;
}
.frame-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #3896f8;
  color: #fff;
}
.frame-title {
  margin-left: 50px;
}
.frame-title img {
  position: relative;
  top: 10px;
}
.frame-title > span {
  font-size: 20px;
  font-weight: bolder;
  margin-left: 10px;
}
.frame-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.frame-user {
  float: right;
  margin-right: 20px;
  user-select: none;
}
.frame-user > span {
  position: relative;
  bottom: 4px;
  padding: 0 20px;
  border-right: 2px solid #fff;
}
.frame-user > a {
  position: relative;
  bottom: 4px;
  padding: 0 20px;
  color: #fff;
  cursor: pointer;
}
.frame-body {
  position: relative;
  /* min-height: 878px; */
  font-size: 16px;
}
.frame-nav {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  box-sizing: border-box;
  background-color: #222d43;
  padding-top: 30px;
  user-select: none;
}
.frame-nav li {
  cursor: pointer;
}
.frame-nav-parent a {
  position: relative;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  text-indent: 30px;
  width: 100%;
  height: 100%;
  color: rgb(108, 125, 163);
  border-left: 4px solid #222d43;
  box-sizing: border-box;
}
.frame-nav-son a {
  position: relative;
  display: inline-block;
  height: 40px;
  color: #fff;
  font-size: 14px;
  text-indent: 50px;
  border-left: 4px solid #222d43;
}
.frame-nav-active {
  border-left: 4px solid #3896f8 !important;
  background-color: #162035;
  color: #fff!important;
}
.frame-crumb {
  margin-left: 220px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.frame-crumb a {
  color: #999;
}
.crumb-hover:hover {
  color: #3896f8;
}
.frame-content {
  position: relative;
  margin-left: 220px;
  margin-right: 20px;
  /* min-height: 788px; */
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  padding: 20px;
}
.frame-footer {
  margin-left: 220px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #bbb;
  font-size: 14px;
}
</style>
