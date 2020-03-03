<template>
	<view class="container">
		<image class="headerImg" src="../../static/icons/preciseHead.png" mode="widthFix"></image>
        <view class="content">
            <view class="address">
                <view class="title1">
                    <text>您的购房城市：</text>
                </view>
                <view @click="goSelectAddr" class="address-input">
                    <text>{{ city || "全部" }}</text>
                    <image src="../../static/icons/right.png" mode="widthFix"></image>
                </view>
            </view>
            <view class="price">
                <view class="title1">
                    <text>您的总预算：</text>
                </view>
                <view>
                    <view class="range">
                        {{rangeValue[0]}}-{{rangeValue[1]}}万
                    </view>
                    <slider-range
                        :value="rangeValue"
                        :min="rangeMin"
                        :max="rangeMax"
                        :step="step"
                        :height="36"
                        :bar-height="barHeight"
                        :block-size="blockSize"
                        :background-color="backgroundColor"
                        :active-color="activeColor"
                        :format="format"
                        :tipVisible="tipVisible"
                        :decorationVisible="decorationVisible"
                        @change="handleRangeChange"
                    ></slider-range>
                    <view class="minmax">
                        <text>10万</text>
                        <text>2000万+</text>
                    </view>
                </view>
            </view>
            <view class="area">
                <view class="title1">
                    <text>您想买多大面积(m²)：</text>
                </view>
                <view class="area-list list">
                    <view @click="selectArea(i)" :class="{active: activeArea.indexOf(i)>-1}" v-for="(v,i) in area" :key="i">{{ handlerArea(v) }}</view>
                </view>
            </view>
            <view class="house-type">
                <view class="title1">
                    <text>您想买什么户型：</text>
                </view>
                <view class="house-type-list list">
                    <view @click="selectType(i)" :class="{active: activeType.indexOf(i)>-1}" v-for="(v,i) in houseType" :key="i">{{ v.name }}</view>
                </view>
            </view>
            <view class="house-type">
                <view class="title1">
                    <text>您想买什么类型：</text>
                </view>
                <view class="build-type-list list">
                    <view @click="selectBuildType(i)" :class="{active: activeBuildType.indexOf(i)>-1}" v-for="(v,i) in buildType" :key="i">{{ v.name }}</view>
                </view>
            </view>
            <view class="btn-box">
                <button @click="submit">立即定制</button>
            </view>
        </view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
    import SliderRange from '../../components/slider-range/index.vue'
	export default {
        components: {
            SliderRange,
        },
		data() {
			return {
				city: '',
                barHeight: 15,
                blockSize: 30,
                backgroundColor: '#fff',
                rangeMin: 0,
                rangeMax: 2000,
                rangeValue: [0, 500],
                step: 1,
                activeColor: '#FFA800',
                decorationVisible: false,
                tipVisible: false,
                area: [[0, 50], [50, 70], [70,90],[90,110],[110,130],[130,150],[150,200],[200,-1]],
                // area: ["50以下","50-60","70-90","90-110","110-130","130-150","150-200","200以上"],
                // houseType: ["不限","一室","两室","三室","四室","五室及以上"],
                houseType: [{
                    value: -1,
                    name: "不限"
                },{
                    value: 1,
                    name: '一室'
                },{
                    value: 2,
                    name: '二室'
                },{
                    value: 3,
                    name: '三室'
                },{
                    value: 4,
                    name: '四室'
                },{
                    value: 5,
                    name: '5室及以上'
                }],
                buildType: [{
                    value: 1,
                    name: "住宅"
                },{
                    value: 2,
                    name: "商铺"
                }],
                activeBuildType: [],
                activeArea: [],
                activeType: []
			};
		},
        onLoad(e){
            // this.city = e.city;
            // this.activeArea = e.area.split(",").filter(v => (v===0 || !!v)).map(v => parseInt(v));
            // this.activeType = e.type.split(",").filter(v => v===0 || !!v).map(v => parseInt(v));
            // this.rangeValue = e.price.split(",").filter(v => v===0 || !!v).map(v => parseInt(v));
        },
        methods:{
            handlerArea(v){
              if(v[0]==0){
                  return v[1] + "以下"
              }else if(v[1] == -1){
                  return v[0] + "以上"
              }else{
                  return v[0] + "-" + v[1]
              }
            },
            changeCity(city) {
            	this.city = city;
            },
			goSelectAddr() {
				uni.navigateTo({
					url: "../location/location"
				})
			},
            format(val) {
              return val
            },
            handleRangeChange(e) {
              this.rangeValue = e
            },
            selectArea(v){
                const index = this.activeArea.indexOf(v);
                if(index>-1){
                    this.activeArea = [...this.activeArea.slice(0,index),...this.activeArea.slice(index+1)]
                }else{
                    this.activeArea = [...this.activeArea, v]
                }
            },
            selectBuildType(v){
                const index = this.activeBuildType.indexOf(v);
                if(index>-1){
                    this.activeBuildType = [...this.activeBuildType.slice(0,index),...this.activeBuildType.slice(index+1)]
                }else{
                    this.activeBuildType = [...this.activeBuildType, v]
                }
            },
            selectType(i){
                const v = this.houseType[i].value;
                if(v == -1){
                    this.activeType = [0]
                }else{
                    const ind = this.activeType.indexOf(0);
                    if(ind>-1){
                        this.activeType = [...this.activeType.slice(0,ind),...this.activeType.slice(ind+1)]
                    }
                    const index = this.activeType.indexOf(i);
                    if(index>-1){
                        this.activeType = [...this.activeType.slice(0,index),...this.activeType.slice(index+1)];
                    }else{
                        this.activeType = [...this.activeType, i];
                    }
                }
            },
            submit(){
                // uni.$emit("changeQuery",{
                //     city: this.city,
                //     price: this.rangeValue,
                //     activeArea: this.activeArea,
                //     activeType: this.activeType
                // })
                // tki.nav.navBack();
                tki.nav.navTo(`/pages/preciseFilter/preciseFilter?city=${this.city}&price=${this.rangeValue.join(",")}&activeArea=${this.activeArea.join(",")}&activeType=${this.activeType.join(",")}&activeBuildType=${this.activeBuildType.join(",")}`);
            }
        }
	}
</script>

<style lang="less" src="./preciseQuery.less">

</style>
