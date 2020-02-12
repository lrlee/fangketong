<template>
	<view>
		<view class="coupon-top-pic">
			<image v-if='imgUrl' :src="imgUrl + 'coupon/coupon.png'" mode=""></image>
		</view>
		<view class="coupon-list">
			<view class="coupon-list-title">
				<view class="title-line"></view>
				<view class="title-txt">恭喜您获得</view>
				<view class="title-line"></view>
			</view>
			<view class="coupon-list-item" v-for="(v, i) in list.data" :key="i">
				<view class="coupon-list-item-price">
					￥{{v.deduct}}
				</view>
				<view class="coupon-list-item-detail">
					{{v.couponname}}
				</view>
				<!-- <view class="coupon-list-item-get" @tap="getCoupon(v.id,i)">
					<button type="warn" v-if="v.canget">立即领取</button>
					<button type="warn" v-else class="prohibit">已领取</button>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import * as tki from '../../../components/TikiUI/common/js/index.js';
	import {getList} from "../../../common/mixins/getList.js";
	export default {
		mixins:[getList],
		data() {
			return {
				list:{
					url:'coupon/mycoupon',
				}
			};
		},
		onShow() {
		},
		methods: {
			
		}
	}
</script>

<style lang="less" src="./coupon.less">

</style>
