<template>
	<view class="content-warp">
		<view class="banner">
			<swiper class="swiper banner-swiper" :indicator-dots="true" :indicator-color="'#ffffff'" :indicator-active-color="'#f09727'" :autoplay="true">
				<swiper-item v-for="(item, index) in banner" :key="index">
					<image :src="item.thumb" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</view>
		<view class="project-desc">
			<view class="project-name">
				{{project.projectname ? project.projectname : ""}}
				<navigator url="/pages/loupan/loupan" hover-class="navigator-hover">
				   <view class="more">
				   	更多详情
				   </view>
				</navigator>
			</view>
			<view class="want">
				<view class="want-avatar">
					<view class="want-avatar-item" v-for="(v, i) in history">
						<image :src="v.avatar" mode=""></image>
					</view>
					<view class="want-num">
						<text>{{project.viewcount ? project.viewcount : ""}}</text>人想买
					</view>
				</view>
			</view>
			<view class="project-price">
				{{project.price_range ? project.price_range : "暂无价格"}}
			</view>
			<view class="project-loac">
				地址：{{project.address ? project.address : ""}}
				<view class="project-loac-icon" @tap="getMap()">
					<image v-if='imgUrl' :src="imgUrl + 'home/daohang.png'" mode=""></image>
				</view>
			</view>
		</view>
		<view class="home-menu-warp">
			<view class="bg">
				<image v-if='imgUrl' :src="imgUrl + 'home/munu_bg.png'" mode=""></image>
			</view>
			<view class="home-menu">
				<!-- <navigator url="/pages/myCustomer/myCustomer" hover-class="navigator-hover"> -->
                    <view class="menu-item" @tap="myCustomer()">
                    	<image v-if='imgUrl' :src="imgUrl + 'home/my-customer.png'" mode="" />
                    	<view class="">我的客户</view>
                    </view>
                <!-- </navigator> -->
				<navigator url="/pages/coupon/coupon" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image v-if='imgUrl' :src="imgUrl + 'home/coupon.png'" mode="" />
				    	<view class="">优惠券</view>
				    </view>
				</navigator>
				<navigator url="/pages/message/list/message" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image v-if='imgUrl' :src="imgUrl + 'home/dynamic.png'" mode="" />
				    	<view class="">楼盘动态</view>
				    </view>
				</navigator>
				<navigator url="/pages/service/service" open-type="switchTab" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image v-if='imgUrl' :src="imgUrl + 'home/adviser.png'" mode="" />
				    	<view class="">置业顾问</view>
				    </view>
				</navigator>
				<navigator url="/pages/counter/counter" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image v-if='imgUrl' :src="imgUrl + 'home/calculator.png'" mode="" />
				    	<view class="">房贷计算器</view>
				    </view>
				</navigator>
			</view>
		</view>
		<view class="contant">
			<view class="introduce">
				<view class="title">
					<text>项目介绍</text>
					<navigator url="/pages/loupan/loupan" hover-class="navigator-hover">
					   <view class="more">
					   	查看更多
					   </view>
					</navigator>
				</view>
				<navigator url="/pages/loupan/loupan" hover-class="navigator-hover">
				    <view class="introduce-pic">
				    	<image :src="project.logo" mode="aspectFill" />
				    </view>
				</navigator>
				<view class="introduce-txt">
					<text>
						{{project.description}}
					</text>
				</view>
			</view>
			<view class="atlas">
				<view class="more-title">
					<view class="title">
						<text>项目图册</text>
						<navigator url="/pages/album/album" hover-class="navigator-hover">
						    <view class="more">
						    	查看更多
						    </view>
						</navigator>
					</view>
				</view>
				<view class="atlas-warp">
					<swiper class="swiper banner-swiper" :indicator-dots="true" :indicator-color="'#ffffff'" :indicator-active-color="'#f09727'" :autoplay="true">
						<swiper-item v-for="(item, index) in thumb" :key="index">
							<image :src="item.thumb" mode="aspectFill" />
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="huxing">
				<view class="more-title">
					<view class="title">
						<text>户型鉴赏</text>
						<navigator url="/pages/moreHx/moreHx" hover-class="navigator-hover">
						    <view class="more">
						    	查看更多
						    </view>
						</navigator>
					</view>
				</view>
				<!-- 有全景跳转全景 没有跳转户型详情 -->
				<view class="index-hx">
					<navigator v-for="(v,i) in apartment" :key=i :url="v.isquanjing ? '/pages/webView/webView?url=' + v.thumb_link : '/pages/hxDetails/hxDetails?id='+ v.id" hover-class="navigator-hover">
						<view class="apartment">
							<view class="apartment-pic">
								<image :src="v.thumb" mode="" />
								<view class="apartment-tip" v-if="v.isquanjing">全景</view>
							</view>
							<view class="apartment-name">
								{{v.title}}
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<image :src="popupadv" mode="widthFix"></image>
		</uni-popup>
		<button id="to-select" @tap="toSelect">
			<view class="">
				切换
			</view>
			<view class="">
				项目
			</view>
		</button>
	</view>
</template>

<script>
import * as tki from '../../components/TikiUI/common/js/index.js';
import {uniPopup} from '@dcloudio/uni-ui';
export default {
	data() {
		return {
			banner: [],  // banner图
			thumb: [],  // 项目图册
			apartment: [],
			project: {},
			sf: "",
			popupadv: "",
			history: [],
			projectId: ""
		};
	},
	components: {
		uniPopup 
	},
	onLoad() {
		// 请求弹窗广告
		tki.req.post('index/popupadv',{}).then(d => {
			if (d.code === 200) {
				// 处理数据
				if(d.data.banner.length != 0) {
					this.popupadv = d.data.banner[0].thumb
					this.$refs.popup.open()
				}
			}
		}).catch(e => {
			tki.ui.showToast(e.msg)
			console.log(e)
		})
	},
	onShow() {
		// 请求首页数据
		tki.req.post('index/projectindex',{}).then(d => {
			if (d.code === 200) {
				// 处理数据
				this.banner = d.data.banner
				this.thumb = d.data.picture
				this.apartment = d.data.apartment.slice(0,2)
				this.project = d.data.project
				this.history = d.data.history
			}
		}).catch(e => {
			tki.ui.showToast(e.msg)
			console.log(e)
		})
	},
	methods: {
		myCustomer() {
			return tki.req.post('member/index',{}).then(d => {
				if (d.code === 200) {
					// 处理数据
					if(d.data.member.is_agent) {  // 全民经纪人
						tki.nav.navTo('/pages/myRecommend/myRecommend')
					}else if(d.data.member.is_adviser) {  // 置业顾问
						tki.nav.navTo('/pages/myCustomer/myCustomer')		
					}else{
						tki.ui.showModal('提示', '请先完善您的身份信息', res => {
						    tki.nav.navTo('/pages/myInfo/myInfo')
						})
					}
				}
			}).catch(e => {
				tki.ui.showToast(e.msg)
				console.log(e)
			})
		},
		getMap() {
			let that = this;
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
			        uni.openLocation({
			        	latitude: parseFloat(that.project.lat),
			        	longitude: parseFloat(that.project.lng),
			        	name: that.project.projectname,
			        	address: that.project.projectname.address,
			        	success: function () {
							
			        	}
			        });
					tki.req.post('member/updateAddress',{
					    "lat": res.latitude,
					    "lng": res.longitude
					}).then(d => {
					    if (d.code == 200) {
					        // console.log("位置提交成功")
					    } else {
					        
					    }
					}).catch(e => {
					
					})
			    }
			});
			
		},
		toSelect () {
			uni.navigateTo({
			    url: "../projectSelect/projectSelect"
			})
		}
	}
};
</script>

<style lang="less">
@import "./style.less";
</style>
