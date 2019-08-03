<!--
created by wangjun on 2019-07-30
用于处理图片、可解析视频、其他格式文件
-->
<template>
  <div class="v-upl-file">
    <div class="v-upl-file-wrap" v-if="flag === 'image'">
      <img class="v-upl-file-img" :src="file.src">
    </div>
    <div class="v-upl-file-wrap" v-else-if="flag === 'video'">
      <video class="v-upl-file-video">
        <source :src="file.src">
      </video>
      <div class="v-upl-video-play"></div>
    </div>
    <div class="v-upl-file-wrap" v-else>
      <img class="v-upl-file-img" :src="getDefaultIcon">
    </div>
    <!-- 替换、删除模态 -->
    <div class="v-upload-img-modal">
      <em @click="seeInitPic(file.src)" title="查看" class="v-upload-icon-see"></em>
      <em @click="downloadPic(file.src, file.name)" title="下载" class="v-upload-icon-download">
        <!-- <a :href="file.src" download='_target' style="display:inline-block;width:100%;height:100%;"></a> -->
      </em>
      <em v-if="!disable" @click="replacePic" title="替换" class="v-upload-icon-replace"></em>
      <em v-if="!disable" @click="deletePic" title="删除" class="v-upload-icon-delete"></em>
    </div>
    <div @click="hideInitPic" class="v-upload-show-init" v-show="flags.showInit">
      <img v-if="flag === 'image'" ref="initPic" title="点击关闭" class="v-upload-init" :src="flags.showInit">
      <video v-if="flag === 'video'" :src="flags.showInit" controls autoplay></video>
      <span ref="initSize" class="v-upload-init-size">{{getInitSize()}}</span>
    </div>
  </div>
</template>

<script>
// import './download.js'
export default {
  name: '',
  data () {
    return {
      flag: '',
      flags: {
        //  是否显示大图
        showInit: false
      }
    }
  },
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    index: [Number],
    disable: [Boolean]
  },
  computed: {
    getDefaultIcon: {
      get: function () {
        return require('./icons/file2.png')
      }
    },
    //  计算原图片的物理尺寸大小
    getInitSize () {
      return () => {
        /* eslint-disable */
        setTimeout(() => {
          let pic = this.$refs.initPic
          if (pic) {
            this.$refs.initSize.innerText = `原图尺寸（长*高）：${pic.width || '未知'} * ${pic.height || '未知'}`
          }
        }, 10)
        return ''
      }
    }
  },
  methods: {
    init: function () {
      this.getShowType()
    },
    //  解析传入的文件类型
    getShowType () {
      let imgs = ['jpg', 'jpeg', 'gif', 'png']
      let videos = ['mp4', 'ogg', 'webm']
      let src = this.file.src
      if (src) {
        let tail = src.split('?')[0].split('.').pop().toLowerCase()
        if (imgs.includes(tail)) {
          this.flag = 'image'
        } else if (videos.includes(tail)) {
          this.flag = 'video'
        } else {
          this.flag = ''
        }
      }
    },
    //  查看大图
    seeInitPic (src) {
      if (this.flag === 'image') {
        this.flags.showInit = src
        let dom = document.documentElement || document.body
        dom.style.overflow = 'hidden'
      } else if (this.flag === 'video') {
        let a = document.createElement('a')
        a.href = src
        a.download = name
        a.target = '_blank'
        a.click()
      }
    },
    //  删除图片
    deletePic () {
      this.$emit('delete', this.index)
    },
    //  替换图片
    replacePic () {
      this.$emit('replace', this.index, this.file)
    },
    //  下载图片
    downloadPic (src, name) {
      this.$emit('download', this.file)
      // return
      // if (src) {
      //   if (this.flag === 'image') {
      //     let image = new Image()
      //     // image.setAttribute('crossOrigin', 'anonymous')
      //     image.onload= function () {
      //       let canvas = document.createElement('canvas')
      //       canvas.width = image.width
      //       canvas.height = image.height
      //       let context= canvas.getContext('2d')
      //       context.drawImage(image, 0, 0, image.width, image.height)
      //       let url = canvas.toDataURL('image/png')
      //       let a = document.createElement('a')
      //       a.href = url
      //       a.download = name
      //       a.click()
      //     }
      //     image.src = src
      //     console.log(image)
      //   } else {
      //     let a = document.createElement('a')
      //     a.href = src
      //     a.download = name
      //     let event = new MouseEvent('click')
      //     console.log(a)
      //     a.dispatchEvent(event)
      //     // a.click()
      //   }      
      // }
    },
    //  关闭原图查看
    hideInitPic () {
      this.flags.showInit = false
      let dom = document.documentElement || document.body
      dom.style.overflow = ''
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'file': {
      handler (val) {
        this.getShowType()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.v-upl-file,.v-upl-file-wrap {
  box-sizing: border-box;
  position: relative;
  width: 100px;
  height: 100px;
}
.v-upl-file-wrap {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
}
.v-upl-file-img, .v-upl-file-video {
  width: 100%;
  height: 100%;
}
.v-upl-file-video {
  object-fit: cover;
  line-height: 0;
}
.v-upl-video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.v-upl-video-play::after {
  content: '';
  display: inline-block;
  border-left: 10px solid rgba(255, 255, 255, 1);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
}
.v-upload-img-modal {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 99;
  justify-content: center;
  align-items: center;
  opacity: 0;
  top: 0;
  transition: opacity .3s;
}
.v-upload-img-modal:hover {
  opacity: 1;
}
.v-upload-img-modal > em {
  display: inline-block;
  width: 18px;
  height: 18px;
  /* background-position: center center; */
  background-image: url('./icons/icons.png');
  background-repeat: no-repeat;
  cursor: pointer;
}
.v-upload-icon-see {
  background-position: -18px -18px;
}
.v-upload-icon-replace {
  background-position: -54px -18px;
}
.v-upload-icon-delete {
  background-position: -36px -18px;
}
.v-upload-icon-download {
  background-position: 0 -18px;
}
.v-upload-show-init {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  z-index: 100000;
}
.v-upload-init {
  animation: move-down 0.4s;
}
.v-upload-init-size {
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #fff;
  color: #f56c6c;
  box-shadow: 0 0 5px 0 #999;
}
@keyframes move-down {
  0% {
    opacity: 0.5;
    transform: translateY(-15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
