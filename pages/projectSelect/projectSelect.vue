<template>
	<view class="container">
		<view class="header">
			<view class="search-box">
				<view class="area-box" @click="goSelectAddr">
					<view class="">
						<image src='../../static/icons/daohang.png' />
						<text class="area">{{ city || "全部" }}</text>

					</view>
				</view>
				<view class="search" @click="goProjectSearch">
					<image src="../../static/icons/sousuo.png" mode=""></image>
					<input type="text" value="" placeholder="楼盘名搜索" disabled value="" />
				</view>
			</view>
		</view>
		<scroll-view class="content" scroll-y="true">
			<!-- <view class="advertising">
                <image v-if='imgUrl' :src="imgUrl + 'projectSelect/advertising.png'" mode="widthFix"></image>
            </view> -->

			<view class="advertising">
				<swiper class="swiper imagesList" :circular="true" :autoplay="videoFlag">
					<swiper-item class="imagesItem" v-for="(item, index) in adImages" :key="index">
						<video @play="play()" @pause="pause()" @ended="end()" class="video" v-if="item.video" enable-play-gesture="true"
						 :src="'https://zhongtie.h-passer.com/'+item.video"></video>
						<image v-if="item.thumb" :src="item.thumb" @tap="toProject(item.projectid)" mode="" :data-src="item.thumb" />
					</swiper-item>
				</swiper>
				<!-- <swiper class="swiper banner-swiper adText"  :vertical="true" :autoplay="true" :circular="true">
					<swiper-item class="adText-item" v-for="(item, index) in adText" :key="index"  >
						<navigator :url=" '/pages/news/newsDetails?type=1&id='+ item.id" hover-class="navigator-hover" style="height:90rpx">
							<view class="adBox" >
								<image class="notice" src="../../static/icons/laba.png"/>
								<view class="noticeText" style="padding-left: 30rpx;">{{item.title}}</view>
								<image class="rightArrow" src="../../static/icons/jiantouright.png"/>
							</view>
						</navigator>
					</swiper-item>
				</swiper> -->
			</view>
			<view class="home-menu">
				<!-- <navigator url="/pages/coupon/coupon" hover-class="navigator-hover">
					<view class="menu-item">
						<image src="../../static/icons/shaixuan.png" mode="" />
						<view class="">精准筛房</view>
					</view>
				</navigator> -->
				<view class="menu-item" @tap="filter()">
					<image src="../../static/icons/shaixuan.png" mode="" />
					<view class="">精准筛房</view>
				</view>
				<!-- <navigator url="/pages/message/list/message" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image  src="../../static/icons/lianxiwomen.png" mode="" />
				    	<view class="">联系我们</view>
				    </view>
				</navigator> -->
				<view class="menu-item" @tap="selectHomeByMap()">
					<image src="../../static/icons/dituxuanfang.png" mode="" />
					<view class="">地图选房</view>
				</view>
				<!-- <navigator url="/pages/contactUs/contactUs" hover-class="navigator-hover">
					<view class="menu-item">
						<image src="../../static/icons/dituxuanfang.png" mode="" />
						<view class="">地图选房</view>
					</view>
				</navigator> -->
				<!-- 	<navigator url="/pages/news/news" hover-class="navigator-hover">
					<view class="menu-item">
						<image src="../../static/icons/huodongzixun.png" mode="" />
						<view class="">资讯活动</view>
					</view>
				</navigator> -->
				<navigator url="/pages/counter/counter" hover-class="navigator-hover">
					<view class="menu-item">
						<image src="../../static/icons/dituxuanfang.png" mode="" />
						<view class="">房贷计算器</view>
					</view>
				</navigator>
			</view>
            <navigator url="/pages/introduction/introduction" hover-class="navigator-hover">
                <view class="zhongtieBox">
                    <image src="../../static/icons/zoujinzhongtie.png" />
                </view>
			</navigator>
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
			<view class="project-box">

				<view class="regionBox">
					<scroll-view :scroll-top="scrollTop" scroll-x="true" class="scroll-X" @scrolltoupper="upper" @scrolltolower="lower"
					 @scroll="scroll">
						<view class="topList">
							<view class="topItem" :class="classArr[0]" @tap="()=>this.changeStatus(0)">
								<view class="itemText">热门盘</view>
								<view class="itemIcon">
									<image v-if="!flagArr[0]" class="hotImage" src="../../static/icons/hotgray.png" />
									<image v-else class="hotImage" src="../../static/icons/hot.png" />
									<view>HOT</view>
								</view>
							</view>
							<view class="topItem" :class="classArr[1]" @tap="()=>this.changeStatus(1)">
								<view class="itemText">成都区域</view>
								<view class="itemIcon">
									<image v-if="!flagArr[1]" class="position" src="../../static/icons/daohanggray.png" />
									<image v-else class="position" src="../../static/icons/daohangblue.png" />
									<view>CHENGDU</view>
								</view>
							</view>
							<view class="topItem" :class="classArr[2]" @tap="changeStatus(2)">
								<view class="itemText">福州区域</view>
								<view class="itemIcon">
									<image v-if="!flagArr[2]" class="position" src="../../static/icons/daohanggray.png" />
									<image v-else class="position" src="../../static/icons/daohangblue.png" />
									<view>FUZHOU</view>
								</view>
							</view>
							<view class="topItem" :class="classArr[3]" @tap="changeStatus(3)">
								<view class="itemText">珠海区域</view>
								<view class="itemIcon">
									<image v-if="!flagArr[3]" class="position" src="../../static/icons/daohanggray.png" />
									<image v-else class="position" src="../../static/icons/daohangblue.png" />
									<view>ZHOUHAI</view>
								</view>
							</view>
							<view class="topItem" :class="classArr[4]" @tap="changeStatus(4)">
								<view class="itemText">达州区域</view>
								<view class="itemIcon">
									<image v-if="!flagArr[4]" class="position" src="../../static/icons/daohanggray.png" />
									<image v-else class="position" src="../../static/icons/daohangblue.png" />
									<view>DAZHOU</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>


				<view class="title1">
					<view></view>
					<text>推荐项目</text>
				</view>
				<view class="project-item" v-for="(item, index) in list" :key="index" @tap="toProject(item.id)">
					<view class="name">{{ item.projectname }}</view>
					<view class="item-content">
						<view class="tagIcon">在售</view>
						<view class="img-box">
							<image :src="item.sets.logo" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="price">{{ item.sets&&item.sets.price_range ? item.sets.price_range : "暂无报价" }}</view>
							<view class="num">{{ item.viewcount }}人想买</view>
							<view class="address">{{ item.sets&&item.sets.address }}</view>
							<view class="tags">
								<view v-if="item.area" class="tag">{{ item.area }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="not" v-if="!list || list.length==0">
					暂无内容
				</view>
			</view>

			<!-- <view class="introBox">
				<image src="../../static/icons/company.png" />
				<view class="introText">
					中铁二局房地产集团有限公司是中国中铁二局的全资控股子公司，全面负责中铁二局一级土地整理和房地产开发业务。中铁二局房地产集团有限公司的控股股东中铁二局工程有限公司是世界企业500强、世界品牌500强中国中铁股份有限公司的成员企业。中铁二局房地产集团有限公司开发业务已布局四川、福建、海南、贵州、北京、浙江等全国10余个省（市、自治区）。
				</view>
			</view> -->
		</scroll-view>
		<tki-authorize ref="wxat" @result="wxResult" />
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	import tkiAuthorize from "../../components/TikiUI/tki-authorize/tki-authorize";
	import QQMapWX from "../../utils/mapSdk.min.js";
	const tencentMapKey = 'VQVBZ-DLBCU-F2AVZ-4GX6F-DY3SS-2SBCG'
	export default {
		data() {
			return {
				city: "",
				page: 1,
				list: [],
				projectid: "",
				adImages: [],
				adText: [],
				videoFlag: true,
				flagArr: {
					0: false,
					1: false,
					2: false,
					3: false,
					4: false
				},
				classArr: {
					0: '',
					1: '',
					2: '',
					3: '',
					4: ''
				},
				cityArr: ['', '成都', '福州', '珠海', '达州'],
				currentCity: null,
				activity: []
			};
		},
		onLoad() {
			this.getLocation()
		},
		onShow() {
			this.getNewsList()
			this.getHotList()
			this.getActivity()
			this.changeStatus(0)
		},
		components: {
			tkiAuthorize
		},
		methods: {
			//活动
			getActivity() {
				tki.req.get('index/activity').then(d => {
					if (d.code == 200) {
						this.activity = d.data.list[0]
					} else {
						tki.ui.showToast(d.message)
					}
				}).catch(e => {
					tki.ui.showToast(e.message)
				})
			},
			//筛选
			filter() {
				// tki.ui.showToast('正在开发中...')
                tki.nav.swTab("/pages/preciseFilter/preciseQuery")
			},
			selectHomeByMap() {
				tki.ui.showToast('正在开发中...')
			},
			getLocation() {
				const self = this
				wx.getSetting({
					success: (res) => {
						console.log(JSON.stringify(res))
						// res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
						// res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
						// res.authSetting['scope.userLocation'] == true    表示 地理位置授权
						if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
							wx.showModal({
								title: '请求授权当前位置',
								content: '需要获取您的地理位置，请确认授权',
								success: function(res) {
									if (res.cancel) {
										wx.showToast({
											title: '拒绝授权',
											icon: 'none',
											duration: 1000
										})
										self.city="成都"
										//self.getList()
									} else if (res.confirm) {
										wx.openSetting({
											success: function(dataAu) {
												if (dataAu.authSetting["scope.userLocation"] == true) {
													wx.showToast({
														title: '授权成功',
														icon: 'success',
														duration: 1000
													})
													//再次授权，调用wx.getLocation的API
													self.getUserLocation()
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'none',
														duration: 1000
													})
													self.city="成都"
												//	self.getList()

												}
											}
										})
									}
								}
							})
						} else if (res.authSetting['scope.userLocation'] == undefined) {
							//调用wx.getLocation的API
							self.getUserLocation()
						} else {
							//调用wx.getLocation的API
							self.getUserLocation()
						}
					}
				})
			},
			getUserLocation() {
				const self = this
				wx.getLocation({
					type: 'wgs84', //返回可以用于wx.openLocation的经纬度
					success(res) {
						console.log(res, '已授权')
						wx.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=${tencentMapKey}`,
							success: res => {
								console.log(res, "rdddd")
								self.currentCity = res.data.result.address_component.city
								self.city = res.data.result.address_component.city
								//self.getList(self.city);
							}
						})
					},
					fail(res) {
						console.log('未授权')
						console.log(res)
						wx.showModal({
							title: '请求授权当前位置',
							content: '需要获取您的地理位置，请确认授权',
							success: function(res) {
								if (res.cancel) {
									wx.showToast({
										title: '拒绝授权',
										icon: 'none',
										duration: 1000
									})
									self.city = "成都"
									//self.getList()
								} else if (res.confirm) {
									wx.openSetting({
										success: function(dataAu) {
											if (dataAu.authSetting["scope.userLocation"] == true) {
												wx.showToast({
													title: '授权成功',
													icon: 'success',
													duration: 1000
												})
												// self.onLoad()
												//再次授权，调用wx.getLocation的API
												self.getUserLocation()
											} else {
												wx.showToast({
													title: '授权失败',
													icon: 'none',
													duration: 1000
												})
											//	self.getList()
											}
										}
									})
								}
							}
						})
					}
				})
			},
			//播放视频
			play() {
				this.videoFlag = false
			},
			pause() {
				this.videoFlag = true
			},
			end() {
				this.videoFlag = true
			},
			changeStatus(index) {
				this.city = this.cityArr[index]
				if (index) {
					this.getList(this.cityArr[index], index)
				} else {
					this.getHotList()
				}

				for (var key in this.flagArr) {
					if (key == index) {
						this.flagArr[index] = !this.flagArr[index]
						this.classArr[key] = 'active'
					} else {
						this.flagArr[key] = false
						this.classArr[key] = ''
					}
				}
			},
			goSelectAddr() {
				uni.navigateTo({
					url: "../location/location"
				})
			},
			goProjectSearch() {
				uni.navigateTo({
					url: `../projectSearch/projectSearch?city=${this.city}`
				})
			},
			changeCity(city) {
				this.city = city;
				this.getList(city);
			},
			//获取轮播的新闻数据
			getNewsList() {
				tki.req.get('index/news').then(d => {
					if (d.code == 200) {
						this.adText = d.data.list
					} else {
						tki.ui.showToast(d.message)
					}
				}).catch(e => {
					tki.ui.showToast(e.message)
				})
			},
			getHotList() {
				tki.req.get('index/projectlist', {
					viewcount: 1
				}).then(d => {
					if (d.code == 200) {
						this.list = d.data.list;
						this.adImages = d.data.banner
					} else {
						tki.ui.showToast(d.message)
					}
				}).catch(e => {
					tki.ui.showToast(e.message)
				})
			},
			getList(city) {
				let data = {};
				if (city) data.city = city;
				tki.req.get('index/index', data).then(d => {
					if (d.code == 200) {
						this.list = d.data.list;
					} else {
						tki.ui.showToast(d.message)
					}
				}).catch(e => {
					tki.ui.showToast(e.message)
				})
			},
			toPhoen(t) {
				// uni.navigateTo({
				//     url: '/pages/webView/webView?url=http://www.crerg.com/'
				// })
				tki.ui.showModal('提示', '你还不是全民经纪人', res => {
					tki.nav.navTo('/pages/myInfo/myInfo')
				}, {
					showCancel: true,
					confirmText: '去注册'
				})
			},
			toProject(id) {
				if(!id || id==="0")return;
				uni.setStorageSync('projectid', id);
				tki.req.setConfig({
					data: {
						projectid: id
					}
				})
				tki.nav.navTo(`/pages/index/index?id=${id}`)
				
			}
		},
	}
</script>

<style lang="less" src="./projectSelect.less">

</style>
