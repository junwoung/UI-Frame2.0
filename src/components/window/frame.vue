<!-- created by wangjun on 2019-06-30 -->
<template>
  <div :id="options.id" class="v-wind">
    <!-- 正常显示弹窗内容 -->
    <div v-show="!minFlag" class="v-window">
      <div class="v-window-modal" v-if="options.modal && modalFlag" @click="closeWindow"></div>
      <div class="v-window-container" :style="options.style">
        <!-- 标题部分 -->
        <div class="v-window-header">
          <span class="v-window-title" :title="options.title">{{options.title}}</span>
          <div class="v-window-functions">
            <em title="最小化" @click="minWindow">-</em>
            <em title="关闭" @click="closeWindow">x</em>
          </div>
        </div>
        <!-- 嵌入内容部分 -->
        <div class="v-window-content"></div>
      </div>
    </div>
    <!-- 弹窗内容最小化显示 -->
    <div class="v-window-min" v-show="minFlag">
      <span :title="options.title">{{options.title}}</span>
      <div class="v-window-functions">
        <em title="最大化" @click="maxWindow">+</em>
        <em title="关闭" @click="closeWindow" style="margin-left: 0px;">x</em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      modalFlag: false,
      minFlag: false
    }
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    init: function () {
      this.modalFlag = true
      this.getContent()
    },
    getContent () {
      setTimeout(() => {
        // let propsData = JSON.parse(JSON.stringify(this.options.content.data))
        let propsData = this.options.content.data
        this.options.content.ensure && (propsData['ensure'] = this.options.content.ensure)
        console.log(propsData)
        let Conctructor = this.options.content.content
        let instance = new Conctructor({
          parent: this.options.content.parent,
          propsData: propsData,
          ok: this.options.content.ensure
        })
        instance.vm = instance.$mount()
        document.querySelector(`#${this.options.id} .v-window-content`).appendChild(instance.vm.$el)
        this.calculateHeight()
      }, 10)
    },
    hideModal () {
      this.modalFlag = false
    },
    //  最小化窗口
    minWindow () {
      this.modalFlag = false
      this.minFlag = true
    },
    //  最大化窗口
    maxWindow () {
      this.minFlag = false
      this.modalFlag = true
    },
    //  关闭窗口
    closeWindow () {
      const close = () => {
        this.modalFlag = false
        let dom = document.querySelector(`#${this.options.id}`)
        if (dom) {
          dom.parentElement.removeChild(dom)
        }
      }
      let cancel = this.options.content.cancel
      if (Object.prototype.toString.call(cancel) === '[object Function]') {
        let newCancel = cancel()
        newCancel.call(this, close)
      } else {
        close()
      }
    },
    //  计算内容显示高度
    calculateHeight () {
      //  注意减去标题部分高度,最大不超过浏览器视口高度的90%
      let height = (window.innerHeight - 50) * 0.9
      let dom = document.querySelector(`#${this.options.id} .v-window-content`)
      if (dom) {
        dom.style['max-height'] = height + 'px'
        dom.style = `max-height:${height}px;overflow-y:scroll;`
      }
    }
  },
  mounted () {
    console.log(this.options)
    this.init()
  },
  watch: {
    'modalFlag': function (val) {
      if (val && !this.options.scroll) {
        document.body.style = 'overflow:hidden;'
      } else {
        document.body.style = ''
      }
    }
  }
}
</script>

<style scoped>
.v-window {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
}
.v-window-modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 10;
}
.v-window-container {
  position: absolute;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, .3);
  /* overflow: hidden; */
  z-index: 20;
  animation: down 0.3s;
}
.v-window-header {
  background-color: #f0f0f0;
  height: 50px;
  line-height: 50px;
  user-select: none;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.v-window-title {
  display: inline-block;
  margin-left: 20px;
  font-size: 16px;
  color: #444;
  max-width: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.v-window-functions {
  float: right;
  margin-right: 10px;
  font-size: 20px;
  color: #999;
}
.v-window-functions > em {
  cursor: pointer;
  margin-left: 10px;
}
.v-window-functions > em:hover {
  color: #333;
}
.v-window-content {
  box-sizing: border-box;
  padding: 20px;
}
.v-window-min {
  position: fixed;
  height: 42px;
  width: 250px;
  border-radius: 2px;
  line-height: 42px;
  background-color: #fff;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, .3);
  bottom: 10px;
  left: 10px;
  color: #555;
  font-size: 14px;
  user-select: none;
  z-index: 10000;
  animation: up 0.3s;
}
.v-window-min > span {
  display: inline-block;
  margin-left: 10px;
  max-width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
@keyframes down {
  from {
    margin-top: -50px;
    opacity: 0;
  }
  to {
    margin-top: 0;
    opacity: 1;
  }
}
@keyframes up {
  from {
    margin-bottom: -100px;
    opacity: 0;
  }
  to {
    margin-bottom: 0;
    opacity: 1;
  }
}
</style>
