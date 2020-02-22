<template>
	<view class="toMsgList" @click.stop="toMsgList">
		<image src="../../static/icons/msg.png" mode="widthFix"></image>
        <!-- <text class="num" v-if="!!handleUnread">{{ handleUnread }}</text> -->
        <image :class="{new: !!handleUnread}" class="img" :src="handleUnread ? xiaoxiA : xiaoxi" mode="widthFix"></image>
        <!-- <text>消息</text> -->
	</view>
</template>

<script>
    import xiaoxi from "../../static/icons/xiaoxi.png";
    import xiaoxiA from "../../static/icons/xiaoxi_a.png";
	export default {
		data() {
			return {
				xiaoxi, xiaoxiA
			};
		},
        methods:{
            toMsgList(){
                uni.navigateTo({
                    url: "/pages/msgList/msgList"
                })
            }
        },
        computed: {
            handleUnread(){
                let num = 0;
                const obj = this.$store.state.msgList;
                for(let key in obj){
                    num += obj[key].unread.length;
                }
                return num;
            }
        }
	}
</script>

<style lang="less">
    .toMsgList{
        width: 80rpx;
        height: 80rpx;
        position: fixed;
        left: 20rpx;
        bottom: 150rpx;
        z-index: 1000;
        image{
            width: 100%;
        }
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        // border-radius: 50%;
        // background-color: #eee;
        // border: 1rpx solid #176FB8;
        .img{
            width: 26rpx;
            position: absolute;
            top: 18rpx;
            left: 28rpx;
        }
        text{
            font-size: 16rpx;
            color: #176FB8;
        }
        .new{
            animation: animation 1.2s linear infinite;
        }
    }
    .num{
        color: red;
        font-size: 22rpx;
        position: absolute;
        right: 15rpx;
        top: 15rpx;
    }
    @keyframes animation{
        0%{
            opacity: 0;
        }
        45%{
            opacity: 0;
        }
        55%{
            opacity: 1;
        }
        100%{
            opacity: 1;
        }
    }
</style>
