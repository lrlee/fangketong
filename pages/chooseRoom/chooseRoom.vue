<template>
	<view>
		<view v-if="flag">
			<view class="building">
			    <view v-if="building&&building[0]" v-for="(item, index) in building" :key="index" :class="index===build ? `building-item active` : 'building-item'" @click="handlerBuild(index)">{{ item.title }}</view>
			</view>
			<view class="apartment">
			    <view v-for="(item, index) in building[build].apartment" :key="index" :class="index===apartment ? 'apartment-item active' : 'apartment-item'" @click="handlerApartment(index)">{{ item.unit_name }}</view>
			</view>
			<view class="floor">
			    <view class="" v-for="(item, index) in building[build].apartment[apartment].floor" :key="index">
			        <view class="floor-item">
			            <image class="floor-img" v-if='imgUrl' :src="imgUrl + 'chooseRoom/floor.png'" mode=""></image>
			            <text>{{ item.floor_name }}</text>
			        </view>
			        <view class="roomNum">
			            <view class="roomNum-item" v-for="(roomItem, roomIndex) in item.roomNum" :key="roomIndex" @click="clickRoom(roomItem)">{{ roomItem.floor_num }}</view>
			        </view>
			    </view>
			</view>
			<uni-popup ref="popup" type="center">
			    <view class="popup-content">
			        <view class="room-num">房间号：{{ currertRoom.floor_num }}</view>
			        <view class="area">面&ensp;&ensp;积：{{ currertRoom.area }}</view>
			        <view class="toward">朝&ensp;&ensp;向：{{ currertRoom.toward }}</view>
			        <view class="door_model">
			            <view>户&ensp;&ensp;型：{{ currertRoom.door_model }}</view>
			            <image @click="previewImage(currertRoom.door_model_img)" :src="currertRoom.door_model_img" mode="aspectFit"></image>
			        </view>
			        <view class="btnBox">
			            <view @click="close">取消</view>
			            <view @click="onOk">确定</view>
			        </view>
			    </view>
			</uni-popup>
		</view>
		<view style="text-align: center;padding-top: 50rpx;">
			暂未开放,敬请期待...
		</view>
	</view>
</template>

<script>
    import * as tki from '../../components/TikiUI/common/js/index.js'
    import { uniPopup  } from '@dcloudio/uni-ui';
	export default {
        components: { uniPopup },
		data() {
			return {
				building:  [],
                build: 0,
                apartment: 0,
                floor: 0,
                currertRoom: {},
				flag:false
			}
        },
        onShow() {
            this.getData();
        },
		methods: {
			handlerBuild(active){
                this.build = active;
                this.apartment = 0;
                this.floor = 0;
            },
            handlerApartment(active){
                this.apartment = active;
                this.floor = 0;
            },
            clickRoom(room){
                this.getRoomDetails(room.id)
            },
            previewImage(url){
                uni.previewImage({
                    urls: [url]
                })
            },
            close(){
                this.$refs.popup.close();
            },
            getData(){
                const pid = uni.getStorageSync('projectid');
                tki.req.get('house/index',{
                    pid: pid
                }).then(d => {
                    if (d.code == 200) {
                        this.building = d.data;
                    } else {
                        tki.ui.showToast('数据加载失败')
                    }
                }).catch(e => {
                
                })
            },
            getRoomDetails(id){
                uni.showLoading();
                tki.req.get('house/getHouseDetail',{
                    id: id
                }).then(d => {
                    uni.hideLoading();
                    if (d.code == 200) {
                        this.currertRoom = d.data;
                        this.$refs.popup.open();
                    } else {
                        tki.ui.showToast('数据获取失败')
                    }
                }).catch(e => {
                    uni.hideLoading();
                })
            },
            onOk() {
                // return tki.req.post('member/index',{}).then(d => {
                //     if (d.code === 200) {
                //         // 处理数据
                //         if(d.data.member.is_agent || d.data.member.is_adviser) {  // 全民经纪人或者置业顾问
                            
                //         }else{
                //             tki.ui.showModal('提示', '请先完善您的身份信息', res => {
                //                 tki.nav.navTo('/pages/myInfo/myInfo')
                //             })
                //         }
                //     }
                // }).catch(e => {
                //     tki.ui.showToast(e.msg)
                //     console.log(e)
                // })
                this.submit();
            },
            submit(id){
                tki.req.post('house_user/userInfoSubmit',{
                    detailId: id
                }).then(d => {
                    uni.hideLoading();
                    if (d.code == 200) {
                        this.$refs.popup.close();
                        tki.ui.showModal('提示', '选房成功', res => {
                        })
                    } else {
                        tki.ui.showToast(d.message)
                    }
                }).catch(e => {
                    uni.hideLoading();
                })
            }
		}
	}
</script>

<style lang="less">
@import "./chooseRoom.less";
</style>
