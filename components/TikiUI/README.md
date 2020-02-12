###更新日志

###### 0.0.91 | 2019-9-12
1. 修复 tki-picker 连续两次选择相同值返回值会类增加的问题
1. 修复 tki-img-compress 在小程序、H5 时 type="base64"无效的问题

###### 0.0.90 | 2019-8-26
1. tki-tree 新增 idKey、foldAll 属性
2. tki-tree 修复单选可以被取消的BUG

###### 0.0.89 | 2019-8-21
1. request.js 新增socket
2. 新增device.js —— 设备相关 export dev
3. 新增jweixin-1.5.0.js —— 微信js-sdk环境 export wxjs
4. 修改pay.js 中的wxH5Pay方法，不在需要传入wx-jssdk环境
5. 修改user.js 中的wxh5SetConfig方法，不在需要传入wx-jssdk环境
6. 补齐一些方法的参数说明

###### 0.0.88 | 2019-8-20
1. 修改tki-picker一些样式

###### 0.0.87 | 2019-8-19
1. 修改tki-tree组件的返回值以及样式

###### 0.0.86 | 2019-8-16
1. tki-tree组件新增selectParent属性

###### 0.0.85 | 2019-8-15
1. 新增tki-tree组件，基于[无限级树形组件](https://ext.dcloud.net.cn/plugin?id=291 "作者： MixR")修改，感谢原作者！
2. tki-picker 新增title、titleColor属性

###### 0.0.84 | 2019-7-25
1. 更新common.less

###### 0.0.83 | 2019-6-27
1. 修复 0.0.82 更新导致 tki-qrcode 无法生成二维码

###### 0.0.82 | 2019-6-26
1. tki-qrcode 继续更新一些内容

###### 0.0.81 | 2019-6-04
1. tki-qrcode 更新一些内容

###### 0.0.8 | 2019-6-01
1. 新增tki-picker 组件

###### 0.0.74 | 2019-05-23
1. 修复二维码在非自定义组件下v-if无法生成二维码的问题
2. 新增tki-search 搜索组件

###### 0.0.73 | 2019-05-23
1. 修复条形码组件H5下图片过大的BUG
2. 重写图片压缩组件

###### 0.0.72 | 2019-05-15
1. 新增条形码组件

###### 0.0.71 | 2019-05-10
1. ui.showModal 统一按钮布局（确定在右，取消在左）

###### 0.0.71 | 2019-05-09
1. 修复pay.js H5支付参数BUG

###### 0.0.7 | 2019-05-07
1. 修复ui.showModal在安卓手机上点击返回不会触发取消事件的BUG
2. 修复request请求拦截器无效的BUG
3. 修复getCode组件alert属性在H5端参数错误的BUG

###### 0.0.6 | 2019-05-06
1. 新增水印组件
2. 更新获取验证码组件，新增alert属性，修复多个组件时验证码无法同时发送的问题

###### 0.0.5 | 2019-04-23
1. 新增 pay.js 
2. 新增图片压缩组件

###### 0.0.4 | 2019-04-18
1. 修复 request.js 的一些BUG

###### 0.0.3 | 2019-04-10
1. 新增加载更多组件
2. 新增获取验证码组件

###### 0.0.2 | 2019-04-09
1. 新增common.js —— 公用库 export com
2. 新增navigate.js —— 导航库 export nav
3. 新增prototype.js —— 原型扩张 
4. 新增regexp.js —— 正则表达 export reg
5. 新增ui.js —— ui库 export ui
6. 新增user.js —— 用户相关 export user
7. 新增request.js —— 网络封装 export req
8. 新增config.js —— 配置项目 export cf
9. 新增浮动键盘组件
10. 新增二维码生成组件

###### 0.0.1 | 2019-02-28
1. common.less 新增设计稿大小配置 用户使用请引入userCom.less,框架请引入frameworkCom.less,不要直接引入common.less


###### 0.0.0 | 2018-12-30
初次发布
