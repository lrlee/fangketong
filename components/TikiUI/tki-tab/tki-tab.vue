<template xlang="wxml" minapp="mpvue">
	<view @touchmove.stop="">
		<view class="tki-tab ua-class">
			<block v-for="(tab,index) in tabs" :key="tab.id">
				<view class="tki-tab-i" :id="tab.id" :data-current="index" @tap="_swichNav">
					<view class="tki-tab-i-name" :class="[currentTab==index ? 'on' : '']">
						{{tab.name}}
						<view class="tki-tab-i-tips" v-show="tab.tips==-1"></view>
						<view class="tki-tab-i-num" v-show="tab.tips>0">{{tab.tips}}</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name: "tki-tab",
	props: {
		tabs: {
			type: [Object,Array],
			default: function () {
				return [{
					name: 'tab0',
					id: 'tab0',
					tips: -1 // -1 为小红点 大于 0 显示数字 0 不显示
				}, {
					name: 'tab1',
					id: 'tab1',
					tips: 0
				}, {
					name: 'tab2',
					id: 'tab2',
					tips: 1111
				}, {
					name: 'tab3',
					id: 'tab3',
					tips: 2
				}, {
					name: 'tab4',
					id: 'tab4',
					tips: 3
				}]
			}
		},
	},
	data() {
		return {
			currentTab: 0,
		}
	},
	onUnload: function () {
		this.currentTab = 0;
	},
	methods: {
		_swichNav(e) { //点击tab-bar
			if (this.currentTab === e.currentTarget.dataset.current) {
				this._returnTabIndex()
				return false;
			} else {
				this.currentTab = e.currentTarget.dataset.current
				this._returnTabIndex()
			}
		},
		_returnTabIndex() {
			//触发自定义事件 index       
			this.$emit("change", {
				index: this.currentTab
			});
		},
		_setIndex(i) {
			this.currentTab = i;
			this._returnTabIndex();
		}
	}
}
</script>

<style>
	@import "style.css";
</style>
