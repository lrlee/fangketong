<template xlang="wxml" minapp="mpvue">
	<view>
		<view class="tki-search">
			<view class="tki-search-input">
				<view class="tki-search-input-ic tikiui tkic-sistrix"></view>
				<input class="" :placeholder="placeholder" confirm-type="search" placeholder-class="tki-search-input-plc" v-model="search" />
				<view class="tki-search-input-empty" v-if="search != ''" @tap="_empty">
					<view class="empty-ic">×</view>
				</view>
			</view>
			<view class="tki-search-btn" hover-class="hover-c" @tap="_search">
				搜索
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "tki-search",
	props: {
		val: {
			type: String,
			default: ""
		},
		placeholder: {
			type: String,
			default: "请输入搜索内容"
		}
	},
	data() {
		return {
			search: this.val,
		};
	},
	methods: {
		_setVal(val) {
			this.search = val
		},
		_search() {
			this.$emit("result", this.search);
		},
		// 清空输入框并触发回调
		_empty() {
			this.search = ""
			this.$emit("clear", "");
		}
	}
};
</script>

<style>
@import "style.css";
</style>
