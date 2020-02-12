### 搜索框

### 使用方法
在 `script` 中引入组件
``` javascript
import tkiSearch from "@/components/tki-search/tki-search.vue"
export default {
    components: {tkiSearch}
}
```
在 `template` 中使用
``` javascript
<tki-search :val="val" :placeholder="placeholder" @result="result" @clear="clear" />
```
### 属性

|属性名|类型|默认值|可选值|说明|
|:-|:-:|:--:|:--:|-:|
|val|String|  | |默认显示的文本内容|
|placeholder|String|请输入搜索内容| |placeholder内容|

### 方法
|方法名|参数|默认值|说明|
|:-|:-:|:--:|-:|
|_setVal()| | |设置搜索框值|
|_search()| | |调用搜索并触发 result 回调事件|
|_empty()| | |清空搜索框并触发 clear 回调事件|

### 事件
|事件名|返回值|说明|
|:-|:-:|-:|
|result| 输入框值 |点击搜索按钮的回调|
|clear| 空 |清空搜索框的回调事件|
