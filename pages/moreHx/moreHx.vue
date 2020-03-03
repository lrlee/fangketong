<template>
	<view class="hx-list-warp">
		<view class="not" v-if="!apartment || apartment.length==0">
		    暂无内容
		</view>
		<navigator v-for="(v,i) in apartment" :key=i :url="v.isquanjing ? '/pages/webView/webView?url=' + v.thumb_link : '/pages/hxDetails/hxDetails?id='+ v.id + '&tel='+tel" hover-class="navigator-hover">
			<view class="hx-list-title">
				<view class="title">
					{{v.room ? v.room : ""}}室{{v.hall ? v.hall : ""}}厅{{v.kitchen ? v.kitchen : ""}}厨{{v.toilet ? v.toilet : ""}}卫
				</view>
			</view>
			<view class="hx-list">
				<view class="hx-list-area">
					建面约{{v.floorage ? v.floorage : ""}}
				</view>
				<view class="hx-list-info">
					<view class="hx-list-info-pic">
						<image :src="v.thumb" mode=""></image>
					</view>
					<view class="hx-list-info-txt">
						<view class="hx-list-info-txt-price">
							{{v.referenceprice ? v.referenceprice : "价格待定"}}
						</view>
						<view class="hx-list-info-txt-priceDesc">
							总价（元/套）
						</view>
						<view class="hx-list-info-txt-name">
							{{v.title ? v.title : ""}}
						</view>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
import * as tki from '../../components/TikiUI/common/js/index.js';
export default {
	data() {
		return {
			apartment: [],
            tel: ''
		};
	},
	onLoad(options) {
		// 请求首页数据
        this.tel = options.tel;
		return tki.req.get('apartment/aplist').then(d => {
			if (d.code === 200) {
				console.log(d)
				// 处理数据
				this.apartment = d.data.list
			}
		}).catch(e => {
			tki.ui.showToast(e.msg)
			console.log(e)
		})
	},
}
</script>

<style lang="less" src="./moreHx.less">

</style>
