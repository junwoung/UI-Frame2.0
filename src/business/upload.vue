<!-- created by wangjun on 2019-03-12 -->
<template>
  <div>
    <v-upload :upload="upload" @callback='getFile'></v-upload>
    <v-upload :upload="upload2"></v-upload>
    <div class="form-control clearfix" style="margin: 20px 0;">
      <label class="label">使用</label>
      <textarea class="textarea" style="width:500px;height:80px;" disabled><v-upload :upload="upload" @callback='getFile'></v-upload></textarea>
      <span class="tips">upload对象包含如下列表参数；callback选择触发回调(非必须)</span>
    </div>
    <div class="form-control clearfix">
      <label class="label">使用说明</label>
      <div>
        在选择文件后，开发者可以利用 this.upload.file 获取选择的文件信息，也可以利用callback函数中返回的参数获取文件信息<br>
        出于更灵活的目的，并没有立即将选中的文件上传到指定路径，而是抛出文件信息供开发者自行上传（给使用者提供了撤销选择的余地）
      </div>
    </div>
    <table class="table">
      <caption>upload对应属性</caption>
      <thead class="thead">
        <tr>
          <th v-for="(item,index) in theader" :key="index" :style="{'width': item.width}">
            {{item.name}}
          </th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="(item,index) in tbody" :key="index">
          <td>{{item.arg}}</td>
          <td>{{item.type}}</td>
          <td>{{item.desc}}</td>
          <td>{{item.must}}</td>
          <td>{{item.exp}}</td>
          <td>{{item.default}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import theader from './config/table.js'
export default {
  name: '',
  data () {
    return {
      theader: theader,
      tbody: [],
      upload: {
        disable: false,
        style: {
          width: '80px',
          height: '80px'
        },
        fileStyle: {
          width: '80px',
          height: '80px'
        },
        btnType: 'img',
        btnTxt: '请上传',
        size: 3, //  字节大小（单位：M）由于html:file的限制，一般上限不超过30M，否则容易出现页面崩溃
        // img: {
        //   width: 1920,
        //   height: 1080,
        //   strict: false //  是否严格控制图片尺寸
        // },
        suffix: ['png', 'gif', 'jpg', 'txt', 'rar'], // 允许上传的文件尾缀
        // uploadNum: 2, //  上传文件数量限制
        init: [{
          name: 'cat',
          src: 'https://profile.csdnimg.cn/6/F/F/1_huxiweng'
        }],
        tips: '请上传1080*1920'
      },
      upload2: {
        // btnType: 'file',
        // suffix: ['txt']
      }
    }
  },
  methods: {
    init: function () {
      this.defineBody()
    },
    getFile: function (file) {
      console.log(file)
      console.log(this.upload.file)
    },
    defineBody: function () {
      this.tbody = [
        {
          arg: 'style',
          type: 'Object',
          desc: '按钮样式控制，支持自定义',
          must: false,
          exp: `style: {
            width: '80px',
            height: '80px'
          }`,
          default: '无'
        },
        {
          arg: 'fileStyle',
          type: 'Object',
          desc: '选择文件展示的样式控制',
          must: false,
          exp: `fileStyle: {
            width: '80px',
            height: '80px'
          }`,
          default: '无'
        },
        {
          arg: 'btnType',
          type: 'String',
          desc: '按钮类型，支持 img/file/btn 三种格式',
          must: false,
          exp: `file`,
          default: 'img'
        },
        {
          arg: 'btnTxt',
          type: 'String',
          desc: '当按钮样式为 btn 时，接受自定义按钮文字',
          must: false,
          exp: `请上传高清图片`,
          default: '点击上传'
        },
        {
          arg: 'size',
          type: 'Number',
          desc: '接受单个上传文件的字节大小，单位M（理论上不大于30M，否则页面容易崩溃）',
          must: false,
          exp: `3`,
          default: '无'
        },
        {
          arg: 'img',
          type: 'Object',
          desc: 'img对象，当接受文件类型为image时，自定义图片宽度、高度控制；同时，strict属性指明是严格控制还是宽松控制（严格：图片尺寸必须为指定大小；宽松：图片尺寸不大于指定大小即可）',
          must: false,
          exp: `img: {
            width: 1920,
            height: 1080,
            strict: false 
          }`,
          default: '无'
        },
        {
          arg: 'suffix',
          type: 'Array',
          desc: '指定接受文件后缀类型',
          must: false,
          exp: `suffix: ['png', 'gif', 'jpg', 'txt', 'rar']`,
          default: '无'
        },
        {
          arg: 'uploadNum',
          type: 'Number',
          desc: '接受文件数量，不传表示单文件上传',
          must: false,
          exp: `2`,
          default: '1'
        },
        {
          arg: 'init',
          type: 'Array / Object / String',
          desc: `初始化插件选择内容（应用于各类编辑页面)。
          1、传入Array，则每条记录都必须为一个对象，每个对象都含有src属性；
          2、传入Object，则必须包含src属性；
          3、传入String，则必须为一条图片地址`,
          must: false,
          exp: `init: [{
            name: 'cat',
            src: 'https://profile.csdnimg.cn/6/F/F/1_huxiweng'
          }]`,
          default: '无'
        },
        {
          arg: 'disable',
          type: 'Boolean',
          desc: `是否禁用`,
          must: false,
          exp: `true`,
          default: 'false'
        }
      ]
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
