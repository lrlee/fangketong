### 获取短信验证码

### 使用方法
在 `script` 中引入组件
``` javascript
import tkiWatermark from "@/components/tikiui/tki-watermark/tki-watermark.vue"
export default {
    components: {tkiWatermark}
}
```
在 `template` 中使用
``` javascript
<tki-watermark :show="true" text="测试版，仅供内部使用" color="rgba(255, 0, 0, 0.6)" :number="60" />
```
### 属性

|属性名|类型|默认值|可选值|说明|
|:-|:-:|:--:|:--:|-:|
|show|Boolean| false | true |是否显示水印|
|text|String|TikiUi版权所有| |默认显示的水印文字|
|color|String|#b1b1b1| |水印文本颜色|
|number|Number|30| |水印重复显示次数|
|size|Number|28| |字体大小|

### 方法
|方法名|参数|默认值|说明|
|:-|:-:|:--:|-:|

### 事件
|事件名|返回值|说明|
|:-|:-:|-:|