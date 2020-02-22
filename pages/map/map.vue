<template>
	<view class="container">
        <image @click="openMap" src="../../static/icons/daohang1.png" mode="widthFix"></image>
		<s-around style="width: 100%;" :showNum="20" :minWidth="180" :coordinates="{latitude: latitude, longitude: longitude}"></s-around>
	</view>
</template>

<script>
import sAround from '../../components/s-around/index.vue';
	export default {
        components: { sAround },
		data() {
			return {
				latitude: '',
                longitude: '',
                title: '',
                address: ''
			};
		},
        onLoad(options){
            this.latitude = options.latitude;
            this.longitude = options.longitude;
            this.title = options.title;
            this.address = options.address;
        },
        methods:{
            openMap(){
                uni.openLocation({
                    latitude: parseFloat(this.latitude),
                    longitude: parseFloat(this.longitude),
                    scale: 15,
                    name: this.title,
                    address: this.address
                })
            }
        }
	}
</script>

<style lang="less">
    .container{
        position: relative;
        &>image{
            width: 80rpx;
            position: absolute;
            top: 270rpx;
            right: 20rpx;
            z-index: 10001;
        }
    }
</style>
