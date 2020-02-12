<template>
	<view>
		<view class="coupon-top-pic">
			<image :src="imgUrl + 'coupon/coupon.png'" mode=""></image>
		</view>
		<view class="coupon-list">
			<!-- <view class="coupon-list-title">
				<view class="title-line"></view>
				<view class="title-txt">恭喜您获得</view>
				<view class="title-line"></view>
			</view> -->
			<view class="coupon-list-item" v-for="(v, i) in coupon" :key="i">
				<view class="coupon-list-item-price">
					￥{{v.deduct}}
				</view>
				<view class="coupon-list-item-detail">
					{{v.couponname}}
				</view>
				<view class="coupon-list-item-get" @tap="getCoupon(v.id,i)">
					<button type="warn" v-if="v.canget">立即领取</button>
					<!-- <button type="warn" v-if="!v.canget">立即领取</button> -->
					<button type="warn" v-else class="prohibit">已领取</button>
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
				coupon: [],
			};
		},
		onShow() {
			return tki.req.post('coupon/couponlist', {}).then(d => {
				if (d.code === 200) {
					// 处理数据
					this.coupon = d.data.coupons
				}
			}).catch(e => {
				tki.ui.showToast(e.msg)
				console.log(e)
			})
		},
		methods: {
			getCoupon(id, i) {			
				return tki.req.post('coupon/getcoupon', {
					id: id
				}).then(d => {
					if (d.code === 200) {
						// 处理数据
						tki.ui.showToast("领取成功")
						this.$set(this.coupon, i , Object.assign(this.coupon[i],{canget:false}))	
					}
				}).catch(e => {
					tki.ui.showToast(e.message)
					console.log(e)
				})
			}
		}
	}
</script>

<style lang="less" src="./coupon.less">

</style>
