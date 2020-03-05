<template>
	<view class="container">
        <view class="HMfilterDropdown">
            <HMfilterDropdown :filterData="filterData">
                <view class="input-box">
                    <view class="input">
                        <image src="../../static/icons/sousuo.png" mode="widthFix"></image>
                        <input v-model="keywords" placeholder="搜索我的意向楼盘" type="text" />
                    </view>
                    <view class="city-box" @click="goSelectAddr">
                        <image src="../../static/icons/daohang.png" mode="widthFix"></image>
                        <text>{{ city || "全部" }}</text>
                    </view>
                </view>
            </HMfilterDropdown>
        </view>
        <view class="project-box">
            <map class="map" :markers="handleMarkers" :include-points="handleMarkers" @markertap="callouttap" @labeltap="callouttap" @callouttap="callouttap"></map>
        </view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
    import { uniLoadMore } from '@dcloudio/uni-ui';
    import HMfilterDropdown from '../../components/HM-filterDropdown/HM-filterDropdown.vue';
    import ProjectItemCard from '../../components/project-item-card/project-item-card.vue';
    import filterData from './data.js';
    import QQMapWX from "../../utils/mapSdk.min.js";
    import dingweiImg from '../../static/icons/dingwei1.png';
    const Map = new QQMapWX({
      key: 'VQVBZ-DLBCU-F2AVZ-4GX6F-DY3SS-2SBCG' // 必填
    });
	export default {
        components: { HMfilterDropdown, uniLoadMore, ProjectItemCard },
		data() {
			return {
				city: "",
                filterData: filterData,
                filterDropdownValue: {},
                projectList: [],
                more: "more",
                page: 1,
                isLastPage: false,
                price: '',
                roomType: '',
                houseType: '',
                tags: '',
                area: '',
                district: '',
                cityList: [],
                allDistrict: [],
                keywords: ''
			};
		},
        onLoad(){
            this.getList();
            uni.$on("dropDownSelected", e => {
                this.district = e.district;
                this.price = e.price;
                this.roomType = e.roomType;
                this.houseType = e.houseType;
                this.tags = e.tags;
                this.area = e.area;
                this.handlerChange();
            })
        },
        onUnload(){
            uni.$off(['dropDownSelected'])
        },
        onReady(){
            this.getCityList();
        },
        computed: {
            handleMarkers(){
                return this.projectList.map(v => {
                    return {
                        id: v.id,
                        iconPath: dingweiImg,
                        latitude: v.sets.lat,
                        longitude: v.sets.lng,
                        title: v.projectname,
                        width: 20,
                        height: 20,
                        // alpha: 0,
                        // callout: {
                        //     content: v.projectname,
                        //     borderRadius: 6,
                        //     bgColor: '#f42308',
                        //     borderColor: "#f42308",
                        //     color: '#fff',
                        //     padding: 10,
                        //     display: 'ALWAYS',
                        //     textAlign: 'center'
                        // },
                        label: {
                            content: v.projectname,
                            bgColor: "#3394FF",
                            color: '#fff',
                            borderRadius: 2,
                            padding: 5,
                            textAlign: 'center',
                            anchorX: 15,
                            anchorY: -22
                        }
                    }
                })
            }
        },
        watch: {
            city: {
                handler: function(val){
                    const that = this;
                    if(!val){
                        that.filterData[0].submenu = this.allDistrict.map(v => ({name: v.fullname}));
                    }else{
                        for(let key in that.cityList){
                            const v = that.cityList[key];
                            if(v.name.indexOf(val)>-1 || v.fullname.indexOf(val)>-1){
                               Map.getDistrictByCityId({
                                   id: v.id,
                                   success: function(d){
                                       if(d.status == 0){
                                           that.filterData[0].submenu = d.result[0].map(vv => ({name: vv.fullname}));
                                       }
                                   },
                                   fail: function(error) {
                                       console.error(error);
                                   }
                               })
                                break;
                            }
                        }
                    }
                },
                immediate: true
            },
            keywords(val){
                this.handlerChange();
            }
        },
        methods: {
            // 点击气泡
            callouttap(e){
              uni.setStorageSync('projectid', e.markerId);
              tki.req.setConfig({
              	data: {
              		projectid: e.markerId
              	}
              })
              tki.nav.navTo(`/pages/index/index?id=${e.markerId}`)
            },
            getCityList(){
                const that = this;
                Map.getCityList({
                    success: function(res) {//成功后的回调
                        if(res.status == 0){
                            that.cityList = res.result[1];
                            that.allDistrict = res.result[2];
                            that.filterData[0].submenu = res.result[2].map(v => ({name: v.fullname}));
                            that.getLocation();
                        }
                    },
                    fail: function(error) {
                        console.error(error);
                    }
                })
            },
            getLocation(){
                const that = this;
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
                                    that.city = data.result.address_component.city.replace(new RegExp("市","g"), '')
                                    that.handlerChange();
                                }
                            }
                        })
                    }
                })
            },
			goSelectAddr() {
				uni.navigateTo({
					url: "/pages/location/location"
				})
			},
			changeCity(city) {
				this.city = city;
                this.area = '';
                this.handlerChange();
			},
            handlerChange(e){
                this.page = 1;
                this.projectList = [];
                this.isLastPage = false;
                this.getList();
            },
            scrolltolower(){
                if(!this.isLastPage) this.getList();
            },
            getList() {
                const data = {
                    city: this.city.length===1 && this.city[0]==='' ? '' : this.city,
                    // referenceprice: this.price,
                    searchType: 5,
                    floorage: this.area,
                    room: this.roomType,
                    type: this.houseType,
                    area: this.district,
                    page: this.page,
                    keywords: this.keywords
                }
                if(this.price&&this.price.type==0){
                    data.totalReferencePrice = this.price.value;
                }
                if(this.price&&this.price.type==1){
                    data.referenceprice = this.price.value;
                }
            	tki.req.post('index/searchProject', {
            		data: JSON.stringify(data)
            	}).then(d => {
                    if (d.code == 200) {
                       if(d.data.page * d.data.pagesize>=d.data.total){
                           this.isLastPage = true;
                           this.more = "noMore"
                       }else{
                           this.page = this.page+1;
                           this.more = "more"
                       }
                       this.projectList = [...this.projectList, ...d.data.list];
                    } else {
                        tki.ui.showToast(d.message);
                           this.more = "more"
                    }
                }).catch(e => {
                    tki.ui.showToast(e.message);
                    this.more = "more"
                })
            }
        }
	}
</script>

<style lang="less" src="./mapProjectSelect.less">

</style>
