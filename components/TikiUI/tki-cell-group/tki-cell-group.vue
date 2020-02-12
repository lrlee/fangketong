<template xlang="wxml">
	<view class="tki-cell-group u-class" :style="{'margin-top':mTopCp,'margin-bot':mBotCp,'margin-left':mLeftCp,'margin-right':mRightCp,'padding-top':pTopCp,'padding-bot':pBotCp,'padding-left':pLeftCp,'padding-right':pRightCp,}">
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: "tki-cell-group",
	props: [
		'mTop',
		'mBot',
		'mLeft',
		'mRight',
		'pTop',
		'pBot',
		'pLeft',
		'pRight',
	],
	data() {
		return {
		}
	},
	onUnload: function () {
	},
	methods: {},
	computed: {
		mTopCp: function () {
			return this.mTop ? uni.upx2px(this.mTop) + 'px' : '';
		},
		mBotCp: function () {
			return this.mBot ? uni.upx2px(this.mBot) + 'px' : '';
		},
		mLeftCp: function () {
			return this.mLeft ? uni.upx2px(this.mLeft) + 'px' : '';
		},
		mRightCp: function () {
			return this.mRight ? uni.upx2px(this.mRight) + 'px' : '';
		},
		pTopCp: function () {
			return this.pTop ? uni.upx2px(this.pTop) + 'px' : '';
		},
		pBotCp: function () {
			return this.pBot ? uni.upx2px(this.pBot) + 'px' : '';
		},
		pLeftCp: function () {
			return this.pLeft ? uni.upx2px(this.pLeft) + 'px' : '';
		},
		pRightCp: function () {
			return this.pRight ? uni.upx2px(this.pRight) + 'px' : '';
		},
	}
}
</script>

<style>
    /* @import "./base/base.css"; */
    @import "./style.css";
</style>
