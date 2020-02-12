### 选择器

### 使用方法
在 `script` 中引入组件
``` javascript
import tkiPicker from "@/components/tki-picker/tki-picker.vue"
export default {
    components: {tkiPicker}
}
```
在 `template` 中使用
``` javascript
// 单列
<tki-picker @confirm="pickerResult" @cancel="pickerCancel" mode="selector" ref="selector" :value="[12]" :range="selector" rangeKey="label" />
// 多列
<tki-picker @confirm="pickerResult" @cancel="pickerCancel" mode="multiSelector" ref="multiSelector" :value="[12,12,12]" :range="multiSelector" rangeKey="label" />
// 级联（最多6级）
<tki-picker @confirm="pickerResult" @cancel="pickerCancel" mode="multiLinkageSelector" ref="multiLinkageSelector" :deepLength="3" :value="[1,9,0]" :range="mpValue" rangeKey="label" />
// 日期时间
<tki-picker @confirm="pickerResult" @cancel="pickerCancel" mode="datetime" ref="datetime" :fields="fields" :start="start" :value="value" :end="end" />
// 省市区
<tki-picker @confirm="pickerResult" @cancel="pickerCancel" mode="region" ref="region" :value="[1,1,1]" :deepLength="3"/>
```
### 属性
|属性名|类型|默认值|可选值|说明|
|:-|:-:|:--:|:--:|-:|
|mode|String|selector|见下表|选择器类型|
|range|Array|[]| |数据|
|rangeKey|String|label| |指定 Object 中 key 的值作为选择器显示的内容|
|value|String|[0,0,0,0,0,0,]、当前日期字符串| |默认选中的索引|
|start|String|当前年份的前30年| |开始字符串日期|
|end|String|当前年份的后30年| |结束字符串日期|
|fields|String|yyyy-MM-dd HH:mm:ss| yyyy-MM-dd、HH:mm:ss |日期格式|
|title|String| | |标题|
|confirmColor|String|#07bb07| |确定按钮颜色|
|titleColor|String|#07bb07| |标题颜色|
|cancelColor|String|#757575| |取消按钮颜色|

### mode
|值|说明|
|:-|-:|
|selector|单列|
|multiSelector|多列|
|multiLinkageSelector|级联（最多6级）|
|datetime|日期时间|
|region|省市区|

### selector 数据格式
<details>
<summary>数据格式</summary>

``` json
[
    { label: '1', value: '1' }, 
    { label: '2', value: '2' }
]
```
</details>

### multiSelector 数据格式
<details>
<summary>数据格式</summary>

``` json
[
    [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
    ],
    [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
    ],
    [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
    ],
],
```
</details>

### multiLinkageSelector 数据格式
<details>
<summary>数据格式</summary>

``` json
[
    {
        "label": 'phone',
        value: 0,
        children: [
            {
                "label": 'iphone',
                value: 1,
                children: [{
                    "label": 'iphoneX',
                    value: 1
                },
                {
                    "label": 'iphone8',
                    value: 2
                }, {
                    "label": 'iphone8 Plus',
                    value: 3
                }]
            },
            {
                "label": 'android',
                value: 1,
                children: [
                    {
                        "label": 'vivo',
                        value: 1
                    },
                    {
                        "label": '魅族',
                        value: 2
                    }, {
                        "label": '小米',
                        value: 3
                    }
                ]
            }
        ]
    },
    {
        "label": 'PC',
        value: 0,
        children: [
            {
                "label": 'mac',
                value: 1,
                children: [
                    {
                        "label": 'macbook Pro',
                        value: 1
                    },
                    {
                        "label": 'iMac',
                        value: 2
                    }, {
                        "label": 'mackbook',
                        value: 3
                    }, {
                        "label": 'mackbook air',
                        value: 3
                    }
                ]
            },
            {
                "label": 'windows',
                value: 1,
                children: [
                    {
                        "label": 'dell',
                        value: 1
                    },
                    {
                        "label": 'surface',
                        value: 2
                    }, {
                        "label": 'thinkpad',
                        value: 3
                    }
                ]
            }
        ]
    }
]
```
</details>

### datetime 数据格式
自动生成与fields一致的日期数据，比如fields为：'MM-dd HH:mm',生成的选择数据为：'x月x日x时x分'

### region 数据格式
自带city数据，数据格式和 multiLinkageSelector 一致

### 方法
|方法名|参数|默认值|说明|
|:-|:-:|:--:|-:|
|_show()| | |显示选择器|
|_hide()| | |隐藏选择器|
|_fixLinkageRange()| | |返回选择器转换后的range|

### 事件
|事件名|返回值|说明|
|:-|:-:|-:|
|confirm|JSON数据|返回选择器选中的内容|
|cancel|''|取消的回调事件|