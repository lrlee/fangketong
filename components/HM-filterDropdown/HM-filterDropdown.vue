<template>
	<view class="dropdown-box">
        <view class="dropdown-bar">
            <view @click="handleHide" class="header-box"><slot></slot></view>
            <view class="dropdowm-title">
                <view @click="handleSelect(0)" :class="{active: selectIndex === 0}"><text>{{ handleCityName }}</text><text class="iconfont triangle"></text></view>
                <view @click="handleSelect(1)" :class="{active: selectIndex === 1}"><text>{{ handlePriceName }}</text><text class="iconfont triangle"></text></view>
                <view @click="handleSelect(2)" :class="{active: selectIndex === 2}"><text>{{ handleRoomTypeName }}</text><text class="iconfont triangle"></text></view>
                <view @click="handleSelect(3)" :class="{active: selectIndex === 3}"><text>筛选</text><text class="iconfont triangle"></text></view>
            </view>
        </view>
        <view class="mask" @click="handleHide" :class="{show: show, hide: maskHide}"></view>
        <view class="content" :class="{show: selectIndex === 0, hide: selectIndex !== 0 && selectIndex !== null}">
            <view class="content-item">
                <view class="line-item" :class="{selected: district&&district[0] === ''}" @click="selectCity('')">不限</view>
                <view class="line-item" v-for="(v, i) in filterData[0].submenu" :key="i" :class="{selected: district.indexOf(v.name)>-1}" @click="selectCity(v.name)">{{ v.name }}</view>
            </view>
            <view class="btn-box">
                <button @click="handleHide">确定</button>
            </view>
        </view>
        <view class="content" :class="{show: selectIndex === 1, hide: selectIndex !== 1 && selectIndex !== null}">
            <view class="content-item hierarchy">
                <view class="hierarchy-left">
                    <view class="line-item" :class="{active: selectPriceClassify === i}" v-for="(v, i) in filterData[1].submenu" @click="handlePriceClassify(i)" :key="i">{{ v.name }}</view>
                </view>
                <view class="hierarchy-right">
                    <view class="line-item" :class="{selected: JSON.stringify(selectPrice) === JSON.stringify([])}" @click="handlePrice([])">不限</view>
                    <view class="line-item" :class="{selected: JSON.stringify(selectPrice) === JSON.stringify(v.value)}" v-for="(v, i) in filterData[1].submenu[selectPriceClassify].submenu" :key="i" @click="handlePrice(v.value)">
                        {{ v.name }}
                    </view>
                </view>
            </view>
            <view class="btn-box price-btn">
                <view>
                    <input type="number" v-model="minPrice" placeholder="最低总价"/>
                    <text>-</text>
                    <input type="number" v-model="maxPrice" placeholder="最高总价"/>
                </view>
                <button @click="handlePriceHide">确定</button>
            </view>
        </view>
        <view class="content" :class="{show: selectIndex === 2, hide: selectIndex !== 2 && selectIndex !== null}">
            <view class="content-item">
                <view class="line-item" v-for="(v, i) in filterData[2].submenu" :key="i" :class="{selected: roomType.indexOf(parseInt(v.value))>-1}" @click="selectRoomType(v.value)">{{ v.name }}</view>
            </view>
            <view class="btn-box">
                <button @click="handleHide">确定</button>
            </view>
        </view>
        <view class="content" :class="{show: selectIndex === 3, hide: selectIndex !== 3 && selectIndex !== null}">
            <view class="content-item">
                <view>
                    <text class="title1">面积</text>
                    <view class="area-box">
                        <view class="area-item" :class="{active: area.indexOf(v.value)>-1}" v-for="(v, i) in filterData[3].submenu[0].submenu" :key="i" @click="handleArea(v.value)">{{ v.name }}</view>
                    </view>
                </view>
                <view>
                    <text class="title1">类型</text>
                    <view class="area-box">
                        <view class="area-item" :class="{active: houseType.indexOf(v.value || v.name)>-1}"  v-for="(v, i) in filterData[3].submenu[1].submenu" :key="i" @click="handleHouseType(v)">{{ v.name }}</view>
                    </view>
                </view>
                <!-- <view>
                    <text class="title1">标签</text>
                    <view class="area-box">
                        <view class="area-item" :class="{active: tags.indexOf(v.name)>-1}" v-for="(v, i) in filterData[3].submenu[2].submenu" :key="i" @click="handleTags(v)">{{ v.name }}</view>
                    </view>
                </view> -->
            </view>
            <view class="btn-box filter">
                <button @click="clear">清空</button>
                <button @click="handleHide">确定</button>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
        props: {
           filterData: {
               type: Array,
               default: []
           }
        },
		data() {
			return {
                selectIndex: null,
                show: false,
                district: '',
                selectPrice: '',
                selectPriceClassify: 0,
                minPrice: '',
                maxPrice: '',
                roomType: '',
                area: [],
                houseType: [],
                tags: [],
                maskHide: true
            }
		},
        created(){
            
        },
		methods: {
			handleSelect(index){
                this.selectIndex = this.selectIndex===index ? null : index
            },
            handleHide(){
                if(this.selectIndex !== null){
                    this.selectIndex = null;
                    uni.$emit("dropDownSelected", {
                        district: this.district.length==0 || this.district[0] === "" || this.district[0] == -1 ? "" : this.district,
                        price: {
                            type: this.selectPriceClassify,
                            value: this.selectPrice.length==0 || this.selectPrice[0] === "" || this.selectPrice[0] == -1 ? "" : this.selectPrice
                        },
                        roomType: this.roomType.length==0 || this.roomType[0] === "" || this.roomType[0] == -1 ? "" : this.roomType,
                        area: this.area.length==0 || this.area[0] === "" || this.area[0] == -1 ? "" : this.area,
                        houseType: this.houseType.length==0 || this.houseType[0] === "" || this.houseType[0] == -1 ? "" : this.houseType,
                        // tags: this.tags
                    })
                }
            },
            clear(){
                this.area = [];
                this.houseType = [];
                this.tags = [];
            },
            handlePriceHide(){
                if(this.minPrice && this.maxPrice){
                    this.selectPriceClassify = 0;
                    this.selectPrice = [parseInt(this.minPrice), parseInt(this.maxPrice)];
                }
                this.handleHide();
            },
            selectCity(district){
                if(district === ""){
                    this.district = [""];
                    return false;
                }else{
                   let selectCity = [...this.district];
                   const ind = selectCity.indexOf("");
                   if(ind>-1){
                       selectCity = [...selectCity.slice(0, ind), ...selectCity.slice(ind+1)];
                   }
                   const index = selectCity.indexOf(district);
                   if(index>-1){
                       selectCity = [...selectCity.slice(0, index), ...selectCity.slice(index+1)];
                   }else{
                       selectCity = [...selectCity, district];
                   }
                   this.district = selectCity;
                }
            },
            selectRoomType(roomType){
                roomType = parseInt(roomType);
                if(roomType == -1){
                    this.roomType = [-1];
                    return false;
                }else{
                   let selectRoomType = [...this.roomType];
                   const ind = selectRoomType.indexOf(-1);
                   if(ind>-1){
                       selectRoomType = [...selectRoomType.slice(0, ind), ...selectRoomType.slice(ind+1)];
                   }
                   const index = selectRoomType.indexOf(roomType);
                   if(index>-1){
                       selectRoomType = [...selectRoomType.slice(0, index), ...selectRoomType.slice(index+1)];
                   }else{
                       selectRoomType = [...selectRoomType, roomType];
                   }
                   this.roomType = selectRoomType;
                }
            },
            handlePriceClassify(i){
                this.selectPriceClassify = i;
            },
            handlePrice(value){
                this.selectPrice = value;
                this.minPrice = '';
                this.maxPrice = '';
                this.handleHide();
            },
            handleArea(value){
                const index = this.area.indexOf(value);
                if(index>-1){
                    this.area = [...this.area.slice(0,index), ...this.area.slice(index+1)]
                }else{
                    this.area = [...this.area, value]
                }
            },
            handleHouseType(v){
                const index = this.houseType.indexOf(v.value || v.name);
                if(index>-1){
                    this.houseType = [...this.houseType.slice(0,index), ...this.houseType.slice(index+1)]
                }else{
                    this.houseType = [...this.houseType, v.value || v.name]
                }
            },
            handleTags(v){
                const index = this.tags.indexOf(v.value || v.name);
                if(index>-1){
                    this.tags = [...this.tags.slice(0,index), ...this.tags.slice(index+1)]
                }else{
                    this.tags = [...this.tags, v.value || v.name]
                }
            }
		},
        watch: {
            selectIndex(val){
                if(val !== null && val !== undefined && val !== ""){
                    this.show = true
                }else{
                    this.show = false
                }
            },
            show(val){
                if(val === false){
                    setTimeout(() => {
                        this.maskHide = true
                    }, 200)
                }else{
                    this.maskHide = false;
                }
            },
            filterData(val){
                this.district = ''; 
            }
        },
        computed: {
           handleCityName(){
               if(!this.district || this.district.length == 0){
                   return "区域"
               }
               if(this.district[0] === ""){
                   return "不限"
               }else if(this.district.length>1){
                   return "多选"
               }else{
                   return this.district[0]
               }
           },
           handlePriceName(){
               if(!this.selectPrice){
                   return "价格"
               }
               if(this.selectPrice.length === 0){
                   return "不限"
               }else if(this.selectPrice.length>1){
                   return `${this.selectPrice[0]}-${this.selectPrice[1]}`
               }
           },
           handleRoomTypeName(){
                if(!this.roomType || this.roomType.length==0){
                    return "户型"
                }
                if(this.roomType[0] == -1){
                    return "不限"
                }else if(this.roomType.length>1){
                    return "多选"
                }else{
                    let str = '';
                    this.filterData[2].submenu.map(v => {
                        if(v.value == this.roomType[0]){
                            str = v.name;
                        }
                    })
                    return str;
                }
           }
        }
	}
</script>

<style lang="less" src="./style.less">
    
</style>
