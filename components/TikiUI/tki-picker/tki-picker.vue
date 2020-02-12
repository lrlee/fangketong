<template xlang="wxml" minapp="mpvue">
	<view class="tki-pk" @touchmove.stop="">
		<view class="tki-pk-mask" :class="{'show':showPk}" @tap="_cancel"></view>
		<view class="tki-pk-cnt" :class="{'show':showPk}">
			<view class="tki-pk-bar">
				<view class="tki-pk-bar-cancel" :style="{'color':cancelColor}" hover-class="hover-c" @tap="_cancel">取消</view>
				<view class="tki-pk-bar-title" :style="{'color':titleColor}">{{title}}</view>
				<view class="tki-pk-bar-confirm" :style="{'color':confirmColor}" hover-class="hover-c" @tap="_confirm">确定</view>
			</view>
			<view class="tki-pk-view">
				<picker-view class="picker-view" v-if="mode == 'selector'" indicator-class="indicator-class" :value="ckValueIndex" @change="_change($event.detail.value)">
					<picker-view-column>
						<view class="item" v-for="(v,i) in range" :key="i">{{v[cpRangeKey]}}</view>
					</picker-view-column>
				</picker-view>
				<picker-view class="picker-view" v-if="mode == 'multiSelector'" indicator-class="indicator-class" :value="ckValueIndex" @change="_change($event.detail.value)">
					<picker-view-column v-for="(v,i) in range" :key="i">
						<view class="item" v-for="(v2,i2) in v" :key="i2">{{v2[cpRangeKey]}}</view>
					</picker-view-column>
				</picker-view>
				<picker-view class="picker-view" v-if="mode == 'multiLinkageSelector' || mode == 'region'" indicator-class="indicator-class" :value="ckValueIndex" @change="_change($event.detail.value)">
					<picker-view-column v-for="(v,i) in linkageRange" :key="i">
						<view class="item" v-for="(v2,i2) in v" :key="i2">{{v2[cpRangeKey]}}</view>
					</picker-view-column>
				</picker-view>
				<picker-view class="picker-view" v-if="mode == 'datetime'" indicator-class="indicator-class" :value="ckValueIndex" @change="_change($event.detail.value)">
					<picker-view-column v-for="(v,i) in timeRange" :key="i">
						<view class="item" v-for="(v2,i2) in v" :key="i2">{{v2.value}}{{v2.label}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
import com from "../common/js/common"
import pro from "../common/js/prototype"
export default {
	name: "tki-picker",
	props: {
		mode: {
			type: String,
			default: 'selector'
			// selector 单列
			// multiSelector 多列
			// multiLinkageSelector 级联 最多6级
			// datetime 日期选择
			// region 省市区
		},
		range: {
			type: Array,
			default: function () {
				return []
			}
		},
		rangeKey: {
			type: String,
			default: 'label'
		},
		deepLength: { // 几级联机
			type: Number,
			default: 3
		},
		linkageKey: { // 联机Key
			type: String,
			default: 'children'
		},
		value: { // 默认值  
			type: [Array, String],
			default: function () {
				return [0, 0, 0, 0, 0, 0]
			}
		},
		start: { // 默认开始日期
			type: String,
			default: function () {
				return `${new Date().getFullYear() - 30}-01-01 00:00:00`
				// return new Date(new Date().setFullYear(new Date().getFullYear() - 30)).format('yyyy-MM-dd HH:mm:ss').replace(/-/g, "/")
			}
		},
		end: { // 默认开始日期
			type: String,
			default: function () {
				return `${new Date().getFullYear() + 30}-12-31 23:59:59`
				// return new Date(new Date().setFullYear(new Date().getFullYear() + 30)).format('yyyy-MM-dd HH:mm:ss').replace(/-/g, "/")
			}
		},
		fields: { // 默认日期显示的日期格式 yyyy-MM-dd HH:mm:ss
			type: String,
			default: 'yyyy-MM-dd HH:mm:ss'
		},
		title: {
			type: String,
			default: ''
		},
		confirmColor: { // 确定按钮颜色
			type: String,
			default: '' // #07bb07
		},
		cancelColor: { // 取消按钮颜色
			type: String,
			default: '' // #757575
		},
		titleColor: { // 标题颜色
			type: String,
			default: '' // #757575
		},
	},
	data() {
		return {
			showPk: false,
			ckValueIndex: this.cpValue,
			linkageRange: [], // 级联数据
			timeRange: [], // 时间数据
			rtVal: {},
		}
	},
	computed: {
		cpValue() {
			// console.log('cpValue')
			if (this.mode == 'datetime') {
				if (Array.isArray(this.value)) {
					return new Date().format('yyyy/MM/dd HH:mm:ss')
					// return new Date().format('yyyy-MM-dd HH:mm:ss').replace(/-/g, "/")
				} else {
					// console.log(this.value)
					return this._fixValueTime(this.value)
				}
			} else {
				return this.value
			}
		},
		cpTime() {
			// console.log('cpTime')
			if (this.mode == 'datetime') {
				return { start: this._fixValueTime(this.start), end: this._fixValueTime(this.end) }
			}
		},
		cpRangeKey() {
			// console.log('cpRangeKey')
			if (this.mode == 'region') {
				return 'name'
			} else {
				return this.rangeKey
			}
		},
		cpDeepLength() {
			// console.log('cpDeepLength')
			if (this.mode == 'region') {
				if (this.deepLength > 3) {
					return 3
				} else {
					return this.deepLength
				}
			} else {
				if (this.deepLength > 6) {
					return 6
				} else {
					return this.deepLength
				}
			}
		},
	},
	methods: {
		_show() {
			this.showPk = true
			this.ckValueIndex = this.rtVal.index
			// console.log(this.ckValueIndex)
			this._change(this.ckValueIndex)
		},
		_hide() {
			this.showPk = false
		},
		_updateRange(val) {
			if (this.range.length <= 0 && this.mode != 'region') {
				return false
			}
			// console.log(val)
			let that = this, index = val, cgVal = [], cgLabel = '', tp = {}, mode = that.mode
			if (index == undefined) {
				index = that.cpValue
			}
			if (mode == "selector") {
				index[0] = index[0] > that.range.length - 1 ? that.range.length - 1 : index[0]
				tp.index = index[0]
				tp.value = that.range[index[0]]
				cgLabel = that.range[index[0]][that.cpRangeKey]
				cgVal[0] = tp
			} else if (mode == "multiSelector") {
				index = index.map((v, i) => {
					let ii = 0
					if (i < that.range.length) {
						ii = v > that.range[i].length - 1 ? that.range[i].length - 1 : v
						tp = {}
						tp.index = ii
						tp.value = that.range[i][ii]
						cgVal[i] = tp
						if (i != 0) {
							cgLabel += '-' + that.range[i][ii][that.cpRangeKey]
						} else {
							cgLabel += that.range[i][ii][that.cpRangeKey]
						}
					}
					return ii
				})
			} else if (mode == "multiLinkageSelector" || mode == "region") {
				if (mode == "multiLinkageSelector") {
					that.linkageRange = that._fixLinkageRange(that.range, index)
				} else {
					that.linkageRange = that._fixLinkageRange(that._getCitys(), index)
				}
				// console.log(that.linkageRange)
				index = index.map((v, i) => {
					let ii = 0
					if (i < that.linkageRange.length) {
						ii = v > that.linkageRange[i].length - 1 ? that.linkageRange[i].length - 1 : v
						tp = {}
						tp.index = ii
						tp.value = that.linkageRange[i][ii]
						cgVal[i] = tp
						if (i != 0) {
							cgLabel += '-' + that.linkageRange[i][ii][that.cpRangeKey]
						} else {
							cgLabel += that.linkageRange[i][ii][that.cpRangeKey]
						}
					}
					return ii
				})
			}
			// 选中的值
			if (mode != "datetime") {
				that.ckValueIndex = [...index].slice(0, cgVal.length)
				that.rtVal = {}
				that.rtVal.index = that.ckValueIndex
				that.rtVal.value = cgVal
				that.rtVal.label = cgLabel
			}
		},
		// 获取转换为picker可用的数据
		_fixLinkageRange(obj, index) {
			let that = this, arr = [], k = 0, t = '', max = ''
			if (index == undefined) {
				index = that.cpValue
			}
			// console.time('z')
			function fo(val) {
				if (k < that.cpDeepLength) {
					arr[k] = val, t = '', max = ''
					if (val.hasOwnProperty(index[k])) {
						max = index[k]
					} else {
						max = val.length - 1
					}
					if (val[max].hasOwnProperty(that.linkageKey)) {
						t = val[max][that.linkageKey]
					}
					k++;
					fo(t)
				}
			}
			fo(obj)
			// console.timeEnd('z')
			// console.log(JSON.parse(JSON.stringify(arr)))
			return arr
		},
		_change(value) {
			if (!this.showPk) {
				this.ckValueIndex = []
				return false
			}
			let that = this, ckindex = value
			if (that.mode == "datetime") {
				// console.log(value)
				let test = [0, 0, 0, 0, 0, 0], fields = that._getFields(), time = '',
					cpValue = new Date(that.cpValue),
					valueTime = [cpValue.getFullYear(), cpValue.getMonth() + 1, cpValue.getDate(), cpValue.getHours(), cpValue.getMinutes(), cpValue.getSeconds()];
				// 检测是否是完整的日期
				test.fill(1, fields.start, fields.end + 1)
				let k = 0;
				for (let i = 0; i < test.length; i++) {
					if (test[i] == 0) {
						time += valueTime[i]
					} else {
						time += that.timeRange[k].length > [value[k]] ? that.timeRange[k][value[k]].value : that.timeRange[k][that.timeRange[k].length - 1].value
						k++;
					}
					if (i < 2) {
						time = time + '/'
					} else if (i == 2) {
						time = time + ' '
					} else if (i > 2 && i < 5) {
						time = time + ':'
					}
				}
				// console.log(time)
				// 修正选中月数天数不对时的问题
				let timeArr = time.split(/\/|:|\s/), tpDate = new Date(timeArr[0], timeArr[1], 0).getDate()
				if (timeArr[2] > tpDate) {
					timeArr[2] = tpDate
					that._initTimeRange(new Date(timeArr[0], timeArr[1] - 1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]).format('yyyy/MM/dd HH:mm:ss'))
				} else {
					that._initTimeRange(time)
				}
				// console.log(time)
			} else {
				if (that.mode == "multiLinkageSelector" || that.mode == "region") {
					ckindex = fixIndex(value)
				}
				that._updateRange(ckindex)
			}
			// 修正联机index
			function fixIndex([...index]) {
				let max = index.length >= that.ckValueIndex.length ? index : that.ckValueIndex
				for (let i = 0; i < max.length; i++) {
					if (index[i] != that.ckValueIndex[i]) {
						index.fill(0, i + 1, index.length);
					}
				}
				return index
			}
		},
		_cancel() {
			this._hide()
			this.$emit("cancel", '');
		},
		_confirm() {
			this._hide()
			if (this.mode != 'datetime') {
				let cgVal = com.deepCopy(this.rtVal.value)
				cgVal.map((v, i) => {
					if (v.value.hasOwnProperty(this.linkageKey)) {
						delete v.value[this.linkageKey]
					}
				})
				this.rtVal.value = cgVal
			} else {
				let fields = this._getFields(), tpVal = [], label = '', rtVal = com.deepCopy(this.rtVal)
				for (let i = fields.start; i <= fields.end; i++) {
					let tp = {}
					tp.index = rtVal.index[i - fields.start]
					tp.value = rtVal.value[i]
					tpVal.push(tp)
					if (i < 2) {
						label += tp.value + '/'
					} else if (i == 2) {
						label += tp.value + ' '
					} else if (i > 2 && i < 5) {
						label += tp.value + ':'
					} else {
						label += tp.value
					}
				}
				label = label.replace(/(^\s*)|(\s*$)/g, "").replace(/(^\/)|(\/$)/g, "").replace(/(^\:)|(\:$)/g, "")
				rtVal.value = tpVal
				rtVal.label = label
				this.rtVal = rtVal
			}
			this.$emit("confirm", JSON.parse(JSON.stringify(this.rtVal)));
			// console.log(JSON.parse(JSON.stringify(this.rtVal)))
		},
		_getCitys() {
			return require("./city/pca-fix.json")
		},
		// 初始化datetime数据
		_initTimeRange(v) {
			// console.log(v)
			// console.time('ttt')
			let that = this,
				cpVal = typeof (v) == "undefined" ? new Date() : new Date(v),
				cpStart = new Date(that.cpTime.start),
				cpEnd = new Date(that.cpTime.end),
				start = cpStart.getTime() >= cpEnd.getTime() ? cpEnd : cpStart,
				end = cpEnd.getTime() <= cpStart.getTime() ? cpStart : cpEnd,
				val = cpVal.getTime() <= cpStart.getTime() ? cpStart : cpVal.getTime() >= cpEnd.getTime() ? cpEnd : cpVal,
				valArr = [val.getFullYear(), val.getMonth() + 1, val.getDate(), val.getHours(), val.getMinutes(), val.getSeconds()],
				startArr = [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds()],
				endArr = [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes(), end.getSeconds()]
			// console.log(cpStart, cpVal, cpEnd)
			// console.log(startArr, valArr, endArr)
			// console.log(valArr)
			// 根据 传入的值生成数据
			// 获取年
			function getYear() {
				let rtArr = [], index = 0, i = 0
				for (let k = startArr[0]; k <= endArr[0]; k++) {
					rtArr.push({ value: k, label: '年' })
					if (k == valArr[0]) {
						index = i
					}
					i++;
				}
				return { value: rtArr, index }
			}
			// 获取月
			function getMonth() {
				let rtArr = [], k = 1, j = 12, index = 0, i = 0
				// 先判定年在判定月
				if (valArr[0] == startArr[0] || valArr[0] == endArr[0]) {
					if (startArr[0] == endArr[0]) {
						// 同一年
						k = startArr[1]
						j = endArr[1]
					} else if (valArr[0] == startArr[0]) {
						// 起始年
						k = startArr[1]
					} else if (valArr[0] == endArr[0]) {
						// 结束年
						j = endArr[1]
					}
				}
				for (k; k <= j; k++) {
					rtArr.push({ value: k, label: '月' })
					if (k == valArr[1]) {
						index = i
					}
					i++;
				}
				return { value: rtArr, index }
			}
			// 获取天
			function getDate() {
				let rtArr = [], k = 1, j = new Date(valArr[0], valArr[1], 0).getDate(), index = 0, i = 0, month = getMonth(), fixIndex = false
				if (month.value.length != 12) { // 在起始年获结束年 
					if (month.index == 0 && month.value.length != 1) {
						// 开始月
						k = startArr[2]
						// if (that.timeRange.hasOwnProperty(2)) {
						// 	if (that.timeRange[2].length != rtArr.length) {
						// 		// 需要修真
						// 		console.log('需要修真数据')
						// 	}
						// }
					} else if (month.index == 0 && month.value.length == 1) {
						// 同一个月
						k = startArr[2]
						j = endArr[2]
					} else if ((month.index == month.value.length - 1)) {
						// 结束月
						j = endArr[2]
					}
				}
				for (k; k <= j; k++) {
					rtArr.push({ value: k, label: '日' })
					if (k == valArr[2]) {
						index = i
					}
					i++;
				}
				return { value: rtArr, index }
			}
			// 获取小时
			function getHours() {
				let rtArr = [], k = 0, j = 23, index = 0, i = 0,
					startDays = new Date(startArr[0], startArr[1] - 1, startArr[2]).getTime(),
					endDays = new Date(endArr[0], endArr[1] - 1, endArr[2]).getTime(),
					valDays = new Date(valArr[0], valArr[1] - 1, valArr[2]).getTime()
				// 判定起始时间是否在同一天
				if (valDays == startDays && valDays != endDays) {
					// console.log('同一天')
					k = startArr[3]
				} else if (valDays == endDays && valDays != startDays) {
					// console.log('开始后')
					j = endArr[3]
				} else if (valDays == endDays && valDays == startDays) {
					// console.log('结束前')
					k = startArr[3]
					j = endArr[3]
				} else {
					// console.log('期间')
					// console.log(k, j)
				}
				for (k; k <= j; k++) {
					rtArr.push({ value: k, label: '时' })
					if (k == valArr[3]) {
						index = i
					}
					i++;
				}
				return { value: rtArr, index }
			}
			// 获取分钟
			function getMinutes() {
				let rtArr = [], k = 0, j = 59, index = 0, i = 0,
					startHours = new Date(startArr[0], startArr[1] - 1, startArr[2], startArr[3]).getTime(),
					endHours = new Date(endArr[0], endArr[1] - 1, endArr[2], endArr[3]).getTime(),
					valHours = new Date(valArr[0], valArr[1] - 1, valArr[2], valArr[3]).getTime()
				// 判定起始时间是否在同一时
				if (valHours == startHours && valHours != endHours) {
					k = startArr[4]
				} else if (valHours == endHours && valHours != startHours) {
					j = endArr[4]
				} else if (valHours == endHours && valHours == startHours) {
					k = startArr[4]
					j = endArr[4]
				}
				for (k; k <= j; k++) {
					rtArr.push({ value: k, label: '分' })
					if (k == valArr[4]) {
						index = i
					}
					i++;
				}
				return { value: rtArr, index }
			}
			// 获取秒
			function getSeconds() {
				let rtArr = [], k = 0, j = 59, index = 0, i = 0,
					startHours = new Date(startArr[0], startArr[1] - 1, startArr[2], startArr[3], startArr[4]).getTime(),
					endHours = new Date(endArr[0], endArr[1] - 1, endArr[2], endArr[3], endArr[4]).getTime(),
					valHours = new Date(valArr[0], valArr[1] - 1, valArr[2], valArr[3], valArr[4]).getTime()
				// 判定起始时间是否在同一秒
				if (valHours == startHours && valHours != endHours) {
					k = startArr[5]
				} else if (valHours == endHours && valHours != startHours) {
					j = endArr[5]
				} else if (valHours == endHours && valHours == startHours) {
					k = startArr[5]
					j = endArr[5]
				}
				for (k; k <= j; k++) {
					rtArr.push({ value: k, label: '秒' })
					if (k == valArr[5]) {
						index = i
					}
					i++;
				}
				return { value: rtArr, index }
			}
			let year = getYear(), month = getMonth(), date = getDate(), hours = getHours(), minutes = getMinutes(), seconds = getSeconds(),
				fields = that._getFields(), tpIndex = new Array(6), tpRange = new Array(6)
			// console.log(year)
			// console.log(month)
			// console.log(date)
			// console.log(hours)
			// console.log(minutes)
			// console.log(seconds)
			// console.timeEnd('ttt')
			tpIndex = [year.index, month.index, date.index, hours.index, minutes.index, seconds.index].slice(fields.start, fields.end + 1)
			tpRange = [year.value, month.value, date.value, hours.value, minutes.value, seconds.value].slice(fields.start, fields.end + 1)
			that.timeRange = [...tpRange]
			that.$nextTick(() => {
				that.ckValueIndex = tpIndex
				that.rtVal = {}
				that.rtVal.index = tpIndex
				that.rtVal.value = valArr
			})
		},
		// 修复value为标准日期 TODO 不是很好，不过暂时没有更好的方法
		_fixValueTime(val) {
			let that = this, fields = that._getFields(), time = '', fixVal = val.replace(/-/g, "/").split(/\/|:|\s/),
				test = new Array(6).fill(0, 0, 6), // 新建一个6位数数组
				newTime = fixVal.length == 6 ? new Date(val.replace(/-/g, "/")) : new Date(),  // 如果传入了标准时间，就用标准时间，否则用当前时间填补
				valueTime = [newTime.getFullYear(), newTime.getMonth() + 1, newTime.getDate(), newTime.getHours(), newTime.getMinutes(), newTime.getSeconds()]
			// test
			if (fields.end <= fixVal.length - 1) {
				fixVal = fixVal.slice(fields.start, fields.end + 1)
			}
			if (fixVal.length + fields.start <= fields.end) {
				test.fill(1, fields.start, fixVal.length + fields.start)
			} else {
				test.fill(1, fields.start, fields.end + 1)
			}
			for (let i = 0; i < test.length; i++) {
				if (test[i] == 0) {
					time += valueTime[i]
				} else {
					time += fixVal[i - fields.start]
				}
				if (i < 2) {
					time = time + '/'
				} else if (i == 2) {
					time = time + ' '
				} else if (i > 2 && i < 5) {
					time = time + ':'
				}
			}
			// console.log(time)
			return time
		},
		_getFields() {
			let that = this, test = ["y+", "M+", "d+", "H+", "m+", "s+"], startLock = -1, start = 0, end = 5
			// 确定显示哪些字段
			for (let i = 0; i < test.length; i++) {
				if (new RegExp("(" + test[i] + ")").test(that.fields)) {
					if (startLock == -1) {
						startLock = 0
						start = i
						continue
					}
					end = i
				}
			}
			return { start, end }
		},
		// 设置打开时的默认值
		_setValue(val) {
			this._updateRange(val);
		},
		// 初始化picker
		_initPicker() {
			if (this.mode == "datetime") {
				this._initTimeRange(this.cpValue)
			} else {
				this._updateRange();
			}
		}
	},
	watch: {
		mode() {
			// console.log('mode')
			this._initPicker()
		},
		range() {
			// console.log('range')
			this._initPicker()
		},
		linkageKey() {
			// console.log('linkageKey')
			this._initPicker()
		},
		cpTime() {
			// console.log('cpTime')
			this._initTimeRange(this.cpValue)
		},
		cpValue() {
			// console.log('cpValue')
			this._initPicker()
		},
		cpRangeKey() {
			// console.log('cpRangeKey')
			this._initPicker()
		},
		cpDeepLength() {
			// console.log('cpDeepLength')
			this._initPicker()
		},
	},
	mounted() {
		this._initPicker()
	}
}
</script>

<style>
@import "style.css";
</style>
