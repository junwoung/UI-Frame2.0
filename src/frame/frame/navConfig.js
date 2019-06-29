/**
 * @author: wangjun
 * @date: 2019-03-05 11:11:45
 * @desc: 用于配置导航栏
 */
const list = [
  {
    parent: 'component',
    name: '组件',
    son: [
      {
        name: '选择',
        url: 'select'
      },
      {
        name: '单选/复选',
        url: 'checkbox'
      },
      {
        name: 'tab',
        url: 'tab'
      },
      {
        name: '分页',
        url: 'pagination'
      },
      {
        name: '文件/图片上传',
        url: 'upload'
      },
      {
        name: '时间',
        url: 'time'
      },
      {
        name: '评分',
        url: 'score'
      },
      {
        name: '轮播',
        url: 'carousel'
      },
      {
        name: '里程碑',
        url: 'landmark'
      }
    ]
  },
  {
    parent: 'query',
    name: 'query'
  },
  {
    parent: 'dialog',
    name: '对话框'
  },
  {
    parent: 'directive',
    name: '指令',
    son: [
      {
        name: '懒加载',
        url: 'lazyLoad'
      },
      {
        name: '数值输入指令',
        url: 'direc_number'
      },
      {
        name: 'top指令',
        url: 'direc_top'
      },
      {
        name: 'tips指令',
        url: 'direc_tips'
      }
    ]
  },
  {
    parent: 'server',
    name: '服务',
    son: [
      {
        name: 'axios',
        url: 'axios'
      },
      {
        name: 'excel',
        url: 'excel'
      },
      {
        name: 'echarts',
        url: 'echarts'
      },
      {
        name: 'md5',
        url: 'md5'
      }
    ]
  },
  {
    parent: 'unknown',
    name: '待补充'
  }
]

//  设置面包屑
const crumbs = {
  select: [
    {
      name: '组件'
    },
    {
      name: '选择'
    }
  ],
  newSelect: [
    {
      name: '组件',
      url: 'select'
    },
    {
      name: '选择',
      url: 'select'
    },
    {
      name: '新建选择'
    }
  ],
  checkbox: [
    {
      name: '组件'
    },
    {
      name: '单选/复选'
    }
  ],
  tab: [
    {
      name: '组件'
    },
    {
      name: 'tab'
    }
  ],
  pagination: [
    {
      name: '组件'
    },
    {
      name: '分页'
    }
  ],
  upload: [
    {
      name: '组件'
    },
    {
      name: '文件上传'
    }
  ],
  time: [
    {
      name: '组件'
    },
    {
      name: '时间'
    }
  ],
  score: [
    {
      name: '组件'
    },
    {
      name: '评分'
    }
  ],
  carousel: [
    {
      name: '组件'
    },
    {
      name: '轮播'
    }
  ],
  dialog: [
    {
      name: '对话框'
    }
  ],
  lazyLoad: [
    {
      name: '指令'
    }, {
      name: '懒加载'
    }
  ],
  axios: [
    {
      name: '服务'
    },
    {
      name: 'axios'
    }
  ],
  excel: [
    {
      name: '服务'
    },
    {
      name: 'excel'
    }
  ],
  echarts: [
    {
      name: '服务'
    },
    {
      name: 'echarts'
    }
  ],
  md5: [
    {
      name: '服务'
    },
    {
      name: 'md5'
    }
  ],
  unknown: [{
    name: '待补充'
  }],
  query: [{
    name: 'query'
  }],
  direc_number: [{
    name: '指令'
  },
  {
    name: '数值文本框'
  }],
  direc_top: [
    {
      name: '指令'
    },
    {
      name: 'Top指令'
    }
  ],
  direc_tips: [
    {
      name: '指令'
    },
    {
      name: 'Tips指令'
    }
  ],
  landmark: [
    {name: '组件'},
    {name: '里程碑'}
  ]
}

/**
 * @author: wangjun
 * @date: 2019-03-05 16:43:00
 * @desc: 配置映射，当当前展示页面hash不在导航栏的情况
 */

const activeMap = {
  newSelect: 'select',
  editSelect: 'select',
  success: 'dialog',
  newTime: 'time'
}

const nav = {
  list: list,
  crumbs: crumbs,
  activeMap: activeMap
}
export default nav
