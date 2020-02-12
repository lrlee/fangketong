<template>
	<view>
		<view class="not" v-if="!picList || picList.length==0">
		    暂无内容
		</view>
		<view class="album-warp" v-for="(v, i) in picList" :key="i"">
			<view class="album-item">
				<view class="title">
					{{v[0].cate}}
				</view>
				<swiper class="swiper banner-swiper" :indicator-dots="true" :indicator-color="'#ffffff'" :indicator-active-color="'#f09727'" :autoplay="true">
					<swiper-item v-for="(item, index) in v" :key="index">
						<image :src="item.thumb" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import * as tki from "../../components/TikiUI/common/js/index.js";
	export default {
		data() {
			return {
				picList: [],
				preArr: []
			};
		},
		onLoad() {
			return tki.req.get('picture/piclist').then(d => {
				if (d.code === 200) {
					// 处理数据
					this.picList = d.data.list
					d.data.list.forEach(item => {
						this.preArr.push(item.thumb)
					})
				}
			}).catch(e => {
				tki.ui.showToast(e.message)
				console.log(e)
			})
		},
		methods: {
			preview(index) {
				uni.previewImage({
					urls: this.preArr,
					current: index
				});
			}
		}
	}
</script>

<style lang="less" src="./album.less">

</style>
