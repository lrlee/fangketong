### 获取短信验证码

### 使用方法
在 `script` 中引入组件
``` javascript
import tkiGetcode from "@/components/tikiui/tki-getcode/tki-getcode.vue"
export default {
    components: {tkiGetcode}
}
```
在 `template` 中使用
``` javascript
<tki-getcode :api="'api/getcode'" :pr="pr" :time="180" :lb="'我要验证码'" :color="'#fff000'" :size="80" />
```
### 属性

|属性名|类型|默认值|可选值|说明|
|:-|:-:|:--:|:--:|-:|
|api|String| | |获取验证码接口地址|
|pr|Object| | |接口参数，json对象类型|
|time|Number| | |多少秒后重试|
|lb|String|获取验证码| |默认显示的文字|
|color|String|#b1b1b1| |文本颜色|
|size|Number|28| |字体大小|
|alert|Boolean|false|true |是否弹出验证码（一般用于测试）|

### 方法
|方法名|参数|默认值|说明|
|:-|:-:|:--:|-:|
|_getCode()| | |获取验证码|
|_cancelCode()| | |取消验证码|

### 事件
|事件名|返回值|说明|
|:-|:-:|-:|
|result|josn对象，code:0 失败，code:1成功| |