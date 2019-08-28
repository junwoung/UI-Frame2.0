<!-- created by wangjun on 2019-07-28 -->
<template>
  <div>
    <!--
      :files='files'
      :disable='false'
      :size='30 * 1024 * 1024'
      :uploadNum='1'
      :showPic='true'
      :imgControl="{width: 1920, height: 1080, strict: false}"
      :imgStyle="{width: '120px', height: '120px'}"
      :tips='"只能上传jpg格式，且不超过500K"'
      :suffix="['jpg', 'png', 'jpeg', 'zip', 'gif', 'xlsx', 'mp4', 'ts']"
      :error='fileConfig.error'
      :autoHidden='true'
      multiple
      @callback='getFiles'
      @download='download'
      :serverAddr='"/upload/upload/img"'
    -->
    <v-row>
      <v-file
        :files='files'
        :disable='false'
        :size='30 * 1024 * 1024'
        :uploadNum='4'
        :showPic='true'
        :imgControl="{width: 1920, height: 1080, strict: false}"
        :imgStyle="{width: '120px', height: '120px'}"
        :suffix="['jpg', 'png', 'jpeg', 'zip', 'gif', 'xlsx', 'mp4', 'ts']"
        :error='fileConfig.error'
        :autoHidden='false'
        multiple
        @callback='getFiles'
        @download='download'
        :params="{chunk: 0, fbid: 'F793000'}"
        :serverAddr='"/upload/upload/img"'>
          <!-- <button class="btn btn-default">请上传任意</button> -->
      </v-file>
    </v-row>
    <!-- <v-row>
      <v-file
        :autoHidden='false'
        :disable='true'
        :files="[{name: 'aaaaaa.jpg', src: 'http://localhost:8080/public/uploads/190730/aa5b318fd32f7d6fffbf1628c9b55a63.mp4'}]"
        :imgStyle="{width: '150px', height: '120px'}"></v-file>
    </v-row> -->
    <v-row style="position:relative;height: 60px;">
      <v-loading :color='"#3896f8"' :size='50' :loading='true' :text="'加载中'"></v-loading>
    </v-row>

    <v-row>
      <v-divider :align='"right"' :color="'#ddd'">
        <span>分割线</span>
      </v-divider>
    </v-row>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      files: [
        {name: '1dfewgw', src: 'http://localhost:8080/public/uploads/190730/aa5b318fd32f7d6fffbf1628c9b55a63.mp4'},
        {name: 'sdgshdgh', src: 'http://localhost:8080/public/uploads/190730/4c996f1543be5bbd8443dfd9d39eaf27.gif'}
      ],
      fileConfig: {
        error: '请设置头像'
      }
    }
  },
  computed: {
    //  获取图片服务器地址
    getPicServer: {
      get: function () {
        return this.$store.state.config.pic_server
      }
    }
  },
  methods: {
    init: function () {
      setTimeout(() => {
        this.fileConfig.error = ''
      }, 3000)
    },
    getFiles (files) {
      console.log(files)
      let arr = files.map(file => {
        let src
        if (file.res) {
          if (file.res.addr) {
            src = file.res.abs_addr
            return {
              name: file.name,
              src: src || file.src
            }
          } else {
            return {
              name: file.name,
              error: true
            }
          }
        }
        return file
      })
      this.files = arr
      console.log(this.files)
    },
    download (file) {
      console.log(file)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
