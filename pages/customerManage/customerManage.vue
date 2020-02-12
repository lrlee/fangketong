<template>
	<view>
		<view class="recommend-warp">
			<view class="recommend-item">
				<view class="recommend-title">
					姓名
				</view>
				<view class="recommend-input">
					{{name}}
					<!-- <input class="name-input" :value="name"/> -->
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					客户电话
				</view>
				<view class="recommend-input">
					{{tel}}
					<!-- <input class="tel-input" type="number" :value="tel"/> -->
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					意向楼盘
				</view>
				<view class="recommend-input">
					{{loupan}}
					<!-- <input class="loupan-input" :value="loupan"/> -->
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					意向楼层
				</view>
				<view class="recommend-input">
					{{floor}}
					<!-- <picker @change="bindFloorChange" :value="floorIndex" :range="floor">
			            <view class="uni-input">{{floor[floorIndex]}}</view>
			        </picker> -->
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					意向户型
				</view>
				<view class="recommend-input">
					{{huxing}}
					<!-- <picker @change="bindHxChange" :value="hxIndex" :range="huxing">
			            <view class="uni-input">{{huxing[hxIndex]}}</view>
			        </picker> -->
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					特殊需求
				</view>
				<view class="recommend-input">
					{{notes}}
					<!-- <input class="special-input" :value="notes"/> -->
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					推荐备注
				</view>
				<view class="recommend-input">
					<input class="special-input" v-model="recommendNotes"/>
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					状态
				</view>
				<view class="recommend-input statues-picker">
					<picker @change="bindZtChange" :value="ztIndex" :range="zt">
			            <view class="uni-input">{{zt[ztIndex]}}</view>
			        </picker>
				</view>
			</view>
		</view>
		<view class="recommend-warp daily">
			<view class="daily-title">
				跟进日志
			</view>
			<view class="daily-item" v-for="(v, i) in log" :key="i">
				<view class="daily-item-left">
					{{v.title}}({{v.remark}})
				</view>
				<view class="daily-item-right">
					{{v.createtime}}
				</view>
			</view>
		</view>
		<button type="warn" class="recommend-btn" @tap="submit()">提交</button>
		<!-- <button class="recommend-btn delete-btn">删除客户</button> -->
	</view>
</template>

<script>
	import * as tki from "../../components/TikiUI/common/js/index.js";
	let page = {
		id:'',
	}
	export default {
		data() {
			return {
				name: "",
				tel: "",
				loupan: "",
				floor: "",
				huxing: "",
				notes: "",
				recommendNotes: "",
				ztIndex: 0,
				zt: ["推荐成功(待审核)","审核成功(未到访)","已到访","认购","签约成交","无效"],
				log: [],
			};
		},
		onShow() {
			return tki.req.get('adviser/customerdetail',{
				id: page.id
			}).then(d => {
				if (d.code == 200) {
					this.name = d.data.customer.realname
					this.tel = d.data.customer.mobile
					this.loupan = d.data.customer.intention1
					this.floor = d.data.customer.intention3
					this.huxing = d.data.customer.intention2
					this.recommendNotes = d.data.customer.remark
					this.notes = d.data.customer.intention4
					this.ztIndex = d.data.customer.status
					this.log = d.data.log.map(v => {
						return Object.assign(v, {
							createtime: new Date(Number(v.createtime * 1000)).format("yyyy-MM-dd")
						});
					});
					console.log(this.log)
				} else {
					tki.ui.showToast('数据加载失败')
				}
			}).catch(e => {
			
			})
		},
		onLoad: async function (e) {
			if(tki.com.empty(e.id)){
				tki.ui.showModal('提示','ID不能为空',d=>{
					tki.nav.navBack();
				})
			}else{
				page.id = e.id
			}
		},
		methods: {
			submit() {
				return tki.req.get('adviser/customeredit',{
					id: page.id,
					state: this.zt[this.ztIndex],
					remark: this.recommendNotes
				}).then(d => {
					if (d.code == 200) {
						tki.ui.showToast('提交成功')
					} else {
						tki.ui.showToast('数据加载失败')
					}
				}).catch(e => {
				
				})
			}
			
		}
	}
</script>

<style lang="less">
@import "../recommend/recommend.less";
.recommend-btn {
	.wh(304, 80);
	.font(36, #ffffff);
	margin: 0 auto;
	font-weight: bold;
	.l-h(80rpx);
	letter-spacing: 20rpx;
	background-image: linear-gradient(#f94d3f, #bc1103);
	.r(10rpx);
	.m-top(20);
	.m-bot(60);
}
.recommend-warp {
	.p-bot(55);
	.m-top(31);
	height: auto;
}
.daily {
	.p-top(23);
	.p-bot(34);
	.p-left(0);
	background-image: none;
	&-title {
		.font(30, #ca1f11);
		.m-bot(35);
	}
	&-item {
		.font(26);
		.b-bot(1px, #cccccc, solid);
		.p-bot(14);
		.f();
		.f-between();
		.m-bot(28);
		&-right {
			.w(160);
		}
	}
}
.delete-btn {
	background-image: none;
	.b-c(#b3b3b3);
	.m-top(27);
	.m-bot(60);
}
.recommend-input {
	.l-h(48rpx)
}
.statues-picker view{
	margin-top: 0 !important;
}
</style>
