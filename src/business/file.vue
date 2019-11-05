<!-- created by wangjun on 2019-07-28 -->
<template>
  <div>
    <!-- <v-file
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
      :params="{chunk: 0, fbid: 'F793000'}"
      :serverAddr='"/upload/upload/img"'> -->
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
    <v-row>
      <label class="label" style="float:left;margin-right: 20px;">使用</label>
      <textarea class="textarea" style="width: 500px;height: 400px;">
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
      </textarea>
    </v-row>
    <v-row>
      <p><label class="label">提示1</label><span>插件有默认上传按钮，也可以通过在闭口标签内部自己定义一个上传按钮</span></p>
      <p><label class="label">提示2</label><span>插件会自动解析浏览器可预览的文件，并展示预览图。其他文件统一以默认的文件缩略图展示</span></p>
      <p><label class="label">提示3</label><span>多个文件上传，上传状态可以通过设置files里面的每一条对象中的success和error属性来控制上传状态</span></p>
      <p><label class="label">提示4</label><span>插件内置了预览、删除、替换、下载功能，若不需要可自行修改插件（二次开发或者直接注释相关代码）</span></p>
      <p><label class="label">提示5</label><span>以上内置功能，除了下载功能有点特殊以外，其余功能都内部实现了，没有对外抛出相关功能入口，需要的可自行开发。下载功能涉及到浏览器可解析的文件，会自动变成预览，且可能存在跨域（无法通过canvas来下载异域的图片）情况，所以抛出下载入口，共开发者自行开发</span></p>
    </v-row>
    <v-table :data='table.data' :header='table.headers'>
      <template slot="caption"><p style="text-align:center;">v-file 使用介绍</p></template>
      <v-thead-col v-for="(title, idx) in table.titles" :key="idx" :width='title.width'>{{title.name}}</v-thead-col>
    </v-table>
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
      },
      table: {
        headers: ['arg', 'type', 'desc', 'must', 'exp', 'default'],
        titles: [
          {name: '参数', width: '10%'},
          {name: '类型', width: '10%'},
          {name: '说明', width: '30%'},
          {name: '必填项', width: '10%'},
          {name: '样例值', width: '30%'},
          {name: '默认值', width: '10%'}
        ],
        data: [
          {
            arg: 'mutiple',
            type: '-',
            desc: '是否允许一次选择多个文件',
            must: 'false',
            exp: `-`,
            default: '-'
          },
          {
            arg: ':files',
            type: 'Array',
            desc: '初始化插件/存放已选择的文件对象列表',
            must: 'true',
            exp: [],
            default: '-'
          },
          {
            arg: ':disable',
            type: 'Boolean',
            desc: '是否禁用',
            must: 'false',
            exp: 'true',
            default: 'false'
          },
          {
            arg: ':size',
            type: 'Number',
            desc: '控制上传的文件尺寸',
            must: 'false',
            exp: `3 * 1024 * 1024`,
            default: '-'
          },
          {
            arg: ':uploadNum',
            type: 'Number',
            desc: '允许上传的最大数量',
            must: 'false',
            exp: '3',
            default: '1'
          },
          {
            arg: ':showPic',
            type: 'Boolean',
            desc: '是否展示缩略图',
            must: 'false',
            exp: 'true',
            default: 'true'
          },
          {
            arg: ':imgControl',
            type: 'Object',
            desc: '图片上传的具体尺寸控制，width: 宽度, height: 高度, strict: 是否严格控制，是：必须强相等；否：在控制尺寸以内均可',
            must: 'false',
            exp: `{width: '120px', height: '120px', strict: true}`,
            default: '{}'
          },
          {
            arg: ':imgStyle',
            type: 'Object',
            desc: '缩略图展示样式控制',
            must: 'false',
            exp: `{width: '120px', height: '120px'}`,
            default: '{}'
          },
          {
            arg: ':suffix',
            type: 'Array',
            desc: '允许上传的文件后缀',
            must: 'false',
            exp: `['mp4', 'jpg']`,
            default: '-'
          },
          {
            arg: ':error',
            type: 'String',
            desc: '报错展示信息',
            must: 'false',
            exp: `请上传图片`,
            default: ''
          },
          {
            arg: ':autoHidden',
            type: 'Boolean',
            desc: '达到上传数量是否自动隐藏上传按钮',
            must: 'false',
            exp: `true`,
            default: 'false'
          },
          {
            arg: ':nameCtrl',
            type: 'String',
            desc: '名称必须为',
            must: 'false',
            exp: `a.jpg`,
            default: '-'
          },
          {
            arg: ':params',
            type: 'Object',
            desc: '文件上传的额外参数',
            must: 'false',
            exp: `{chunk: 0, fbid: 'F793000'}`,
            default: '{}'
          },
          {
            arg: ':serverAddr',
            type: 'String',
            desc: '接口地址',
            must: 'false',
            exp: `upload/img`,
            default: ''
          },
          {
            arg: '@callback',
            type: 'Function',
            desc: '文件上传成功触发回调函数，可以在此修改files数组，从而达到文件上传后实时回显的效果',
            must: 'true',
            exp: `-`,
            default: '-'
          },
          {
            arg: '@download',
            type: 'Function',
            desc: '下载文件入口（开发者自己定义功能）',
            must: 'false',
            exp: `-`,
            default: '-'
          }
        ]
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
        if (file.res) {
          file.src = file.res.abs_addr
        } else {
          file.error = true
        }
        return file
        // let src
        // if (file.res) {
        //   if (file.res.addr) {
        //     src = file.res.abs_addr
        //     return {
        //       name: file.name,
        //       src: src || file.src
        //     }
        //   } else {
        //     return {
        //       name: file.name,
        //       error: true
        //     }
        //   }
        // }
        // return file
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
