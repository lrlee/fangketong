<template xlang="wxml">
	<view class="news-warp">
		<view class="news-item" v-for="(v,i) in list" :key="i">
			<navigator :url="!v.link == '' ? '/pages/webView/webView?url=' + v.link : '/pages/message/newsCon/newsCon?id='+ v.id" hover-class="navigator-hover">
				<view class="news-left">
					<image :src="v.thumb" />
					<view class="news-title-warp">
						<view class="news-title">{{v.title}}</view>
						<view class="news-time">{{v.createtime}}</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
import * as tki from "../../../components/TikiUI/common/js/index.js";
export default {
	data() {
		return {
			list: []
		};
	},
	onShow() {
		// 请求首页数据
		return tki.req
			.get("index/notice")
			.then(d => {
				if (d.code === 200) {
					// console.log(d)
					// 处理数据
					this.list = d.data.list.map(v => {
						return Object.assign(v, {
							createtime: new Date(Number(v.createtime * 1000)).format("yyyy-MM-dd")
						});
					});
					console.log(this.list);
				}
			})
			.catch(e => {
				tki.ui.showToast(e.msg);
				console.log(e);
			});
	},
	computed: {
	
	}
};
</script>

<style lang="less" src="./message.less">
</style>
