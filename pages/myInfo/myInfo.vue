<template>
	<view>
		<view class="tip">
			您需要确认电话、身份证等信息正确无误
		</view>
		<view class="recommend-warp">
			<view class="recommend-item">
				<view class="recommend-title">
					姓名
				</view>
				<view class="recommend-input">
					<input class="name-input" v-model="name"/>
				</view>
			</view>
			<view class="recommend-item sms-posi">
				<view class="recommend-title">
					联系方式
				</view>
				<view class="recommend-input">
					<input class="tel-input" type="number" v-model="tel"/>
				</view>
				<!-- <button type="warn" class="recommend-btn" id="get-smscode" @tap="getSms()">获取验证码{{djs}}</button> -->
			</view>
			<!-- <view class="recommend-item">
				<view class="recommend-title">
					验证码
				</view>
				<view class="recommend-input">
					<input class="sms-input" type="number" v-model="smscode"/>
				</view>
			</view> -->
			<view class="recommend-item">
				<view class="recommend-title">
					证件类型
				</view>
				<view class="recommend-input">
					<picker @change="bindCardTypeChange" :value="cardTypeIndex" :range="cardType">
				        <view class="uni-input">{{cardType[cardTypeIndex]}}</view>
				    </picker>
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					证件号码
				</view>
				<view class="recommend-input">
					<input class="tel-input" type="idcard" v-model="cardNumber"/>
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					常住地
				</view>
				<view class="recommend-input">
					<input class="tel-input" v-model="address"/>
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					身份类型
				</view>
				<view class="recommend-input">
					<picker @change="bindSfTypeChange" :value="sfTypeIndex" :range="sfType">
				        <view class="uni-input">{{sfType[sfTypeIndex]}}</view>
				    </picker>
				</view>
			</view>
		</view>
		<button type="warn" class="recommend-btn" @tap="submitInfo()">提交</button>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				cardTypeIndex: 0,  // 证件类型
				cardType: ["身份证"],
				sfTypeIndex: 0,
				sfType: ["全民经纪人"],
				name: "",
				tel: "",
				cardNumber: "",
				address: "",
				smscode: "",
				djs: "",
				sendOff: true
			};
		},
		onLoad() {
			// 请求个人资料
			return tki.req.post('member/index',{}).then(d => {
				if (d.code === 200) {
					// 处理数据
					console.log(d.data)
					if(d.data.member.papertype == "") {
						this.cardTypeIndex = 0
					} else {
						this.cardTypeIndex = this.cardType.indexOf(d.data.member.papertype)
					}
					this.name = d.data.member.realname
					this.tel = d.data.member.mobile
					this.cardNumber = d.data.member.papernumber
					this.address = d.data.member.location
					if(d.data.member.is_adviser) {
						this.sfType[0] = "置业顾问"
					}
				}
			}).catch(e => {
				tki.ui.showToast(e.message)
				console.log(e)
			})
		},
		methods: {
			// 证件类型
			bindCardTypeChange: function(e) {
				this.cardTypeIndex = e.target.value
			},
			// 身份类型
			bindSfTypeChange: function(e) {
				this.sfTypeIndex = e.target.value
			},
			// 提交
			submitInfo() {
				if(this.name == "") {
					tki.ui.showToast("姓名不能为空")
				}else if(!/^(1)((3)|(4)|(5)|(7)|(8)|(9))\d{9}$/.test(this.tel)) {
					tki.ui.showToast("电话号码有误")
				}else if(this.cardType[this.cardTypeIndex] == "") {
					tki.ui.showToast("证件类型不能为空")
				}else if(this.cardNumber == "" || !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.cardNumber)){
					tki.ui.showToast("身份证号有误")
				}else if(this.address == "") {
					tki.ui.showToast("常住地不能为空")
				}
				// else if(this.smscode == "") {
				// 	tki.ui.showToast("请输入验证码")
				// }
				 else {
					return tki.req.post('member/rf', {
						realname: this.name,
						mobile: this.tel,
						papertype: this.cardType[this.cardTypeIndex],
						papernumber: this.cardNumber,
						location: this.address,
						identitytype: Number(this.sfTypeIndex) + 1,
						smscode: this.smscode			
					}).then(d => {
						if (d.code === 200) {
							tki.ui.showToast("提交成功")
							uni.navigateBack({
							    delta: 1
							});
						}else if(d.code === 402) {
							tki.ui.showToast(d.message)
						}
					}).catch(e => {
						tki.ui.showToast(e.message)
						console.log(e.message)
					})
				}
			},
			getSms() {
				if(this.sendOff == true) {
					if(!/^(1)((3)|(4)|(5)|(7)|(8)|(9))\d{9}$/.test(this.tel)) {
						tki.ui.showToast("电话号码有误")
					} else {
						this.sendOff = false
						console.log(this.tel)
						return tki.req.post('util/sysset', {}).then(d => {
							if (d.code === 200) {
								// console.log(d.data.system.opensms)
								if(d.data.system.opensms == "1") {
									return tki.req.post('util/sendSmsCode', {
										mobile: this.tel
									}).then(d => {
										if (d.code === 200) {
											let init = 60;
											tki.ui.showToast("发送成功")
											let timer = setInterval(() => {
												init--
												this.djs = init + "s"
												// console.log(init)
												if(init == 0) {
													this.djs = ""
													this.sendOff = true
													clearInterval(timer)
												}
											}, 1000)
										}
									}).catch(e => {
										tki.ui.showToast(e.message)
										console.log(e.message)
									})
								}
							}
						}).catch(e => {
							tki.ui.showToast(e.message)
							console.log(e.message)
						})
					}
				}
			}
		}
	}
</script>

<style lang="less">
@import "../recommend/recommend.less";
.tip {
	.font(24, #666666);
	.l-h(80rpx);
	text-align: center;
}
.recommend-warp {
	.m-top(0);
}
#get-smscode {
	.m(0);
	.wh(165, 43);
	font-size: 20rpx;
	line-height: 43rpx;
	text-align: center;
	letter-spacing: 1rpx;
	position: absolute;
	right: 62rpx;
	top: 24rpx;
	z-index: 999;
}
.sms-posi {
	.rel();
}
.recommend-input input, .recommend-input picker{
	text-align: left !important;
	padding-left: 40rpx;
}
</style>
