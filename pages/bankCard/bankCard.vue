<template>
	<view>
		<view class="bank-tip">
			<view>
				您需要确认银行卡信息正确无误 
			</view>
			<view>
				以下银行账户用于接收佣金及奖励，安全可靠。
			</view>
		</view>
		<view class="bank-info">
			<view class="bank-info-item bank-info-item-title">
				<image :src="imgUrl + 'bank/bank.png'" mode=""></image>
				银行账号（银联借记卡）
			</view>
			<view class="bank-info-item">
				<view class="bank-info-item-left">
					开  户  行
				</view>
				<view class="bank-info-item-right">
					<picker @change="bindBankChange" :value="bankIndex" :range="bank">
				        <view class="uni-input">{{bank[bankIndex]}}</view>
				    </picker>
				</view>
			</view>
			<view class="bank-info-item">
				<view class="bank-info-item-left">
					银行卡号
				</view>
				<view class="bank-info-item-right">
					<input type="number" v-model="card" placeholder="请输入银行卡号"/>
				</view>
			</view>
			<view class="bank-info-item">
				<view class="bank-info-item-left">
					账户名
				</view>
				<view class="bank-info-item-right">
					<input type="text" v-model="name" placeholder="请输入账户名"/>
				</view>
			</view>
			<button type="warn" class="submit" @tap="submitCard()">提交</button>
		</view>
	</view>
</template>

<script>
	import * as tki from "../../components/TikiUI/common/js/index.js";
	export default {
		data() {
			return {
				bankIndex: 0,
				bank: [],
				name: "",
				card: ""
			};
		},
		onShow() {
			return tki.req.post('index/bank').then(d => {
				if (d.code === 200) {
					d.data.forEach(item => {
						this.bank.push(item.bankname) 
					})
				}
			}).catch(e => {
				tki.ui.showToast(e.message)
				console.log(e.message)
			})
		},
		methods: {
			bindBankChange: function(e) {
				this.bankIndex = e.target.value
			},
			submitCard() {
				if(this.name == "") {
					tki.ui.showToast("姓名不能为空")
				}else if(this.card == "" && this.card.length != 19 && this.card != 16 && this.card != 17) {
					tki.ui.showToast("银行卡号长度有误")
				} else {
					return tki.req.post('member/upbank', {
						bankrealname: this.name,
						banknumber: this.card,
						bank: this.bank[this.lpIndex],  
					}).then(d => {
						if (d.code === 200) {
							tki.ui.showToast("提交成功")
						}else if(d.code === 402) {
							tki.ui.showToast(d.message)
						}
					}).catch(e => {
						tki.ui.showToast(e.message)
						console.log(e.message)
					})
				}
			}
		},
	}
</script>

<style lang="less">
@import "./bankCard.less";
</style>
