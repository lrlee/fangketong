<template>
	<view class="container">
        <!-- <view class="header">
            <view class="search-box">
                <view class="search">
                    <image v-if='imgUrl' :src="imgUrl + 'projectSelect/search.png'" mode=""></image>
                    <input @input="handlerChange" type="text" :value="keywords" placeholder="请输入您要搜索的项目名称" value=""/>
                </view>
            </view>
            <view class="city-box" @click="goSelectAddr">
                <image v-if='imgUrl' :src="imgUrl + 'projectSelect/location1.png'" mode="aspectFit"></image>
                <view class="city">{{ city || "全部" }}</view>
            </view>
        </view> -->
        <view class="header">
			<view class="search-box">
				<view class="area-box" @click="goSelectAddr">
					<view class="">
						<image src='../../static/icons/daohang.png' />
						<text class="area">{{ city || "全部" }}</text>
					</view>
				</view>
				<view class="search">
					<image src="../../static/icons/sousuo.png" mode=""></image>
					<input @input="handlerChange" type="text" :value="keywords" placeholder="请输入您要搜索的项目名称" value=""/>
				</view>
			</view>
		</view>
        <scroll-view class="content" scroll-y @scrolltolower="scrolltolower">
            <view v-if="list.length>0" class="project-item" v-for="(item, index) in list" :key="index" @tap="toProject(item.id)">
                <view class="img-box">
                    <image :src="item.sets.logo" mode="aspectFill"></image>
                </view>
                <view class="right">
                    <view class="name">{{ item.projectname }}</view>
                    <view class="price">{{ item.sets&&item.sets.price_range ? item.sets.price_range : "暂无报价" }}</view>
                    <view class="num">{{ item.viewcount }}人想买</view>
                    <view class="address">{{ item.sets&&item.sets.address }}</view>
                    <view class="tags">
                        <view v-if="item.area" class="tag">{{ item.area }}</view>
                    </view>
                </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          <!--  <view class="not" v-if="!list || (list.length==0 && isLastPage)">
                暂无内容
            </view> -->
        </scroll-view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
    import { uniLoadMore } from '@dcloudio/uni-ui';
	export default {
        components: { uniLoadMore },
		data() {
			return {
                page: 1,
                city: "",
                keywords: "",
                isLastPage: false,
				list: [],
                more: "more"
			};
		},
        onLoad(options){
          // this.city = options.city;
          this.getList();
        },
        methods:{
            handlerChange(e){
                this.keywords = e.detail.value;
                this.page = 1;
                this.list = [];
                this.isLastPage = false;
                this.getList(this.city, e.detail.value);
            },
            goSelectAddr(){
                uni.navigateTo({
                    url: "../location/location"
                })
            },
            changeCity(city){
                this.city = city;
                this.page = 1;
                this.list = [];
                this.isLastPage = false;
                this.getList(city, this.keywords);
            },
            scrolltolower(){
                if(!this.isLastPage) this.getList(this.city, this.keywords);
            },
            getList(city, keywords){
                this.more = "loading"
                let data = {
                    page: this.page
                };
                if(city) data.city = city;
                if(keywords) data.keywords = keywords;
                tki.req.get('index/projectlist', data).then(d => {
                    if (d.code == 200) {
                       if(d.data.page * d.data.pagesize>=d.data.total){
                           this.isLastPage = true;
                           this.more = "noMore"
                       }else{
                           this.page = this.page+1;
                           this.more = "more"
                       }
                       this.list = [...this.list, ...d.data.list];
                    } else {
                        tki.ui.showToast(d.message);
                           this.more = "more"
                    }
                }).catch(e => {
                    tki.ui.showToast(e.message);
                           this.more = "more"
                })
            },
			toProject(id) {
				uni.setStorageSync('projectid', id);
				tki.req.setConfig({
					data: {
						projectid: id
					}
				})
				tki.nav.navTo(`/pages/index/index?id=${id}`)
				// uni.switchTab({
				//     url: `/pages/index/index?id=${id}`
				// });
			}
        }
	}
</script>
<style lang="less" src="./projectSearch.less">

</style>
