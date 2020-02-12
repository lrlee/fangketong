<template xlang="wxml">
	<view class="tki-at" v-if="isShow" @touchmove.stop="">
		<view class="tki-at-b" v-if="step == 0">
			<view class="tki-at-b-t">{{title?title:'提示'}}</view>
			<view class="tki-at-b-b">{{body?body:'为保证程序能够正常使用，需要获取您的微信授权（用户信息）！'}}</view>
			<button class="tki-at-b-btn" :style="[{'background-color':btnBgColor?btnBgColor+' !important':'','color':btnColor?btnColor:''}]" hover-class="hover-c" open-type="getUserInfo" @getuserinfo="_getUserInfo" type="default" :loading="btnLoding" :disabled="btnDisabled">
				去授权
			</button>
		</view>
		<view class="tki-at-b" v-else-if="step == 1">
			<view class="tki-at-b-t">提示</view>
			<view class="tki-at-b-b">因您拒绝了我们请求的微信授权（用户信息），导致程序无法正常使用，请点击下方按钮（打开设置按钮）后，再打开的页面给用户信息一栏打开，以保证程序正常使用！</view>
			<button class="tki-at-b-btn" hover-class="hover-c" @tap="_openSetting" type="default" :loading="btnLoding" :disabled="btnDisabled">
				打开设置
			</button>
		</view>
	</view>
</template>

<script>
export default {
	name: "tki-authorize",
	props: ['title', 'body', 'btnBgColor', 'btnColor'],
	data() {
		return {
			isShow: false,
			step: 0
		}
	},
	methods: {
		_getUserInfo(e) {
			let that = this
			wx.getSetting({
				success(res) {
					console.log(e,res,"getuserinfo")
					if (!res.authSetting['scope.userInfo']) {
						// that.step = 1
					} else {
						that.$emit('result', true)
						that.isShow = false
					}
				}
			})
		},
		_openSetting(e) {
			wx.openSetting({
				success(res) {
				}
			})
		},
		_show() {
			this.isShow = true
		},
		_hide() {
			this.isShow = false
		}
	}
}
</script>

<style>
@import "style.css";
</style>
