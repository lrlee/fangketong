<template xlang="wxml">
	<view>
		<view class="top-pic">
			<image v-if='imgUrl' :src="imgUrl + 'service/top_pic.png'" mode="widthFix"></image>
		</view>
		<view class="head">
			<view class="head-l">
				<view class="head-l-i">售楼中心</view>
                <image src="../../static/icons/tel_icon.png" mode="widthFix"></image>
				<view class="head-l-i">{{tel ? tel : ""}}</view>
			</view>
			<view class="head-r">
				<view class="head-r-btn" hover-class="hover-c" @tap="toPhoen(tel)">
					<image v-if='imgUrl' :src="imgUrl + 'service/tel.png'" mode=""></image>
					拨打电话
					</view>
			</view>
		</view>
		<view class="list">
			<view class="title">
				置业顾问
			</view>
			<view class="tipsList">
				<view class="ensure">
					<image mode="scaleToFill" src="../../static/icons/gfbz.png"/>
				</view>
				<view class="advisory">
					<image mode="scaleToFill" src="../../static/icons/mianfeizixun.png"/>
				</view>
				<view class="Interpretation">
					<image class="interImage" mode="scaleToFill" src="../../static/icons/huxingjiedu.png"/>
				</view>
				<view class="service">
					<image mode="scaleToFill" src="../../static/icons/tiexinfuwu.png"/>
				</view>
			</view>
			<view class="not" v-if="!list || list.length==0">
			    暂无内容
			</view>
			<view @click="toChat(v)" class="list-i" v-for="(v,i) in list" :key="i">
				<image class="list-i-head" :src="v.avatar" />
				<view class="list-i-name">{{v.realname}}</view>
				<view class="list-i-ic" hover-class="hover-c" @tap.stop="toPhoen(v.mobile)">
					<image src="../../static/icons/phone.png" mode="widthFix"/>
				</view>
				<view class="part-line"></view>
				<view class="list-i-ic" hover-class="hover-c" @tap.stop="copyWx(v.weixin)" >
					<image src="../../static/icons/question.png" mode="widthFix"/>
				</view>
			</view>
		</view>
		<!-- <button open-type="contact" id="contact-btn">
			<view class="">
				在线
			</view>
			<view class="">
				客服
			</view>
		</button> -->
	</view>
</template>

<script>
import * as tki from '../../components/TikiUI/common/js/index.js'
export default {
	data() {
		return {
			list: [],
			tel: "",
		};
	},
	onShow() {
		
		// 请求顾问列表数据
		return tki.req.post('index/adviserlist').then(d => {
			if (d.code === 200) {
				// 处理数据
				this.list = d.data.list
				this.tel = d.data.tell
			}
		}).catch(e => {
			tki.ui.showToast(e.msg)
			console.log(e)
		})
	},
	methods: {
		copyWx(t) {
			if(t == "" || !t) {
				tki.ui.showToast("暂无微信号")
			} else {
				uni.setClipboardData({
					data: String(t),
					success: function () {
						uni.showModal({
							title: '提示',
							content: '微信已复制'
						});
					}
				});
			}
		},
		toPhoen(t) {
			if(t == "" || !t) {
				tki.ui.showToast("暂无电话号码")
			} else {
				uni.makePhoneCall({
					phoneNumber: String(t)
				});
			}
		},
        toChat(v){
            if(this.$store.state.user.role_type==2) return false;
            tki.nav.navTo('/pages/chat/chat?targetId='+ v.id + '&projectid=' + v.projectid + '&realname='+ v.realname)
        }
	}
}
</script>

<style lang="less">
@import "./style.less";
</style>
