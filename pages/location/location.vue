<template>
	<view class="container">
        <view class="header">
            <view class="search-box">
                <view class="search">
                    <image v-if='imgUrl' :src="imgUrl + 'projectSelect/search.png'" mode=""></image>
                    <input @input="handlerChange" type="text" placeholder="请输入您要搜索的城市名称" value=""/>
                </view>
            </view>
        </view>
        <scroll-view :scroll-top="scrollTop" @scroll="scroll" class="content" scroll-y>
            <view class="location-box content-item">
                <view>
                    <image v-if='imgUrl' :src="imgUrl + 'projectSelect/location.png'" mode="aspectFit"></image>
                    <view class="title1">当前城市</view>
                </view>
                <button class="btn" size="mini" @click="selectCity(currentCity || '')">{{ currentCity || "未知" }}</button>
            </view>
            <view class="hot-city">
                <view class="title1">热门城市</view>
                <view class="btn-box">
                    <button class="btn" size="mini" @click="selectCity('')">全部</button>
                    <button class="btn" v-for="(item, index) in hotCity" :key="index" size="mini" @click="selectCity(item)">{{ item }}</button>
                </view>
            </view>
            <view class="city-list" scroll-y>
                <view class="">
                    <template v-for="(item, index) in city">
                        <view :id="item.letter" class="indexes" :key="item.letter">{{ item.letter }}</view>
                        <view class="city-item" v-for="(d, idx) in item.data" :key="idx" @click="selectCity(d)">{{ d }}</view>
                    </template>
                </view>
            </view>
        </scroll-view>
        <view class="indexBox">
            <view class="index-item" v-for="(item,index) in city" :key="index" @click="handlerIndex(item.letter)">
                {{ item.letter }}
            </view>
        </view>
	</view>
</template>

<script>
    import city from "./city.json";
    import { uniIndexedList } from '@dcloudio/uni-ui';
    //app.js
    import QQMapWX from "../../utils/mapSdk.min.js";
	import * as tki from '../../components/TikiUI/common/js/index.js';
    const Map = new QQMapWX({
      key: 'VQVBZ-DLBCU-F2AVZ-4GX6F-DY3SS-2SBCG' // 必填
    });
	export default {
        components: { uniIndexedList },
		data() {
			return {
				hotCity: ["北京","上海","成都","深圳","广州","重庆"],
                city: city,
                scrollTop: 0,
                currentCity: ''
			};
		},
        mounted() {
        	uni.getLocation({
                type: "wgs84",
                success: (res) =>{
                    Map.reverseGeocoder({
                        location: {
                            latitude: res.latitude,
                            longitude: res.longitude
                        },
                        success: data => {
                            if(data.status == 0){
                                this.currentCity = data.result.address_component.city
								tki.req.post('member/updateAddress',{
								    "lat": res.latitude,
								    "lng": res.longitude
								}).then(d => {
								    if (d.code == 200) {
								        console.log("位置提交成功")
								    } else {
								        
								    }
								}).catch(e => {
								
								})
                            }else{
                                tki.ui.showToast('定位失败')
                            }
                        }
                    })
                }
            })
        },
        methods:{
            selectCity(city){
                let pages = getCurrentPages();
                const prePage = pages[pages.length -2];
                prePage.$vm.changeCity(city);
                uni.navigateBack()
            },
            scroll(e){
                this.scrollTop = e.detail.scrollTop;
            },
            handlerIndex(index){
                const query = uni.createSelectorQuery();
                let content = query.select(".content").boundingClientRect();
                let indexes = query.select(`#${index}`).boundingClientRect();
                query.exec(res => {
                    const contentTop = res[0].top;
                    const scrollTop = this.scrollTop;
                    const iTop = res[1].top;
                    const top = iTop - contentTop + scrollTop;
                    this.scrollTop = top;
                })
            },
            handlerChange(e){
                const value = e.detail.value;
                let data = [];
                if(value){
                    city.map(v => {
                        const letter = v.letter;
                        let d = [];
                        v.data.map(vv => {
                            if(vv.indexOf(value)>-1){
                                d.push(vv);
                            }
                        })
                        if(d.length>0){
                            data.push({
                                letter: letter,
                                data: d
                            })
                        }
                    })
                }else{
                    data = city;
                }
                this.city = data;
            }
        }
	}
</script>

<style lang="less" src="./location.less">

</style>
