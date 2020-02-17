<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
			};
		},
		onLoad: async function (e) {
			this.url = decodeURIComponent(e.url)
		}
	}
</script>

<style lang="less">

</style>
