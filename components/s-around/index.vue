<template>
	<view class="QS-tabs-c">
        <map class="map" scale="15" :latitude="coordinates.latitude" :longitude="coordinates.longitude" :markers="[{latitude:coordinates.latitude,longitude:coordinates.longitude}]">
        </map>
		<view class="QS-tabs-box">
			<QSTabs 
                ref="tabs" 
                :tabs="tabsHandler" 
                animationMode="line1" 
                :current="current" 
                :height="160"
                @change="change"
                activeColor="#3B95F9"
                defaultColor="#3a3a3a"
                lineColor="#f1505c"
                space="20"
                :minWidth="minWidth"
            >
			</QSTabs>
		</view>
		<swiper 
		:style="{'height': swiperHeight + 'px'}" 
		:current="swiperCurrent" 
		@transition="transition"
		@animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="height: 100%;">
					<view class="scroll-items" :id="'scroll'+index">
						<view class="scroll-item" v-for="(ite, ind) in item.data" :key="ind">
							<view class="orderNum">
                                <view>{{ind + 1}}</view>
                            </view>
                            <view class="name">{{ite.title}}</view>
                            <view class="distance">距离{{ite._distance}}米</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import QSTabs from '../QS-tabs/QS-tabs.vue';
    import QQMapWX from "../../utils/mapSdk.min.js";
    import jiaotong from '../../static/icons/jiaotong.png';
    import jiaoyu from '../../static/icons/jiaoyu.png';
    import yiliao from '../../static/icons/yiliao.png';
    import shangye from '../../static/icons/shangye.png';
    const Map = new QQMapWX({
      key: 'VQVBZ-DLBCU-F2AVZ-4GX6F-DY3SS-2SBCG' // 必填
    });
	const Sys = uni.getSystemInfoSync();
	const wH = Sys.windowHeight;
	let n = 1;
	const tabs = Array(10).fill('').map(()=> 'tab' + Array(n).fill('s').join('') + n++);
	export default {
		components: {
			QSTabs
		},
        props: {
            coordinates: {},
            showNum: {
              type: Number,
              value: 20
            },
			minWidth: { //单个tab的最小宽度	//v1.4修改
				type: [String, Number],
				default: 165
			}
        },
		data() {
			return {
				tabs:[{
                  name: "交通",
                  img: jiaotong,
                  data: []
                },{
                  name: "教育",
                  img: jiaoyu,
                  data: []
                },{
                  name: "医疗",
                  img: yiliao,
                  data: []
                },{
                  name: "商业",
                  img: shangye,
                  data: []
                }],
				current: 0,
				swiperCurrent: 0,
				swiperHeight: uni.getSystemInfoSync().windowHeight,
				dx: 0
			}
		},
        created(){
            setTimeout(()=>{
                this.handlerSwiperCurrent();
            }, 1000)
        },
		methods: {
			change(index) {
				this.swiperCurrent = index;
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: { current }}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
            handlerSwiperCurrent(){
                const that = this;
                const query = uni.createSelectorQuery().in(this);
                const v = query.select('#scroll'+this.current).boundingClientRect(data => {
                    if(data.height>0){
                        that.swiperHeight = data.height;
                    }else if(data.height==0 && this.tabs[0].data.length==0){
                        that.swiperHeight = data.height;
                    }
                }).exec();
            }
		},
        computed: {
            tabsHandler(){
                return this.tabs.map(v => v)//`${v.name}(${v.data.length})`)
            }
        },
        watch: {
            "swiperCurrent": function(){
                this.handlerSwiperCurrent();
            },
            "coordinates": function({latitude, longitude}){
                if(latitude && longitude){
                    //搜索周边
                    const that = this;
                    this.tabs.map((v,i) => {
                      Map.search({
                        keyword: v.name,
                        location:{
                          latitude: latitude,
                          longitude: longitude
                        },
                        page_size: this.showNum,
                        page_index: 1,
                        success: function(res){
                           that.tabs = [...that.tabs.slice(0,i),{
                             name: v.name,
                             img: v.img,
                             data: res.data.map((item,index) => {
                               item._distance = Math.round(item._distance);
                               return item;
                             })
                           },...that.tabs.slice(i+1)];
                           that.handlerSwiperCurrent();
                        },
                        fail: function (res) {
                          console.log(res)
                        },
                        complete: function (res){
                          console.log(res)
                        }
                      })
                    })
                }
            }
        }
	}
</script>

<style scoped>
    .map{
        width: 100%;
        height: 360rpx;
    }
    .QS-tabs-c{
        width: 100%;
        position: relative;
    }
	.QS-tabs-box{
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: white;
        /* box-shadow:0rpx 10rpx 10rpx 0rpx rgba(0, 0, 0, 0.1) */
	}
    .QS-tabs-scroll-box{
        text-align: center;
    }
	.swiper-item{
		background-color: #fff;
	}
	.scroll-items{
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.scroll-item{
		padding: 20rpx 0rpx;
		background-color: white;
		border-radius: 8rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #f8f8f8;
        color: #3a3a3a;
        font-size: 26rpx;
	}
	.scroll-item-image-box{
		flex-grow: 0;
	}
	.scroll-item-text-box{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: bold;
		margin-left: 15rpx;
	}
	.scroll-item-image{
		border-radius: 4rpx;
		width: 180rpx;
		height: 150rpx;
	}
    .orderNum{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
    .orderNum view{
        width: 28rpx;
        height: 28rpx;
        background: #0062B1;
        border-radius:50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14rpx;
        font-weight:400;
        color: #0062B1;
    }
    .name{
        flex: 8;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-right: 10rpx;
    }
    .distance{
        flex: 3;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>
