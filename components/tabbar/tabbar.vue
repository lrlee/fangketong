<template>
	<view class="tabbarBox">
		<button class="wechatBox" open-type="share">
			<image src="../../static/icons/weixin.png" mode="widthFix"/>
			<view class="text">分享好友</view>
		</button>
		<!-- <button open-type="contact" class="advisory">
			<image src="../../static/icons/zixun.png"/>
			<text class="zixun">在线咨询</text>
		</button> -->
		<view @click="toChat" class="advisory">
			<image src="../../static/icons/zixun.png"/>
			<text class="zixun">在线咨询</text>
		</view>
		<view class="reserve" @tap="reserve()">
			<image src="../../static/icons/yuyue.png"/>
			<text class="yuyue">预约看房</text>
		</view>
		<view class="yijianbohao" @tap="toPhone()">
			<image src="../../static/icons/tel1.png"/>
			<text class="yijian">一键拨号</text>
		</view>
		<uni-popup ref="popup" type="middle" >
		    <view class="phoneNumber">
				<image class="closeIcon" @tap="close()" src="../../static/icons/close.png"/>
				<text class="titleText">预约通知</text>
				<text class="tipsText">请静候专人来电,确认来访时间</text>
				<input class="tel-input" type="number" v-model="tel"/>
				<button class="btn" @tap="apply()">确定</button>
		    </view>
		</uni-popup>
	</view>
</template>

<script>
	import { uniPopup  } from '@dcloudio/uni-ui';
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				tel:'',
				projectId:null
			}
		},
		components:{
			uniPopup
		},
        props: {
            phoneNumber: String
        },
		methods: {
			reserve(){
				const phone = uni.getStorageSync('phone');
				this.projectId = uni.getStorageSync('projectid')
				this.tel = phone
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
            toPhone(){
                uni.makePhoneCall({
                    phoneNumber: String(this.phoneNumber)
                });
            },
			apply(){
				if(!/^(1)((3)|(4)|(5)|(7)|(8)|(9))\d{9}$/.test(this.tel)) {
					tki.ui.showToast("电话号码有误")
				}else{
					return tki.req.post('index/orderTable', {
						moblie:this.tel,
						projectId:this.projectId
					}).then(d => {
						if (d.code === 200) {
							tki.ui.showToast("提交成功")
							this.$refs.popup.close()
						}else if(d.code === 402) {
							tki.ui.showToast(d.message)
						}
					}).catch(e => {
						tki.ui.showToast(e.message)
					})
				}
				
			},
            toChat(v){
                tki.nav.navTo('/pages/chat/chat?targetId=&projectid=' + uni.getStorageSync("projectid") + '&realname=在线咨询')
            }
		}
	}
</script>

<style lang="less">
	.tabbarBox{
		width: 100%;
		height: 120rpx;
		padding-left: 40rpx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border-top: 1px solid #cdcdcf;
        z-index: 1000000;
		.phoneNumber{
			width: 500rpx;
			height: 400rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			.closeIcon{
				position: absolute;
				top: 40rpx;
				right: 40rpx;
				width: 30rpx;
				height: 30rpx;
			}
			.titleText{
				font-size: 36rpx;
				color: #000;
				text-align: center;
				padding: 30rpx 0 20rpx;
			}
			.tipsText{
				font-size: 24rpx;
				text-align: center;
			}
			.tel-input{
				width: 400rpx;
				height: 80rpx;
				border-radius: 8rpx;
				margin: 30rpx 0;
				border: 1px solid #e6e6e6;
				padding-left: 20rpx;
			}
			.btn{
				width: 420rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: #1286f3;
				border-radius: 8rpx;
				color: #fff;
			}
		}
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
				width: 51rpx;
                margin-bottom: 10rpx;
			}
			.text{
				font-size: 24rpx;
			}
		}
		.advisory{
			width: 188rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background-color: #3e96fa;
			display: flex;
			align-items: center;
			justify-content: center;
            margin: 0;
			margin-right: 4rpx;
			color: #fff;
			border-radius: 8rpx;
			image{
				width: 36rpx;
				height: 36rpx;
                margin-right: 5rpx;
			}
			text{
				font-size: 26rpx;
			}
		}
		.reserve{
			width: 188rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			justify-content: center;
			border-radius: 8rpx;
			margin-right: 4rpx;
			background-color: #67d59b;
			display: flex;
			align-items: center;
			color: #fff;
			image{
				width: 36rpx;
				height: 36rpx;
                margin-right: 5rpx;
			}
			text{
				font-size: 26rpx;
			}
		}
        .yijianbohao{
			width: 188rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			justify-content: center;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			color: #fff;
            background-color: #FD9345;
			image{
				width: 36rpx;
				height: 36rpx;
                margin-right: 5rpx;
			}
			text{
				font-size: 26rpx;
			}
        }
	}
</style>
