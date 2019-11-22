<!-- created by wangjun on 2019-07-28 -->
<template>
  <div class="v-upload v-upload-clear ">
    <!-- 文件选择控件 -->
    <input
      ref="file"
      type="file"
      @change='getSelectFile'
      v-bind='$attrs'
      class="v-upload-hidden">
    <!-- 上传的图片展示区域 -->
    <div class="v-upload-imgs">
      <div v-for="(img, index) in imgs" :key="index" class="v-upload-img-wrap">
        <!-- <img :style="imgStyle" :src="img.src"> -->
        <v-upl-file :index='index' :file='img' :disable='disable' :style="imgStyle" @download='download' @replace='replace' @delete='deletePic'></v-upl-file>
        <span :title="img.name || getImgName(img.src)" class='v-upload-img-name'>{{img.name || getImgName(img.src)}}</span>
        <!-- 进度事件 -->
        <div class="v-upload-progress" v-if="isShowProgress(img)" :ref="'progress' + index">
          <span class="v-upload-progress-base"></span>
          <span class="v-upload-progress-on" :style="{width: getProgress(img, index)}"></span>
        </div>
        <!-- 上传结果提示信息 -->
        <div class="v-upload-result" v-if="img.over">
          <span class="v-upload-result-success" v-if="img.success && !img.error">上传成功</span>
          <span class="v-upload-result-error" v-if="img.error">上传失败</span>
        </div>
      </div>
    </div>
    <!-- 自定义触发按钮 -->
    <div class="v-upload-btn-wrap">
      <div v-if="isShowUpload" @click="triggerSelect" style="display: inline-block;">
        <slot>
          <button class="v-upload-btn" :class="{'v-upload-btn-disable': disable}" :style="imgStyle">
            <span class="v-upload-icon-add">+</span>
            <span class="v-upload-btn-text">点击上传</span>
          </button>
        </slot>
      </div>
      <span class="v-upload-tips" @click.stop="" v-html="tips"></span>
      <span class="v-upload-error" v-if="innerError" @click.stop="">{{innerError}}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import file from './file.vue'
export default {
  name: '',
  data () {
    return {
      imgs: [],
      innerError: this.error,
      //  记录当前操作，避免一次上传多个文件造成多次调用父组件回调函数
      emits: {
        idx: 0
      },
      flags: {
        //  文件替换标记
        onReplace: null
      },
      //  拷贝初始化副本，用于diff用
      copyInit: null
    }
  },
  props: {
    //  用来接收选中的文件
    files: {
      type: Array,
      default: () => []
    },
    //  素材上传的服务器地址
    serverAddr: [String],
    //  允许的最大尺寸
    size: [Number],
    //  允许上传的最大数量
    uploadNum: {
      type: Number,
      default: 1
    },
    //  是否禁用
    disable: [Boolean],
    //  提示信息
    tips: [String],
    //  是否大图显示图片
    showPic: [Boolean],
    //  允许上传的文件尾缀
    suffix: {
      type: Array,
      default: () => []
    },
    //  控制图片展示样式
    imgStyle: {
      type: Object,
      default: () => {}
    },
    //  对图片类型文件控制宽度和高度
    imgControl: {
      type: Object,
      default: null
    },
    //  设置报错信息
    error: [String],
    //  达到上传数量后是否自动隐藏按钮
    autoHidden: {
      type: Boolean,
      default: false
    },
    //  将附加参数一起拼接提交
    params: {
      type: Object,
      default: () => {}
    },
    //  针对业务特殊需求,名称控制需求
    nameCtrl: {
      type: String,
      default: ''
    }
  },
  components: {
    'v-upl-file': file
  },
  computed: {
    //  上传按钮是否显示
    isShowUpload: {
      get: function () {
        if (!this.autoHidden || (this.uploadNum && this.uploadNum > this.imgs.length)) return true
        return false
      }
    },
    //  返回合法的字节数，以M为单位，保留两位小数
    getLegalSize: {
      get: function () {
        let size = Math.floor(this.size / (1024 * 1024) * 100) / 100
        return size + 'M'
      }
    },
    //  返回合法的尾缀
    getLegalSuffix: {
      get: function () {
        return this.suffix.join(',')
      }
    },
    //  返回合法的尺寸
    getLegalWH: {
      get: function () {
        let ctrl = this.imgControl
        return `${ctrl.width && ('宽：' + ctrl.width + ',')}${ctrl.height && ('高：' + ctrl.height)}`
      }
    },
    //  判断是否显示进度条
    isShowProgress (img) {
      return img => {
        if (this.serverAddr && img.progress !== undefined && !img.over) return true
      }
    },
    //  获取进度事件
    getProgress (img, idx) {
      return (img, idx) => {
        /* eslint-disable */
        if (img.success) {
          setTimeout(() => {
            this.$set(img, 'over', true)
          }, 2000)
        }
        if (img.error) {
          setTimeout(() => {
            this.$set(img, 'over', true)
          }, 2000)
        }
        return img.progress
      }
    },
    //  如果无名称，则自动根据资源连接提取资源名称
    getImgName (src) {
      return src => {
        if(!src) return
        let srcArr = src.split('?')[0].split('/')
        return srcArr.pop()
      }
    }
  },
  methods: {
    init: function () {
      if (this.files && this.files.length) {
        this.imgs = this.files
        !this.copyInit && (this.copyInit = JSON.parse(JSON.stringify(this.files)))
      } else {
        !this.copyInit && (this.copyInit = [])
      }
    },
    //  触发选择
    triggerSelect () {
      if (this.disable) return
      this.$refs.file.click()
    },
    //  获取选择的文件
    getSelectFile (e) {
      this.emits.idx++
      let files = e.target.files
      this.innerError = ''
      //  上传文件数量控制
      if (this.uploadNum < (files.length + this.imgs.length + (this.flags.onReplace !== null ? -1 : 0))) {
        this.innerError = '上传文件超过数量' + this.uploadNum
        return
      }
      //  循环过滤
      for (let key in files) {
        let file = files[key]
        if (typeof file !== 'object') continue
        //  过滤文件字节大小，不超过
        if (this.size) {
          if (this.size < file.size) {
            this.innerError = `文件【${file.name}】过大（不大于${this.getLegalSize}）`
            return
          }
        }
        //  过滤文件名
        if (this.nameCtrl) {
          if (file.name !== this.nameCtrl) {
            this.innerError = `只能上传同名文件`
            return
          }
        }
        //  过滤文件尾缀
        if (this.suffix.length) {
          let tail = file.name.split('.').pop().toLowerCase()
          if (!this.suffix.includes(tail)) {
            this.innerError = `文件【${file.name}】尾缀不合法（合法:${this.getLegalSuffix}）`
            return
          }
        }
        //  用于判断图片操作是否结束
        let flag = true
        //  判断文件是不是图片类型
        if (file.type.includes('image')) {
          flag = false
          let ctrl = this.imgControl
          if (ctrl) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
              let img = new Image()
              img.src = e.target.result
              //  控制图片宽高大小
              img.onload = () => {
                let [w, h] = [img.width, img.height]
                //  严格模式
                if (ctrl.strict) {
                  if ((ctrl.width && ctrl.width !== w) || (ctrl.height && ctrl.height !== h)) {
                    this.innerError = `图片【${file.name}】宽高不符合要求（要求等于：${this.getLegalWH}）`
                  }
                } else {
                  //  非严格模式
                  if ((ctrl.width && ctrl.width < w) || (ctrl.height && ctrl.height < h)) {
                    this.innerError = `图片【${file.name}】宽高不符合要求（要求不大于：${this.getLegalWH}）`
                  }
                }
                //  图片通过校验，将其地址存储
                if (!this.innerError) {
                  pushFileItem(this, file, e.target.result)
                }
                flag = true
              }
            }
          } else {
            //  不是需要校验图片
            pushFileItem(this, file)
            flag = true
          }
        } else {
          //  不是图片，默认图片显示
          pushFileItem(this, file)
        }
        //  循环判断图片异步操作是否结束
        let timer = setInterval(async () => {
          if (flag) {
            clearInterval(timer)
            if (this.innerError) return
            //  如果设定指定素材服务器地址，则触发上传操作
            if (this.serverAddr){
              await this.uploadToServer(file)
            }
            this.flags.onReplace = null
            // this.files.files = this.imgs
            this.emitOut(this.imgs)
          }
        }, 10)
      }
      e.target.value = ''
      //  将选择的文件添加到显示队列
      function pushFileItem (_this, file, src) {
        src = src || require('./icons/file2.png')
        let item = {
          name: file.name,
          src: src,
          progress: 0,
          file: file
        }
        if (_this.flags.onReplace !== null) {
          _this.imgs.splice(_this.flags.onReplace, 1, item)
        } else {
          _this.imgs.push(item)
        }
      }
    },
    //  将已选项抛出给父组件
    emitOut (file) {
      //  确保每一次选择，无论选择多少文件都只会抛出一次回调函数
      let key = 'e' + this.emits.idx
      if (this.emits[key] !== undefined) {
        clearTimeout(this.emits[key])
      }
      this.emits[key] = setTimeout(() => {
        this.$emit('callback', file)
      }, 100)
    },
    //  将文件上传到指定服务器
    async uploadToServer (file) {
      let form = new FormData()
      //  拼接额外参数
      for (let key in this.params) {
        form.append(key, this.params[key])
      }
      form.append('file', file)
      //  获取对应的图片对象
      let img
      this.imgs.some(item => {
        if (item.file === file) {
          img = item
        }
      })
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: this.serverAddr,
          data: form,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              let ratio = progressEvent.loaded / progressEvent.total * 100 + '%'
              if (img) {
                img.progress = ratio
              } else {
                img && this.$set(img, 'error', '未找到对应文件')
              }
            }
          }
        }).then(res => {
          resolve(res)
          // this.$set(img, 'success', true)
          //  将得到的结果整体抛出，挂在到res属性
          img.res = res.data
          //  -----
          // img.src = res.data.abs_addr
        }).catch(res => {
          reject(res)
          this.innerError = `${file.name}上传失败`
          img && this.$set(img, 'error', true)
        })
      })
    },
    //  抛出下载文件事件
    download (file) {
      this.$emit('download', file)
    },
    //  替换文件
    replace (idx, file) {
      this.flags.onReplace = idx
      this.$refs.file.click()
      this.$emit('replace', idx)
    },
    //  删除文件
    deletePic (idx) {
      this.imgs.splice(idx, 1)
      this.files.splice(idx, 1)
      this.$emit('delete', idx)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'error': function (val) {
      this.innerError = val
    },
    'files': {
      handler (val) {
        //  diff前后新增或更改的文件，打上tag
        let arr = val.map((item, idx) => {
          if (item.res) {
            if (item.src) {
              if (!this.copyInit.some(init => init.src === item.src)) {
                this.$set(item, 'over', true)
                this.$set(item, 'success', true)
              }
            } else {
              this.$set(item, 'over', true)
              this.$set(item, 'error', true)
            }
          }
          return item
        })
        this.imgs = arr
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.v-upload-clear {
  zoom: 1;
}
.v-upload-clear::before {
  content: '';
  display: block;
  clear: both;
}
.v-upload {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  box-sizing: border-box;
  font-size: 14px;
}
.v-upload-hidden {
  float: left!important;
  width: 0;
  height: 0;
  border: none;
  visibility: hidden!important;
  clear: both;
}
.v-upload-btn-wrap {
  position: relative;
  display: inline-block;
  user-select: none;
}
.v-upload-btn {
  width: 100px;
  height: 100px;
  border-style: dashed;
  border-width: 1px;
  border-color: #bcbcbc;
  color: #666;
  cursor: pointer;
}
.v-upload-btn-disable {
  background-color: #efefef;
  cursor: not-allowed;
  color: #bbb;
  border-color: #ddd;
}
.v-upload-icon-add {
  display: block;
  font-size: 40px;
  font-weight: 100;
  color: #bcbcbc;
}
.v-upload-btn-text {
  position: relative;
  top: -10px;
}
.v-upload-tips {
  display: block;
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}
.v-upload-error::before {
  content: 'x';
  height: 14px;
  width: 14px;
  font-size: 14px;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid #f56c6c;
  text-align: center;
  line-height: 12px;
  position: relative;
  bottom: 1px;
  margin-right: 2px;
  transform: scale(0.7);
}
.v-upload-error {
  position: absolute;
  display: block;
  white-space: nowrap;
  font-size: 12px;
  color: #f56c6c;
  transform-origin: top;
  transform: scaleY(1);
  animation: show-disapear 0.2s;
  z-index: 888;
}
.v-upload-imgs {
  display: flex;
  float: left;
}
.v-upload-img-wrap {
  position: relative;
  margin-right: 10px;
}
.v-upload-img-wrap > img {
  display: block;
  width: 100px;
  height: 100px;
}
.v-upload-img-name {
  position: absolute;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #777;
  text-align: center;
}
.v-upload-progress {
  position: absolute;
  top: 100%;
  transform: translateY(20px);
  box-sizing: border-box;
  width: 100%;
  height: 2px;
  padding: 0 10px 0 0;
}
.v-upload-progress > span {
  position: absolute;
  top: 0;
  display: inline-block;
  height: 100%;
  border-radius: 2px;
}
.v-upload-progress-base {
  background-color: #dcdcdc;
  width: 100%;
  z-index: 98;
}
.v-upload-progress-on {
  background-color: #67c23a;
  z-index: 99;
}
.v-upload-result {
  position: absolute;
  font-size: 12px;
  background-color: #fff;
  transform: translateY(100%);
}
.v-upload-result-success {
  color: #67c23a;
}
.v-upload-result-error {
  color: #f56c6c;
}
@keyframes show-disapear {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}
</style>
