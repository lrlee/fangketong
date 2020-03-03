<template>
	<scroll-view scroll-y="true" class="container">
		<view class="item" v-for="(v, i) in list" :key="i">
            <view class="item-left">
                <view class="avatar">
                    <image :src="v.avatar" mode="aspectFill"></image>
                </view>
                <text>{{ v.nickname }}</text>
            </view>
            <view class="item-rigth">{{ handleTime(v) }}</view>
        </view>
	</scroll-view>
</template>

<script>
    import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				list: []
			};
		},
        onLoad(){
            
        },
        onShow(){
            tki.req.post('index/getMemberHistory ',{}).then(d => {
            	if (d.code === 200 && d.data.history && d.data.history.length>0) {
            		this.list = d.data.history
            	}
            }).catch(e => {
            	tki.ui.showToast(e.msg)
            	console.log(e)
            })
        },
        methods: {
            handleTime(v){
                return new Date(parseInt(v.createtime) * 1000).format('yyyy-MM-dd HH:mm')
            }
        }
	}
</script>

<style lang="less" src="./visitorLogs.less">

</style>
