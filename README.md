# frame2.0

> 个人搭建的vue组件框架2.0版本

```
更新记录：
1、 2019-03-05 上传基础框架代码和准备工作
2、 2019-03-06 上传select插件代码
3、 2019-03-07 上传checkbox/radio插件
4、 2019-03-08 上传tab插件
5、 2019-03-11 上传pagination插件
6、 2019-03-13 上传upload插件
7、 2019-03-14 上传time插件初稿
8、 2019-03-15 完善time插件功能
9、 2019-03-22 上传query插件（针对公司业务定制）
10、 2019-03-25 完善query插件功能
11、 2019-03-28 上传部分对话框插件
12、 2019-04-10 公用方法添加常用的正则表达式校验方法
13、 2019-04-17 优化upload插件，新增底文提示功能；完善dialog progress插件
14、 2019-04-23 上传carousel插件；修复select插件值改变监听失效问题
15、 2019-04-24 公共函数上传函数防抖和函数节流
16、 2019-05-17 解决hash后面附参数不能正常激活状态栏和定位组件问题
17、 2019-05-22 优化time插件，联动控制精确到时分秒
18、 2019-05-24 上传v-focus和v-number指令
19、 2019-05-25 完善carousel插件;上传v-top指令
20、 2019-05-29 上传v-lazyload指令
21、 2019-06-03 time插件兼容ie，修复最大时间控制
22、 2019-06-05 上传v-tip指令
23、 2019-06-17 修复query插件bug；细化登陆、业务路由；上传登陆模块等
24、 2019-06-21 优化v-tip指令；上传登录模块；上传接口配置文件和跨域代理
25、 2019-06-23 引入并使用vuex；优化dialog的msg提示框样式；优化引入组件方式等
26、 2019-06-26 优化v-tip指令；修复v-top指令在safari中的bug；优化页面框架高度自适应
27、 2019-06-29 上传landmark和step组件；修改v-tip指令样式
28、 2019-07-04 上传动态打开自定义表单窗口组件；优化三类信息提示框样式；使用eventBus
29、 2019-07-13 上传form、table、input组件；修改tips指令；丰富button样式以及utils功能
30、 2019-07-14 上传bthGroup组件；优化table组件
31、 2019-07-18 完善input组件；优化table组件
32、 2019-07-21 上传dropdown组件
33、 2019-07-22 优化form组件、validate验证；优化dropdown、input组件配合表单验证报错
34、 2019-07-24 优化dropdown、table组件
35、 2019-07-25 上传row、col组件；优化input组件对键盘事件修饰符进行监听
36、 2019-07-27 上传dropOption组件，配合dropdown组件支持自定义选项
37、 2019-08-03 迭代开发文件上传组件
38、 2019-08-07 上传loading组件；优化若干组件
39、 2019-08-21 上传divider组件；table组件支持空单元格填充；优化dropdown组件；优化表单验证
40、 2019-09-19 优化table组件、弹出表单样式、下拉插件
41、 2019-10-12 优化文件上传组件，优化异常处理，初始化未传入图片名称，自动根据资源路径解析名称
42、 2019-10-18 公共函数补充格式化数值方法；优化query插件，支持初始化完成调用初始化函数
43、 2019-10-25 修复分页插件不感知分页总数为0的情况
44、 2019-11-01 修复分页插件怪异问题；完善各业务组件说明文档
45、 2019-11-22 文件上传插件支持对删除和替换事件抛出，允许配置是否直接下载图片和视频资源；完善query初始化事件
46、 2019-12-13 文件上传支持同源（也支持允许跨域）图片下载；表格组件完善对url的显示；重写弹窗插件，优化了交互以及丰富了功能。
```
