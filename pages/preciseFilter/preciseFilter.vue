<template>
	<scroll-view class="container" scroll-y="true" @scrolltolower="scrolltolower">
        <view class="query">
            <view class="headTitle">
                <view class="title1">
                    <text>我的定制</text>
                </view>
                <view @click="goPreciseQuery" class="edit">
                    <image src="../../static/icons/edit.png" mode="widthFix"></image>
                    <text>修改</text>
                </view>
            </view>
            <view class="query-list">
                <view class="query-list-item" v-for="(v,i) in list" :key="i">{{ v }}</view>
            </view>
        </view>
        <view class="project-box">
            <view class="title1">
                <text>为您找到以下楼盘</text>
            </view>
            <view>
                <view class="project-item" v-for="(item, index) in projectList" :key="index" @tap="toProject(item.id)">
                    <view class="name">{{ item.projectname }}</view>
                    <view class="item-content">
                        <view class="tagIcon">在售</view>
                        <view class="img-box">
                            <image :src="item.sets.logo" mode="aspectFill"></image>
                        </view>
                        <view class="right">
                            <view class="price">{{ item.sets&&item.sets.price_range ? item.sets.price_range : "暂无报价" }}</view>
                            <view class="num">{{ item.viewcount }}人想买</view>
                            <view class="address">{{ item.sets&&item.sets.address }}</view>
                            <view class="tags">
                                <view v-if="item.area" class="tag">{{ item.area }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <uni-load-more :status="more"></uni-load-more>
            </view>
        </view>
	</scroll-view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
    import { uniLoadMore } from '@dcloudio/uni-ui';
	export default {
        components: { uniLoadMore },
		data() {
			return {
				city: '',
                price: [0, 500],
                area: [[0, 50], [50, 70], [70,90],[90,110],[110,130],[130,150],[150,200],[200,-1]],
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
                activeArea: [],
                activeType: [],
                projectList: [],
                more: "more",
                page: 1,
                isLastPage: false,
			};
		},
        onLoad(e){
            // uni.$on("changeQuery",(data) => {
            //     this.city = data.city;
            //     this.activeArea = data.activeArea;
            //     this.activeType = data.activeType;
            //     this.price = data.price;
            //     this.handlerChange();
            // })
            this.city = e.city;
            this.activeArea = e.activeArea.split(",").filter(v => (v===0 || !!v)).map(v => parseInt(v));
            this.activeType = e.activeType.split(",").filter(v => v===0 || !!v).map(v => parseInt(v));
            this.price = e.price.split(",").filter(v => v===0 || !!v).map(v => parseInt(v));
            this.getList();
        },
        computed:{
            list(){
                const area = this.activeArea.map(v => {
                    const item = this.area[v];
                    if(item[0] == 0){
                        return item[1] + "以下"
                    }else if(item[1] == -1){
                        return item[0] + "以上"
                    }else{
                        return item[0] + "-" + item[1] + "m²"
                    }
                })
                const type = this.activeType.map(v => {
                    return this.houseType[v].name
                })
                return [this.city || "全部", this.price[0]+"-"+this.price[1]+"万",...area,...type]
            }
        },
        methods:{
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
                    city: this.city,
                    referenceprice: this.price,
                    searchType: 4,
                    floorage: this.activeArea.map(v => this.area[v]),
                    room: this.activeType.map(v => this.houseType[v].value),
                    page: this.page
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
            },
            goPreciseQuery(){
                // tki.nav.navTo(`/pages/preciseFilter/preciseQuery?city=${this.city}&price=${this.price.join(",")}&area=${this.activeArea.join(",")}&type=${this.activeType.join(",")}`);
                tki.nav.navBack();
            },
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

<style lang="less" src="./preciseFilter.less">

</style>
