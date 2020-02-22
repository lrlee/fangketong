<template xlang="wxml">
	<view class="login-warp">
		<!-- <button type="warn" class="login" @tap="toLogin">登录</button> -->
		<button class="login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录</button>
		<tki-authorize ref="wxat" @result="wxResult"/>
	</view>
</template>

<script>
import * as tki from "../../components/TikiUI/common/js/index.js";
import tkiAuthorize from "../../components/TikiUI/tki-authorize/tki-authorize";
import {nav } from '../../components/TikiUI/common/js/index'
import socket from '../../socket/index.js';
export default {
	components: {
		tkiAuthorize
	},
	data() {
		return {
			encryptedData: "",
			iv: "",
			longitude: "",
			latitude: ""
		};
	},
	methods: {
		toLogin() {
			tki.user.ckWxMpAt(
				res => {
					// 已授权，去登陆
					this.postLogin();
				},
				err => {
					// 没有授权
					this.$refs.wxat._show();
				}
			);
		},
		wxResult(e) {
			if (e) {
				this.postLogin();
			}
		},
		postLogin() {
			tki.ui.showLoading("登录中...");
			tki.user.wxMpLogin(
				"login/login",
				(res,user) => {
					tki.ui.hideLoading();
					tki.user.uToken("set",res.data.access_token);
					// 设置请求头
					tki.req.setConfig({
						header: {
                            'authentication': res.data.access_token
                        }
						
					});
					tki.req.get('member/getPhoneNumber', {
						"encryptedData": this.encryptedData,
						"iv": this.iv,
						"sessionKey":res.data.sessionKey
					}).then(d => {
					    if (d.code == 200) {
					       console.log(d,"电话提交成功")
						   // nav.navTo('../index/index')
						   uni.setStorageSync("phone",d.data.phoneNumber)
						   nav.navTo('/pages/projectSelect/projectSelect');
					    } else {
					        tki.ui.showToast(d.message)
					    }
					}).catch(e => {
					    tki.ui.showToast(e.message)
					})
                    socket(this.$store);
					uni.navigateBack({
					    delta: 1
					});
				},
				err => {
					tki.ui.hideLoading();
					tki.ui.showModal("错误", err.message);
					console.log(err);
				}
			);
		},
		getPhoneNumber(e) {
			this.iv = e.detail.iv
			this.encryptedData = e.detail.encryptedData
			this.toLogin()
		}
	}
};
</script>

<style lang="less">
page {
	background: #f7f7f7;
	height: 100%;
	.login-warp {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.login {
			width: 160rpx;
			height: 70rpx;
			background-image: linear-gradient(#f94d3f, #bc1103);
			font-size: 28rpx;
			font-weight: bold;
			color: #fff;
			line-height: 70rpx;
			text-align: center;
			letter-spacing: 15rpx;
		}
	}
}
</style>
