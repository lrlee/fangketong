<template>
	<view class="project-item" @tap="toProject(item.id)">
		<view class="item-content">
			<view class="tagIcon">{{ item.salesStatus == 0 ? "待售" : "在售" }}</view>
			<view class="img-box">
				<image :src="item.sets.logo" mode="aspectFill"></image>
			</view>
			<view class="right">
	            <view class="name">{{ item.projectname }}</view>
				<view class="price_range">{{ item.sets&&item.sets.price_range ? item.sets.price_range : "暂无报价" }}</view>
				<view class="project-item-num">{{ item.viewcount }}人关注 
	                <view class="yongjin"><image src="../../static/icons/yongjin.png" mode="widthFix">赚佣金</image></view>
	            </view>
				<view class="address">{{ item.sets&&item.sets.address }}</view>
				<scroll-view show-scrollbar="false" scroll-x="true" class="tags">
					<view v-if="i<=3" v-for="(v,i) in item.sets&&item.sets.tags ? item.sets.tags : []" :key="i" class="tag">{{ v }}</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
        props: {
            item: { //需循环的标签列表
				type: Object,
				default () {
					return {};
				}
			},
        },
		data() {
			return {
				
			};
		},
        methods:{
            toProject(id) {
            	if(!id || id==="0")return;
            	uni.setStorageSync('projectid', id);
            	tki.req.setConfig({
            		data: {
            			projectid: id
            		}
            	})
            	tki.nav.navTo(`/pages/index/index?id=${id}`)
            	
            }
        }
	}
</script>

<style lang="less">
    .project-item{
        display: flex;
		flex-direction: column;
        padding: 42rpx 15rpx;
		overflow: hidden;
        background:rgba(255,255,255,1);
        box-shadow:0rpx 0rpx 22rpx 0rpx rgba(7,0,2,0.4);
        border-radius: 12rpx;
        margin-top: 32rpx;
        box-sizing: border-box;
        &:last-of-type{
            margin-bottom: 30rpx;
        }
		.name{
			font-size: 34rpx;
			color: #373737;
			margin-bottom: 18rpx;
		}
		.item-content{
			display: flex;
			position: relative;
            align-items: center;
			.tagIcon{
				position: absolute;
				top: -2rpx;
				left: 23rpx;
				width: 54rpx;
				height: 60rpx;
				font-size: 22rpx;
				color: #fff;
				background-image: url("../../static/icons/zaishou.png");
				background-size: 54rpx 60rpx;
				text-align: center;
				line-height: 50rpx;
			}
			.img-box{
			    width:323rpx;
			    height: 235rpx;
			    background:rgba(41,52,133,1);
			    border-radius:8rpx;
			    flex-grow: 0;
			    flex-shrink: 0;
			    overflow: hidden;
			    margin-right: 18rpx;
			    image{
			        width: 100%;
			        height: 100%;
			    }
			}
			.right{
				height: 250rpx;
			    width: 335rpx;
			    flex-grow: 0;
			    flex-shrink: 0;
			    font-size: 22rpx;
			    display: flex;
			    flex-direction: column;
			    justify-content: space-between;
			    >view{
			        margin-bottom: 10rpx;
					font-size: 24rpx;
					color: #373737;
			        &:last-of-type{
			            margin-bottom: 0rpx;
			        }
			    }
			    .name{
			        font-size: 30rpx;
			        font-weight: bold;
			    }
			    .price_range{
			        color: #C44F53;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
			    }
                .project-item-num{
                    color: #9C9C9C;
                }
                .address{
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .tags{
                    white-space: nowrap;
                    width: 100%;
                }
			    .tag{
			        border: 1rpx solid #ccc;
			        display: inline-block;
			        padding: 0 10rpx;
			        line-height: 34rpx;
			        font-size: 20rpx;
			        border-radius: 3rpx;
                    margin-right: 8rpx;
			    }
                .yongjin{
                    font-size: 20rpx;
                    color: #C44F53;
                    margin-left: 20rpx;
                    display: inline-flex;
                    align-items: center;
                    image{
                        width: 20rpx;
                        height: 20rpx;
                        margin-right: 6rpx;
                    }
                }
			}
		}
    }

</style>
