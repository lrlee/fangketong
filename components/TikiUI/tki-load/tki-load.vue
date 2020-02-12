<template xlang="wxml" minapp="mpvue">
	<view class="tki-load">
		<text class="tki-load-lb" :style="{'font-size':cpSize+'px','color':color}">{{lb}}</text>
	</view>
</template>

<script>
export default {
	name: "tki-load",
	props: {
		lb: {
			type: String,
			default: '加载中'
		},
		color:{
			type: String,
			default: '#b1b1b1'
		},
		size:{
			type: Number,
			default: 26
		}
	},
	data() {
		return {}
	},
	computed: {
		cpSize() {
			return uni.upx2px(this.size)
		}
	},
	methods: {
		
	}
}
</script>

<style>
	@import "style.css";
</style>
