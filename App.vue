<script>
	export default {
		onLaunch: function() {
			console.log('App Launch 3')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/common/common.css");
	.border-b {
		border-bottom: 1px solid #ccc;;
	}
	button {
		padding: 0;
		margin: 0;
		margin: 0 auto;
		background: #b39766;
	}
	.swiper {
		height: 1100rpx;
		overflow-y: auto;
	}
</style>
