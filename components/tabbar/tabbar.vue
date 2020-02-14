<template>
	<view class="tabbarBox">
		<button class="wechatBox" open-type="share">
			<image src="../../static/icons/weixin.png"/>
			<view class="text">分享好友</view>
		</button>
		<button open-type="contact" class="advisory">
			<image src="../../static/icons/zixun.png"/>
			<text class="zixun">在线咨询</text>
		</button>
		<view class="reserve">
			<image src="../../static/icons/yuyue.png"/>
			<text class="yuyue">预约看房</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.tabbarBox{
		width: 100%;
		height: 120rpx;
		padding: 0 80rpx 0 77rpx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border: 1px solid #cdcdcf;
		.wechatBox{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
            margin: 0;
            background-color: transparent;
			margin-right: 30rpx;
            border: none;
            line-height: 1;
            outline: none;
            &::after{
                border: none;
            }
			image{
				width: 72rpx;
				height: 67rpx;
			}
			.text{
				font-size: 24rpx;
			}
		}
		.advisory{
			width: 220rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background-color: #3e96fa;
			display: flex;
			align-items: center;
			justify-content: space-around;
            margin: 0;
			margin-right: 20rpx;
			color: #fff;
			border-radius: 8rpx;
			image{
				width: 41rpx;
				height: 41rpx;
			}
		}
		.reserve{
			width: 220rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			justify-content: space-around;
			border-radius: 8rpx;
			background-color: #67d59b;
			display: flex;
			align-items: center;
			color: #fff;
			image{
				width: 41rpx;
				height: 41rpx;
			}
		}
	}
</style>
