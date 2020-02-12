<template>
	<view>
		<view class="tab">
			<view class="tab-title item">
				<view class="tab-title-item" :class="{active: activeIndex == 0}" @tap="currentChange(0)">
					未到访 
				</view>
				<view class="tab-title-item" :class="{active: activeIndex == 1}" @tap="currentChange(1)">
					已到访 
				</view>
				<view class="tab-title-item" :class="{active: activeIndex == 2}" @tap="currentChange(2)">
					已认购
				</view>
				<view class="tab-title-item" :class="{active: activeIndex == 3}" @tap="currentChange(3)">
					已签约
				</view>
				<view class="tab-title-item" :class="{active: activeIndex == 4}" @tap="currentChange(4)">
					已过期
				</view>
			</view>
			<view class="tab-con" v-if="activeIndex == 0">
				<view class="tab-con-title item">
					<view class="tab-con-title-item item0">
						姓名 
					</view>
					<view class="tab-con-title-item item1">
						电话
					</view>
					<view class="tab-con-title-item item2">
						状态
					</view>
					<view class="tab-con-title-item item3">
						备注
					</view>
				</view>
				<view class="tab-con-list item" v-for="(v, i) in reList0" :key="i">
					<view class="tab-con-title-item item0">
						{{v.realname}}
					</view>
					<view class="tab-con-title-item item1">
						{{v.mobile}}
					</view>
					<view class="tab-con-title-item item2">
						{{v.status == 0 ? "推荐成功" : "审核成功"}}
					</view>
					<view class="tab-con-title-item item3">
						{{v.remark}}
					</view>
				</view>
				<view class="not" v-if="!reList0 || reList0.length==0">
				    暂无内容
				</view>
			</view>
			<view class="tab-con" v-if="activeIndex == 1">
				<view class="tab-con-title item">
					<view class="tab-con-title-item item0">
						姓名 
					</view>
					<view class="tab-con-title-item item1">
						电话
					</view>
					<view class="tab-con-title-item item2">
						状态
					</view>
					<view class="tab-con-title-item item3">
						备注
					</view>
				</view>
				<view class="tab-con-list item" v-for="(v, i) in reList2" :key="i">
					<view class="tab-con-title-item item0">
						{{v.realname}}
					</view>
					<view class="tab-con-title-item item1">
						{{v.mobile}}
					</view>
					<view class="tab-con-title-item item2">
						已到访
					</view>
					<view class="tab-con-title-item item3">
						{{v.remark}}
					</view>
				</view>
				<view class="not" v-if="!reList2 || reList2.length==0">
				    暂无内容
				</view>
			</view>
			<view class="tab-con" v-if="activeIndex == 2">
				<view class="tab-con-title item">
					<view class="tab-con-title-item item0">
						姓名 
					</view>
					<view class="tab-con-title-item item1">
						电话
					</view>
					<view class="tab-con-title-item item2">
						状态
					</view>
					<view class="tab-con-title-item item3">
						备注
					</view>
				</view>
				<view class="tab-con-list item" v-for="(v, i) in reList3" :key="i">
					<view class="tab-con-title-item item0">
						{{v.realname}}
					</view>
					<view class="tab-con-title-item item1">
						{{v.mobile}}
					</view>
					<view class="tab-con-title-item item2">
						已认购
					</view>
					<view class="tab-con-title-item item3">
						{{v.remark}}
					</view>
				</view>
				<view class="not" v-if="!reList3 || reList3.length==0">
				    暂无内容
				</view>
			</view>
			<view class="tab-con" v-if="activeIndex == 3">
				<view class="tab-con-title item">
					<view class="tab-con-title-item item0">
						姓名 
					</view>
					<view class="tab-con-title-item item1">
						电话
					</view>
					<view class="tab-con-title-item item2">
						状态
					</view>
					<view class="tab-con-title-item item3">
						备注
					</view>
				</view>
				<view class="tab-con-list item" v-for="(v, i) in reList4" :key="i">
					<view class="tab-con-title-item item0">
						{{v.realname}}
					</view>
					<view class="tab-con-title-item item1">
						{{v.mobile}}
					</view>
					<view class="tab-con-title-item item2">
						已签约
					</view>
					<view class="tab-con-title-item item3">
						{{v.remark}}
					</view>
				</view>
				<view class="not" v-if="!reList4 || reList4.length==0">
				    暂无内容
				</view>
			</view>
			<view class="tab-con" v-if="activeIndex == 4">
				<view class="tab-con-title item">
					<view class="tab-con-title-item item0">
						姓名 
					</view>
					<view class="tab-con-title-item item1">
						电话
					</view>
					<view class="tab-con-title-item item2">
						状态
					</view>
					<view class="tab-con-title-item item3">
						备注
					</view>
				</view>
				<view class="tab-con-list item" v-for="(v, i) in reList5" :key="i">
					<view class="tab-con-title-item item0">
						{{v.realname}}
					</view>
					<view class="tab-con-title-item item1">
						{{v.mobile}}
					</view>
					<view class="tab-con-title-item item2">
						已过期
					</view>
					<view class="tab-con-title-item item3">
						{{v.remark}}
					</view>
				</view>
				<view class="not" v-if="!reList5 || reList5.length==0">
				    暂无内容
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as tki from "../../components/TikiUI/common/js/index.js";
	export default {
		data() {
			return {
				activeIndex: 0,
				thisIndex: 0,
				reList0: [],
				reList2: [],
				reList3: [],
				reList4: [],
				reList5: [],
				list: []
			};
		},
		onShow() {
			// 请求数据
			return tki.req.post('commission/customer').then(d => {
				if (d.code === 200) {
					// 处理数据
					this.list = d.data.list
					// 未到访
					this.reList0 = d.data.list.filter(item => {
						return item.status == 0 || item.status == 1
					})
					// 已到访
					this.reList2 = d.data.list.filter(item => {
						return item.status == 2
					})
					// 已认购
					this.reList3 = d.data.list.filter(item => {
						return item.status == 3
					})
					// 已签约
					this.reList4 = d.data.list.filter(item => {
						return item.status == 4
					})
					// 已过期
					this.reList5 = d.data.list.filter(item => {
						return item.status == -1
					})
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
	}
</script>

<style lang="less">
@import "./myRecommend.less";
</style>
