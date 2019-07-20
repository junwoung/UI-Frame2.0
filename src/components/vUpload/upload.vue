<!-- created by wangjun on 2019-03-12 -->
<template>
  <div class="v-upload" v-if="upload">
    <div
     :style="upload.fileStyle"
     class="v-upload-file"
     v-for="(item,index) in files"
     @mouseover="flag.idx = index"
     :key="index">
      <img
       :src="item.src"
       @click="showImg(item)"
       @mouseover="getSize($event,item,index)"
       :title="item.flag !== false ? `点击查看大图,${item.width}*${item.height}`:''">
      <span :title="item.name">{{item.name}}</span>
      <em @click="cancelItem(index)" v-if="!upload.disable && flag.idx === index" class="v-upload-close">x</em>
    </div>
    <div
     class="v-upload-btn"
     @click="triggerClick"
     v-if="upload.btnType !== 'btn'"
     :class="upload.btnType === 'img' ? 'v-upload-btn-img':'v-upload-btn-file'"
     :style="upload && upload.style"></div>
    <button @click="triggerClick" v-if="upload.btnType === 'btn'" class="btn btn-default btn-small" style="width:auto;padding: 0 10px;">{{upload.btnTxt || '点击上传'}}</button>
    <input type="file" ref="vUploadFile" @change="getFile($event)">
    <span v-if="error" class="tips tips-error" style="align-self: flex-end;">{{error}}</span>
    <span v-if="!error" class="tips" style="align-self: flex-end;">{{upload.tips}}</span>
    <div v-if="flag.show" title="点击关闭" @click="flag.show=false" class="v-upload-showImg">
      <img :src="flag.url">
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      btnType: ['img', 'file', 'btn'], //  按钮显示类型选择
      files: [], //  存储上传的文件
      error: '', //  存储报错信息
      flag: {
        idx: null, //  hover选中图片显示关闭按钮
        show: false, //  用于展示原图
        url: null //  存放图片url
      }
    }
  },
  props: {
    upload: {
      default: null,
      type: Object
    }
  },
  methods: {
    init: function () {
      //  初始化插件
      let up = this.upload
      if (!up) return
      //  如果未定义按钮类型则默认为图片类型
      if (!up.btnType) this.$set(this.upload, 'btnType', 'img')
      //  如果定义的按钮类型不能识别，则默认为文件类型
      if (this.btnType.indexOf(up.btnType) === -1) up.btnType = 'file'
      //  如果尾缀为空以及img属性也为空，则默认上传图片，且没有严格限制
      if (!up.img && (!up.suffix || !up.suffix.length)) up.img = {}
      //  上传文件数量限制，如果未定义则默认上传单个文件
      if (up.uploadNum === undefined) up.uploadNum = 1
      //  初始化文件上传插件（一般用于编辑页面）
      if (up.init) {
        /**
        * @author: wangjun
        * @date: 2019-03-13 10:20:33
        * @desc: 1、如果是数组，则直接赋值files（数组每条记录均需是对象类型，每条记录必须包含src属性，可以包含name属性）
        * 2、如果是对象，则转为数组（对象至少包含src属性，name属性可以没有）
        * 3、如果是图片链接，也转为数组
        */
        if (up.init instanceof Array) this.files = up.init
        else if (typeof up.init === 'object') {
          this.files.push(up.init)
        } else if (typeof up.init === 'string') {
          this.files.push({
            src: up.init
          })
        }
      }
      //  禁用则鼠标显示禁用状态
      if (up.disable) {
        if (!up.style) this.$set(this.upload, 'style', {cursor: 'not-allowed'})
        else {
          let s = up.style
          s.cursor = 'not-allowed'
          this.$set(this.upload, 'style', s)
        }
      }
    },
    triggerClick: function () {
      if (this.upload.disable) return
      //  触发文件上传文本框
      this.$refs.vUploadFile && this.$refs.vUploadFile.click()
    },
    getFile: function (evt) {
      evt = evt || window.event
      let file = evt.target.files[0]
      if (!file) {
        this.error = '请选择上传文件'
        return
      }
      this.error = null
      let up = this.upload
      //  当img属性不为空时，则校验其中定义的规则
      if (up.img) {
        if (file.type.indexOf('image') === -1) {
          this.error = '请上传图片类型文件'
          return
        }
      }
      //  校验文件字节尺寸大小
      if (up.size) {
        if (up.size * 1024 * 1024 < file.size) {
          this.error = `上传文件大小超过给定限制字节,要求: ${up.size}M,实际: ${(file.size / 1024 / 1024).toFixed(3)}M`
          return
        }
      }
      //  校验文件后缀名
      if (up.suffix) {
        let suffix = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase()
        if (up.suffix.indexOf(suffix) === -1) {
          this.error = `上传的文件名后缀应为: ${up.suffix.join(',')}`
          return
        }
      }
      //  校验上传文件的数量
      if (up.uploadNum <= this.files.length) {
        this.error = '上传文件数量超过限制，你可以更改uploadNum数量限制或者取消之前选择的文件再上传'
        return
      }
      //  如果是图片，则获取base64转码，显示
      if (up.img || file.type.indexOf('image') !== -1) {
        let reader = new FileReader()
        //  读取文件
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          //  如果对图片的物理尺寸有要求
          let img = new Image()
          img.src = e.target.result
          // 加载文件事件，主要校验图片物理尺寸
          img.onload = () => {
            let w = img.width
            let h = img.height
            if (up.img && up.img.strict) {
              if (up.img.width && up.img.width !== w) {
                this.error = `图片宽度不符合要求，要求: ${up.img.width},实际: ${w}`
                return
              }
              if (up.img.height && up.img.height !== h) {
                this.error = `图片高度不符合要求，要求: ${up.img.height},实际: ${h}`
                return
              }
              //  条件校验通过，暂存文件相关信息
              this.files.push({
                name: file.name,
                file: file,
                src: e.target.result,
                width: w,
                height: h
              })
            } else {
              if (up.img && up.img.width && up.img.width < w) {
                this.error = `图片宽度不符合要求，要求不大于: ${up.img.width},实际: ${w}`
                return
              }
              if (up.img && up.img.height && up.img.height < h) {
                this.error = `图片高度不符合要求，要求不大于: ${up.img.height},实际: ${h}`
                return
              }
              //  条件校验通过，暂存文件相关信息
              this.files.push({
                name: file.name,
                file: file,
                src: e.target.result,
                width: w,
                height: h
              })
            }
          }
        }
      } else {
        let reader = new FileReader()
        //  读取文件
        reader.readAsDataURL(file)
        reader.onprogress = (e) => {
          // console.log(e)
          /**
          * @author: wangjun
          * @date: 2019-03-13 10:07:37
          * @desc: 保留上传进度条定义功能,待进度对话框完成后再来完善
          */
        }
        this.files.push({
          name: file.name,
          file: file,
          src: require('./imgs/file.png'),
          flag: false
        })
        //  不是图片，则直接存储相关文件信息
        // this.files.push({
        //   name: file.name,
        //   file: file,
        //   src: require('./imgs/file.png'),
        //   flag: false
        // })
      }
      setTimeout(() => {
        this.upload.file = this.getPureFile()
        this.$emit('callback', this.upload.file)
        this.$refs.vUploadFile.value = ''
      }, 100)
    },
    cancelItem: function (idx) {
      if (this.upload.disable) return
      //  取消暂时上传的文件
      this.files.splice(idx, 1)
      this.upload.file = this.getPureFile()
      this.$emit('callback', this.upload.file)
      this.$refs.vUploadFile.value = ''
    },
    getPureFile: function () {
      //  仅仅返回文件组成的数组
      return this.files.map(item => item.file)
    },
    showImg: function (item) {
      //  展示原图
      if (item.flag === false) return
      this.flag.show = true
      this.flag.url = item.src
      setTimeout(() => {
        //  过渡动画需要
        let dom = document.querySelector('.v-upload-showImg')
        dom.style.top = 0
        dom.style.opacity = 1
      }, 20)
    },
    getSize: function (e, item, idx) {
      //  如果初始化图片缺少长宽尺寸，则获取
      e = e || window.event
      if (item.width) return
      let dom = e.target
      this.$set(this.files[idx], 'width', dom.naturalWidth)
      this.$set(this.files[idx], 'height', dom.naturalHeight)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.v-upload {
  display: flex;
  /* align-items: center; */
  user-select: none;
  padding-bottom: 30px;
}
.v-upload > input {
  width: 0;
  height: 0;
  border: none;
  outline: none;
  overflow: hidden;
  opacity: 0;
  position: absolute;
  float: left;
  padding: 0;
  margin: 0;
}
.v-upload-btn {
  display: inline-block;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 3px;
  background-size: 80% 80%;
  background-color: #efefef;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-right: 15px;
  margin-left: 15px;
  align-self: flex-end;
}
.v-upload-btn-img {
  background-image: url(./imgs/btn-img.png);
}
.v-upload-btn-file {
  background-image: url(./imgs/btn-file.png);
}
.v-upload-file {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
.v-upload-file > img {
  width: 100%;
  height: 100%;
}
.v-upload-file > span {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  text-align: center;
}
.v-upload-close{
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #F08080;
  color: #fff;
  line-height: 14px;
  border-radius: 50%;
  text-align: center;
  top: -6px;
  right: -6px;
  cursor: pointer;
}
.v-upload-showImg {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: -2000px;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: top 0.2s,opacity 0.2s;
  z-index: 9999999;
}
</style>
