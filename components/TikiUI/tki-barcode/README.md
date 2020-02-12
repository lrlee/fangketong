### 使用方法
在 `script` 中引入组件
``` javascript
import tkiBarcode from "@/components/tki-barcode/tki-barcode.vue"
export default {
    components: {tkiBarcode}
}
```
在 `template` 中使用
``` javascript
<view>
    <tki-barcode
    ref="barcode"
    :show="show"
    :format="format"
    :cid="cid"
    :val="val"
    :unit="unit"
    :opations="opations"
    :onval="onval"
    :loadMake="loadMake"
    @result="barresult" />
</view>
```
### 属性

|属性名|类型|默认值|可选值|说明|
|:-|:-:|:--:|:--:|-:|
|cid|String|tki-barcode-canvas| |canvasId，页面存在多个条形码组件时需设置不同的ID|
|unit|String|upx|px|单位|
|show|Boolean|true| |默认使用组件中的image标签显示条形码|
|format|String|code128| code128\code39\ean13\ean8\upc\itf14|条形码类型|
|val|String|1234567890128| |要生成的内容|
|opations|JSON|见下表| |条形码参数|
|onval|Boolean|false| |监听val值变化自动重新生成条形码|
|loadMake|Boolean|true| |组件初始化完成后自动生成条形码，val需要有值|
### opations
|属性名|类型|默认值|可选值|说明|
|:-|:-:|:--:|:--:|-:|
|format|String|code128| |要使用的条形码类型。</br>提示：微信APP扫码支持的条码类型有 code128\code39\ean13\ean8\upc\itf14|
|width|Number|4| |设置条之间的宽度|
|height|Number|120| |设置条的高度|
|displayValue|Boolean|true| |是否在条形码下方显示文字|
|text|String|1234567890128| |条码内容（会覆盖val属性）|
|textAlign|String|center|left\right |设置文本的水平对齐方式|
|textPosition|String|bottom|top |设置文本的垂直位置|
|textMargin|Number|5|top |设置文本的垂直位置|
|fontSize|Number|24| |设置文本的大小|
|fontColor|String(color)|#000000| |设置文本的颜色|
|lineColor|String(color)|#000000| |设置条形码的颜色|
|background|String(color)|#FFFFFF| |设置条形码的背景色|
|margin|Number|0| |设置条形码周围的空白边距|
|marginTop|Number|undefined| |设置条形码周围的上边距|
|marginBottom|Number|undefined| |设置条形码周围的下边距|
|marginLeft|Number|undefined| |设置条形码周围的左边距|
|marginRight|Number|undefined| |设置条形码周围的右边距|
### 方法
|方法名|参数|默认值|说明|
|:-|:-:|:--:|-:|
|_makeCode()| | |生成条形码|
|_clearCode()| | |清空条形码（清空条形码会触发result回调 返回值为空）|
|_saveCode()| | |保存条形码到图库|

### 事件
|事件名|返回值|说明|
|:-|:-:|-:|
|result|生成的图片base64或图片临时地址|返回条形码路径 注：_clearCode()后返回空|