<template>
	<view class="container">
		<view class="header">
            <view class="search-box">
                <view class="area-box" @click="goSelectAddr">
                    <view class="">
						<image src='../../static/icons/daohang.png'/>
                        <text class="area">{{ city || "全部" }}</text>
                        
                    </view>
                </view>
                <view class="search" @click="goProjectSearch">
                    <image  src="../../static/icons/sousuo.png" mode=""></image>
                    <input type="text" value="" placeholder="楼盘名搜索" disabled value=""/>
                </view>
            </view>
        </view>
        <scroll-view class="content" scroll-y="true" >
            <!-- <view class="advertising">
                <image v-if='imgUrl' :src="imgUrl + 'projectSelect/advertising.png'" mode="widthFix"></image>
            </view> -->
			
			<view class="advertising">
				<swiper class="swiper imagesList"   :autoplay="true">
					<swiper-item class="imagesItem" v-for="(item, index) in adImages" :key="index"  >
						<image :src="item" mode="" :data-src="item"  />
					</swiper-item>
				</swiper>
				<swiper class="swiper banner-swiper adText"  :vertical="true" :autoplay="true" :circular="true">
					<swiper-item class="adText-item" v-for="(item, index) in adText" :key="index"  >
						<view>
							<image class="notice" src="../../static/icons/laba.png"/>
							<view class="noticeText">{{item}}</view>
							<image class="rightArrow" src="../../static/icons/jiantouright.png"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="home-menu">
				<navigator url="/pages/coupon/coupon" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image  src="../../static/icons/youhuiquan.png" mode="" />
				    	<view class="">优惠政策</view>
				    </view>
				</navigator>
				<navigator url="/pages/message/list/message" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image  src="../../static/icons/lianxiwomen.png" mode="" />
				    	<view class="">联系我们</view>
				    </view>
				</navigator>
				<navigator url="/pages/message/list/message"  hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image  src="../../static/icons/huodongzixun.png" mode="" />
				    	<view class="">资讯活动</view>
				    </view>
				</navigator>
				<navigator url="/pages/counter/counter" hover-class="navigator-hover">
				    <view class="menu-item">
				    	<image  src="../../static/icons/fangdai.png" mode="" />
				    	<view class="">房贷计算器</view>
				    </view>
				</navigator>
			</view>
            <view class="project-box">
				<view class="topList">
					<view class="topItem"  :class="classArr[0]" @tap="()=>this.changeStatus(0)">
						<view class="itemText">热门盘</view>
						<view class="itemIcon">
							<image v-if="!flagArr[0]" class="hotImage" src="../../static/icons/hotgray.png"/>
							<image v-else class="hotImage" src="../../static/icons/hot.png"/>
							<view>HOT</view>
						</view>
					</view>
					<view class="topItem" :class="classArr[1]" @tap="()=>this.changeStatus(1)">
						<view class="itemText">成都区域</view>
						<view class="itemIcon">
							<image v-if="!flagArr[1]" class="position" src="../../static/icons/daohanggray.png"/>
							<image v-else class="position" src="../../static/icons/daohangblue.png"/>
							<view>CHENGDU</view>
						</view>
					</view>
					<view class="topItem" :class="classArr[2]" @tap="changeStatus(2)">
						<view class="itemText">福州区域</view>
						<view class="itemIcon">
							<image v-if="!flagArr[2]" class="position" src="../../static/icons/daohanggray.png"/>
							<image v-else class="position" src="../../static/icons/daohangblue.png"/>
							<view>FUZHOU</view>
						</view>
					</view>
					<view class="topItem" :class="classArr[3]" @tap="changeStatus(3)">
						<view class="itemText">珠海区域</view>
						<view class="itemIcon">
							<image v-if="!flagArr[3]" class="position" src="../../static/icons/daohanggray.png"/>
							<image v-else class="position" src="../../static/icons/daohangblue.png"/>
							<view>ZHOUHAI</view>
						</view>
					</view>
				</view>
                <view class="title1">
                    <view></view>
                    <text>推荐项目</text>
                </view>
                <view class="project-item" v-for="(item, index) in list" :key="index" @tap="toProject(item.id)">
					<view class="name">{{ item.projectname }}</view>
					<view class="item-content">
						<view class="tagIcon" >在售</view>
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
			
			<view class="introBox">
				<image src="../../static/icons/company.png"/>
				<view class="introText">
					中铁二局房地产集团有限公司是中国中铁二局的全资控股子公司，全面负责中铁二局一级土地整理和房地产开发业务。中铁二局房地产集团有限公司的控股股东中铁二局工程有限公司是世界企业500强、世界品牌500强中国中铁股份有限公司的成员企业。中铁二局房地产集团有限公司开发业务已布局四川、福建、海南、贵州、北京、浙江等全国10余个省（市、自治区）。
				</view>
			</view>
        </scroll-view>
		<tki-authorize ref="wxat" @result="wxResult"/>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	import tkiAuthorize from "../../components/TikiUI/tki-authorize/tki-authorize";
	export default {
		data() {
			return {
                city: "",
                page: 1,
				list: [],
				projectid: "",
				adImages:['../../static/icons/ad1.png'],
				adText:['公告1','公告2'],
				flagArr:{
					0:true,
					1:false,
					2:false,
					3:false
				},
				classArr:{
					0:'active',
					1:'',
					2:'',
					3:''
				},
				cityArr:['','成都','福州','珠海']
			};
		},
        onLoad(){
            this.getHotList();
        },
		components: {
			tkiAuthorize
		},
        methods:{
			changeStatus(index){
				this.city = this.cityArr[index]
				if(index){
					this.getList(this.cityArr[index],index)
				}else{
					this.getHotList()
				}
				
				for(var key in this.flagArr){
					if(key ==index){
						this.flagArr[index] = !this.flagArr[index]
						if(this.classArr[key]=='active'){
							this.classArr[key]=''
						}else{
							this.classArr[key]='active'
						}
					}else{
						this.flagArr[key] = false
						this.classArr[key]=''
					}
				}
			},
            goSelectAddr(){
                uni.navigateTo({
                    url: "../location/location"
                })
            },
            goProjectSearch(){
                uni.navigateTo({
                    url: `../projectSearch/projectSearch?city=${this.city}`
                })
            },
            changeCity(city){
                this.city = city;
                this.getList(city);
            },
			getHotList(){
				tki.req.get('index/projectlist', {viewcount:1}).then(d => {
				    if (d.code == 200) {
				       this.list = d.data.list;
				    } else {
				        tki.ui.showToast(d.message)
				    }
				}).catch(e => {
				    tki.ui.showToast(e.message)
				})
			},
            getList(city){
                let data = {
                };
                if(city) data.city = city;
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
			toProject(id) {
				uni.setStorageSync('projectid', id);
				tki.req.setConfig({
					data: {
						projectid: id
					}
				})
				uni.switchTab({
				    url: `/pages/index/index?id=${id}`
				});
			}
        },
	}
</script>

<style lang="less" src="./projectSelect.less">

</style>
