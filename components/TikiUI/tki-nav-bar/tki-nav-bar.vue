<template xlang="wxml">
	<view class="tki-nav-bar u-class">
		<view class="tki-nav-bar-h" v-if="!transition">
			<view class="_bar-h-status" :style="{'background-color':statusBg}"></view>
			<view class="_bar-h-title" :style="{'background-color':titleBg}"></view>
		</view>
		<view class="tki-nav-bar-body">
			<view class="_bar-body-status" :style="[{'background-color':statusEndBg,'opacity':opacity}]"></view>
			<view class="_bar-body-title-bg" :style="[{'background-color':titleEndBg,'opacity':opacity}]"></view>
			<view class="_bar-body-title">
				<view class="_body-title-back" :hover-class="isBack?'nav-bar-hover':'none'" @tap="_back">
					<view class="tikiui _body-title-back-ic" :class="[backIc]" :style="{'color':color}" v-if="isBack"></view>
					<view class="_body-title-back-txt" :style="{'color':color}" v-if="isBack">{{backTxt}}</view>
				</view>
				<view class="_body-title-title">
					<view class="_body-title-title-txt" :style="{'color':color}">
						{{title}}
					</view>
				</view>
				<view class="_body-title-more">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "tki-nav-bar",
	props: {
		'transition': {
			type: Boolean,
			default: false
		},
		'statusStyle': { // 状态栏、胶南 颜色 white/black
			type: String,
			default: 'black'
		},
		'titleBg': { // 标题背景色
			type: String,
			default: '#ffffff'
		},
		'statusBg': { // 状态栏背景色
			type: String,
			default: '#ffffff'
		},
		'startColor': { // 文本开始颜色
			type: String,
			default: '#ffffff'
		},
		'endColor': { // 文本结束颜色
			type: String,
			default: '#000000'
		},
		'top': { // 渐变背景结束的距离
			type: Number,
			default: 70
		},
		'isBack': { // 是否可以返回
			type: Boolean,
			default: true
		},
		'backdelta': { // 返回层级
			type: Number,
			default: 1
		},
		'backIc': { // 返回图标
			type: String,
			default: 'tkic-left'
		},
		'backTxt': {  // 返回文字
			type: String,
			default: ''
		},
		'title': { // 标题
			type: String,
			default: ''
		}
	},
	data() {
		return {
			statusEndBg: this.statusBg,
			titleEndBg: this.titleBg,
			opacity: this.transition ? 0 : 1,
			color: this.startColor
		}
	},
	created: function () {
		this._setStatusStyle(this.statusStyle)
	},
	methods: {
		_back() {
			if (this.isBack) {
				uni.navigateBack({
					delta: this.backdelta
				});
			}
		},
		_setStatusStyle(v) {
			let c = '#000000';
			if (v == 'white') {
				c = '#ffffff'
			}
			//#ifndef APP-PLUS
			uni.setNavigationBarColor({
				frontColor: c,
				backgroundColor: this.titleBg,
				animation: {
					duration: 300,
					timingFunc: 'easeIn'
				}
			})
			//#endif
		},
		_onPageScroll(e) {
			let op = (1 / this.top) * e.scrollTop
			if (op <= 10 && this.transition) {
				this.opacity = op
			}
			if (op <= 1) {
				if (this.color != this.startColor) {
					this.color = this.startColor
					if (this.startColor.toLowerCase() == '#ffffff' || this.startColor.toLowerCase() == '#fff') {
						this._setStatusStyle('white')
					}
					this.$emit('topStart', true)
				}
			} else {
				if (this.color != this.endColor) {
					this.color = this.endColor
					if (this.endColor == '#000000' || this.endColor == '#000') {
						this._setStatusStyle('black')
					}
					this.$emit('topEnd', true)
				}
			}
		},
	},
	computed: {
		sStyle() {
			return this.statusStyle
		}
	},
	watch: {
		statusStyle(n, o) {
			this._setStatusStyle(val)
		}
	}
}
</script>

<style>
    @import "./style.css";
</style>
