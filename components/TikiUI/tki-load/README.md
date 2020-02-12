### 加载更多

### 使用方法
在 `script` 中引入组件
``` javascript
import tkiLoad from "@/components/tki-load/tki-load.vue"
export default {
    components: {tkiLoad}
}
```
在 `template` 中使用
``` javascript
<tki-load :lb="list.text" :color="'#fff000'" :size="80" />
```
### 属性

|属性名|类型|默认值|可选值|说明|
|:-|:-:|:--:|:--:|-:|
|lb|String|加载中| |显示的文本内容|
|color|String|#b1b1b1| |文本颜色|
|size|Number|26| |字体大小|
