<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	import * as tki from "../../components/TikiUI/common/js/index.js";
	export default {
		data() {
			return {
				url:'',
			};
		},
		onLoad: async function (e) {
			console.log(e.url)
			if(tki.com.empty(e.url)){
				tki.ui.showModal('提示','参数有误',d=>{
					tki.nav.navBack();
				})
			}else{
				this.url = e.url
			}
		}
	}
</script>

<style lang="less">

</style>
