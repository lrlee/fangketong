<template xlang="wxml">
	<view class="body">
		<view class="h">
			<view class="h-title">
				<!-- 关于众和康园小区老鼠药投放通知关于众和康园小区老鼠药投放通知关于众和康园小区老鼠药投放通知 -->
				{{articleInfo.title}}
			</view>
			<!-- <view class="h-dw">
				发放单位：众和康园客服服务中心
			</view> -->
			<view class="h-time">
				<!-- 2019-02-01 14:20 -->
				{{articleInfo.time}}
			</view>
		</view>
		<scroll-view class="b" scroll-y="true">
			<rich-text :nodes="articleInfo.content"></rich-text>
		</scroll-view>
	</view>
</template>
<script>
import * as tki from "../../../components/TikiUI/common/js/index.js";
let page = {
	id:'',
}
export default {
	data() {
		return {
			articleInfo:{
				title:'',
				time:'',
				content:""
			}
		};
	},
	methods: {
		// 获取数据
		getData() {
			let that = this;
			tki.ui.showLoading('数据加载中', true)
			return tki.req.get('index/noticedetail',{
				id: page.id
			}).then(d => {
				if (d.code == 200) {
					console.log(d)
					let info = d.data
					const regex = new RegExp('<img', 'gi');
					info.detail = info.detail.replace(regex, `<img style="max-width: 100%;height:auto;object-fit: cover"`);
					let tp = {
						content:info.detail,
						time: new Date(Number(info.createtime * 1000)).format("yyyy-MM-dd"),
						title:info.title,
					}
					that.articleInfo = tp
					tki.ui.hideLoading()
				} else {
					tki.ui.showToast('数据加载失败')
				}
			}).catch(e => {

			})
		},
	},
	components: {},
	computed: {},
	watch: {},
	onPageScroll: function () {
		let that = this;
	},
	onReachBottom: function () {
		let that = this;
	},
	onPullDownRefresh: function () {
		let that = this;
	},
	onShow: function () {
		let that = this;
		that.getData()
	},
	onHide: function () {
		let that = this;
	},
	onUnload: function () {
		let that = this;
	},
	onLoad: async function (e) {
		let that = this;
		if(tki.com.empty(e.id)){
			tki.ui.showModal('提示','ID不能为空',d=>{
				tki.nav.navBack();
			})
		}else{
			page.id = e.id
		}
	}
};
</script>

<style>
@import "./style.css";
</style>
