<template>
	<view class="content-warp">
		<view class="banner">
			<swiper @change="swiperChange" class="swiper banner-swiper" :circular="true" :indicator-dots="false" :indicator-color="'#ffffff'" :indicator-active-color="'#3B95F9'" :autoplay="videoFlag">
				<swiper-item v-for="(item, index) in banner" :key="index">
				<!-- 	<image :src="item.thumb" mode="aspectFill" /> -->
					<video @play="play()" @pause="pause()" @ended="end()" class="video" v-if="item.video" enable-play-gesture="true" :src="'https://zhongtie.h-passer.com/'+item.video"></video>
					<image v-if="item.thumb" :src="item.thumb" mode="aspectFill" :data-src="item.thumb"  />
                    <navigator v-if="item.contentType == 3" :url="`../vr/vr?url=${encodeURIComponent('https://m.anjuke.com/xinfang/fuwu/vr/?loupan_id=446778&housetype_id=495221&frompm=copylink')}`">
                        <image :src="item.thumb" mode="aspectFill"></image>
                    </navigator>
                </swiper-item>
			</swiper>
            <view class="indicator-box">
                <view :class="{active: currentType == 3}">VR</view>
                <view :class="{active: currentType == 2}">视频</view>
                <view :class="{active: currentType == 1}">图片</view>
            </view>
		</view>
        <!-- <navigator :url="`../vr/vr?url=${encodeURIComponent('https://m.anjuke.com/xinfang/fuwu/vr/?loupan_id=446778&housetype_id=495221&frompm=copylink')}`">
            <button type="primary">vr</button>
        </navigator> -->
		<view class="project-desc">
			<view class="project-name">
				{{project.projectname ? project.projectname : ""}}
				<!-- <navigator url="/pages/loupan/loupan" hover-class="navigator-hover">
				   <view class="more">
				   	更多详情
				   </view>
				</navigator> -->
			</view>
			<view class="project-price">
				{{project.price_range ? project.price_range : "暂无价格"}}
			</view>
			<view class="want">
				<view class="want-avatar">
					<view>
                        <view class="want-avatar-item" v-for="(v, i) in history" :key="i">
                        	<image :src="v.avatar" mode=""></image>
                        </view>
                        <view class="want-avatar-omit">
                            <text></text><text></text><text></text>
                        </view>
                    </view>
					<view class="want-num">
						<text>{{project.viewcount ? project.viewcount : ""}}</text>人关注
					</view>
				</view>
			</view>
			<view class="project-loac">
				<view class="project-loac-icon" @tap="getMap()">
					<image src="../../static/icons/daohang.png" mode="widthFix"></image>
				</view>
				地址：{{ (project.province ? project.province + "·": '') + (project.city ? project.city + "·":'') + (project.area ? project.area + "·":'') + project.projectname}}
			</view>
            <view class="project-details">
                <view>
                    <text>建筑面积</text><text>{{ project.area_range }}</text>
                </view>
                <view>
                    <text>开盘时间</text><text>{{ project.saler_time }}</text>
                </view>
                <!-- <view>
                    <text>产品类型</text><text>住宅</text>
                </view> -->
                <view>
                    <text>楼盘地址</text><text>{{project.address ? project.address : ""}}</text>
                </view>
                <image @tap="getMap()" class="daohang1" src="../../static/icons/daohang1.png" mode="widthFix"></image>
            </view>
            <navigator url="/pages/loupan/loupan" hover-class="navigator-hover">
                <view class="moreDetails">
                    <view>查看更多信息</view>
                </view>
            </navigator>
		</view>
		<!-- <view class="home-menu-warp">
			<view class="home-menu">
				<!-- <navigator url="/pages/myCustomer/myCustomer" hover-class="navigator-hover"> -->
                    <!-- <view class="menu-item" @tap="myCustomer()">
                    	<image src="../../static/icons/kehu.png" mode="" />
                    	<view class="">我的客户</view>
                    </view> -->
                <!-- </navigator> -->
			<!-- 	<navigator url="/pages/coupon/coupon" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image src="../../static/icons/youhuiquan.png" mode="" />
				    	<view class="">优惠政策</view>
				    </view>
				</navigator>
				<navigator url="/pages/service/service" open-type="switchTab" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image src="../../static/icons/zhiyeguwen.png" mode="" />
				    	<view class="">置业顾问</view>
				    </view>
				</navigator>
				<navigator url="/pages/message/list/message" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image v-if='imgUrl' src="../../static/icons/loupandongtai.png" mode="" />
				    	<view class="">楼盘动态</view>
				    </view>
				</navigator> -->
				<!-- <navigator url="/pages/counter/counter" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image v-if='imgUrl' :src="imgUrl + 'home/calculator.png'" mode="" />
				    	<view class="">房贷计算器</view>
				    </view>
				</navigator> 
			</view>
		</view> -->
        
        <view class="adviser-list">
        	<view class="title">
                <view></view>
        		<text>置业顾问</text>
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
        	<view class="not" v-if="!adviserList || adviserList.length==0">
        	    暂无内容
        	</view>
        	<view @click="toChat(v)" class="adviser-list-i" v-for="(v,i) in handleAdviser" :key="i">
        		<image class="adviser-list-i-head" :src="v.avatar" />
        		<view class="adviser-list-i-name">{{v.realname}}</view>
        		<view class="adviser-list-i-ic" hover-class="hover-c" @tap.stop="toPhoen(v.mobile)">
        			<image src="../../static/icons/phone.png" mode="widthFix"/>
        		</view>
        		<view class="part-line"></view>
        		<!-- <view class="list-i-ic" hover-class="hover-c" @tap.stop="copyWx(v.weixin)" > -->
        		<view class="adviser-list-i-ic" hover-class="hover-c" @click.stop="toChat(v)">
        			<image src="../../static/icons/question.png" mode="widthFix"/>
        		</view>
        	</view>
            <view @click="handleShowAdviser" v-if="adviserList.length>3" class="allAdviser">
                <text>{{ showAllAdviser ? "收起" : "显示全部" }}</text>
                <image :style="{transform: `rotateZ(${showAllAdviser ? '-90deg':'90deg'})`}" src="../../static/icons/right.png" mode="widthFix"></image>
            </view>
        </view>
        <view class="tuijian-box">
            <image class="tuijian" src="../../static/icons/tuijianjiangli.png" mode="widthFix"></image>
            <view class="btn-box">
                <view class="btn">
                    <image src="../../static/icons/biandong.png" mode="widthFix"></image>
                    <text>变价通知</text>
                </view>
                <view class="btn">
                    <image src="../../static/icons/tongzhi.png" mode="widthFix"></image>
                    <text>开盘通知</text>
                </view>
            </view>
        </view>
		<view class="hotActivity">
			<view class="topBox">
				<view class="title1">
					<view></view>
					<text>热门活动</text>
				</view>
				<navigator url="/pages/news/news" hover-class="navigator-hover">
					<view class="moreBtn">查看更多</view>
				</navigator>
			</view>
			<view class="hotContentBox">
				<navigator :url="'/pages/news/newsDetails?type=2&id='+ activity.id" hover-class="navigator-hover">
					<image class="hotImage" :src="activity.thumb" />
					<view class="hotContent">
						<view class="hotTitle">
							<image src="../../static/icons/new.png" />
							<view class="titleText">{{activity.title}}</view>
						</view>
						<view class="dateBox">
							<view class="date">{{activity.description}}</view>
							<!-- <view class="joinBtn">马上参与</view> -->
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<!-- <view class="contactBox">
			<view class="home" @tap="toService()">
				<image src="../../static/icons/zhiyeguwen.png"/>
			</view>
			<navigator url="/pages/myCustomer/myCustomer">
				<view class="wholePeople">
					<image src="../../static/icons/quanminyingxiao.png"/>
				</view>
			</navigator>
		</view> -->
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
					<navigator v-for="(v,i) in apartment" :key="i" :url="v.isquanjing ? '/pages/webView/webView?url=' + v.thumb_link : '/pages/hxDetails/hxDetails?id='+ v.id" hover-class="navigator-hover">
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
			<view class="zhoubian">
				<view class="more-title">
					<view class="title">
						<text>项目周边</text>
						<!-- <navigator :url="`/pages/map/map?latitude=${project.lat}&longitude=${project.lng}&title=${project.title}&address=${project.address}`" hover-class="navigator-hover">
						    <view class="more">
						    	查看更多
						    </view>
						</navigator> -->
					</view>
				</view>
				<view class="index-hx">
					<s-around style="width: 100%;" :showNum="3" :coordinates="{latitude: project.lat, longitude: project.lng}"></s-around>
				</view>
                <navigator :url="`/pages/map/map?latitude=${project.lat}&longitude=${project.lng}&title=${project.title}&address=${project.address}`" hover-class="navigator-hover">
                    <view class="moreAddress">查看更多周边概况</view>
                </navigator>
                
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<image :src="popupadv" mode="widthFix"></image>
		</uni-popup>
		<!-- <button id="to-select" @tap="toSelect">
			<view class="">
				切换
			</view>
			<view class="">
				项目
			</view>
		</button> -->
		<tabbar :phoneNumber="project.tell"></tabbar>
        <to-msg-list></to-msg-list>
	</view>
</template>

<script>
import * as tki from '../../components/TikiUI/common/js/index.js';
import {uniPopup} from '@dcloudio/uni-ui';
import sAround from '../../components/s-around/index.vue';
import tabbar from '../../components/tabbar/tabbar.vue';
import toMsgList from '../../components/to-msg-list/to-msg-list.vue';
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
			projectId: "",
			videoFlag:true,
			activity: [],
            currentType: 0,
            adviserList: [],
            showAllAdviser: false
		};
	},
	components: {
		uniPopup, sAround,tabbar,toMsgList
	},
	onLoad() {
		// 请求弹窗广告
		tki.req.post('index/popupadv',{}).then(d => {
			if (d.code === 200) {
				// 处理数据
				if(d.data.banner && d.data.banner.length != 0) {
					this.popupadv = d.data.banner[0].thumb
					this.$refs.popup.open()
				}
			}
		}).catch(e => {
			tki.ui.showToast(e.msg)
		})
	},
	onShow() {
		this.getActivity()
        this.getAdviserList()
		// 请求首页数据
		tki.req.post('index/projectindex',{}).then(d => {
			if (d.code === 200) {
				// 处理数据
				this.banner = d.data.banner
				this.thumb = d.data.picture
				this.apartment = d.data.apartment.slice(0,2)
				this.project = d.data.project
				this.history = d.data.history
                this.currentType = d.data.banner.length>0 ? d.data.banner[0].contentType : 1
                uni.setNavigationBarTitle({
                    title: d.data.project.projectname
                })
			}
		}).catch(e => {
			tki.ui.showToast(e.msg)
			console.log(e)
		})
	},
    computed:{
        handleAdviser(){
            return (!this.showAllAdviser && this.adviserList.length>3) ? this.adviserList.slice(0,3) : this.adviserList
        },
    },
	methods: {
        swiperChange(e){
            this.currentType = this.banner[e.detail.current].contentType
        },
		toService(){
			uni.navigateTo({
			    url: '/pages/service/service'
			})
		},
        handleShowAdviser(){
             this.showAllAdviser = !this.showAllAdviser
        },
        getAdviserList(){
            tki.req.post('index/adviserlist').then(d => {
            	if (d.code === 200) {
            		// 处理数据
            		this.adviserList= d.data.list
            	}
            }).catch(e => {
            	tki.ui.showToast(e.msg)
            	console.log(e)
            })
        },
		//活动
		getActivity() {
			let projectId = uni.getStorageSync('projectid')
			tki.req.get('index/activity',{projectid:projectId}).then(d => {
				if (d.code == 200) {
					this.activity = d.data.list[0]
					this.activity.createtime = new Date(Number(d.data.list[0].createtime * 1000)).format("yyyy-MM-dd")
				} else {
					tki.ui.showToast(d.message)
				}
			}).catch(e => {
				tki.ui.showToast(e.message)
			})
		},
		//播放视频
		play(){
			this.videoFlag = false
		},
		pause(){
			this.videoFlag = true
		},
		end(){
			this.videoFlag = true
		},
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
            tki.nav.swTab("../projectSelect/projectSelect");
			// uni.navigateTo({
			//     url: "../projectSelect/projectSelect"
			// })
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
            if(this.$store.state.user.role_type==2) {
                uni.showModal({
                    content: "置业顾问不具备此功能",
                    showCancel: false
                })
                return false;
            }
            tki.nav.navTo('/pages/chat/chat?targetId='+ v.id + '&projectid=' + v.projectid + '&realname='+ v.realname)
        }
	}
};
</script>

<style lang="less">
@import "./style.less";
</style>
