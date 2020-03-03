<template>
	<view>
		<view class="user-info">
			<view class="avatar">
				<image :src="userInfo.diyavatar ? userInfo.diyavatar : userInfo.avatar" mode=""></image>
			</view>
			<view class="nick-name">
				{{sfType ? sfType : ""}}——{{userInfo.nickname ? userInfo.nickname : ""}}
			</view>
		</view>
        <view class="official-account">
            <official-account style="width: 100%;"></official-account>
        </view>
		<view class="main-warp">
			<navigator url="/pages/myInfo/myInfo" v-if="userInfo.is_agent || userInfo.is_adviser" hover-class="navigator-hover">
			    <view class="main-item">
			    	<view class="main-title">
			    		<image v-if='imgUrl' :src="imgUrl + 'main/ziliao.png'" mode=""></image>
			    		<view class="main-title-txt">我的资料</view>
			    	</view>
			    	<view class="main-more">
			    		<image src="../../static/icons/right.png" mode=""></image>
			    	</view>
			    </view>
			</navigator>
			<navigator url="/pages/main/myCoupon/coupon" v-if="!userInfo.is_agent && !userInfo.is_adviser" hover-class="navigator-hover">
			    <view class="main-item">
			    	<view class="main-title">
			    		<image v-if='imgUrl' :src="imgUrl + 'main/yhq.png'" mode=""></image>
			    		<view class="main-title-txt">我的优惠券</view>
			    	</view>
			    	<view class="main-more">
			    		<image src="../../static/icons/right.png" mode=""></image>
			    	</view>
			    </view>
			</navigator>
			<navigator url="/pages/myInfo/myInfo" hover-class="none" v-if="!userInfo.is_agent && !userInfo.is_adviser">
				<button type="warn" class="to-login">注册全民经纪人</button>
			</navigator>
			<navigator url="/pages/message/list/message" v-if="userInfo.is_agent || userInfo.is_adviser" hover-class="navigator-hover">
			    <view class="main-item">
			    	<view class="main-title">
			    		<image v-if='imgUrl' :src="imgUrl + 'main/message.png'" mode=""></image>
			    		<view class="main-title-txt">我的消息</view>
			    	</view>
			    	<view class="main-more">
			    		<image src="../../static/icons/right.png" mode=""></image>
			    	</view>
			    </view>
			</navigator>
			<navigator v-if="userInfo.is_agent" url="/pages/myRecommend/myRecommend" hover-class="navigator-hover">
			    <view class="main-item">
			    	<view class="main-title">
			    		<image v-if='imgUrl' :src="imgUrl + 'main/tj.png'" mode=""></image>
			    		<view class="main-title-txt">我的推荐</view>
			    	</view>
			    	<view class="main-more">
			    		<image src="../../static/icons/right.png" mode=""></image>
			    	</view>
			    </view>
			</navigator>
			<navigator v-if="userInfo.is_agent" url="/pages/myCommission/myCommission" hover-class="navigator-hover">
			    <view class="main-item">
			    	<view class="main-title">
			    		<image v-if='imgUrl' :src="imgUrl + 'main/yongjin.png'" mode=""></image>
			    		<view class="main-title-txt">我的佣金</view>
			    	</view>
			    	<view class="main-more">
			    		<image src="../../static/icons/right.png" mode=""></image>
			    	</view>
			    </view>
			</navigator>
			<navigator v-if="userInfo.is_adviser" url="/pages/myCustomer/myCustomer" hover-class="navigator-hover">
			    <view class="main-item">
			    	<view class="main-title">
			    		<image v-if='imgUrl' :src="imgUrl + 'main/kehu.png'" mode=""></image>
			    		<view class="main-title-txt">我的客户管理</view>
			    	</view>
			    	<view class="main-more">
			    		<image src="../../static/icons/right.png" mode=""></image>
			    	</view>
			    </view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				userInfo: [],
			};
		},
		onShow() {
			// 请求头部用户信息
			return tki.req.post('member/index',{}).then(d => {
				if (d.code === 200) {
					// 处理数据
					this.userInfo = d.data.member
				}
			}).catch(e => {
				tki.ui.showToast(e.msg)
				console.log(e)
			})
			console.log(sfType())
		},
		computed: {
			// 判断身份类型
			sfType() {
				if(this.userInfo.is_agent) {
					return "全民经纪人"
				}else if(this.userInfo.is_adviser){
					return "置业顾问"
				} else {
					return "游客"
				}
			},
            getLaunchOptionsSync(){
                const scene = wx.getLaunchOptionsSync().scene;
                if(scene === 1047 || scene === 1124 || scene === 1089 || scene === 1038 || scene === 1011){
                    return true;
                }else{
                    return false
                }
            }
		}
	}
</script>

<style lang="less" src="./main.less">

</style>
