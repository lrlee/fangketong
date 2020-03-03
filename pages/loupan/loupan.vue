<template>
	<view>
		<view class="loupan-banner">
			<image :src="project.logo" mode="aspectFill" />
		</view>
		<view class="loupan-title">
			<view class="loupan-title-name">
				{{project.title ? project.title : ""}}
			</view>
			<view class="loupan-title-info">
				<!-- <view class="loupan-title-info-price">
					{{project.price_range ? project.price_range : ""}}
					<image v-if='imgUrl' :src="imgUrl + 'loupan/yong_icon.png'" mode=""></image>
				</view> -->
				<view class="loupan-title-info-tel" @click="takePhone()">
                    <text>售楼中心</text>
					<image v-if='imgUrl' src="../../static/icons/tel_icon.png"></image>
					<text>{{project.tell ? project.tell : ""}}</text>
				</view>
			</view>
		</view>
		<view class="loupan-info loupan-item">
			<view class="loupan-info-title title">
				<!-- <image v-if='imgUrl' :src="imgUrl + 'loupan/info_icon.png'" mode=""></image> -->
				<text>楼盘信息</text>
			</view>
			<view class="loupan-info-item loupan-price">
				<view class="loupan-info-item-left">
					参考价格
				</view>
				<view class="loupan-info-item-right">
					{{project.price_range ? project.price_range : ""}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					楼盘地址
				</view>
				<view class="loupan-info-item-right">
					{{project.address ? project.address : ""}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					预售许可证
				</view>
				<view class="loupan-info-item-right">
					{{project.fyszd ? project.fyszd : ""}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					开盘时间
				</view>
				<view class="loupan-info-item-right">
					{{project.saler_time ? project.saler_time : ""}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					建筑密度
				</view>
				<view class="loupan-info-item-right">
					{{project.buildingDensity ? project.buildingDensity : ""}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					绿化率
				</view>
				<view class="loupan-info-item-right">
					{{project.afforestation ? project.afforestation : ""}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					物业公司
				</view>
				<view class="loupan-info-item-right">
					{{project.management ? project.management : ""}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					销售状态
				</view>
				<view class="loupan-info-item-right">
					{{project.salesStatus == 0 ? "待售" : "在售"}}
				</view>
			</view>
			<view class="loupan-info-item">
				<view class="loupan-info-item-left">
					项目简介
				</view>
				<view class="loupan-info-item-right loupan-desc">
					{{project.description ? project.description : ""}}
				</view>
			</view>
		</view>
		<view class="loupan-item hot-hx">
			<view class="loupan-info-title title">
				<text>热销户型</text>
				<navigator url="/pages/moreHx/moreHx">
					<view class="more">
						查看更多
					</view>
				</navigator>
			</view>
			<view class="hot-hx-warp">
				<navigator :url="'/pages/hxDetails/hxDetails?id='+ apartment[0].id" hover-class="navigator-hover">
					<view class="hot-hx-left">
						<image :src="apartment[0].thumb" mode="aspectFill"></image>
						<view class="hot-hx-left-name">
							{{apartment[0].title ? apartment[0].title : ""}}
						</view>
					</view>
				</navigator>
				<navigator :url="'/pages/hxDetails/hxDetails?id='+ apartment[1].id" hover-class="navigator-hover">
					<view class="hot-hx-right">
						<image :src="apartment[1].thumb" mode="aspectFill"></image>
						<view class="hot-hx-left-name">
							{{apartment[1].title ? apartment[1].title : ""}}
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<view class="loupan-item zhoubian">
			<view class="loupan-info-title title">
				<text>项目周边</text>
			</view>
			<view class="zhoubian-warp">
				 <map scale="15" :latitude="project.lat" :longitude="project.lng" :markers="[{latitude:project.lat,longitude:project.lng}]">
				 </map>
			</view>
		</view>
		<view class="loupan-item jt">
			<view class="loupan-info-title title">
				<text>配套信息</text>
			</view>
			<view class="jt-warp">
				<view v-for="(p, i) in params" :key="i">
					<text>{{p.title}}:</text> <text>{{p.value}}</text>
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
			project: {},
			apartment: [],
			params: [],
		};
	},
	onShow() {
		// 请求首页数据
		return tki.req.get('index/project').then(d => {
			if (d.code === 200) {
				console.log(d)
				// 处理数据
				this.project = d.data.project
				this.apartment = d.data.apartment
				this.params = d.data.params
			}
		}).catch(e => {
			tki.ui.showToast(e.msg)
			console.log(e)
		})
	},
	methods: {
		takePhone() {
			uni.makePhoneCall({
				phoneNumber: this.project.tell
			});
		}
	},
}
</script>

<style lang="less" src="./loupan.less">

</style>
