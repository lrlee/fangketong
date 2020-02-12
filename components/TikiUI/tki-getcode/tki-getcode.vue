<template xlang="wxml" minapp="mpvue">
	<view class="tki-getcode">
		<text class="tki-getcode-lb" :style="{ 'font-size': cpSize + 'px', color: color }">{{ label }}</text>
	</view>
</template>

<script>
import { req, ui, dev } from "../common/js/index";
export default {
	name: "tki-getcode",
	props: {
		api: {
			type: String,
			default: ''
		},
		pr: {
			type: Object,
			default: function () {
				return { tel: '' }
			}
		},
		time: {
			type: Number,
			default: 60
		},
		lb: {
			type: String,
			default: '获取验证码'
		},
		color: {
			type: String,
			default: '#b1b1b1'
		},
		size: {
			type: Number,
			default: 28
		},
		alert: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			status: 0,
			itime: '',
			outtime: this.time,
			label: this.lb,
		}
	},
	computed: {
		cpSize() {
			return uni.upx2px(this.size)
		}
	},
	methods: {
		_getCode() {
			let that = this
			if (that.status == 1) return false
			that.status = 1
			that.label = '获取中'
			let res = req.post(this.api, this.pr).then(d => {
				if (d.success) {
					if (that.alert) {
						ui.showModal('验证码', d.data.code, res => {
							dev.setClipboard(d.data.code)
						}, { confirmText: '复制内容', showCancel: true })
					}
					that._res({ code: 1, msg: '验证码发送成功', data: d })
					let time = that.outtime;
					that.itime = setInterval(() => {
						time--;
						that.label = time + "s 后重试";
						if (time == 0) {
							that._cancelCode()
						}
					}, 1000);
				} else {
					that._cancelCode()
					that._res({ code: 0, msg: '验证码发送失败', data: d })
				}
			}).catch(e => {
				that._cancelCode()
				that._res({ code: 0, msg: '验证码发送失败', data: e })
			})
		},
		_cancelCode() {
			let that = this
			clearInterval(that.itime);
			that.label = that.lb;
			that.status = 0;
		},
		_res(jp) {
			let that = this
			that.$emit('result', jp)
		}
	}
}
</script>

<style>
@import "style.css";
</style>
