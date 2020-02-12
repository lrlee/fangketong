<template xlang="wxml">
	<view class="tki-cell u-class" @tap="_toLink" :hover-class="link?'tki-cell-hover':'none'" :style="{'height':cpHeight}">
		<view class="tki-cell-i">
			<view class="tki-cell-p">
				<view :class="[icon]" class="tikiui tki-cell-ic" :style="{'color':iconColor,'font-size':cpIconSize}" v-if="icon"></view>
				<slot name="title">
					<view class="tki-cell-title" :style="{'color':titleColor,'font-size':cpTitleSize}">
						{{title}}
					</view>
				</slot>
			</view>
			<view class="tki-cell-p">
				<view :class="[tips >= 1?'tki-cell-tips':'tki-cell-red']" v-if="tips">{{tips>=1?tips:''}}</view>
				<slot name="value">
					<view class="tki-cell-value" v-if="value" :style="{'color':valueColor,'font-size':cpValueSize}">
						{{value}}
					</view>
				</slot>
				<view class="tikiui tki-cell-ric" :class="[ricon ? ricon:'tkic-right']" :style="{'color':riconColor,'font-size':cpRiconSize}" v-if="link"></view>
			</view>
		</view>
		<view class="tki-cell-i" v-if="label">
			<slot name="label">
				<view class="tki-cell-label" :style="{'color':labelColor,'font-size':cpLabelSize}">
					{{label}}
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
export default {
	name: "tki-cell",
	props: [
		'height',
		'title',
		'titleColor',
		'titleSize',
		'value',
		'valueColor',
		'valueSize',
		'label',
		'labelColor',
		'labelSize',
		'icon',
		'iconColor',
		'iconSize',
		'ricon',
		'riconColor',
		'riconSize',
		'link',
		'tips'
	],
	data() {
		return {
		}
	},
	onUnload: function () {
	},
	methods: {
		_toLink() {
			if (this.link != "" && typeof this.link != "undefined") {
				uni.navigateTo({
					url: this.link,
				})
			}
		}
	},
	computed: {
		cpHeight: function () {
			return this.height ? uni.upx2px(this.height) + 'px' : '';
		},
		cpTitleSize: function () {
			return this.titleSize ? uni.upx2px(this.titleSize) + 'px' : '';
		},
		cpValueSize: function () {
			return this.valueSize ? uni.upx2px(this.valueSize) + 'px' : '';
		},
		cpIconSize: function () {
			return this.iconSize ? uni.upx2px(this.iconSize) + 'px' : '';
		},
		cpRiconSize: function () {
			return this.riconSize ? uni.upx2px(this.riconSize) + 'px' : '';
		},
	}
}
</script>

<style>
    /* @import "./base/base.css"; */
    @import "./style.css";
</style>
