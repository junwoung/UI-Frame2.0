/**
* @author: wangjun
* @date: 2019-11-21 19:57:59
* @desc: 下载可解析图片以及视频用
*/

export default class Download {
  static downloadFile (url, fileName, type) {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.setRequestHeader('Content-Type', `application/${type}`)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status === 200) {
        //  接受二进制文件流
        let blob = this.response
        Download.downloadExportFile(blob, fileName, type)
      }
    }
    xhr.send()
  }
  static downloadExportFile (blob, tagFileName, fileType) {
    let downloadElement = document.createElement('a')
    let href = blob
    if (typeof blob === 'string') {
      downloadElement.target = '_blank'
    } else {
      //  创建下载的链接
      href = window.URL.createObjectURL(blob)
    }
    downloadElement.href = href
    //  下载后文件名
    downloadElement.download = tagFileName + (fileType ? `.${fileType}` : '')
    document.body.appendChild(downloadElement)
    //  点击下载
    downloadElement.click()
    //  下载完成移除元素
    document.body.removeChild(downloadElement)
    if (typeof blob !== 'string') {
      //  释放掉blob对象
      window.URL.revokeObjectURL(href)
    }
  }
}
