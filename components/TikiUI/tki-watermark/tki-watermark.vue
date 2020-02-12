<template xlang="wxml" minapp="mpvue">
	<view class="tki-watermark" v-if="show">
		<view class="tki-watermark-text" :style="{ 'font-size': cpSize + 'px', color: color }" v-for="(v,i) in number" :key="i">{{text}}</view>
	</view>
</template>

<script>
export default {
	name: "tki-watermark",
	props: {
		text: {
			type: String,
			default: 'TikiUi版权所有'
		},
		color: {
			type: String,
			default: '#b1b1b1'
		},
		size: {
			type: Number,
			default: 28
		},
		number: {
			type: Number,
			default: 30
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		}
	},
	computed: {
		cpSize() {
			return uni.upx2px(this.size)
		}
	},
	methods: {
		_res(jp) {
			this.$emit('result', jp)
		}
	}
}
</script>

<style>
@import "style.css";
</style>
