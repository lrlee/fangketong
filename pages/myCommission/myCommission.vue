<template>
	<view>
		<view class="tab">
			<view class="tab-title item">
				<view class="tab-title-item" :class="{active: activeIndex == 0}" @tap="currentChange(0)">
					发放中 
				</view>
				<view class="tab-title-item" :class="{active: activeIndex == 1}" @tap="currentChange(1)">
					已发放
				</view>
			</view>
			<view class="tab-con">
				<view class="all-commission">
					<view class="all-commission-item">
						<view class="all-commission-item-left">
							总计佣金：{{Number(commissionTotal)}}元
						</view>
						<navigator url="/pages/commissionRule/commissionRule" hover-class="navigator-hover">
						    <view class="all-commission-item-right">
						    	佣金规则
						    </view>
						</navigator>
					</view>
					<view class="all-commission-item">
						<view class="all-commission-item-left">
							已发放佣金：{{Number(commissionPay)}}元
						</view>
						<!-- <navigator url="/pages/bankCard/bankCard" hover-class="navigator-hover">
						    <view class="all-commission-item-right">
						    	<view class="dakuan-btn">
						    		申请打款(填写银行卡信息)
						    	</view>
						    </view>
						</navigator> -->
					</view>
				</view>
				<view class="tab-con-title item">
					<view class="tab-con-title-item item0">
						姓名 
					</view>
					<view class="tab-con-title-item item1">
						电话
					</view>
					<view class="tab-con-title-item item2">
						佣金
					</view>
					<view class="tab-con-title-item item3">
						时间
					</view>
				</view>
				<view class="tab-item" v-if="activeIndex == 0" v-for="(v, i) in noFaFan" :key="i">
					<view class="tab-con-list item">
						<view class="tab-con-title-item item0">
							{{v.realname}}
						</view>
						<view class="tab-con-title-item item1">
							{{v.mobile}}
						</view>
						<view class="tab-con-title-item item2">
							{{v.commission}}
						</view>
						<view class="tab-con-title-item item3">
							{{v.dealtime}}
						</view>
					</view>	
				</view>
				<view class="tab-item" v-if="activeIndex == 1" v-for="(v, i) in faFan" :key="i">
					<view class="tab-con-list item">
						<view class="tab-con-title-item item0">
							{{v.realname}}
						</view>
						<view class="tab-con-title-item item1">
							{{v.mobile}}
						</view>
						<view class="tab-con-title-item item2">
							{{v.commission}}
						</view>
						<view class="tab-con-title-item item3">
							{{v.dealtime}}
						</view>
					</view>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				activeIndex: 0,
				thisIndex: 0,
				commissionPay: "",  // 已发放佣金
				commissionTotal: "", // 总佣金
				list: []
			};
		},
		onShow() {
			// 请求数据
			return tki.req.post('commission/customer', {
				status: 4
			}).then(d => {
				if (d.code === 200) {
					// 处理数据
					this.list = d.data.list.map(v => {
						return Object.assign(v, {
							dealtime: new Date(Number(v.dealtime * 1000)).format("yyyy-MM-dd")
						});
					});
					this.commissionPay = d.data.commission_pay
					this.commissionTotal = d.data.commission_total
				}
			}).catch(e => {
				tki.ui.showModal('提示', e.message , res => {
				    uni.navigateBack({
				        delta: 1
				    });
				})		
			})
		},
		methods: {
			currentChange(index) {
				this.activeIndex = index
				
			}
		},
		computed: {
			faFan() {
				return this.list.filter(item => {
					return item.commissionstatus == 1
				})
			},
			noFaFan() {
				return this.list.filter(item => {
					return item.commissionstatus == 0
				})
			}
		}
	}
</script>

<style lang="less">
@import "../myRecommend/myRecommend.less";
.tab-title{
	.m-left(164);
	.m-right(164);
	background-color: transparent;
	color: #000000;
}
.active {
	color: #3571B8 !important;
}
.all-commission {
	.font(24);
	.m-bot(72);
	&-item {
		.f();
		.f-between();
		.m-bot(28);
		.f-i-center();
		view {
			flex: 1;
		}
		& > view:nth-of-type(1) {
			text-align: left;
			.p-left(10);
		}
		&-right {
			.m-left(36);
			color: #3571B8;
		}
		.dakuan-btn {
			.wh(323, 54);
			background-image: linear-gradient(#f94d3f, #bc1103);
			.r(5);
			color: #ffffff;
			.l-h(54rpx);
		}
	}
}

</style>
