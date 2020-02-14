<template>
	<view>
		<view class="summary-warp">
			<view class="summary-num">
				<view class="">
					客户总数： {{allCustomerNum}}人
				</view>
				<view class="">
					成交数： {{hasDone}}人
				</view>
			</view>
			<navigator url="/pages/addCustomer/addCustomer" hover-class="navigator-hover">
				<button class="addClient" type="warn">添加客户</button>
			</navigator>
		</view>
		<view class="customer-list">
			<view class="customer-list-title">
				<view class="list-one">姓名</view>
				<view class="list-two">电话</view>
				<view class="list-three">状态</view>
				<view class="list-four">备注</view>
				<view class="list-five">操作</view>
			</view>
			<view class="customer-list-item" v-for="(v, i) in myCustomer" :key="i" @tap="navInfo(v.id)">
				<view class="list-one">{{v.realname}}</view>
				<view class="list-two">{{v.mobile}}</view>
				<view class="list-three">{{v.statustr}}</view>
				<view class="list-four">已认购</view>
				<view class="list-five">
					<button type="warn">确认</button>
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
				myCustomer: [],
				allCustomerNum: 0,
				hasDone: 0, //已成交数
			};
		},
		onShow() {
			// 请求数据
			return tki.req.post('adviser/customerlist').then(d => {
				if (d.code === 200) {
 					// 处理数据
					this.myCustomer = d.data.list
					this.allCustomerNum = d.data.list.length
					this.hasDone = String(d.data.list.filter(item => {
						item.status = "4"
					}).length)
					console.log(this.hasDone)
				}
			}).catch(e => {
				tki.ui.showModal('提示', e.message , res => {
				    uni.navigateBack({
				        delta: 1
				    });
				})				
				console.log(e)
			})
		},
		computed: {
			
		},
		methods: {
			navInfo(id) {
				console.log(id)
				uni.navigateTo({
				    url: '/pages/customerManage/customerManage?id=' + id
				});
			}
		}
	}
</script>

<style lang="less" src="./myCustomer.less">

</style>
