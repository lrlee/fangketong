<template>
	<view>
		<view class="hx-pic-warp">
			<swiper class="swiper banner-swiper" :indicator-dots="true" :indicator-color="'#ffffff'" :indicator-active-color="'#f09727'" :autoplay="true">
				<swiper-item v-for="(item, index) in hxInfo.thumb_url" :key="index"  >
					<movable-area scale-area>
						<movable-view direction="all"  scale="true" scale-min="1" scale-max="4" :scale-value="scale">
							<image :src="item" mode="aspectFit" :data-src="item" @tap="e=>previewImg(e)" />
						</movable-view>
					</movable-area>
				</swiper-item>
			</swiper>
			<view class="hx-name">
				{{hxInfo.title ? hxInfo.title : ""}}
			</view>
			<view class="hx-item">
				<view>
					{{hxInfo.room ? hxInfo.room : ""}}室{{hxInfo.hall ? hxInfo.hall : ""}}厅{{hxInfo.kitchen ? hxInfo.kitchen : ""}}厨{{hxInfo.toilet ? hxInfo.toilet : ""}}卫
				</view>
				<view>
					{{hxInfo.floorage ? hxInfo.floorage : ""}}㎡
				</view>
			</view>
			<view class="hx-price hx-item">
				{{hxInfo.referenceprice ? hxInfo.referenceprice : "暂无价格"}}
			</view>
		</view>
		<view class="hx-txt">
			<view class="hx-txt-title">
				项目信息
			</view>
			<view class="hx-txt-con">
				{{hxInfo.desc ? hxInfo.desc : ""}}
			</view>
		</view>
		<view class="btn-warp">
			<view class="follow" @click="toPhoen('0871-1234567')">
				电话联系
			</view>
			<view class="share" @click="open">
				我要推荐
			</view>
			<view class="recommend" @click="goChooseRoom">
                在线选房
                <!-- <navigator url="/pages/chooseRoom/chooseRoom" hover-class="navigator-hover">在线选房</navigator> -->
			</view>
		</view>
        <view class="calculator" @click="calculator()">
            <image :src="imgUrl + 'home/calculator.png'" mode="" />
        </view>
        <uni-popup ref="popup" type="bottom">
            <view class="shareImg">
                <text>保存项目信息，分享给朋友吧</text>
                <image @click="previewImage" :src="shareImg" mode="aspectFit"></image>
                <button @click="saveImage" type="warn">保存相册，分享到朋友圈</button>
                <view @click="close">
                    <view>+</view>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="popup1" type="center">
            <view class="confirm">
                <view class="content">您未授权保存图片到相册，将不能保存海报</view>
                <view class="btn-box">
                    <button @click="close1" type="default">取消</button>
                    <button @click="close1" open-type="openSetting" type="warn">去授权</button>
                </view>
            </view>
        </uni-popup>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
    import { uniPopup  } from '@dcloudio/uni-ui';
	export default {
        components: { uniPopup },
		data() {
			return {
				id: '',
				hxInfo: {},
                shareImg: '',
                tempFilePath: ''
			};
		},
		onLoad: function (option) { 
			if(!option.id) {
				tki.ui.showModal('提示','ID不能为空',d=>{
					tki.nav.navBack();
				})
			} else {
				this.id = option.id
			}
		},
		onShow() {
            this.getQrcode();
			tki.req.get('apartment/detail',{
				id:this.id
			}).then(d => {
				if (d.code == 200) {
					console.log(d)
					this.hxInfo = d.data
				} else {
					tki.ui.showToast('数据加载失败')
				}
			}).catch(e => {
			
			})
		},
        methods: {
			previewImg(e){
				console.log(e.currentTarget.dataset.src);
				console.log(this,"this")
				let that = this;
				wx.previewImage({
				   current:e.currentTarget.dataset.src,     //当前图片地址             
				   urls: that.hxInfo.thumb_url || [e.currentTarget.dataset.src]//所有要预览的图片的地址集合 数组形式
				 })
			},
            toPhoen(t) {
                uni.makePhoneCall({
                    phoneNumber: String(t)
                });
            },
            open(){
                this.$refs.popup.open()
            },
            close(){
                this.$refs.popup.close()
            },
            close1(){
                this.$refs.popup1.close()
            },
            previewImage(){
                uni.previewImage({
                    urls: [this.shareImg]
                })
            },
            saveImage(){
                uni.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: () => {
                        uni.saveImageToPhotosAlbum({
                            filePath: this.tempFilePath,
                            success: () => {
                                
                            },
                            fail: (e) => {
                                console.log(e.errMsg)
                                tki.ui.showToast("保存失败");
                            }
                        })
                    },
                    fail: () => {
                        this.$refs.popup1.open()
                    }
                })
            },
            calculator(){
                uni.navigateTo({
                    url: "/pages/counter/counter" 
                })
            },
            getQrcode(){
                tki.req.post('member/qrcode',{
                    id:this.id
                }).then(d => {
                    if (d.code == 200) {
                        this.shareImg = d.data.info;    
                        uni.downloadFile({
                            url: d.data.info,
                            success: (res)=>{
                                if (res.statusCode === 200) {
                                    this.tempFilePath = res.tempFilePath;
                                }
                            }
                        })
                    } else {
                        
                    }
                }).catch(e => {
                
                }) 
            },
            goChooseRoom(){
                uni.switchTab({
                    url: '/pages/chooseRoom/chooseRoom'
                })
            }
        }
	}
</script>

<style lang="less" src="./hxDetails.less">

</style>
